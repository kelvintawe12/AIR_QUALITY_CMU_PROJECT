import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SensorData } from '../types/SensorData';
interface RiskTimelineProps {
  history: SensorData[];
}
const getRiskDotColor = (risk: SensorData['risk']): string => {
  switch (risk) {
    case 'Safe':
      return 'bg-emerald-400';
    case 'Moderate Risk':
      return 'bg-amber-400';
    case 'High Risk':
      return 'bg-orange-500';
    case 'Asthma Risk':
      return 'bg-rose-500';
    case 'CO Poisoning Risk':
      return 'bg-red-600';
    default:
      return 'bg-slate-300';
  }
};
const getRiskLabel = (risk: SensorData['risk']): string => {
  switch (risk) {
    case 'Safe':
      return 'Safe';
    case 'Moderate Risk':
      return 'Moderate';
    case 'High Risk':
      return 'High';
    case 'Asthma Risk':
      return 'Asthma';
    case 'CO Poisoning Risk':
      return 'CO Risk';
    default:
      return 'Unknown';
  }
};
export function RiskTimeline({ history }: RiskTimelineProps) {
  const timelineData = useMemo(() => {
    return history.map((d, i) => ({
      index: i,
      risk: d.risk,
      time: new Date(d.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      color: getRiskDotColor(d.risk),
      label: getRiskLabel(d.risk)
    }));
  }, [history]);
  const safeCount = history.filter((d) => d.risk === 'Safe').length;
  const safePercent = Math.round(
    safeCount / Math.max(history.length, 1) * 100
  );
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Risk Timeline
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Last {history.length} readings
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-700">
            {safePercent}% safe
          </span>
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{
                width: `${safePercent}%`
              }} />
            
          </div>
        </div>
      </div>

      {/* Timeline dots */}
      <div className="flex items-center gap-1">
        {timelineData.map((item, i) =>
        <motion.div
          key={i}
          initial={{
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: i * 0.03,
            type: 'spring',
            stiffness: 400,
            damping: 20
          }}
          className="group relative flex-1">
          
            <div
            className={`h-6 rounded-sm ${item.color} transition-all cursor-default`} />
          
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 pointer-events-none">
              <div className="bg-slate-900 text-white text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                {item.time} — {item.label}
              </div>
              <div className="w-1.5 h-1.5 bg-slate-900 rotate-45 mx-auto -mt-0.5" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
        {[
        {
          label: 'Safe',
          color: 'bg-emerald-400'
        },
        {
          label: 'Moderate',
          color: 'bg-amber-400'
        },
        {
          label: 'High',
          color: 'bg-orange-500'
        },
        {
          label: 'Critical',
          color: 'bg-red-600'
        }].
        map((item) =>
        <div key={item.label} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-sm ${item.color}`} />
            <span className="text-[10px] text-slate-500 font-medium">
              {item.label}
            </span>
          </div>
        )}
      </div>
    </div>);

}