import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { 
  Thermometer, Droplets, Wind, AlertTriangle, 
  MapPin, Clock, Heart, User as UserIcon
} from 'lucide-react';
import { LiveCharts } from '../components/LiveCharts';

export function Dashboard() {
  const { data, history } = useOutletContext<any>();

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Connecting to sensors...</p>
        </div>
      </div>
    );
  }

  const isDangerous = data.risk === 'High Risk' || data.risk === 'Asthma Risk' || data.risk === 'CO Poisoning Risk';

  const getRiskEmoji = (risk: string) => {
    switch (risk) {
      case 'Safe': return '😊';
      case 'Moderate Risk': return '😐';
      case 'High Risk': return '😟';
      case 'Asthma Risk': return '😷';
      case 'CO Poisoning Risk': return '🥴';
      default: return '😐';
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#0a0f1c] text-white pb-10 overflow-auto w-full">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="px-4 sm:px-8 py-5 border-b border-slate-800 flex items-center justify-between bg-[#111827]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Air Quality Dashboard</h1>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Kigali, Rwanda
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-lg">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-slate-200 font-semibold">Air Quality Monitor</p>
              <p className="text-xs text-emerald-400">Live • Updated just now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">

          {/* Map Section */}
          <div className="lg:col-span-8 bg-[#1e2937] rounded-3xl p-4 h-[380px] relative overflow-hidden min-w-0">
            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-2xl text-sm flex items-center gap-2 z-10">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Live Air Quality Map - Kigali
            </div>
            
            {/* Placeholder for actual map (you can replace with Leaflet/Google Maps later) */}
            <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
              <div className="text-center">
                <p className="text-slate-400 mb-2">🗺️ Interactive Map Area</p>
                <p className="text-xs text-slate-500">Kigali City View with AQI Pins</p>
              </div>
            </div>
          </div>

          {/* Live AQI Index - Big Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 rounded-3xl p-6 flex flex-col min-w-0">
            <h3 className="text-slate-400 text-sm font-medium mb-2">LIVE AIR QUALITY INDEX</h3>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-7xl font-bold text-white mb-2">
                {Math.round((data.mq135 + data.mq7) / 8)}
              </div>
              <p className="text-xl font-semibold text-red-400">Unhealthy</p>
              <div className="text-6xl mt-4 mb-6">
                {getRiskEmoji(data.risk)}
              </div>
              <p className="text-center text-slate-300 text-lg font-medium">{data.risk}</p>
            </div>

            <div className="text-xs text-slate-500 text-center mt-auto pt-4 border-t border-slate-700">
              Updated • {new Date(data.timestamp).toLocaleTimeString()}
            </div>
          </div>

          {/* Environmental Data Cards */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 min-w-0">
            <div className="bg-[#1e2937] rounded-2xl p-5 min-w-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  🌫️
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Air Quality</p>
                  <p className="text-3xl font-bold">{data.mq135}</p>
                  <p className="text-xs text-slate-500">MQ135</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2937] rounded-2xl p-5 min-w-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                  ☣️
                </div>
                <div>
                  <p className="text-slate-400 text-sm">CO Level</p>
                  <p className="text-3xl font-bold">{data.mq7}</p>
                  <p className="text-xs text-slate-500">MQ7 (ppm)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2937] rounded-2xl p-5 min-w-0">
              <div className="flex items-center gap-3">
                <Thermometer className="w-10 h-10 text-orange-400" />
                <div>
                  <p className="text-slate-400 text-sm">Temperature</p>
                  <p className="text-3xl font-bold">{data.temperature.toFixed(1)}°C</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1e2937] rounded-2xl p-5 min-w-0">
              <div className="flex items-center gap-3">
                <Droplets className="w-10 h-10 text-sky-400" />
                <div>
                  <p className="text-slate-400 text-sm">Humidity</p>
                  <p className="text-3xl font-bold">{data.humidity.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Health Tips + Forecast Area */}
          <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
            {/* Health Recommendations */}
            <div className="bg-[#1e2937] rounded-3xl p-6 min-w-0">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <Heart className="text-red-400" /> Health Recommendations
              </h3>
              <div className="space-y-4 text-slate-300">
                {isDangerous && (
                  <>
                    <div className="flex gap-3">
                      <div className="text-red-400 mt-0.5">⚠️</div>
                      <div>Avoid outdoor activities. Close windows and use air purifier if available.</div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-red-400 mt-0.5">😷</div>
                      <div>Wear N95 mask if going outside.</div>
                    </div>
                  </>
                )}
                <div className="flex gap-3">
                  <div className="text-emerald-400 mt-0.5">💧</div>
                  <div>Stay hydrated. High humidity + pollution can trigger respiratory issues.</div>
                </div>
              </div>
            </div>

            {/* Live Charts */}
            <div className="bg-[#1e2937] rounded-3xl p-6 min-w-0">
              <h3 className="font-semibold text-lg mb-4">24-Hour Trend</h3>
              <LiveCharts history={history} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}