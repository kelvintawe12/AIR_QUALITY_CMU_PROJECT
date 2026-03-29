import React, { useMemo, Children } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Flame,
  Thermometer,
  ShieldCheck } from
'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { SensorData } from '../types/SensorData';
interface AnalyticsStripProps {
  history: SensorData[];
}
export function AnalyticsStrip({ history }: AnalyticsStripProps) {
  const stats = useMemo(() => {
    if (!history || history.length === 0) return null;
    const avgAqi = history.reduce((sum, d) => sum + d.mq135, 0) / history.length;
    const first5 = history.slice(0, 5);
    const last5 = history.slice(-5);
    const avgFirst5 =
    first5.reduce((sum, d) => sum + d.mq135, 0) / (first5.length || 1);
    const avgLast5 =
    last5.reduce((sum, d) => sum + d.mq135, 0) / (last5.length || 1);
    const aqiTrend = avgLast5 - avgFirst5;
    const peakCoData = history.reduce(
      (max, d) => d.mq7 > max.mq7 ? d : max,
      history[0]
    );
    const temps = history.map((d) => d.temperature);
    const avgTemp = temps.reduce((sum, t) => sum + t, 0) / temps.length;
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const current = history[history.length - 1];
    const aqiPenalty = Math.min(100, current.mq135 / 500 * 100);
    const coPenalty = Math.min(100, current.mq7 / 100 * 100);
    const dustPenalty = Math.min(100, (current.dust || 0) / 150 * 100);
    const score = Math.max(
      0,
      Math.round(
        100 - (aqiPenalty * 0.5 + coPenalty * 0.3 + dustPenalty * 0.2)
      )
    );
    const sparklineData = history.map((d, i) => ({
      index: i,
      aqi: d.mq135,
      co: d.mq7,
      temp: d.temperature,
      score: Math.max(
        0,
        100 - (
        Math.min(100, d.mq135 / 500 * 100) * 0.5 +
        Math.min(100, d.mq7 / 100 * 100) * 0.3 +
        Math.min(100, (d.dust || 0) / 150 * 100) * 0.2)
      )
    }));
    return {
      avgAqi: Math.round(avgAqi),
      aqiTrend,
      peakCo: peakCoData.mq7.toFixed(1),
      peakCoTime: new Date(peakCoData.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      avgTemp: avgTemp.toFixed(1),
      minTemp: minTemp.toFixed(1),
      maxTemp: maxTemp.toFixed(1),
      score,
      sparklineData
    };
  }, [history]);
  if (!stats) return null;
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  const Sparkline = ({
    dataKey,
    color



  }: {dataKey: string;color: string;}) =>
  <div className="h-16 w-full mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={stats.sparklineData}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false} />
        
        </LineChart>
      </ResponsiveContainer>
    </div>;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-amber-50';
    return 'bg-red-50';
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      
      {/* Avg AQI */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-3 shadow ring-1 ring-slate-200 hover:shadow-md hover:ring-purple-200 transition-all border border-slate-100/60">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 rounded-md bg-purple-50">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Avg AQI (20 ticks)
              </p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">
                {stats.avgAqi}
              </span>
              <div
                className={`flex items-center text-[11px] font-semibold px-1 py-0.5 rounded ${stats.aqiTrend > 0 ? 'text-orange-600 bg-orange-50' : stats.aqiTrend < 0 ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                {stats.aqiTrend > 0 ?
                <TrendingUp className="w-3 h-3 mr-0.5" /> :
                stats.aqiTrend < 0 ?
                <TrendingDown className="w-3 h-3 mr-0.5" /> :
                <Minus className="w-3 h-3 mr-0.5" />}
                {Math.abs(stats.aqiTrend).toFixed(0)}
              </div>
            </div>
          </div>
        </div>
        <Sparkline dataKey="aqi" color="#8B5CF6" />
      </motion.div>

      {/* Peak CO */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-3 shadow ring-1 ring-slate-200 hover:shadow-md hover:ring-rose-200 transition-all border border-slate-100/60">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 rounded-md bg-rose-50">
                <Flame className="w-3.5 h-3.5 text-rose-600" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Peak CO
              </p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">
                {stats.peakCo}
              </span>
              <span className="text-xs text-slate-500 font-medium">ppm</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">at {stats.peakCoTime}</p>
          </div>
        </div>
        <Sparkline dataKey="co" color="#F43F5E" />
      </motion.div>

      {/* Avg Temp */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-3 shadow ring-1 ring-slate-200 hover:shadow-md hover:ring-amber-200 transition-all border border-slate-100/60">
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 rounded-md bg-amber-50">
                <Thermometer className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Avg Temp
              </p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">
                {stats.avgTemp}
              </span>
              <span className="text-xs text-slate-500 font-medium">°C</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Range: {stats.minTemp}° – {stats.maxTemp}°
            </p>
          </div>
        </div>
        <Sparkline dataKey="temp" color="#F59E0B" />
      </motion.div>

      {/* Air Quality Score */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-3 shadow ring-1 ring-slate-200 hover:shadow-md hover:ring-emerald-200 transition-all border border-slate-100/60">
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="p-1 rounded-md bg-emerald-50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                AQ Score
              </p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">
                {stats.score}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 100</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${stats.score}%`
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut'
                  }}
                  className={`h-full rounded-full ${stats.score >= 80 ? 'bg-emerald-500' : stats.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`} />
                
              </div>
              <span
                className={`text-xs font-semibold ${getScoreColor(stats.score)}`}>
                
                {stats.score >= 80 ?
                'Good' :
                stats.score >= 60 ?
                'Fair' :
                'Poor'}
              </span>
            </div>
          </div>
        </div>
        <Sparkline dataKey="score" color="#10B981" />
      </motion.div>
    </motion.div>);

}