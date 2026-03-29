import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
export function SplashScreen() {
  return (
    <motion.div
      initial={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        scale: 1.05
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden">
      
      {/* Animated background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"
        style={{
          animationDelay: '1s'
        }}>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container with pulsing rings */}
        <div className="relative flex items-center justify-center mb-8">
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              scale: [0.8, 1.2, 1],
              opacity: 1
            }}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl blur-xl opacity-50">
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 border-2 border-purple-400/30 rounded-3xl">
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2
            }}
            className="absolute inset-[-10px] border border-blue-400/20 rounded-[2rem]">
          </motion.div>

          <motion.div
            initial={{
              scale: 0,
              rotate: -180
            }}
            animate={{
              scale: 1,
              rotate: 0
            }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 100,
              delay: 0.2
            }}
            className="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
            
            <Wind className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Text Reveal */}
        <div className="text-center overflow-hidden">
          <motion.h1
            initial={{
              y: 40,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              ease: 'easeOut'
            }}
            className="text-4xl font-bold text-white tracking-tight mb-3">
            
            AirPulse
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 1,
              delay: 1.2
            }}
            className="text-slate-400 font-medium tracking-wide flex items-center justify-center gap-2">
            
            Smart Air Quality Monitor
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          </motion.p>
        </div>

        {/* Loading Progress */}
        <motion.div
          initial={{
            opacity: 0,
            width: 0
          }}
          animate={{
            opacity: 1,
            width: 200
          }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: 'easeInOut'
          }}
          className="mt-12 h-1 bg-slate-800 rounded-full overflow-hidden">
          
          <motion.div
            initial={{
              x: '-100%'
            }}
            animate={{
              x: '0%'
            }}
            transition={{
              duration: 1.5,
              delay: 0.8,
              ease: 'easeInOut'
            }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
          </motion.div>
        </motion.div>
      </div>
    </motion.div>);

}