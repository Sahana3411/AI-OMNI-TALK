import React from 'react';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { AppMode } from '../types';

interface PrivacyProps {
  onBack: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
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
        <ShieldCheck className="w-8 h-8 text-emerald-500" />
        Privacy Policy
      </h1>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-start gap-4">
           <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
           <div>
             <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">We respect your privacy</h3>
             <p className="text-sm text-blue-800 dark:text-blue-200">
               We do not store your video feeds, audio recordings, or personal conversations. All processing happens in real-time and is discarded immediately after translation.
             </p>
           </div>
        </div>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Information Collection</h2>
          <p>We do not collect personal identifiable information (PII) unless you voluntarily provide it through our contact forms. Any camera or microphone data used for gesture or speech recognition is processed locally or via secure transient cloud calls and is never saved to our servers.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI Processing</h2>
          <p>This application uses Google Gemini API for translation services. Data sent to the API is subject to Google's data processing terms, but we configure our requests to ensure data is not used for model training where possible.</p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cookies</h2>
          <p>We use local storage only to save your theme preferences (Dark/Light mode) and camera settings. No tracking cookies are used.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;