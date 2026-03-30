import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, CreditCard, LogOut, Camera, 
  MapPin, Mail, Save, Lock 
} from 'lucide-react';
import { toast } from 'sonner';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const { user } = useOutletContext<any>();
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'billing'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#111827] px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <User className="w-8 h-8 text-purple-400" />
              Account Settings
            </h1>
            <p className="text-slate-400 mt-1">Manage your profile and system preferences</p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-3 bg-red-950 hover:bg-red-900 text-red-400 rounded-2xl font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-[#1e2937] rounded-3xl p-3 sticky top-6 border border-slate-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all mb-1 ${
                    activeTab === tab.id 
                      ? 'bg-white text-black shadow-lg' 
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-black' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* ==================== GENERAL TAB ==================== */}
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Profile Header Card */}
                  <div className="bg-[#1e2937] rounded-3xl p-8 flex flex-col md:flex-row gap-8 border border-slate-700">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl font-bold shadow-xl">
                        {user?.initials || 'AP'}
                      </div>
                      <button className="absolute bottom-2 right-2 p-2 bg-slate-900 rounded-xl hover:bg-slate-800 transition-all">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold">{user?.name || 'AirPulse User'}</h2>
                        <span className="px-4 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30">
                          PRO MEMBER
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 mb-6">
                        <Mail className="w-4 h-4" />
                        {user?.email || 'user@airpulse.rw'}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="w-4 h-4" />
                        Kigali, Rwanda
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
                    <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">First Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.name?.split(' ')[0] || 'AirPulse'} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500 transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.name?.split(' ')[1] || 'User'} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500 transition-all" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          defaultValue={user?.email || 'user@airpulse.rw'} 
                          className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500 transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Location</label>
                        <select className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-purple-500 transition-all">
                          <option>Kigali, Rwanda</option>
                          <option>Nairobi, Kenya</option>
                          <option>Kampala, Uganda</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:bg-slate-200 transition-all"
                      >
                        <Save className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ==================== NOTIFICATIONS TAB ==================== */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#1e2937] rounded-3xl p-8 border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
                  <div className="space-y-6">
                    {[
                      { title: "Critical Risk Alerts", desc: "CO Poisoning & Asthma Risk", checked: true },
                      { title: "Daily Summary", desc: "Morning air quality report", checked: true },
                      { title: "Sensor Status", desc: "Hardware and calibration updates", checked: false },
                      { title: "System Maintenance", desc: "Updates and downtime notices", checked: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-4 border-b border-slate-700 last:border-none">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:ring-4 peer-focus:ring-purple-500 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ==================== SECURITY TAB ==================== */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#1e2937] rounded-3xl p-8 border border-slate-700"
                >
                  <h3 className="text-xl font-semibold mb-6">Security</h3>
                  <div className="max-w-md space-y-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Current Password</label>
                      <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">New Password</label>
                      <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Confirm New Password</label>
                      <input type="password" className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-3" placeholder="••••••••" />
                    </div>

                    <button className="mt-4 w-full bg-white text-black py-3.5 rounded-2xl font-semibold hover:bg-slate-200 transition-all">
                      Update Password
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ==================== BILLING TAB ==================== */}
              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                    <h3 className="text-2xl font-bold">AirPulse Pro Plan</h3>
                    <p className="mt-2 text-purple-100">Active until October 15, 2026</p>
                    <div className="mt-8 text-4xl font-bold">USD 9.99<span className="text-lg font-normal">/month</span></div>
                  </div>

                  <div className="bg-[#1e2937] rounded-3xl p-8 border border-slate-700">
                    <h4 className="font-semibold mb-4">Payment Method</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                        💳
                      </div>
                      <div>
                        <p className="font-medium">Visa •••• 4242</p>
                        <p className="text-sm text-slate-400">Expires 12/2028</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}