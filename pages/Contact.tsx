import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react';
import { AppMode } from '../types';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email us at</p>
                <p className="font-bold text-gray-900 dark:text-white">support@aiomnitalk.com</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Social Media</p>
                <p className="font-bold text-gray-900 dark:text-white">@aiomnitalk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400">Thanks for reaching out. We'll get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="How can we help?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transform transition-all active:scale-95 flex items-center justify-center"
              >
                Send Message <Send className="w-4 h-4 ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;