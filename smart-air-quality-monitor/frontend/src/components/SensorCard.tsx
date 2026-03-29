import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  status: string;
  statusColor: string;
  historyData?: number[];
}
export function SensorCard({
  title,
  value,
  unit,
  icon,
  status,
  statusColor,
  historyData
}: SensorCardProps) {
  const sparklineData = historyData?.map((val, i) => ({
    index: i,
    value: val
  }));
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.95
        },
        show: {
          opacity: 1,
          scale: 1
        }
      }}
      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-2 bg-slate-50 rounded-xl text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
          {icon}
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider ${statusColor}`}>
          
          {status}
        </span>
      </div>
      <div className="relative z-10">
        <h3 className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">
          {title}
        </h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-slate-900">{value}</span>
          <span className="ml-1 text-sm font-medium text-slate-500">
            {unit}
          </span>
        </div>
      </div>

      {historyData && sparklineData &&
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20 pointer-events-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Line
              type="monotone"
              dataKey="value"
              stroke="#64748B"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false} />
            
            </LineChart>
          </ResponsiveContainer>
        </div>
      }
    </motion.div>);

}