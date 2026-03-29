import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SensorData } from '../types/SensorData';
interface PollutantBreakdownProps {
  data: SensorData;
}
interface PollutantBar {
  name: string;
  value: number;
  threshold: number;
  unit: string;
}
const getBarColor = (percent: number): string => {
  if (percent >= 90) return 'bg-red-500';
  if (percent >= 75) return 'bg-orange-500';
  if (percent >= 50) return 'bg-amber-400';
  return 'bg-emerald-500';
};
const getBarBg = (percent: number): string => {
  if (percent >= 90) return 'bg-red-50';
  if (percent >= 75) return 'bg-orange-50';
  if (percent >= 50) return 'bg-amber-50';
  return 'bg-emerald-50';
};
const getTextColor = (percent: number): string => {
  if (percent >= 90) return 'text-red-600';
  if (percent >= 75) return 'text-orange-600';
  if (percent >= 50) return 'text-amber-600';
  return 'text-emerald-600';
};
export function PollutantBreakdown({ data }: PollutantBreakdownProps) {
  const pollutants: PollutantBar[] = useMemo(
    () => [
    {
      name: 'Air Quality (MQ135)',
      value: data.mq135,
      threshold: 350,
      unit: 'AQI'
    },
    {
      name: 'Carbon Monoxide',
      value: data.mq7,
      threshold: 35,
      unit: 'ppm'
    },
    {
      name: 'eCO2',
      value: data.eCO2 || 0,
      threshold: 2000,
      unit: 'ppm'
    },
    {
      name: 'TVOC',
      value: data.TVOC || 0,
      threshold: 500,
      unit: 'ppb'
    },
    {
      name: 'Particulate Matter',
      value: data.dust || 0,
      threshold: 100,
      unit: 'µg/m³'
    }],

    [data]
  );
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Pollutant Levels vs Thresholds
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Current readings as percentage of danger limits
        </p>
      </div>

      <div className="space-y-4">
        {pollutants.map((p, i) => {
          const percent = Math.min(
            100,
            Math.round(p.value / p.threshold * 100)
          );
          return (
            <motion.div
              key={p.name}
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.08
              }}>
              
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {p.name}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold ${getTextColor(percent)}`}>
                    
                    {percent}%
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {p.value.toFixed(
                      p.unit === 'ppm' && p.name === 'Carbon Monoxide' ? 1 : 0
                    )}{' '}
                    / {p.threshold} {p.unit}
                  </span>
                </div>
              </div>
              <div
                className={`h-2.5 rounded-full ${getBarBg(percent)} overflow-hidden`}>
                
                <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${percent}%`
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: 'easeOut'
                  }}
                  className={`h-full rounded-full ${getBarColor(percent)}`} />
                
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}