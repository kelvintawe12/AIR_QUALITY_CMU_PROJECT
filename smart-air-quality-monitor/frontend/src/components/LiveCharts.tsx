import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import { SensorData } from '../types/SensorData';
interface LiveChartsProps {
  history: SensorData[];
}
export function LiveCharts({ history }: LiveChartsProps) {
  const chartData = useMemo(() => {
    return history.map((d) => ({
      time: new Date(d.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      mq135: Math.round(d.mq135),
      temperature: Number(d.temperature.toFixed(1)),
      humidity: Math.round(d.humidity),
      eCO2: Math.round(d.eCO2 || 0)
    }));
  }, [history]);
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-lg">
          <p className="text-slate-500 text-xs mb-2">{label}</p>
          {payload.map((entry: any, index: number) =>
          <div
            key={index}
            className="flex items-center gap-2 text-sm font-medium">
            
              <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: entry.color
              }} />
            
              <span className="text-slate-700">{entry.name}:</span>
              <span className="text-slate-900">{entry.value}</span>
            </div>
          )}
        </div>);

    }
    return null;
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Air Quality Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-purple-100 transition-colors">
        <div className="mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Air Quality & CO2 Trends
            </h3>
            <p className="text-sm text-slate-500">
              Real-time MQ135 and eCO2 readings
            </p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}>
              
              <defs>
                <linearGradient id="colorMq135" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEco2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0" />
              
              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false}
                minTickGap={30} />
              
              <YAxis
                yAxisId="left"
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false} />
              
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false} />
              
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="mq135"
                name="MQ135 (AQI)"
                stroke="#7C3AED"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMq135)"
                isAnimationActive={false} />
              
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="eCO2"
                name="eCO2 (ppm)"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorEco2)"
                isAnimationActive={false} />
              
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environment Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-100 transition-colors">
        <div className="mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Environment Trends
            </h3>
            <p className="text-sm text-slate-500">Temperature and Humidity</p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}>
              
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0" />
              
              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false}
                minTickGap={30} />
              
              <YAxis
                yAxisId="left"
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false} />
              
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={{
                  fontSize: 12,
                  fill: '#64748B'
                }}
                tickLine={false}
                axisLine={false} />
              
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                name="Temp (°C)"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTemp)"
                isAnimationActive={false} />
              
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke="#06B6D4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHum)"
                isAnimationActive={false} />
              
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>);

}