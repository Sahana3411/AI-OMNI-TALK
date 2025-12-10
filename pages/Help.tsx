import React from 'react';
import { ArrowLeft, Camera, Type, Mic, HelpCircle, ChevronDown } from 'lucide-react';
import { AppMode } from '../types';

interface HelpProps {
  onBack: () => void;
}

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const contentId = React.useId();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="font-semibold text-gray-900 dark:text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div 
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mb-4' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Help: React.FC<HelpProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <button 
        onClick={onBack}
        aria-label="Back to Home"
        className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
      >
        <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
        Back to Home
      </button>

      <div className="mb-12">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-indigo-500" aria-hidden="true" />
          Help Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Everything you need to know about using AI Omni Talk.</p>
      </div>

      {/* Feature Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Camera className="w-8 h-8 text-blue-500 mb-4" aria-hidden="true" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Gesture Mode</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Allow camera access. Ensure you are in a well-lit room. Perform ASL gestures or body language within the frame.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Type className="w-8 h-8 text-emerald-500 mb-4" aria-hidden="true" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Text Mode</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Type any sentence or upload an image containing text. The 3D avatar will translate it into ASL signs instantly.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <Mic className="w-8 h-8 text-orange-500 mb-4" aria-hidden="true" />
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Speech Mode</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tap the microphone and speak clearly. The app recognizes your voice and converts it to text and sign language.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-2">
          <FAQItem 
            question="Which languages are supported?" 
            answer="We support over 20 languages including English, Hindi, Spanish, French, and regional Indian languages. The output is always American Sign Language (ASL)." 
          />
          <FAQItem 
            question="Is my camera data saved?" 
            answer="No. All video processing happens in real-time. We do not store any video feeds or images on our servers for your privacy." 
          />
          <FAQItem 
            question="Can I use this offline?" 
            answer="Currently, an active internet connection is required to access the AI models for accurate translation and recognition." 
          />
          <FAQItem 
            question="How accurate is the translation?" 
            answer="Our AI uses the latest Gemini 2.5 models for high accuracy. However, nuances in sign language can be complex, so it's best used as an assistive tool." 
          />
        </div>
      </div>
    </div>
  );
};

export default Help;