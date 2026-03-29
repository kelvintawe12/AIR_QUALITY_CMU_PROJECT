import React from 'react';
export function DesktopFooter() {
  return (
    <footer className="hidden sm:block w-full border-t border-slate-800 bg-slate-900 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center">
            <span className="text-slate-300 font-semibold mr-1">AirPulse</span>
            <span>v2.0.0 &middot; Smart Air Quality Monitor</span>
          </div>

          <div className="flex items-center">
            <span>
              Made with <span className="text-red-500">&hearts;</span> for
              Rwanda 🇷🇼
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="hover:text-purple-400 transition-colors">
              Help
            </button>
            <button className="hover:text-purple-400 transition-colors">
              Privacy
            </button>
            <button className="hover:text-purple-400 transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>);

}