import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { AppMode } from '../types';

interface TermsProps {
  onBack: () => void;
}

const Terms: React.FC<TermsProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-500" />
        Terms of Service
      </h1>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using AI Omni Talk, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Use License</h2>
          <p>Permission is granted to temporarily use the AI Omni Talk platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Disclaimer</h2>
          <p>The materials on AI Omni Talk are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties. The AI translations are for assistive purposes and should not be relied upon for critical medical or legal communications.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Limitations</h2>
          <p>In no event shall AI Omni Talk or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI Omni Talk.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;