import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  MapPin,
  Bell,
  Shield,
  Globe,
  LogOut,
  ChevronRight,
  Settings,
  CreditCard,
  Smartphone,
  Mail,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Camera } from
'lucide-react';
interface ProfileProps {
  onLogout: () => void;
}
export function Profile({ onLogout }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('general');
  const tabs = [
  {
    id: 'general',
    label: 'General',
    icon: User
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard
  }];

  return (
    <div className="pb-6 sm:pb-8">
      {/* Clean Header */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center tracking-tight">
              <Settings className="w-7 h-7 mr-3 text-slate-400" />
              Account Settings
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-medium">
              Manage your profile, preferences, and subscription
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center px-4 py-2 bg-white ring-1 ring-slate-900/5 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl text-sm font-semibold transition-all shadow-sm w-full sm:w-auto">
            
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
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
        className="px-4 sm:px-6 lg:px-8 mt-6 max-w-5xl mx-auto">
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 p-2 space-y-1 sticky top-24">
              {tabs.map((tab) =>
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                
                  <tab.icon
                  className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                
                  {tab.label}
                </button>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'general' &&
              <motion.div
                key="general"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.2
                }}
                className="space-y-6">
                
                  {/* Profile Card */}
                  <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-900/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-bl-full pointer-events-none" />

                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/30 shrink-0">
                        AP
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h2 className="text-2xl font-bold text-slate-900">
                          AirPulse User
                        </h2>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm shadow-orange-500/20">
                          PRO PLAN
                        </span>
                      </div>
                      <p className="text-slate-500 mb-4 flex items-center justify-center sm:justify-start gap-2">
                        <Mail className="w-4 h-4" /> user@airpulse.rw
                      </p>
                      <div className="inline-flex items-center px-3 py-1.5 bg-slate-50 ring-1 ring-slate-900/5 rounded-lg text-sm font-medium text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                        Kigali, Rwanda 🇷🇼
                      </div>
                    </div>
                  </div>

                  {/* Personal Information Form */}
                  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900">
                        Personal Information
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Update your personal details and public profile.
                      </p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            First Name
                          </label>
                          <input
                          type="text"
                          defaultValue="AirPulse"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                        
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Last Name
                          </label>
                          <input
                          type="text"
                          defaultValue="User"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                        
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                        type="email"
                        defaultValue="user@airpulse.rw"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                      
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Location
                        </label>
                        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 appearance-none">
                          <option>Kigali, Rwanda</option>
                          <option>Nairobi, Kenya</option>
                          <option>Kampala, Uganda</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                      <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              }

              {activeTab === 'notifications' &&
              <motion.div
                key="notifications"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.2
                }}
                className="space-y-6">
                
                  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900">
                        Notification Preferences
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Choose how you want to be alerted about air quality
                        changes.
                      </p>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {/* Push Notifications */}
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-slate-500" />{' '}
                            Push Notifications
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">
                            Receive alerts directly on your device when risk
                            levels change.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked />
                        
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      {/* Email Alerts */}
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-500" /> Email
                            Alerts
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">
                            Get daily summaries and critical alerts sent to your
                            inbox.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked />
                        
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      {/* Critical Only */}
                      <div className="p-6 flex items-start justify-between gap-4 bg-orange-50/50">
                        <div>
                          <h4 className="font-semibold text-orange-900 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />{' '}
                            Critical Alerts Only
                          </h4>
                          <p className="text-sm text-orange-700 mt-1">
                            Mute all notifications except for Asthma and CO
                            Poisoning risks.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              }

              {activeTab === 'security' &&
              <motion.div
                key="security"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.2
                }}
                className="space-y-6">
                
                  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-900">
                        Security Settings
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Manage your password and account security.
                      </p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Current Password
                        </label>
                        <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                      
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            New Password
                          </label>
                          <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                        
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900" />
                        
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                      <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25">
                        Update Password
                      </button>
                    </div>
                  </div>
                </motion.div>
              }

              {activeTab === 'billing' &&
              <motion.div
                key="billing"
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: -20
                }}
                transition={{
                  duration: 0.2
                }}
                className="space-y-6">
                
                  <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 p-6 sm:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          AirPulse Pro
                        </h3>
                        <p className="text-orange-50 font-medium max-w-md">
                          You are currently on the Pro plan. Enjoy advanced ML
                          predictions, unlimited history, and priority support.
                        </p>
                      </div>
                      <div className="shrink-0 text-center sm:text-right bg-black/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 w-full sm:w-auto">
                        <div className="text-sm font-semibold text-orange-100 mb-1">
                          Next billing date
                        </div>
                        <div className="text-xl font-bold">Oct 15, 2026</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-900/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Payment Method
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Manage your billing details.
                        </p>
                      </div>
                      <button className="text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white ring-1 ring-slate-900/5 hover:bg-slate-50 px-4 py-2 rounded-xl transition-colors shadow-sm">
                        Update
                      </button>
                    </div>
                    <div className="p-6 flex items-center gap-4">
                      <div className="w-16 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                        <CreditCard className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Visa ending in 4242
                        </p>
                        <p className="text-sm text-slate-500">Expires 12/28</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>);

}