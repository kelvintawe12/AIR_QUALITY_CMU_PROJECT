import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind,
  Lock,
  Mail,
  ArrowRight,
  MapPin,
  User,
  ShieldCheck } from
'lucide-react';
interface AuthProps {
  onLogin: () => void;
}
export function Auth({ onLogin }: AuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };
  // Floating particles for background
  const particles = Array.from({
    length: 20
  }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));
  return (
    <div className="min-h-screen flex bg-slate-900 relative overflow-hidden">
      {/* Decorative Background with Splash Screen Energy */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"
        style={{
          animationDelay: '1s'
        }}>
      </div>

      {/* Floating Particles */}
      {particles.map((p) =>
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-white/20 blur-[1px]"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.x}%`,
          top: `${p.y}%`
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, Math.random() * 50 - 25, 0],
          opacity: [0.2, 0.8, 0.2]
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: 'linear'
        }} />

      )}

      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto z-10">
        {/* Left/Top Branding Section - COMPACT ON MOBILE */}
        <div className="flex-1 flex flex-col justify-center p-6 lg:p-16 text-center lg:text-left pt-12 lg:pt-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="flex flex-col items-center lg:items-start">
            
            <div className="inline-flex items-center justify-center lg:justify-start mb-4 lg:mb-8">
              <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mr-3 lg:mr-4">
                <Wind className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
              </div>
              <h1 className="text-2xl lg:text-5xl font-bold text-white tracking-tight">
                AirPulse
              </h1>
            </div>

            <h2 className="text-xl lg:text-4xl font-semibold text-slate-200 mb-2 lg:mb-6 leading-tight hidden sm:block">
              Breathe smarter.
              <br className="hidden lg:block" /> Live healthier.
            </h2>

            <p className="text-slate-400 text-sm lg:text-lg mb-6 max-w-md mx-auto lg:mx-0 hidden sm:block">
              Advanced real-time air quality monitoring and ML-powered health
              risk predictions.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs lg:text-sm font-medium text-slate-300 shadow-sm">
              <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-400" />
              Monitoring air quality across Rwanda 🇷🇼
            </div>
          </motion.div>
        </div>

        {/* Right/Bottom Login Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 lg:p-16 pb-12">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 lg:p-8 overflow-hidden relative">
            
            {/* Tab Switcher */}
            <div className="flex p-1 bg-slate-800/50 rounded-2xl mb-8 relative z-10">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all z-10 ${isLogin ? 'text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}>
                
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all z-10 ${!isLogin ? 'text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}>
                
                Create Account
              </button>
              {/* Animated Tab Background */}
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm"
                animate={{
                  left: isLogin ? '4px' : 'calc(50%)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }} />
              
            </div>

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'signup'}
                initial={{
                  opacity: 0,
                  x: isLogin ? -20 : 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  x: isLogin ? 20 : -20
                }}
                transition={{
                  duration: 0.3
                }}
                onSubmit={handleSubmit}
                className="space-y-4 lg:space-y-5 relative z-10">
                
                {!isLogin &&
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 text-sm transition-all"
                      placeholder="John Doe" />
                    
                    </div>
                  </div>
                }

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      defaultValue={isLogin ? 'user@airpulse.rw' : ''}
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 text-sm transition-all"
                      placeholder="you@example.com" />
                    
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      required
                      defaultValue={isLogin ? 'password123' : ''}
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 text-sm transition-all"
                      placeholder="••••••••" />
                    
                  </div>
                </div>

                {!isLogin &&
                <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShieldCheck className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 lg:py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-800/50 text-white placeholder-slate-500 text-sm transition-all"
                      placeholder="••••••••" />
                    
                    </div>
                  </div>
                }

                {isLogin &&
                <div className="flex items-center justify-between text-xs lg:text-sm pt-1">
                    <label className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                        type="checkbox"
                        className="peer sr-only"
                        defaultChecked />
                      
                        <div className="w-4 h-4 rounded border border-slate-500 bg-slate-800/50 peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all"></div>
                        <svg
                        className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="ml-2 text-slate-300 font-medium group-hover:text-white transition-colors">
                        Remember me
                      </span>
                    </label>
                    <a
                    href="#"
                    className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                    
                      Forgot password?
                    </a>
                  </div>
                }

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 lg:py-3.5 px-4 rounded-xl shadow-lg shadow-purple-500/25 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-6 lg:mt-8">
                  
                  {isLoading ?
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :

                  <>
                      {isLogin ? 'Sign In' : 'Create Account'}{' '}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  }
                </button>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>);

}