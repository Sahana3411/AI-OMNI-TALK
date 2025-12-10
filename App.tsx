import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import GestureRecognition from './pages/GestureRecognition';
import TextRecognition from './pages/TextRecognition';
import SpeechRecognition from './pages/SpeechRecognition';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { AppMode } from './types';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.WELCOME);
  const [isDark, setIsDark] = useState(false);
  
  // Real-time session stats
  const [stats, setStats] = useState({
    gesture: 0,
    text: 0,
    speech: 0
  });

  // Check system preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const incrementStat = (type: 'gesture' | 'text' | 'speech') => {
    setStats(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.GESTURE:
        return (
          <GestureRecognition 
            onBack={() => setCurrentMode(AppMode.WELCOME)} 
            onSuccess={() => incrementStat('gesture')} 
          />
        );
      case AppMode.TEXT:
        return (
          <TextRecognition 
            onBack={() => setCurrentMode(AppMode.WELCOME)} 
            onSuccess={() => incrementStat('text')} 
          />
        );
      case AppMode.SPEECH:
        return (
          <SpeechRecognition 
            onBack={() => setCurrentMode(AppMode.WELCOME)} 
            onSuccess={() => incrementStat('speech')} 
          />
        );
      case AppMode.ABOUT:
        return <About onBack={() => setCurrentMode(AppMode.WELCOME)} />;
      case AppMode.HELP:
        return <Help onBack={() => setCurrentMode(AppMode.WELCOME)} />;
      case AppMode.CONTACT:
        return <Contact onBack={() => setCurrentMode(AppMode.WELCOME)} />;
      case AppMode.TERMS:
        return <Terms onBack={() => setCurrentMode(AppMode.WELCOME)} />;
      case AppMode.PRIVACY:
        return <Privacy onBack={() => setCurrentMode(AppMode.WELCOME)} />;
      case AppMode.WELCOME:
      default:
        return <Welcome setMode={setCurrentMode} stats={stats} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen filter animate-blob`}></div>
        <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen filter animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-pink-400/20 dark:bg-pink-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen filter animate-blob animation-delay-4000`}></div>
      </div>

      <Navbar 
        currentMode={currentMode} 
        setMode={setCurrentMode} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="flex-grow relative z-10 w-full flex flex-col">
        {renderContent()}
      </main>

      <Footer setMode={setCurrentMode} />
    </div>
  );
};

export default App;