import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Clock, MapPin, Download, Filter, TrendingUp, 
  ShieldCheck, AlertTriangle, BarChart3 
} from 'lucide-react';
import { toast } from 'sonner';
import { AppContextType } from '../components/AppLayout';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Line, ComposedChart 
} from 'recharts';

const KIGALI_DISTRICTS = ['Gasabo', 'Kicukiro', 'Nyarugenge', 'Rutsiro', 'Bugesera'];

export function History() {
  const { history } = useOutletContext<AppContextType>();
  const [filter, setFilter] = useState<'All' | 'Safe' | 'Moderate' | 'High' | 'Critical'>('All');

  // ==================== STATISTICS ====================
  const stats = useMemo(() => {
    if (!history.length) return null;

    const total = history.length;
    const avgAQI = Math.round(history.reduce((sum, d) => sum + d.mq135, 0) / total);
    const maxCO = Math.max(...history.map(d => d.mq7));
    const safeCount = history.filter(d => d.risk === 'Safe').length;
    const criticalCount = history.filter(d => 
      d.risk === 'Asthma Risk' || d.risk === 'CO Poisoning Risk'
    ).length;

    return {
      total,
      avgAQI,
      maxCO: maxCO.toFixed(1),
      safePercent: Math.round((safeCount / total) * 100),
      criticalCount
    };
  }, [history]);

  // ==================== CHART DATA ====================
  const chartData = useMemo(() => {
    return [...history].reverse().map((d) => ({
      time: new Date(d.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', minute: '2-digit' 
      }),
      aqi: Math.round(d.mq135),
      co: Math.round(d.mq7),
      temp: d.temperature.toFixed(1)
    }));
  }, [history]);

  // ==================== FILTERED HISTORY ====================
  const filteredHistory = useMemo(() => {
    let filtered = [...history].reverse();

    if (filter !== 'All') {
      if (filter === 'Critical') {
        filtered = filtered.filter(d => 
          d.risk === 'Asthma Risk' || d.risk === 'CO Poisoning Risk'
        );
      } else {
        filtered = filtered.filter(d => d.risk === filter);
      }
    }

    return filtered.map((reading, i) => ({
      ...reading,
      district: KIGALI_DISTRICTS[i % KIGALI_DISTRICTS.length],
      formattedTime: new Date(reading.timestamp).toLocaleString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        month: 'short', day: 'numeric'
      })
    }));
  }, [history, filter]);

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'Safe': 
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'Moderate Risk': 
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'High Risk': 
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/30';
      case 'Asthma Risk': 
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
      case 'CO Poisoning Risk': 
        return 'bg-red-600/10 text-red-400 border border-red-600/30';
      default: 
        return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Timestamp', 'MQ135', 'MQ7 (ppm)', 'Temperature (°C)', 'Humidity (%)', 'Risk'],
      ...history.map(d => [
        d.timestamp,
        d.mq135,
        d.mq7,
        d.temperature,
        d.humidity,
        d.risk
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `air_quality_history_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    toast.success('Data exported successfully');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#111827] px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              Historical Analysis
            </h1>
            <p className="text-slate-400 mt-1">Sensor readings and risk trends — Kigali Monitoring Station</p>
          </div>
          
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-white hover:bg-slate-100 text-black px-6 py-3 rounded-2xl font-semibold transition-all"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm mb-1">TOTAL READINGS</div>
              <div className="text-4xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm mb-1">AVERAGE AQI</div>
              <div className="text-4xl font-bold">{stats.avgAQI}</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm mb-1">PEAK CO LEVEL</div>
              <div className="text-4xl font-bold text-red-400">{stats.maxCO} ppm</div>
            </div>
            <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
              <div className="text-slate-400 text-sm mb-1">SAFE READINGS</div>
              <div className="text-4xl font-bold text-emerald-400">{stats.safePercent}%</div>
            </div>
          </div>
        )}

        {/* Trend Chart */}
        <div className="bg-[#1e2937] rounded-3xl p-8 mb-10 border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">AQI & CO Trend Analysis</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis yAxisId="left" stroke="#64748b" />
                <YAxis yAxisId="right" orientation="right" stroke="#f87171" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#e2e8f0'
                  }} 
                />
                
                <Area 
                  yAxisId="left"
                  type="natural" 
                  dataKey="aqi" 
                  stroke="#a855f7" 
                  fill="#a855f7" 
                  fillOpacity={0.15} 
                  name="AQI (MQ135)" 
                />
                <Line 
                  yAxisId="right"
                  type="natural" 
                  dataKey="co" 
                  stroke="#f87171" 
                  strokeWidth={3} 
                  dot={{ fill: '#f87171', r: 3 }}
                  name="CO Level (MQ7)" 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-[#1e2937] rounded-3xl overflow-hidden border border-slate-700">
          <div className="px-8 py-5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-slate-400" />
              <span className="font-semibold text-lg">Sensor Readings Log</span>
            </div>

            <div className="flex gap-2">
              {['All', 'Safe', 'Moderate', 'High', 'Critical'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-5 py-2 rounded-2xl text-sm font-medium transition-all ${
                    filter === f 
                      ? 'bg-white text-black shadow' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead className="bg-slate-900/60">
                <tr className="text-xs uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5 text-left">Timestamp</th>
                  <th className="px-6 py-5 text-left">Location</th>
                  <th className="px-6 py-5 text-left">AQI (MQ135)</th>
                  <th className="px-6 py-5 text-left">CO Level</th>
                  <th className="px-6 py-5 text-left">Temperature</th>
                  <th className="px-8 py-5 text-left">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <AnimatePresence>
                  {filteredHistory.map((reading, idx) => (
                    <motion.tr
                      key={reading.timestamp}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.015 }}
                      className="hover:bg-slate-800/70 transition-colors"
                    >
                      <td className="px-8 py-5 font-medium">{reading.formattedTime}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-4 h-4" />
                          {reading.district}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-lg font-semibold">
                        {Math.round(reading.mq135)}
                      </td>
                      <td className="px-6 py-5 font-mono text-lg font-semibold text-red-400">
                        {reading.mq7.toFixed(1)} ppm
                      </td>
                      <td className="px-6 py-5 text-slate-300">
                        {reading.temperature.toFixed(1)}°C • {reading.humidity.toFixed(0)}%
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-5 py-2 rounded-2xl text-sm font-semibold inline-block ${getRiskStyle(reading.risk)}`}>
                          {reading.risk}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}