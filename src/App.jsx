import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import UrlInput from './components/UrlInput';
import ShortResult from './components/ShortResult';
import History from './components/History';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('urlHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    localStorage.setItem('urlHistory', JSON.stringify(history));
  }, [history]);

  // Mock Routing for Redirect/404
  const path = window.location.pathname.slice(1);
  if (path && path.length > 0) {
    const found = history.find(h => h.shortUrl.endsWith(path));
    
    if (found) {
      // Simulate redirect
      useEffect(() => {
        const timer = setTimeout(() => {
          window.location.href = found.originalUrl;
        }, 2000);
        return () => clearTimeout(timer);
      }, [found.originalUrl]);

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <div className="animate-bounce mb-4">
            <Link2 size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Redirecting...</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Taking you to your destination</p>
          <p className="text-sm text-gray-500">{found.originalUrl}</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <h1 className="text-6xl font-bold mb-4 text-blue-600">404</h1>
        <p className="text-2xl font-semibold mb-4">Link Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          The short URL you are trying to access does not exist or has expired.
        </p>
        <a 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/20"
        >
          Go back home
        </a>
      </div>
    );
  }

  const handleShorten = ({ url, alias, expiry }) => {
    const shortCode = alias || Math.random().toString(36).substring(2, 8);
    const shortUrl = `${window.location.origin}/${shortCode}`;
    
    const newResult = {
      id: Date.now(),
      originalUrl: url,
      shortUrl,
      createdAt: new Date().toISOString(),
      expiry
    };

    setCurrentResult(newResult);
    setHistory(prev => [newResult, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="w-full max-w-4xl flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
            <Link2 className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            URL Shortener
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Shorten Your Long Links :)
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Paste your long URL below to get a shortened version. 
            Simple, fast, and secure.
          </p>
        </div>

        <UrlInput onShorten={handleShorten} />

        {currentResult && (
          <div className="w-full max-w-2xl animate-fade-in-up">
            <ShortResult 
              shortUrl={currentResult.shortUrl} 
              originalUrl={currentResult.originalUrl} 
            />
          </div>
        )}

        <History history={history} />
      </main>

      <footer className="mt-auto pt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
