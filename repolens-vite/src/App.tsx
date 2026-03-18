import React, { useState } from 'react';
import Header from './components/Layout/Header';
import RepositoryInput from './components/Analyzer/RepositoryInput';
import LoadingScreen from './components/Analyzer/LoadingScreen';
import AnalysisResult from './components/Results/AnalysisResult';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ErrorMessage from './components/Error/ErrorMessage';
import { analyzeRepository } from './services/api';
import type { AnalysisResponse } from './types/analysis';

type AppStatus = 'idle' | 'loading' | 'success' | 'error';

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID as string;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string ?? 'http://localhost:5173';

function App() {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [lastUrl, setLastUrl] = useState<string>(''); // ← store for retry

  const handleAnalyze = async (url: string) => {
    setStatus('loading');
    setError(null);
    setLastUrl(url);
    setStartTime(Date.now());
    setProgress(0);

    try {
      setProgress(15);
      const data = await analyzeRepository(url);

      if (data as unknown === 'PRIVATE') {
        setError('This repo is private. Please login with GitHub first.');
        setStatus('error');
        return;
      }
      if (data as unknown === 'INACCESSIBLE') {
        setError('Repository not found or inaccessible.');
        setStatus('error');
        return;
      }

      setProgress(95);
      await new Promise(resolve => setTimeout(resolve, 600));
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 800));

      setAnalysisData(data);
      setStatus('success');
    } catch (err: any) {
      const message = err.response?.data?.message
        ?? err.message
        ?? 'Failed to analyze repository.';
      setError(message);
      setStatus('error');
    }
  };

  const handleRetry = () => {
    if (lastUrl) handleAnalyze(lastUrl);
  };

  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'repo user',
    });
    window.location.href = `https://github.com/login/oauth/authorize?${params}`;
  };

  const handleReset = () => {
    setStatus('idle');
    setAnalysisData(null);
    setError(null);
    setLastUrl('');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen transition-colors duration-300 bg-background text-foreground antialiased">
        <Header onReset={handleReset} onLogin={handleLogin} />

        <main className="container mx-auto px-4 py-12">
          {(status === 'idle' || status === 'error') && (
            <div className="animate-in fade-in zoom-in duration-500">
              <RepositoryInput
                onAnalyze={handleAnalyze}
                isLoading={false}
                error={null} // ← pass null here, we handle error below
              />
              {/* Error shown below the input with retry */}
              {status === 'error' && error && (
                <div className="max-w-2xl mx-auto mt-4">
                  <ErrorMessage
                    error={error}
                    onRetry={handleRetry}
                    onLogin={handleLogin}
                  />
                </div>
              )}
            </div>
          )}

          {status === 'loading' && (
            <LoadingScreen startTime={startTime} progress={progress} />
          )}

          {status === 'success' && analysisData && (
            <AnalysisResult data={analysisData} onReset={handleReset} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;