import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Wind, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Toaster } from 'sonner';
import { useDummyData } from '../hooks/useDummyData';
import { MobileNav } from './MobileNav';
import { AlertModal } from './AlertModal';
import { Sidebar } from './Sidebar';
import { DesktopFooter } from './DesktopFooter';
import { ChatModal } from './ChatModal';
import { SensorData } from '../types/SensorData';
export interface AppContextType {
  data: SensorData | null;
  history: SensorData[];
  status: 'connected' | 'disconnected' | 'reconnecting';
}
export function AppLayout() {
  // Use dummy data for dashboard
  const { data, history, status } = useDummyData();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Toaster position="top-center" />

      {/* Real-time Danger Alert Modal */}
      <AlertModal data={data} />

      {/* Desktop/Tablet Navbar (Hidden on mobile) */}
      <nav className="hidden sm:block bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div
          className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'}`}>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-sm shadow-purple-500/20">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  AirPulse
                </span>
                <span className="ml-3 px-2 py-0.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-md border border-slate-700">
                  Kigali, RW 🇷🇼
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <div
                  className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${status === 'connected' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : status === 'reconnecting' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  
                  {status === 'connected' ?
                  <Wifi className="w-4 h-4 mr-2" /> :
                  status === 'reconnecting' ?
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> :

                  <WifiOff className="w-4 h-4 mr-2" />
                  }
                  <span className="capitalize">{status}</span>
                </div>

                <div className="h-8 w-px bg-slate-800"></div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-white leading-none">
                      AirPulse User
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      user@airpulse.rw
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-purple-500/20">
                    AP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header (Visible only on mobile) - COMPACT */}
      <div className="sm:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 py-2 sticky top-0 z-40 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-md flex items-center justify-center mr-2 shadow-sm">
            <Wind className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            AirPulse
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            KGL
          </span>
          <div
            className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : status === 'reconnecting' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'}`} />
          
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col w-full transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:pl-[72px]' : 'md:pl-64'}`}>
          {/* Main content area with responsive bottom padding for nav/footer */}
          <main className="flex-1 w-full max-w-7xl mx-auto pb-24 sm:pb-8">
            <Outlet
              context={{
                data,
                history,
                status
              }} />
          </main>
          {/* Desktop footer always at bottom, never overlaps */}
          <DesktopFooter />
        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatModal />

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>);

}