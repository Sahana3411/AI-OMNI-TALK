import React, { useState, useEffect } from 'react';
import { Camera, Type, Mic, BarChart3, ChevronRight, X, Activity, Clock, Zap, ArrowRight, Cpu, Globe } from 'lucide-react';
import { AppMode } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';

interface WelcomeProps {
  setMode: (mode: AppMode) => void;
  stats: {
    gesture: number;
    text: number;
    speech: number;
  };
}

const Welcome: React.FC<WelcomeProps> = ({ setMode, stats }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSessionTime(t => t + 1), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const totalInteractions = stats.gesture + stats.text + stats.speech;
  
  // Data for Recharts
  const barData = [
    { name: 'Gesture', count: stats.gesture, color: '#3b82f6', icon: Camera },
    { name: 'Text', count: stats.text, color: '#10b981', icon: Type },
    { name: 'Speech', count: stats.speech, color: '#f97316', icon: Mic },
  ];

  const pieData = barData.filter(d => d.count > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-800/95 p-3 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <p className="label font-bold text-gray-900 dark:text-white">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full overflow-y-auto pb-24 md:pb-6 scroll-smooth custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-20 relative z-10 animate-fade-in">
           {/* Status Pill */}
           <button 
             onClick={() => setShowDashboard(true)}
             className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:scale-105 transition-transform cursor-pointer mb-8 shadow-sm group hover:border-blue-500/30"
           >
             <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             System Online <span className="mx-2 opacity-30">|</span> View Live Analytics
             <ChevronRight className="w-3.5 h-3.5 ml-1 opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5" />
           </button>

           <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 dark:text-white mb-6 drop-shadow-sm leading-[1.1]">
             Accessibility <br className="md:hidden" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
               Reimagined.
             </span>
           </h1>

           <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10 font-medium">
             Break down communication barriers with real-time AI translation. Seamlessly convert Gesture, Speech, and Text into universal sign language.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
             <button 
                onClick={() => setMode(AppMode.GESTURE)}
                className="px-8 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg shadow-xl shadow-gray-900/20 dark:shadow-white/10 hover:scale-105 hover:shadow-2xl transition-all flex items-center justify-center group"
             >
               Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
             <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white font-bold text-lg border border-gray-200 dark:border-white/10 backdrop-blur-md hover:bg-white/80 dark:hover:bg-gray-800 transition-all"
             >
               Explore Features
             </button>
           </div>
        </div>

        {/* Features 3-Column Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 scroll-mt-24">
          
          {/* Card 1: Gesture */}
          <div 
             onClick={() => setMode(AppMode.GESTURE)}
             className="group relative h-96 rounded-[2.5rem] p-8 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl border border-white/40 dark:border-white/5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl flex flex-col justify-between"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="flex justify-between items-start relative z-10">
                <div className="p-4 bg-blue-100/80 dark:bg-blue-900/40 rounded-2xl text-blue-600 dark:text-blue-400 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                   <Camera className="w-8 h-8" />
                </div>
                <div className="px-3 py-1 bg-white/20 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 text-gray-500 dark:text-gray-400">
                   Vision AI
                </div>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Gesture Recognition</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-base leading-relaxed mb-4">
                   Translate full-body language and hand signs into text and speech instantly.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                  Try it now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
             </div>
          </div>

          {/* Card 2: Speech */}
          <div 
             onClick={() => setMode(AppMode.SPEECH)}
             className="group relative h-96 rounded-[2.5rem] p-8 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl border border-white/40 dark:border-white/5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl flex flex-col justify-between"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="flex justify-between items-start relative z-10">
                <div className="p-4 bg-orange-100/80 dark:bg-orange-900/40 rounded-2xl text-orange-600 dark:text-orange-400 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                   <Mic className="w-8 h-8" />
                </div>
                <div className="px-3 py-1 bg-white/20 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 text-gray-500 dark:text-gray-400">
                   Audio AI
                </div>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Speech to Sign</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-base leading-relaxed mb-4">
                   Voice-activated translation that turns spoken words into visual signing in real-time.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-orange-600 dark:text-orange-400 group-hover:underline">
                  Try it now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
             </div>
          </div>

          {/* Card 3: Text */}
          <div 
             onClick={() => setMode(AppMode.TEXT)}
             className="group relative h-96 rounded-[2.5rem] p-8 overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl border border-white/40 dark:border-white/5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl flex flex-col justify-between"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="flex justify-between items-start relative z-10">
                <div className="p-4 bg-emerald-100/80 dark:bg-emerald-900/40 rounded-2xl text-emerald-600 dark:text-emerald-400 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300">
                   <Type className="w-8 h-8" />
                </div>
                <div className="px-3 py-1 bg-white/20 dark:bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 text-gray-500 dark:text-gray-400">
                   Text AI
                </div>
             </div>
             
             <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Text to Sign</h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-base leading-relaxed mb-4">
                   Convert written text, documents, or images into fluid 3D avatar animations.
                </p>
                <span className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                  Try it now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
             </div>
          </div>

        </div>
      </div>

      {/* Modern Dashboard Modal */}
      {showDashboard && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dashboard-title"
        >
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative border
            bg-white/95 backdrop-blur-2xl border-white/20
            dark:bg-gray-900/95 dark:border-white/10">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 z-10 
              bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
              <div>
                <h2 id="dashboard-title" className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-indigo-500" aria-hidden="true" />
                  Analytics Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time usage statistics and patterns</p>
              </div>
              <button 
                onClick={() => setShowDashboard(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close Dashboard"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
               {/* Top Metrics Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/20 flex flex-col justify-between h-32
                   bg-gradient-to-br from-indigo-500 to-blue-600">
                    <p className="text-indigo-100 text-sm font-bold uppercase tracking-wider">Total Interactions</p>
                    <div className="flex items-end justify-between">
                      <p className="text-5xl font-black tracking-tight">{totalInteractions}</p>
                      <Activity className="w-8 h-8 text-indigo-200 opacity-50" aria-hidden="true" />
                    </div>
                 </div>
                 
                 <div className="rounded-2xl p-6 border flex flex-col justify-between h-32
                   bg-gray-50 border-gray-200
                   dark:bg-black/20 dark:border-gray-700/50">
                    <p className="text-sm font-bold uppercase tracking-wider flex items-center text-gray-500 dark:text-gray-400">
                       <Clock className="w-4 h-4 mr-2" aria-hidden="true" /> Session Duration
                    </p>
                    <div className="flex items-end">
                      <p className="text-5xl font-black text-gray-900 dark:text-white">{sessionTime}</p>
                      <span className="text-lg font-medium text-gray-400 ml-2 mb-2">min</span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Activity Bar Chart */}
                  <div className="rounded-2xl p-6 border
                    bg-gray-50 border-gray-100
                    dark:bg-black/20 dark:border-gray-700/50">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900 dark:text-white">Activity Volume</h3>
                    <div className="h-64 w-full" aria-label="Bar chart showing usage stats">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6b7280" opacity={0.1} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9ca3af', fontSize: 12 }} 
                          />
                          <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                          <Bar dataKey="count" radius={[6, 6, 0, 0]} animationDuration={1000}>
                            {barData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Distribution Pie Chart */}
                  <div className="rounded-2xl p-6 border flex flex-col
                    bg-gray-50 border-gray-100
                    dark:bg-black/20 dark:border-gray-700/50">
                     <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-900 dark:text-white">Mode Distribution</h3>
                     <div className="h-64 w-full flex-grow relative" aria-label="Pie chart showing mode distribution">
                        {totalInteractions === 0 ? (
                           <div className="absolute inset-0 flex items-center justify-center text-sm italic text-gray-400">
                             Start using features to see data
                           </div>
                        ) : (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="count"
                                stroke="none"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                        
                        {/* Legend */}
                        <div className="flex justify-center gap-4 mt-4" aria-hidden="true">
                           {barData.map((item) => (
                              <div key={item.name} className="flex items-center gap-2">
                                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                 <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.name}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t text-center text-xs
              bg-gray-50/50 border-gray-100 text-gray-500
              dark:bg-gray-800/20 dark:border-gray-800 dark:text-gray-400">
              Charts update automatically as you interact with the app.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;