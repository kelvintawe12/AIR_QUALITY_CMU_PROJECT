import React, { Children, createElement } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Activity,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  CheckCircle2,
  CloudFog,
  RefreshCw,
  Download,
  MapPin,
  Clock,
  Bell,
  Settings,
  Share2,
  HelpCircle } from
'lucide-react';
import { toast } from 'sonner';
import { LiveCharts } from '../components/LiveCharts';
import { SensorCard } from '../components/SensorCard';
import { AppContextType } from '../components/AppLayout';
import { AnalyticsStrip } from '../components/AnalyticsStrip';
import { RiskRadarChart } from '../components/RiskRadarChart';
import { RiskTimeline } from '../components/RiskTimeline';
import { PollutantBreakdown } from '../components/PollutantBreakdown';
import { HealthRecommendations } from '../components/HealthRecommendations';
export function Dashboard() {
  const { data, history, status } = useOutletContext<AppContextType>();
  const navigate = useNavigate();
  if (!data) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Connecting to sensors...</p>
      </div>);

  }
  const isAlert = data.risk !== 'Safe' && data.risk !== 'Moderate Risk';
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Safe':
        return 'bg-emerald-500';
      case 'Moderate Risk':
        return 'bg-amber-500';
      case 'High Risk':
        return 'bg-orange-500';
      case 'Asthma Risk':
        return 'bg-rose-500';
      case 'CO Poisoning Risk':
        return 'bg-red-600';
      default:
        return 'bg-slate-500';
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'GOOD':
      case 'SAFE':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'MODERATE':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'POOR':
      case 'WARNING':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'DANGEROUS':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  const handleExport = () => {
    const csvContent =
    'data:text/csv;charset=utf-8,' +
    'Timestamp,MQ135,MQ7,Temp,Humidity,eCO2,TVOC,Dust,Risk\n' +
    history.
    map(
      (row) =>
      `${row.timestamp},${row.mq135},${row.mq7},${row.temperature},${row.humidity},${row.eCO2},${row.TVOC},${row.dust},${row.risk}`
    ).
    join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `airpulse_data_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Data exported successfully');
  };
  const quickActions = [
  {
    icon: Download,
    label: 'Export Data',
    onClick: handleExport,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    icon: Clock,
    label: 'View History',
    onClick: () => navigate('/history'),
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    icon: Bell,
    label: 'Check Alerts',
    onClick: () => navigate('/alerts'),
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    icon: Settings,
    label: 'Calibrate',
    onClick: () =>
    toast.success(
      'Sensor calibration started. This may take a few minutes.'
    ),
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    icon: Share2,
    label: 'Share Report',
    onClick: () => toast.success('Report link copied to clipboard!'),
    color: 'text-cyan-600',
    bg: 'bg-cyan-50'
  },
  {
    icon: HelpCircle,
    label: 'Get Help',
    onClick: () =>
    toast.info('Click the chat bubble in the bottom right for support.'),
    color: 'text-rose-600',
    bg: 'bg-rose-50'
  }];

  return (
    <div className="pb-6 sm:pb-8">
      {/* Alert Banner */}
      {isAlert &&
      <motion.div
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto'
        }}
        className="mx-4 sm:mx-6 lg:mx-8 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl shadow-sm flex items-start">
        
          <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-semibold text-sm">
              Critical Alert: {data.risk}
            </h3>
            <p className="text-red-700 text-sm mt-1">
              Dangerous levels detected in Kigali. Please ensure proper
              ventilation immediately. MQ7 (CO): {data.mq7.toFixed(1)} ppm |
              MQ135: {data.mq135.toFixed(0)}
            </p>
          </div>
        </motion.div>
      }

      {/* Clean Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Live Dashboard
            </h1>
            <div className="flex items-center text-slate-500 text-sm mt-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Kigali, Rwanda
              <span className="mx-2 text-slate-300">•</span>
              <span className="text-emerald-600 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Live Sync Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Analytics Summary Strip */}
        <div className="mt-4">
          <AnalyticsStrip history={history} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 mt-6">
          
          {/* Row 1: ML Risk Card + Sensor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* ML Risk Prediction Card with Radar */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden relative flex flex-col">
              
              <div
                className={`absolute top-0 left-0 w-full h-2 ${getRiskColor(data.risk)}`}>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div>
                  <h2 className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    ML Risk Prediction
                  </h2>
                  <div className="flex items-center mt-3">
                    {data.risk === 'Safe' ?
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mr-3" /> :

                    <AlertTriangle
                      className={`w-8 h-8 mr-3 ${isAlert ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />

                    }
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                      {data.risk}
                    </span>
                  </div>
                </div>

                <div className="flex-1 mt-4 -mx-4">
                  <RiskRadarChart data={data} />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-slate-500">Last updated</span>
                    <span className="font-medium text-slate-900">
                      {new Date(data.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sensor Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <SensorCard
                title="Air Quality"
                value={data.mq135.toFixed(0)}
                unit="AQI"
                icon={<Activity className="w-5 h-5" />}
                status={data.aqStatus}
                statusColor={getStatusColor(data.aqStatus)}
                historyData={history.map((d) => d.mq135)} />
              
              <SensorCard
                title="CO Level"
                value={data.mq7.toFixed(1)}
                unit="ppm"
                icon={<CloudFog className="w-5 h-5" />}
                status={data.coStatus}
                statusColor={getStatusColor(data.coStatus)}
                historyData={history.map((d) => d.mq7)} />
              
              <SensorCard
                title="Temperature"
                value={data.temperature.toFixed(1)}
                unit="°C"
                icon={<Thermometer className="w-5 h-5" />}
                status="NORMAL"
                statusColor="text-blue-600 bg-blue-50 border-blue-200"
                historyData={history.map((d) => d.temperature)} />
              
              <SensorCard
                title="Humidity"
                value={data.humidity.toFixed(0)}
                unit="%"
                icon={<Droplets className="w-5 h-5" />}
                status="NORMAL"
                statusColor="text-blue-600 bg-blue-50 border-blue-200"
                historyData={history.map((d) => d.humidity)} />
              
              <SensorCard
                title="eCO2"
                value={data.eCO2?.toFixed(0) || '0'}
                unit="ppm"
                icon={<Wind className="w-5 h-5" />}
                status={data.eCO2 && data.eCO2 > 1000 ? 'HIGH' : 'NORMAL'}
                statusColor={
                data.eCO2 && data.eCO2 > 1000 ?
                'text-amber-600 bg-amber-50 border-amber-200' :
                'text-slate-600 bg-slate-50 border-slate-200'
                }
                historyData={history.map((d) => d.eCO2 || 0)} />
              
              <SensorCard
                title="TVOC"
                value={data.TVOC?.toFixed(0) || '0'}
                unit="ppb"
                icon={<Activity className="w-5 h-5" />}
                status={data.TVOC && data.TVOC > 250 ? 'HIGH' : 'NORMAL'}
                statusColor={
                data.TVOC && data.TVOC > 250 ?
                'text-amber-600 bg-amber-50 border-amber-200' :
                'text-slate-600 bg-slate-50 border-slate-200'
                }
                historyData={history.map((d) => d.TVOC || 0)} />
              
              <SensorCard
                title="Particulates"
                value={data.dust?.toFixed(0) || '0'}
                unit="µg/m³"
                icon={<CloudFog className="w-5 h-5" />}
                status={data.dust && data.dust > 50 ? 'HIGH' : 'NORMAL'}
                statusColor={
                data.dust && data.dust > 50 ?
                'text-amber-600 bg-amber-50 border-amber-200' :
                'text-slate-600 bg-slate-50 border-slate-200'
                }
                historyData={history.map((d) => d.dust || 0)} />
              
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 text-white flex flex-col justify-center items-center text-center shadow-md shadow-purple-500/20 relative overflow-hidden">
                <span className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wider">
                  System Status
                </span>
                <span className="text-sm sm:text-base font-bold">
                  All Sensors Active
                </span>
                <div className="mt-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Risk Timeline */}
          <motion.div variants={itemVariants}>
            <RiskTimeline history={history} />
          </motion.div>

          {/* Row 3: Pollutant Breakdown + Health Recommendations */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <PollutantBreakdown data={data} />
              <HealthRecommendations risk={data.risk} />
            </div>
          </motion.div>

          {/* Row 4: Live Charts */}
          <motion.div variants={itemVariants}>
            <LiveCharts history={history} />
          </motion.div>

          {/* Row 5: Quick Actions */}
          <motion.div variants={itemVariants}>
            <div>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Quick Actions
              </h2>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 snap-x">
                {quickActions.map((action, idx) =>
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="flex-shrink-0 w-28 sm:w-auto flex flex-col items-center justify-center p-4 bg-white rounded-2xl ring-1 ring-slate-900/5 shadow-sm hover:shadow-md hover:ring-slate-900/10 transition-all snap-start group">
                  
                    <div
                    className={`p-3 rounded-xl ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                    
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 text-center leading-tight group-hover:text-purple-700 transition-colors">
                      {action.label}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>);

}