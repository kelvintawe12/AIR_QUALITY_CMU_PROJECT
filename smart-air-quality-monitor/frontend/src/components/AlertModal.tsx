import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ShieldAlert,
  Wind,
  Heart,
  Volume2,
  VolumeX,
  X,
  Activity,
  Skull,
  Thermometer,
  Droplets,
  MapPin } from
'lucide-react';
import { SensorData } from '../types/SensorData';
import { useAlertSound } from '../hooks/useAlertSound';
interface AlertModalProps {
  data: SensorData | null;
}
const DANGEROUS_RISKS: SensorData['risk'][] = [
'High Risk',
'Asthma Risk',
'CO Poisoning Risk'];

interface RiskConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  pulseColor: string;
  healthTips: string[];
  severity: string;
}
const getRiskConfig = (risk: SensorData['risk']): RiskConfig => {
  switch (risk) {
    case 'CO Poisoning Risk':
      return {
        title: '⚠️ CO POISONING RISK',
        subtitle: 'Dangerous Carbon Monoxide levels detected',
        icon: <Skull className="w-10 h-10 text-white" />,
        gradient: 'from-red-600 via-red-700 to-red-900',
        borderColor: 'border-red-500',
        pulseColor: 'bg-red-500',
        severity: 'CRITICAL',
        healthTips: [
        'Evacuate the area immediately',
        'Move to fresh air outdoors',
        'Call emergency services if feeling dizzy or nauseous',
        'Do NOT re-enter until levels are confirmed safe',
        'Open all windows and doors if safe to do so']

      };
    case 'Asthma Risk':
      return {
        title: '🫁 ASTHMA RISK ALERT',
        subtitle: 'Poor air quality may trigger respiratory issues',
        icon: <Wind className="w-10 h-10 text-white" />,
        gradient: 'from-orange-500 via-red-500 to-rose-600',
        borderColor: 'border-orange-500',
        pulseColor: 'bg-orange-500',
        severity: 'HIGH',
        healthTips: [
        'Keep inhalers and medication nearby',
        'Close windows to prevent outdoor pollutants entering',
        'Use air purifiers if available',
        'Avoid physical exertion',
        'Seek medical attention if breathing becomes difficult']

      };
    case 'High Risk':
      return {
        title: '🔴 HIGH RISK DETECTED',
        subtitle: 'Air quality has deteriorated significantly',
        icon: <ShieldAlert className="w-10 h-10 text-white" />,
        gradient: 'from-orange-500 via-orange-600 to-red-600',
        borderColor: 'border-orange-500',
        pulseColor: 'bg-orange-500',
        severity: 'HIGH',
        healthTips: [
        'Limit outdoor activities',
        'Wear a mask if going outside',
        'Keep doors and windows closed',
        'Monitor symptoms: headache, dizziness, irritation',
        'Stay hydrated and rest']

      };
    default:
      return {
        title: 'ALERT',
        subtitle: 'Unusual conditions detected',
        icon: <AlertTriangle className="w-10 h-10 text-white" />,
        gradient: 'from-amber-500 to-orange-600',
        borderColor: 'border-amber-500',
        pulseColor: 'bg-amber-500',
        severity: 'MODERATE',
        healthTips: ['Monitor conditions closely']
      };
  }
};
export function AlertModal({ data }: AlertModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [lastSafeRisk, setLastSafeRisk] = useState<string | null>(null);
  const { startAlarm, stopAlarm } = useAlertSound();
  const isDangerous = data ? DANGEROUS_RISKS.includes(data.risk) : false;
  const isVisible = isDangerous && !dismissed;
  // Reset dismissed state when risk changes back to safe then dangerous again
  useEffect(() => {
    if (data && !DANGEROUS_RISKS.includes(data.risk)) {
      setLastSafeRisk(data.risk);
      setDismissed(false);
    }
  }, [data?.risk]);
  // Handle sound
  useEffect(() => {
    if (isVisible && !isMuted) {
      startAlarm();
    } else {
      stopAlarm();
    }
    return () => stopAlarm();
  }, [isVisible, isMuted, startAlarm, stopAlarm]);
  const handleMuteToggle = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);
  const handleDismiss = useCallback(() => {
    setDismissed(true);
    stopAlarm();
  }, [stopAlarm]);
  if (!data) return null;
  const config = getRiskConfig(data.risk);
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          duration: 0.3
        }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        
          {/* Backdrop with pulsing effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Pulsing danger rings */}
          <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute w-64 h-64 rounded-full ${config.pulseColor} opacity-20`} />
        
          <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          className={`absolute w-64 h-64 rounded-full ${config.pulseColor} opacity-10`} />
        

          {/* Modal Content */}
          <motion.div
          initial={{
            scale: 0.8,
            y: 30,
            opacity: 0
          }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1
          }}
          exit={{
            scale: 0.9,
            y: 20,
            opacity: 0
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300
          }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
          
            {/* Header with gradient */}
            <div
            className={`bg-gradient-to-br ${config.gradient} p-6 sm:p-8 rounded-t-3xl relative overflow-hidden`}>
            
              {/* Animated stripes */}
              <motion.div
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                  className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  
                    {config.icon}
                  </motion.div>

                  <div className="flex gap-2">
                    <button
                    onClick={handleMuteToggle}
                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                    title={isMuted ? 'Unmute alarm' : 'Mute alarm'}>
                    
                      {isMuted ?
                    <VolumeX className="w-5 h-5 text-white" /> :

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity
                      }}>
                      
                          <Volume2 className="w-5 h-5 text-white" />
                        </motion.div>
                    }
                    </button>
                    <button
                    onClick={handleDismiss}
                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors"
                    title="Dismiss (alert will return if danger persists)">
                    
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-white/25 rounded-full text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-sm">
                    {config.severity}
                  </span>
                  <motion.span
                  animate={{
                    opacity: [1, 0.4, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 rounded-full bg-white" />
                
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  {config.title}
                </h2>
                <p className="text-white/80 mt-2 font-medium">
                  {config.subtitle}
                </p>
              </div>
            </div>

            {/* Sensor Readings */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Current Readings
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-slate-500">
                        Air Quality
                      </span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {data.mq135.toFixed(0)}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">AQI</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-500">
                        CO Level
                      </span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {data.mq7.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">ppm</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-slate-500">
                        Temperature
                      </span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {data.temperature.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">°C</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs font-semibold text-slate-500">
                        Humidity
                      </span>
                    </div>
                    <span className="text-xl font-bold text-slate-900">
                      {data.humidity.toFixed(0)}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">%</span>
                  </div>
                </div>
              </div>

              {/* Health Guidance */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Health Guidance
                </h3>
                <div className="space-y-2">
                  {config.healthTips.map((tip, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.3 + i * 0.1
                  }}
                  className="flex items-start gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100/50">
                  
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-700 font-medium leading-relaxed">
                        {tip}
                      </span>
                    </motion.div>
                )}
                </div>
              </div>

              {/* Location & Time */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-purple-600" />
                  Kigali, Rwanda
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(data.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                onClick={handleMuteToggle}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors border ${isMuted ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'}`}>
                
                  {isMuted ?
                <Volume2 className="w-4 h-4" /> :

                <VolumeX className="w-4 h-4" />
                }
                  {isMuted ? 'Unmute' : 'Mute Alarm'}
                </button>
                <button
                onClick={handleDismiss}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                
                  <X className="w-4 h-4" />
                  Dismiss
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                This alert will reappear if dangerous conditions persist after
                new readings.
              </p>
            </div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}