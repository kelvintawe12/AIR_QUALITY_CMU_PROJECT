import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, AlertTriangle, Thermometer, Droplets, 
  Activity, Clock, MapPin 
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Legend, ScatterChart, Scatter,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { AppContextType } from '../components/AppLayout';

export default function AnalyticsDashboard() {
  const { history, data } = useOutletContext<AppContextType>();

  // Processed data for charts
  const recentHistory = useMemo(() => history.slice(-30).reverse(), [history]);

  const trendData = recentHistory.map((d, i) => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    mq135: d.mq135,
    mq7: d.mq7,
    temperature: d.temperature,
    humidity: d.humidity,
    riskScore: d.risk === 'Safe' ? 10 : 
               d.risk === 'Moderate Risk' ? 40 : 
               d.risk === 'High Risk' ? 70 : 95,
  }));

  const riskDistribution = [
    { name: 'Safe', value: history.filter(d => d.risk === 'Safe').length, color: '#10b981' },
    { name: 'Moderate', value: history.filter(d => d.risk === 'Moderate Risk').length, color: '#f59e0b' },
    { name: 'High Risk', value: history.filter(d => d.risk === 'High Risk').length, color: '#f97316' },
    { name: 'Asthma', value: history.filter(d => d.risk === 'Asthma Risk').length, color: '#ec4899' },
    { name: 'CO Poisoning', value: history.filter(d => d.risk === 'CO Poisoning Risk').length, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const avgValues = useMemo(() => {
    if (!history.length) return { aqi: 0, co: 0, temp: 0, hum: 0 };
    return {
      aqi: Math.round(history.reduce((sum, d) => sum + d.mq135, 0) / history.length),
      co: (history.reduce((sum, d) => sum + d.mq7, 0) / history.length).toFixed(1),
      temp: (history.reduce((sum, d) => sum + d.temperature, 0) / history.length).toFixed(1),
      hum: (history.reduce((sum, d) => sum + d.humidity, 0) / history.length).toFixed(0),
    };
  }, [history]);

  // Weekly data for bar chart (group by week)
  const weeklyData = useMemo(() => {
    const weeks: { [key: string]: { week: string; mq135: number; mq7: number; count: number } } = {};
    recentHistory.forEach(d => {
      const week = new Date(d.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      if (!weeks[week]) {
        weeks[week] = { week, mq135: 0, mq7: 0, count: 0 };
      }
      weeks[week].mq135 += d.mq135;
      weeks[week].mq7 += d.mq7;
      weeks[week].count += 1;
    });
    return Object.values(weeks).map((w: any) => ({
      week: w.week.slice(0, 6),
      mq135: w.count > 0 ? Math.round(w.mq135 / w.count) : 0,
      mq7: w.count > 0 ? Math.round(w.mq7 / w.count) : 0
    })).slice(-7);
  }, [recentHistory]);

  // Radar data for health impact
  const radarData = useMemo(() => [
    { metric: 'Asthma', score: Number(avgValues.aqi) / 10 },
    { metric: 'CO Poisoning', score: Number(avgValues.co) / 10 },
    { metric: 'Respiratory', score: (Number(avgValues.aqi) + Number(avgValues.co)) / 20 },
    { metric: 'Heat Stress', score: Number(avgValues.temp) / 5 },
    { metric: 'Mold Risk', score: Number(avgValues.hum) / 2 }
  ].map(item => ({ ...item, score: isNaN(item.score) ? 0 : item.score })), [avgValues]);

  // Hourly averages for bar chart
  const hourlyData = useMemo(() => {
    const hours: { [key: string]: { hour: string; mq135: number; mq7: number; count: number } } = {};
    recentHistory.slice(0, 24).forEach(d => {
      const hour = new Date(d.timestamp).getHours().toString().padStart(2, '0');
      if (!hours[hour]) hours[hour] = { hour, mq135: 0, mq7: 0, count: 0 };
      hours[hour].mq135 += d.mq135;
      hours[hour].mq7 += d.mq7;
      hours[hour].count += 1;
    });
    return Object.values(hours).map(h => ({
      hour: h.hour + ':00',
      mq135: Math.round(h.mq135 / h.count),
      mq7: Math.round(h.mq7 / h.count)
    }));
  }, [recentHistory]);

  // Risk donut data
  const riskDonutData = useMemo(() => [
    { name: 'Safe', value: history.filter(d => d.risk === 'Safe').length, color: '#10b981' },
    { name: 'Risky', value: history.filter(d => d.risk !== 'Safe').length, color: '#ef4444' }
  ], [history]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pb-12">
      <div className="border-b border-slate-800 bg-[#111827] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              Analytics Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Kigali Air Quality • Real-time Insights &amp; Predictive Analytics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            LIVE UPDATES
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-4 lg:gap-6">

          {/* KPI Cards */}
            <div className="xl:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm">Average AQI</div>
              <div className="text-4xl md:text-5xl font-bold mt-3">{avgValues.aqi}</div>
              <div className="text-red-400 text-sm mt-1">Last 30 readings</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm">Avg CO Level</div>
              <div className="text-4xl md:text-5xl font-bold mt-3 text-red-400">{avgValues.co}</div>
              <div className="text-slate-400 text-sm mt-1">ppm</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm">Avg Temperature</div>
              <div className="text-4xl md:text-5xl font-bold mt-3">{avgValues.temp}°C</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm">Avg Humidity</div>
              <div className="text-4xl md:text-5xl font-bold mt-3">{avgValues.hum}%</div>
            </div>
          </div>

          {/* Main Trend Chart */}
          <div className="xl:col-span-8 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">30-Day Air Quality & CO Trend</h3>
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="left" stroke="#a855f7" />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                <Tooltip contentStyle={{ backgroundColor: '#1e2937', border: 'none', borderRadius: '12px' }} />
                
                <Area yAxisId="left" type="monotone" dataKey="mq135" stroke="#a855f7" fill="#a855f7" fillOpacity={0.25} name="MQ135 (AQI)" />
                <Line yAxisId="right" type="monotone" dataKey="mq7" stroke="#f87171" strokeWidth={4} dot={{ r: 3 }} name="MQ7 (CO)" />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#60a5fa" strokeWidth={2} strokeDasharray="5 5" name="Temperature" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution Pie */}
          <div className="xl:col-span-4 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Health Risk Projection */}
          <div className="xl:col-span-12 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-orange-400" /> Long-Term Health Risk Projection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { period: "Next 7 Days", level: "Moderate Risk", color: "text-amber-400", desc: "Increased chance of respiratory irritation" },
                { period: "Next 30 Days", level: "High Risk", color: "text-orange-400", desc: "Asthma & COPD patients at elevated risk" },
                { period: "Next 90 Days", level: "Critical", color: "text-red-400", desc: "Possible chronic exposure effects if no intervention" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
                  <div className="text-slate-400 text-sm">{item.period}</div>
                  <div className={`text-xl md:text-2xl lg:text-3xl font-bold mt-3 ${item.color}`}>{item.level}</div>
                  <p className="text-slate-300 mt-4 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Humidity vs Temperature Scatter */}
          <div className="xl:col-span-6 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Temperature vs Humidity Correlation</h3>
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart data={trendData}>
                <CartesianGrid stroke="#334155" />
                <XAxis dataKey="temperature" name="Temperature (°C)" stroke="#64748b" />
                <YAxis dataKey="humidity" name="Humidity (%)" stroke="#64748b" />
                <Tooltip />
                <Scatter name="Conditions" fill="#8b5cf6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Risk Score */}
          <div className="xl:col-span-6 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Daily Risk Score Trend</h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trendData}>
                <CartesianGrid stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="riskScore" stroke="#c026d3" strokeWidth={4} dot={{ r: 5, fill: '#c026d3' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Sensor Comparison Bar Chart */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Weekly Sensor Comparison</h3>
            <div className="w-full h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#334155" />
                  <XAxis dataKey="week" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mq135" fill="#a855f7" name="AQI" />
                  <Bar dataKey="mq7" fill="#f87171" name="CO" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pollutant Health Impact Radar */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
            <h3 className="text-lg md:text-xl font-semibold mb-6">Pollutant Health Impact Radar</h3>
            <div className="w-full h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" stroke="#64748b" />
                  <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
