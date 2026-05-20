import React, { useState } from 'react';
import { AlertCircle, RefreshCw, WifiOff, Lock, SearchX, ServerCrash } from 'lucide-react';

interface Props {
  error: string;
  onRetry?: () => void;
  onLogin?: () => void;
}

type ErrorType = 'auth' | 'notfound' | 'network' | 'ratelimit' | 'server' | 'generic';

const getErrorType = (error: string): ErrorType => {
  const e = error.toLowerCase();
  if (e.includes('private') || e.includes('login') || e.includes('auth')) return 'auth';
  if (e.includes('not found') || e.includes('inaccessible') || e.includes('404')) return 'notfound';
  if (e.includes('network') || e.includes('connection') || e.includes('fetch')) return 'network';
  if (e.includes('rate') || e.includes('429') || e.includes('too many')) return 'ratelimit';
  if (e.includes('500') || e.includes('server') || e.includes('parse')) return 'server';
  return 'generic';
};

const errorConfig = {
  auth: {
    icon: Lock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    title: 'Authentication Required',
    hint: 'This repository is private. Login with GitHub to access it.',
    showLogin: true,
    showRetry: false,
  },
  notfound: {
    icon: SearchX,
    color: 'text-gray-500',
    bg: 'bg-gray-50 dark:bg-slate-700/50',
    border: 'border-gray-200 dark:border-slate-600',
    title: 'Repository Not Found',
    hint: 'Double-check the URL and make sure the repository exists.',
    showLogin: false,
    showRetry: false,
  },
  network: {
    icon: WifiOff,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'Connection Error',
    hint: 'Could not reach the server. Check your internet connection.',
    showLogin: false,
    showRetry: true,
  },
  ratelimit: {
    icon: ServerCrash,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    title: 'Rate Limited',
    hint: 'Too many requests. Please wait a moment before trying again.',
    showLogin: false,
    showRetry: true,
  },
  server: {
    icon: ServerCrash,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    title: 'Server Error',
    hint: 'The server encountered an error. Please try again.',
    showLogin: false,
    showRetry: true,
  },
  generic: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    title: 'Analysis Failed',
    hint: 'Something went wrong. Please try again.',
    showLogin: false,
    showRetry: true,
  },
};

const ErrorMessage: React.FC<Props> = ({ error, onRetry, onLogin }) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  const type = getErrorType(error);
  const config = errorConfig[type];
  const Icon = config.icon;

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    setRetryCount(c => c + 1);
    await new Promise(r => setTimeout(r, 500));
    onRetry();
    setIsRetrying(false);
  };

  return (
    <div className={`rounded-xl border p-4 ${config.bg} ${config.border} animate-in slide-in-from-top-2 duration-300`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 mt-0.5 ${config.color}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-800 dark:text-white">{config.title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{type === 'generic' ? error : config.hint}</p>
          {retryCount > 0 && (
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
              Retry attempt {retryCount}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {config.showLogin && onLogin && (
            <button
              onClick={onLogin}
              className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          )}
          {config.showRetry && onRetry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-lg font-semibold border border-gray-200 dark:border-slate-600 transition-all disabled:opacity-50"
            >
              <RefreshCw size={12} className={isRetrying ? 'animate-spin' : ''} />
              {isRetrying ? 'Retrying...' : 'Retry'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;