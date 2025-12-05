import React from 'react';
import { Clock, ExternalLink, Copy, Check } from 'lucide-react';

const History = ({ history }) => {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!history || history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400">
        <Clock size={16} />
        <h3 className="text-sm font-medium uppercase tracking-wider">Recent URLs</h3>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id}
            className="group bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-blue-600 dark:text-blue-400 truncate">
                    {item.shortUrl}
                  </span>
                  <span className="text-xs text-gray-400">• {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {item.originalUrl}
                </p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleCopy(item.shortUrl, item.id)}
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Copy"
                >
                  {copiedId === item.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Open"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
