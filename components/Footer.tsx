import React from 'react';
import { Heart } from 'lucide-react';
import { AppMode } from '../types';

interface FooterProps {
  setMode: (mode: AppMode) => void;
}

const Footer: React.FC<FooterProps> = ({ setMode }) => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              © 2025 AI Omni Talk. All Rights Reserved.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
              <span>Built with</span>
              <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" />
              <span>for Universal Accessibility.</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <button 
              onClick={() => setMode(AppMode.ABOUT)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              About Us
            </button>
            <button 
              onClick={() => setMode(AppMode.HELP)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Help & FAQ
            </button>
            <button 
              onClick={() => setMode(AppMode.CONTACT)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;