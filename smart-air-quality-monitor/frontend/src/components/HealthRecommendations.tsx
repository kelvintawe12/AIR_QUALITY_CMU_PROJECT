import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  TreesIcon,
  HomeIcon,
  WindIcon,
  ShieldAlertIcon,
  ActivityIcon,
  DropletIcon,
  AlertTriangleIcon } from
'lucide-react';
import { SensorData } from '../types/SensorData';
interface HealthRecommendationsProps {
  risk: SensorData['risk'];
}
interface Recommendation {
  icon: React.ReactNode;
  text: string;
}
const getRiskBorderColor = (risk: SensorData['risk']): string => {
  switch (risk) {
    case 'Safe':
      return 'border-t-emerald-500';
    case 'Moderate Risk':
      return 'border-t-amber-500';
    case 'High Risk':
      return 'border-t-orange-500';
    case 'Asthma Risk':
      return 'border-t-rose-500';
    case 'CO Poisoning Risk':
      return 'border-t-red-600';
    default:
      return 'border-t-slate-300';
  }
};
const getRiskBadgeStyle = (risk: SensorData['risk']): string => {
  switch (risk) {
    case 'Safe':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Moderate Risk':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'High Risk':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Asthma Risk':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'CO Poisoning Risk':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};
export function HealthRecommendations({ risk }: HealthRecommendationsProps) {
  const recommendations: Recommendation[] = useMemo(() => {
    switch (risk) {
      case 'Safe':
        return [
        {
          icon: <TreesIcon className="w-4 h-4 text-emerald-500" />,
          text: 'Great day for outdoor activities and exercise'
        },
        {
          icon: <WindIcon className="w-4 h-4 text-emerald-500" />,
          text: 'Windows can be opened for natural ventilation'
        },
        {
          icon: <HeartIcon className="w-4 h-4 text-emerald-500" />,
          text: 'Air quality is healthy for all groups including children and elderly'
        },
        {
          icon: <ActivityIcon className="w-4 h-4 text-emerald-500" />,
          text: 'No precautions needed — enjoy fresh Kigali air'
        }];

      case 'Moderate Risk':
        return [
        {
          icon: <ShieldAlertIcon className="w-4 h-4 text-amber-500" />,
          text: 'Sensitive groups should limit prolonged outdoor exposure'
        },
        {
          icon: <HomeIcon className="w-4 h-4 text-amber-500" />,
          text: 'Consider closing windows during peak pollution hours'
        },
        {
          icon: <ActivityIcon className="w-4 h-4 text-amber-500" />,
          text: 'Reduce strenuous outdoor exercise if you have respiratory conditions'
        },
        {
          icon: <DropletIcon className="w-4 h-4 text-amber-500" />,
          text: 'Stay hydrated and monitor for any symptoms'
        }];

      case 'High Risk':
        return [
        {
          icon: <HomeIcon className="w-4 h-4 text-orange-500" />,
          text: 'Stay indoors and keep windows closed'
        },
        {
          icon: <WindIcon className="w-4 h-4 text-orange-500" />,
          text: 'Use air purifiers if available'
        },
        {
          icon: <ShieldAlertIcon className="w-4 h-4 text-orange-500" />,
          text: 'Wear N95 masks if outdoor travel is necessary'
        },
        {
          icon: <AlertTriangleIcon className="w-4 h-4 text-orange-500" />,
          text: 'Monitor for headache, dizziness, or eye irritation'
        }];

      case 'Asthma Risk':
        return [
        {
          icon: <HeartIcon className="w-4 h-4 text-rose-500" />,
          text: 'Keep rescue inhalers and medication accessible'
        },
        {
          icon: <HomeIcon className="w-4 h-4 text-rose-500" />,
          text: 'Remain indoors with air filtration running'
        },
        {
          icon: <ShieldAlertIcon className="w-4 h-4 text-rose-500" />,
          text: 'Avoid all physical exertion until levels improve'
        },
        {
          icon: <AlertTriangleIcon className="w-4 h-4 text-rose-500" />,
          text: 'Seek medical attention if breathing becomes difficult'
        }];

      case 'CO Poisoning Risk':
        return [
        {
          icon: <AlertTriangleIcon className="w-4 h-4 text-red-600" />,
          text: 'EVACUATE the area immediately — move to fresh air'
        },
        {
          icon: <ShieldAlertIcon className="w-4 h-4 text-red-600" />,
          text: 'Call emergency services if feeling dizzy or nauseous'
        },
        {
          icon: <WindIcon className="w-4 h-4 text-red-600" />,
          text: 'Open all doors and windows if safe to approach'
        },
        {
          icon: <HomeIcon className="w-4 h-4 text-red-600" />,
          text: 'Do NOT re-enter until CO levels are confirmed safe'
        }];

      default:
        return [
        {
          icon: <ActivityIcon className="w-4 h-4 text-slate-500" />,
          text: 'Monitor conditions and check back shortly'
        }];

    }
  }, [risk]);
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-slate-100 border-t-4 ${getRiskBorderColor(risk)} p-5`}>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <HeartIcon className="w-3.5 h-3.5" />
            Health Recommendations
          </h3>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getRiskBadgeStyle(risk)}`}>
          
          {risk}
        </span>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((rec, i) =>
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: -8
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: i * 0.08
          }}
          className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100/50">
          
            <div className="mt-0.5 shrink-0">{rec.icon}</div>
            <span className="text-sm text-slate-700 font-medium leading-relaxed">
              {rec.text}
            </span>
          </motion.div>
        )}
      </div>
    </div>);

}