import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  isTyping?: boolean;
}
export function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    text: 'Hello! 👋 Welcome to AirPulse support. How can I help you today?',
    sender: 'bot'
  }]
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickReplies = [
  'Sensor Issues',
  'Understanding Readings',
  'Health Guidance',
  'Report a Problem'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user'
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      let botResponse =
      "I'm a simulated support bot. In a real app, I would connect you to a human agent or provide a detailed answer from our knowledge base.";
      if (text === 'Sensor Issues') {
        botResponse =
        'If your sensors are showing unusual readings, try restarting the device. If the issue persists, calibration might be required.';
      } else if (text === 'Understanding Readings') {
        botResponse =
        'AQI (Air Quality Index) measures overall pollution. CO (Carbon Monoxide) is a dangerous odorless gas. Keep AQI below 150 and CO below 10ppm for optimal health.';
      } else if (text === 'Health Guidance') {
        botResponse =
        'During High Risk periods, limit outdoor activities, keep windows closed, and use air purifiers if available.';
      }
      setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot'
      }]
      );
    }, 1500);
  };
  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-shadow ${isOpen ? 'hidden' : 'flex'} bottom-20 sm:bottom-6 right-4 sm:right-6`}>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="absolute inset-0 rounded-full border border-purple-400/50" />
        
        <MessageCircle className="w-6 h-6 relative z-10" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen &&
        <>
            {/* Mobile Backdrop */}
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 sm:hidden" />
          

            <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300
            }}
            className="fixed z-50 bottom-0 sm:bottom-24 right-0 sm:right-6 w-full sm:w-[380px] h-[80vh] sm:h-[500px] bg-white sm:rounded-2xl rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
            
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">AirPulse Support</h3>
                    <p className="text-[10px] text-white/80 font-medium">
                      Typically replies instantly
                    </p>
                  </div>
                </div>
                <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                {messages.map((msg) =>
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                    <div
                  className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                      <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    
                        {msg.sender === 'user' ?
                    <User className="w-3 h-3" /> :

                    <Bot className="w-3 h-3" />
                    }
                      </div>
                      <div
                    className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'}`}>
                    
                        {msg.text}
                      </div>
                    </div>
                  </div>
              )}

                {isTyping &&
              <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%]">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3 h-3" />
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                        <motion.div
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    
                        <motion.div
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    
                        <motion.div
                      animate={{
                        y: [0, -5, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4
                      }}
                      className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    
                      </div>
                    </div>
                  </div>
              }

                {/* Quick Replies */}
                {messages.length === 1 && !isTyping &&
              <div className="flex flex-wrap gap-2 mt-4">
                    {quickReplies.map((reply) =>
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 bg-white border border-purple-200 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-50 transition-colors shadow-sm">
                  
                        {reply}
                      </button>
                )}
                  </div>
              }
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2">
                
                  <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" />
                
                  <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}