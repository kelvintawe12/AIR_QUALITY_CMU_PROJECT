import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle2, MapPin } from 'lucide-react';
export function Alerts() {
  // Dummy alert data specific to Rwanda context
  const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'High CO Levels Detected',
    message:
    'Carbon Monoxide levels exceeded safe thresholds in Nyarugenge district. Ensure proper ventilation.',
    time: '10 mins ago',
    location: 'Nyarugenge, Kigali'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Moderate Air Quality',
    message:
    'Particulate matter (PM2.5) is slightly elevated due to dry season dust.',
    time: '2 hours ago',
    location: 'Gasabo, Kigali'
  },
  {
    id: 3,
    type: 'info',
    title: 'Sensor Calibration Complete',
    message:
    'Routine maintenance and calibration of MQ135 sensor completed successfully.',
    time: '5 hours ago',
    location: 'System'
  },
  {
    id: 4,
    type: 'success',
    title: 'Air Quality Improved',
    message:
    'Air quality has returned to safe levels following recent rainfall.',
    time: '1 day ago',
    location: 'Kicukiro, Kigali'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Temperature Spike',
    message:
    'Unusually high temperatures recorded. Equipment operating within upper limits.',
    time: '2 days ago',
    location: 'Gasabo, Kigali'
  }];

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          border: 'border-red-500',
          bg: 'bg-red-50',
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
          hoverBg: 'hover:bg-red-50/50'
        };
      case 'warning':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-50',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          hoverBg: 'hover:bg-amber-50/50'
        };
      case 'success':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-50',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          hoverBg: 'hover:bg-emerald-50/50'
        };
      default:
        return {
          border: 'border-blue-500',
          bg: 'bg-blue-50',
          icon: <Info className="w-5 h-5 text-blue-500" />,
          hoverBg: 'hover:bg-blue-50/50'
        };
    }
  };
  const criticalCount = alerts.filter((a) => a.type === 'critical').length;
  const warningCount = alerts.filter((a) => a.type === 'warning').length;
  const successCount = alerts.filter((a) => a.type === 'success').length;
  const infoCount = alerts.filter((a) => a.type === 'info').length;
  return (
    <div className="pb-6 sm:pb-8">
      {/* Clean Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center tracking-tight">
              <Bell className="w-7 h-7 mr-3 text-slate-400" />
              Alert Center
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">
              Recent air quality alerts and system notifications
            </p>
          </div>
          <button className="text-sm font-semibold bg-white ring-1 ring-slate-900/5 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl transition-all shadow-sm w-full sm:w-auto">
            Mark all as read
          </button>
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Summary Strip - Redesigned as Clean Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden hover:shadow-md hover:ring-slate-900/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Critical
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              {criticalCount}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden hover:shadow-md hover:ring-slate-900/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Warnings
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              {warningCount}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden hover:shadow-md hover:ring-slate-900/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Resolved
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              {successCount}
            </span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-slate-900/5 relative overflow-hidden hover:shadow-md hover:ring-slate-900/10 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Info
              </span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              {infoCount}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                className={`bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 border-l-4 ${styles.border} p-4 sm:p-5 flex gap-4 transition-all ${styles.hoverBg}`}>
                
                <div className={`p-2 rounded-xl h-fit shrink-0 ${styles.bg}`}>
                  {styles.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                    <h3 className="font-bold text-slate-900 truncate">
                      {alert.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    {alert.message}
                  </p>
                  <div className="flex items-center text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {alert.location}
                  </div>
                </div>
              </motion.div>);

          })}
        </div>
      </motion.div>
    </div>);

}