import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend } from
'recharts';
import { SensorData } from '../types/SensorData';

interface RiskRadarChartProps {
  data: SensorData;
}

export function RiskRadarChart({ data }: RiskRadarChartProps) {
  // Normalize values to a 0-100 scale where 100 is "dangerous"
  const normalizedData = [
  {
    subject: 'AQI',
    Current: Math.min(100, data.mq135 / 500 * 100),
    Safe: 30, // 150/500
    fullMark: 100
  },
  {
    subject: 'CO',
    Current: Math.min(100, data.mq7 / 100 * 100),
    Safe: 10, // 10/100
    fullMark: 100
  },
  {
    subject: 'Dust',
    Current: Math.min(100, (data.dust || 0) / 150 * 100),
    Safe: 33, // 50/150
    fullMark: 100
  },
  {
    subject: 'TVOC',
    Current: Math.min(100, (data.TVOC || 0) / 500 * 100),
    Safe: 50, // 250/500
    fullMark: 100
  },
  {
    subject: 'eCO2',
    Current: Math.min(100, (data.eCO2 || 400) / 2000 * 100),
    Safe: 50, // 1000/2000
    fullMark: 100
  }];


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-2 rounded-lg shadow-lg text-xs">
          <p className="font-semibold text-slate-700 mb-1">{payload[0].payload.subject}</p>
          {payload.map((entry: any, index: number) =>
          <p key={index} className="text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-bold text-slate-900">{Math.round(entry.value)}%</span>
            </p>
          )}
        </div>);

    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={normalizedData}>
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10, fontWeight: 600 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '10px', color: '#64748B' }} iconType="circle" />
          <Radar
            name="Safe Limit"
            dataKey="Safe"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.1}
            strokeDasharray="3 3"
            isAnimationActive={false} />
          
          <Radar
            name="Current Level"
            dataKey="Current"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.4}
            isAnimationActive={false} />
          
        </RadarChart>
      </ResponsiveContainer>
    </div>);

}