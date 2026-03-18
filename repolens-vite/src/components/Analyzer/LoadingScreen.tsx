import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  startTime: number;
  progress: number; // real progress from parent
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ startTime, progress }) => {
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [elapsed, setElapsed] = useState<number>(0);

  // Elapsed timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  // Fake fill between real checkpoints so bar doesn't freeze
  useEffect(() => {
    if (progress >= displayProgress) {
      setDisplayProgress(progress);
    }
  }, [progress]);

  useEffect(() => {
    // Slowly creep up while waiting for backend — stops at 90% max
    const timer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= 90 || prev >= progress + 30) return prev; // don't overshoot
        return prev + Math.random() * 0.8;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const getStatus = () => {
    if (displayProgress < 20) return "📦 Fetching repository...";
    if (displayProgress < 50) return "📂 Collecting code...";
    if (displayProgress < 85) return "🤖 Analyzing with AI...";
    return "✨ Finalizing results...";
  };

  const getProgressColor = () => {
    if (displayProgress < 25) return "bg-blue-500";
    if (displayProgress < 50) return "bg-yellow-500";
    if (displayProgress < 75) return "bg-orange-500";
    return "bg-green-500";
  };

  const getSpinnerColor = () => {
    if (displayProgress < 25) return "text-blue-500";
    if (displayProgress < 50) return "text-yellow-500";
    if (displayProgress < 75) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <Loader2 className={`w-16 h-16 ${getSpinnerColor()} animate-spin mx-auto mb-6 transition-colors duration-500`} />
        <h3 className="text-2xl font-bold mb-2">Analyzing...</h3>
        <p className="text-gray-600 mb-8">{getStatus()}</p>

        <div className="w-full bg-gray-200 h-3 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
            style={{ width: `${Math.round(displayProgress)}%` }}
          />
        </div>

        <div className="flex justify-between text-sm font-mono text-gray-600">
          <span>{Math.round(displayProgress)}%</span>
          <span>{elapsed}s elapsed</span>
        </div>
      </div>
    </div>
  );
};


export default LoadingScreen;
