import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import { AppLayout } from './components/AppLayout';
import { SplashScreen } from './components/SplashScreen';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Alerts } from './pages/Alerts';
import { Profile } from './pages/Profile';
import Analytics from './pages/Analytics';
import { AnimatePresence } from 'framer-motion';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    // Show splash screen for 2.5 seconds on initial load
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen w-full font-sans bg-slate-900">
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!showSplash &&
      <BrowserRouter>
          {!isAuthenticated ?
        <Routes>
              <Route
            path="*"
            element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
          
            </Routes> :

        <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route
                  path="/analytics"
                  element={<Analytics />} />
            
                <Route
              path="/profile"
              element={
              <Profile onLogout={() => setIsAuthenticated(false)} />
              } />
            
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
        }
        </BrowserRouter>
      }
    </div>);

}