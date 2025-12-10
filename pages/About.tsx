import React from 'react';
import { ArrowLeft, Cpu, Heart, Globe, Shield } from 'lucide-react';
import { AppMode } from '../types';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
          Bridging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Communication Gap</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          AI Omni Talk is a revolutionary accessibility platform designed to remove barriers between sign language users and the rest of the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To empower individuals with speech and hearing disabilities by providing accurate, real-time translation tools that work seamlessly across devices and languages.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6">
            <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Technology</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Powered by Google's Gemini 2.5 Flash model, we utilize advanced multimodal AI to interpret complex gestures, translate speech, and generate 3D avatar animations in real-time.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 rounded-3xl p-8 md:p-12 text-white dark:text-gray-900 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Why AI Omni Talk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Globe className="w-6 h-6 mr-3 mt-1 text-blue-400 dark:text-blue-600" />
              <div>
                <h4 className="font-bold text-lg mb-1">Global Reach</h4>
                <p className="opacity-80 text-sm">Translates input from over 20 languages into universal ASL.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-6 h-6 mr-3 mt-1 text-blue-400 dark:text-blue-600" />
              <div>
                <h4 className="font-bold text-lg mb-1">Privacy First</h4>
                <p className="opacity-80 text-sm">All processing happens securely with enterprise-grade encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;