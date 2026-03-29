import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, Bell, LineChart, User } from 'lucide-react';
import { motion } from 'framer-motion';
export function MobileNav() {
  const navItems = [
  {
    path: '/',
    icon: LayoutDashboard,
    label: 'Home'
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
    isCenter: true
  },
  {
    path: '/analytics',
    icon: LineChart,
    label: 'Charts'
  },
  {
    path: '/profile',
    icon: User,
    label: 'Profile'
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 rounded-t-xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-50 pb-safe sm:hidden">
      <div className="flex justify-around items-end px-1 h-14 pb-1.5">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
          `relative flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`
          }>
          
            {({ isActive }) =>
          <>
                {isActive &&
            <motion.div
              layoutId="nav-indicator"
              className="absolute top-0 w-1 h-1 bg-purple-400 rounded-full"
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }} />

            }

                <div
              className={`flex flex-col items-center justify-center ${item.isCenter ? '-mt-5' : 'mt-1'}`}>
              
                  {item.isCenter ?
              <div
                className={`p-2.5 rounded-xl shadow-lg ${isActive ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-purple-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                
                      <item.icon className="w-5 h-5" />
                    </div> :

              <item.icon
                className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />

              }

                  {!item.isCenter &&
              <span
                className={`text-[9px] font-medium ${isActive ? 'font-semibold text-purple-300' : ''}`}>
                
                      {item.label}
                    </span>
              }
                </div>
              </>
          }
          </NavLink>
        )}
      </div>
    </div>);

}