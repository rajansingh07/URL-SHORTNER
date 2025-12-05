import React, { useState, useEffect } from 'react';
import { Link, ChevronDown, ChevronUp, Calendar, Tag, ArrowRight } from 'lucide-react';

const UrlInput = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expiry, setExpiry] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (url) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(url);
      setError('');
      onShorten({ url, alias, expiry });
      setUrl('');
      setAlias('');
      setExpiry('');
      setShowOptions(false);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  const getPreviewUrl = (text) => {
    if (!text) return '';
    if (text.length > 40) {
      return text.substring(0, 37) + '...';
    }
    return text;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="relative group">
          <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 ${error ? 'from-red-500 to-red-500 opacity-50' : ''}`}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl p-2 shadow-xl">
            <div className="flex items-center gap-3 px-4 py-3">
              <Link className={`text-gray-400 ${error ? 'text-red-400' : ''}`} size={24} />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your long URL"
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Shorten <ArrowRight size={18} />
              </button>
            </div>

            {url && (
              <div className="absolute left-4 -bottom-12 transform translate-y-2 bg-gray-900 dark:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg shadow-lg pointer-events-none animate-fade-in-up z-20">
                <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
                <span className="opacity-75">Preview: </span>
                <span className="font-mono">{getPreviewUrl(url)}</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="absolute -bottom-6 left-4 text-sm text-red-500 font-medium animate-shake">
            {error}
          </p>
        )}

        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {showOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            More options
          </button>

          <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${showOptions ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  <Tag size={16} /> Custom Alias
                </label>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g., my-link"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                  <Calendar size={16} /> Expiry Date
                </label>
                <input
                  type="date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UrlInput;
