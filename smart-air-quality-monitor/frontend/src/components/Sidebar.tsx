import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Bell,
  LineChart,
  User,
  Wind,
  ChevronLeft,
  ChevronRight } from
'lucide-react';
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const mainNavItems = [
  {
    path: '/',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    path: '/history',
    icon: Clock,
    label: 'History'
  },
  {
    path: '/alerts',
    icon: Bell,
    label: 'Alerts',
    badge: '3'
  },
  {
    path: '/analytics',
    icon: LineChart,
    label: 'Analytics'
  }];

  const bottomNavItems = [
  {
    path: '/profile',
    icon: User,
    label: 'Profile & Settings'
  }];

  return (
    <aside
      className={`hidden md:flex flex-col fixed inset-y-0 left-0 bg-slate-900 border-r border-slate-800 z-30 pt-16 text-slate-300 transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 z-50 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shadow-md">
        
        {collapsed ?
        <ChevronRight className="w-3.5 h-3.5" /> :

        <ChevronLeft className="w-3.5 h-3.5" />
        }
      </button>

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 hide-scrollbar relative z-10">
        {/* Main Navigation */}
        <div>
          {!collapsed &&
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Overview
            </h3>
          }
          <div className="space-y-1">
            {mainNavItems.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
              `group relative flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`
              }>
              
                {({ isActive }) =>
              <>
                    <div
                  className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
                  
                      <item.icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                  
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && item.badge &&
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  
                        {item.badge}
                      </span>
                }
                    {collapsed && item.badge &&
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
                }
                  </>
              }
              </NavLink>
            )}
          </div>
        </div>

        {/* System Health Mini-Widget */}
        {!collapsed ?
        <div className="px-1">
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  System Status
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Sensors</span>
                  <span className="text-emerald-400 font-medium">Online</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Last Sync</span>
                  <span className="text-slate-300 font-medium">Just now</span>
                </div>
              </div>
            </div>
          </div> :

        <div className="flex justify-center">
            <div className="relative" title="System Online">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        }

        {/* Bottom Navigation */}
        <div>
          {!collapsed &&
          <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Account
            </h3>
          }
          <div className="space-y-1">
            {bottomNavItems.map((item) =>
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
              `group relative flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`
              }>
              
                {({ isActive }) =>
              <>
                    <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                
                    {!collapsed && <span>{item.label}</span>}
                  </>
              }
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/50 relative z-10">
        <button
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-2 rounded-xl hover:bg-slate-800 transition-colors group`}>
          
          <div className={`flex items-center ${collapsed ? '' : 'gap-3'}`}>
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-purple-500/20">
                AP
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            {!collapsed &&
            <div className="text-left">
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  AirPulse User
                </p>
                <p className="text-xs text-slate-500">Pro Plan</p>
              </div>
            }
          </div>
          {!collapsed &&
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
          }
        </button>
      </div>
    </aside>);

}