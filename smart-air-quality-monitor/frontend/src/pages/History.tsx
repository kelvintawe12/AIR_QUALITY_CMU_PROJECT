import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Download,
  Filter,
  Activity,
  ShieldCheck,
  AlertTriangle } from
'lucide-react';
import { AppContextType } from '../components/AppLayout';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const KIGALI_DISTRICTS = ['Gasabo', 'Kicukiro', 'Nyarugenge'];
export function History() {
  const { history } = useOutletContext<AppContextType>();
  const [filter, setFilter] = useState<string>('All');
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Safe':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Moderate Risk':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'High Risk':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Asthma Risk':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'CO Poisoning Risk':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Safe':
        return 'bg-emerald-500';
      case 'Moderate Risk':
        return 'bg-amber-500';
      case 'High Risk':
        return 'bg-orange-500';
      case 'Asthma Risk':
        return 'bg-rose-500';
      case 'CO Poisoning Risk':
        return 'bg-red-600';
      default:
        return 'bg-slate-500';
    }
  };
  // Derived Stats
  const stats = useMemo(() => {
    if (!history.length) return null;
    const avgAqi = history.reduce((sum, d) => sum + d.mq135, 0) / history.length;
    const safeCount = history.filter((d) => d.risk === 'Safe').length;
    const safePercent = Math.round(safeCount / history.length * 100);
    // Find peak risk
    const riskLevels = [
    'Safe',
    'Moderate Risk',
    'High Risk',
    'Asthma Risk',
    'CO Poisoning Risk'];

    let peakRisk = 'Safe';
    let peakRiskIndex = 0;
    history.forEach((d) => {
      const idx = riskLevels.indexOf(d.risk);
      if (idx > peakRiskIndex) {
        peakRiskIndex = idx;
        peakRisk = d.risk;
      }
    });
    return {
      total: history.length,
      avgAqi: Math.round(avgAqi),
      safePercent,
      peakRisk
    };
  }, [history]);
  // Chart Data
  const chartData = useMemo(() => {
    return [...history].reverse().map((d) => ({
      time: new Date(d.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      aqi: Math.round(d.mq135)
    }));
  }, [history]);
  // Filtered History
  const filteredHistory = useMemo(() => {
    let filtered = [...history].reverse();
    if (filter !== 'All') {
      if (filter === 'Critical') {
        filtered = filtered.filter(
          (d) => d.risk === 'Asthma Risk' || d.risk === 'CO Poisoning Risk'
        );
      } else {
        filtered = filtered.filter((d) => d.risk.includes(filter));
      }
    }
    return filtered.map((reading, i) => ({
      ...reading,
      district: KIGALI_DISTRICTS[i % KIGALI_DISTRICTS.length],
      formattedTime: new Date(reading.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }));
  }, [history, filter]);
  const filters = ['All', 'Safe', 'Moderate', 'High', 'Critical'];
  return (
    <div className="pb-6 sm:pb-8">
      {/* Clean Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center tracking-tight">
              <Clock className="w-7 h-7 mr-3 text-slate-400" />
              Reading History
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">
              Past sensor readings from Kigali monitoring stations
            </p>
          </div>
          <button className="inline-flex items-center justify-center px-4 py-2 bg-white ring-1 ring-slate-900/5 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold transition-all shadow-sm w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2 text-slate-400" />
            Export CSV
          </button>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* Summary Stats Row */}
        {stats &&
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden flex flex-col justify-center hover:shadow-md hover:ring-slate-900/10 transition-all">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Total Readings
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                {stats.total}
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden flex flex-col justify-center hover:shadow-md hover:ring-slate-900/10 transition-all">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Avg AQI
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                {stats.avgAqi}
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden flex flex-col justify-center hover:shadow-md hover:ring-slate-900/10 transition-all">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Safe Time
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {stats.safePercent}
                </span>
                <span className="text-sm font-medium text-slate-500">%</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden flex flex-col justify-center hover:shadow-md hover:ring-slate-900/10 transition-all">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Peak Risk
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 truncate">
                {stats.peakRisk}
              </span>
            </div>
          </div>
        }

        {/* Trend Chart */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm ring-1 ring-slate-900/5">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            AQI Trend (Last 20 Readings)
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 0,
                  left: -20,
                  bottom: 0
                }}>
                
                <defs>
                  <linearGradient id="colorAqiHist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0" />
                
                <XAxis
                  dataKey="time"
                  tick={{
                    fontSize: 10,
                    fill: '#94A3B8'
                  }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30} />
                
                <YAxis
                  tick={{
                    fontSize: 10,
                    fill: '#94A3B8'
                  }}
                  tickLine={false}
                  axisLine={false} />
                
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  itemStyle={{
                    color: '#1E293B',
                    fontWeight: 600
                  }}
                  labelStyle={{
                    color: '#64748B',
                    fontSize: '12px',
                    marginBottom: '4px'
                  }} />
                
                <Area
                  type="monotone"
                  dataKey="aqi"
                  name="AQI"
                  stroke="#7C3AED"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAqiHist)"
                  isAnimationActive={false} />
                
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters & Data List */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Filter className="w-4 h-4 text-slate-400" />
              Filter by Risk
            </div>
            <div className="flex overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar">
              {filters.map((f) =>
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${filter === f ? 'bg-slate-900 text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}>
                
                  {f}
                </button>
              )}
            </div>
          </div>

          {/* Mobile View: Cards */}
          <div className="block md:hidden p-4 space-y-3 bg-slate-50/30">
            <AnimatePresence mode="popLayout">
              {filteredHistory.map((reading, i) =>
              <motion.div
                key={reading.timestamp + i}
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{
                  duration: 0.2
                }}
                className="bg-white p-4 rounded-xl ring-1 ring-slate-900/5 shadow-sm relative overflow-hidden">
                
                  <div
                  className={`absolute left-0 top-0 bottom-0 w-1 ${getRiskBadgeColor(reading.risk)}`} />
                
                  <div className="flex justify-between items-start mb-3 pl-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {reading.formattedTime}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" /> {reading.district}
                      </div>
                    </div>
                    <span
                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(reading.risk)}`}>
                    
                      {reading.risk}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pl-2 pt-3 border-t border-slate-50">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                        AQI
                      </div>
                      <div className="font-bold text-slate-700 text-sm">
                        {Math.round(reading.mq135)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                        CO (ppm)
                      </div>
                      <div className="font-bold text-slate-700 text-sm">
                        {reading.mq7.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                        Temp
                      </div>
                      <div className="font-bold text-slate-700 text-sm">
                        {reading.temperature.toFixed(1)}°
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {filteredHistory.length === 0 &&
            <div className="p-8 text-center text-slate-500 text-sm bg-white rounded-xl border border-slate-100">
                No readings match the selected filter.
              </div>
            }
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Time & Location</th>
                  <th className="px-6 py-4 font-semibold">AQI (MQ135)</th>
                  <th className="px-6 py-4 font-semibold">CO (ppm)</th>
                  <th className="px-6 py-4 font-semibold">Environment</th>
                  <th className="px-6 py-4 font-semibold">Risk Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredHistory.map((reading, i) =>
                  <motion.tr
                    key={reading.timestamp + i}
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0
                    }}
                    className="hover:bg-slate-50/80 transition-colors group">
                    
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {reading.formattedTime}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center mt-0.5">
                          <MapPin className="w-3 h-3 mr-1 text-slate-400 group-hover:text-purple-500 transition-colors" />{' '}
                          {reading.district}, Kigali
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-700 text-base">
                          {Math.round(reading.mq135)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-700 text-base">
                          {reading.mq7.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {reading.temperature.toFixed(1)}°C
                        <span className="text-slate-300 mx-2">|</span>
                        {Math.round(reading.humidity)}%
                      </td>
                      <td className="px-6 py-4">
                        <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRiskColor(reading.risk)}`}>
                        
                          {reading.risk}
                        </span>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredHistory.length === 0 &&
            <div className="p-12 text-center text-slate-500">
                No readings match the selected filter.
              </div>
            }
          </div>
        </div>
      </motion.div>
    </div>);

}