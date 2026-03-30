import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle2, MapPin, Clock, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function Alerts() {
  // Real-time alert data (you can connect this to your backend later)
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High Carbon Monoxide Levels',
      message: 'CO levels have exceeded safe thresholds in Nyarugenge district. Immediate ventilation recommended.',
      time: '10 minutes ago',
      location: 'Nyarugenge, Kigali',
      severity: 'high'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Elevated Air Pollution',
      message: 'MQ135 readings indicate poor air quality. Sensitive groups should limit outdoor exposure.',
      time: '2 hours ago',
      location: 'Gasabo, Kigali',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Sensor Calibration Successful',
      message: 'All sensors (MQ135, MQ7, DHT22) calibrated and operating within normal parameters.',
      time: '5 hours ago',
      location: 'System Wide',
      severity: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Air Quality Recovery',
      message: 'Air quality has improved significantly after recent weather changes.',
      time: 'Yesterday',
      location: 'Kicukiro, Kigali',
      severity: 'low'
    }
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          border: 'border-red-500',
          bg: 'bg-red-950/50',
          icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
          text: 'text-red-400'
        };
      case 'warning':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-950/50',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          text: 'text-amber-400'
        };
      case 'success':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-950/50',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
          text: 'text-emerald-400'
        };
      default:
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-950/50',
          icon: <Info className="w-5 h-5 text-blue-400" />,
          text: 'text-blue-400'
        };
    }
  };

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;

  const clearAllAlerts = () => {
    toast.success('All alerts marked as read');
    // You can add state management to actually clear alerts later
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#111827] px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bell className="w-8 h-8 text-purple-400" />
              Alert Center
            </h1>
            <p className="text-slate-400 mt-1">Real-time notifications and system health updates</p>
          </div>

          <button
            onClick={clearAllAlerts}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-sm font-medium transition-all"
          >
            <Clock className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#1e2937] rounded-3xl p-6 border border-red-900/30">
            <div className="text-red-400 text-sm font-medium mb-1">CRITICAL</div>
            <div className="text-5xl font-bold text-red-400">{criticalCount}</div>
            <div className="text-slate-400 text-sm mt-1">Requires immediate attention</div>
          </div>

          <div className="bg-[#1e2937] rounded-3xl p-6 border border-amber-900/30">
            <div className="text-amber-400 text-sm font-medium mb-1">WARNINGS</div>
            <div className="text-5xl font-bold text-amber-400">{warningCount}</div>
            <div className="text-slate-400 text-sm mt-1">Action recommended</div>
          </div>

          <div className="bg-[#1e2937] rounded-3xl p-6 border border-slate-700">
            <div className="text-slate-400 text-sm font-medium mb-1">TOTAL ALERTS</div>
            <div className="text-5xl font-bold">{alerts.length}</div>
          </div>

          <div className="bg-[#1e2937] rounded-3xl p-6 border border-emerald-900/30">
            <div className="text-emerald-400 text-sm font-medium mb-1">RESOLVED</div>
            <div className="text-5xl font-bold text-emerald-400">12</div>
            <div className="text-slate-400 text-sm mt-1">This week</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="bg-[#1e2937] rounded-3xl overflow-hidden border border-slate-700">
          <div className="px-8 py-5 border-b border-slate-700 flex items-center justify-between bg-slate-900/30">
            <h3 className="font-semibold text-lg">Recent Alerts</h3>
            <span className="text-xs text-slate-400">Showing latest 30 days</span>
          </div>

          <div className="divide-y divide-slate-800">
            <AnimatePresence>
              {alerts.map((alert, index) => {
                const style = getAlertStyle(alert.type);
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`p-6 flex gap-5 group hover:bg-slate-800/50 transition-all ${style.bg}`}
                  >
                    <div className={`mt-1 p-3 rounded-2xl ${style.bg}`}>
                      {style.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-lg text-white">{alert.title}</h4>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
                          {alert.time}
                        </span>
                      </div>

                      <p className="text-slate-300 mt-2 leading-relaxed pr-8">
                        {alert.message}
                      </p>

                      <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                        <MapPin className="w-4 h-4" />
                        {alert.location}
                      </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {alerts.length === 0 && (
            <div className="p-20 text-center text-slate-500">
              No alerts at this time. System is operating normally.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}