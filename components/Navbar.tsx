import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Home, Activity, Camera, Mic, Type, Menu, X, Info, HelpCircle, Mail, FileText, ShieldCheck } from 'lucide-react';
import { AppMode } from '../types';

interface NavbarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentMode, setMode, isDark, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { mode: AppMode.WELCOME, label: 'Home', icon: Home },
    { mode: AppMode.GESTURE, label: 'Gesture', icon: Camera },
    { mode: AppMode.TEXT, label: 'Text', icon: Type },
    { mode: AppMode.SPEECH, label: 'Speech', icon: Mic },
  ];

  const menuItems = [
    { mode: AppMode.ABOUT, label: 'About Us', icon: Info },
    { mode: AppMode.HELP, label: 'Help & FAQ', icon: HelpCircle },
    { mode: AppMode.CONTACT, label: 'Contact', icon: Mail },
    { mode: AppMode.TERMS, label: 'Terms', icon: FileText },
    { mode: AppMode.PRIVACY, label: 'Privacy', icon: ShieldCheck },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (mode: AppMode) => {
    setMode(mode);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <button 
              onClick={() => setMode(AppMode.WELCOME)}
              className="flex items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
              aria-label="Go to Home"
            >
              <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform" aria-hidden="true">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900 dark:text-white">
                  AI Omni Talk
                </span>
              </div>
            </button>
            
            {/* Desktop Center Navigation */}
            <div className="hidden md:flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full" role="tablist">
                {navItems.map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setMode(item.mode)}
                    role="tab"
                    aria-selected={currentMode === item.mode}
                    aria-controls={`panel-${item.mode}`}
                    className={`flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentMode === item.mode
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right Side Controls */}
            <div className="flex items-center space-x-3" ref={menuRef}>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5 text-yellow-500" aria-hidden="true" /> : <Moon className="h-5 w-5 text-slate-700" aria-hidden="true" />}
              </button>

              {/* Menu Toggle */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isMenuOpen 
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
                      : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in origin-top-right">
                    <div className="py-2">
                      {menuItems.map((item) => (
                        <button
                          key={item.mode}
                          onClick={() => handleMenuClick(item.mode)}
                          className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                            currentMode === item.mode ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe shadow-lg">
        <div className="flex justify-around items-center h-16" role="tablist">
           {navItems.map((item) => (
              <button
                key={item.mode}
                onClick={() => setMode(item.mode)}
                role="tab"
                aria-selected={currentMode === item.mode}
                aria-label={item.label}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 ${
                  currentMode === item.mode 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className={`h-6 w-6 ${currentMode === item.mode ? 'stroke-[2.5px]' : 'stroke-2'}`} aria-hidden="true" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
           ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;