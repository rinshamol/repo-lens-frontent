import React, { useState } from "react";
import { Search, AlertCircle } from "lucide-react";

interface Props {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

const RepositoryInput: React.FC<Props> = ({ onAnalyze, isLoading, error }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const examples = ["facebook/react", "nestjs/nest", "microsoft/typescript"];

  return (
    <div className="max-w-2xl mx-auto py-12 text-center">
      {/* Title: Using a strict hex code (#0f172a) ensures it renders dark in light mode. Dark mode remains untouched. */}
      <h1
        className="text-4xl md:text-5xl font-black mb-4 transition-colors 
        text-foreground tracking-tight"
      >
        Analyze Any GitHub Repository
      </h1>

      {/* Subtext: Strict hex code (#334155) for light mode readability. Dark mode untouched. */}
      <p className="text-foreground/60 mb-10 text-lg">
        Get instant AI-powered insights into code quality, tech stack, and
        security risks.
      </p>

      <form onSubmit={handleSubmit} className="relative mb-8 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
            className="text-[#64748b] group-focus-within:text-indigo-500"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="https://github.com/user/repo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          className="w-full pl-12 pr-36 py-5 rounded-2xl outline-none transition-all duration-300
            bg-white text-[#0f172a] placeholder-slate-800 border-2 border-transparent shadow-xl
            dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-200 dark:placeholder-slate-500
            focus:border-indigo-800 dark:focus:border-indigo-800 focus:ring-4 focus:ring-indigo-500/10"
        />

        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute right-2.5 top-2.5 bottom-2.5 bg-indigo-500 dark:bg-indigo-800 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-400  transition-all flex items-center gap-2"
        >
          {isLoading ? (
            "..."
          ) : (
            <>
              <Search size={18} /> Analyze
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-8 animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={18} />
          <span className="text-sm font-semibold">{error}</span>
        </div>
      )}

      {/* Try Examples Section */}
      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-[10px] text-[#475569] dark:text-slate-500 self-center mr-2 font-black uppercase tracking-widest">
          Quick Peek:
        </span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setUrl(`https://github.com/${ex}`)}
            className="text-xs px-4 py-1.5 rounded-full transition-all
              bg-[#f1f5f9] text-[#334155] hover:bg-[#e2e8f0]
              dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200
              border border-transparent dark:border-slate-700"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RepositoryInput;