import { LogOut, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/api";

// src/components/Layout/Header.tsx
interface HeaderProps {
  onReset: () => void;
  onLogin: () => void;  // add this
   onAbout: () => void; 
}

const Header: React.FC<HeaderProps> = ({ onReset, onLogin, onAbout }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const isLoggedIn = !!localStorage.getItem('gh_token');

  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo()
        .then((data) => {
          setUsername(data.login);      // GitHub username
          setAvatar(data.avatar_url);   // GitHub avatar
        })
        .catch(() => {
          // token expired or invalid — clear it
          localStorage.removeItem('gh_token');
          window.location.reload();
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('gh_token');
    setUsername(null);
    setAvatar(null);
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 
      bg-white/80 border-b border-slate-200 
      dark:bg-[#0a0f1e] dark:border-slate-800 
      backdrop-blur-md shadow-sm">

      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — unchanged */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onReset}>
          <div className="relative flex items-center justify-center w-10 h-10 transition-transform group-hover:scale-110">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-slate-600 dark:text-white">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-600 rounded-full border-2 border-white dark:border-[#0a0f1e]">
              <Search size={10} className="text-white" strokeWidth={4} />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tighter dark:text-white">
            Repo<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
          </h1>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
           <button
              onClick={onAbout}
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all"
            >
            Docs
          </button>
           {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Avatar + Username */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {avatar ? (
                  <img src={avatar} alt={username ?? ''} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                    {username?.[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {username ?? '...'}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-800 transition-all"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="hidden sm:flex items-center gap-2 bg-[#24292f] hover:bg-[#1a1e22] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-sm active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Login with GitHub</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;