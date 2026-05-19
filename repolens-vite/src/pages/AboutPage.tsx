import React, { useEffect } from 'react';
import { Search, ArrowLeft, Github, Linkedin, Mail } from 'lucide-react';

const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const techStack = [
    { color: '#61dafb', name: 'React + TypeScript', sub: 'Frontend' },
    { color: '#38bdf8', name: 'Tailwind CSS', sub: 'Styling' },
    { color: '#6366f1', name: 'Vite', sub: 'Build tool' },
    { color: '#6db33f', name: 'Spring Boot', sub: 'Backend' },
    { color: '#f97316', name: 'Java 21', sub: 'Runtime' },
    { color: '#e879f9', name: 'OpenRouter', sub: 'AI gateway' },
    { color: '#22d3ee', name: 'arcee-ai/trinity', sub: 'Free AI model' },
    { color: '#334155', name: 'GitHub API', sub: 'Repo data' },
  ];

  const steps = [
    { title: 'Paste a GitHub URL', desc: 'Drop any GitHub repository URL into the input. Works for any public repo instantly.' },
    { title: 'Click Analyze', desc: 'RepoLens fetches the code via GitHub API and sends it to an AI model for analysis.' },
    { title: 'Read the report', desc: 'Get a full breakdown: tech stack, code quality, risk assessment, and improvement suggestions.' },
    { title: 'Private repo? Login with GitHub', desc: 'Login with GitHub OAuth for private repos. Read-only access, token never stored on the server.' },
  ];

  const privacyCards = [
    { icon: '🌍', title: 'Public repos', desc: 'No login needed. Paste any public GitHub URL and analyze instantly.' },
    { icon: '🔐', title: 'Private repos', desc: 'Login with GitHub OAuth. Read-only scope. Token stored only in your browser.' },
    { icon: '🏢', title: 'Organization repos', desc: 'Works when third-party access is enabled. Restricted orgs cannot be accessed.' },
    { icon: '🏛️', title: 'No data stored', desc: 'No database, no accounts, no tracking. Nothing is saved server-side.' },
  ];

  const limitations = [
    'Very large repositories get truncated to fit the AI context window. Core files are analyzed but deeply nested code may be missed.',
    'Free AI models on OpenRouter have rate limits and occasional downtime. Waiting a minute and retrying usually resolves it.',
    'Organization repositories with third-party access restrictions cannot be analyzed even with a GitHub login.',
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] antialiased">

      {/* NAV */}
      <header className="sticky top-0 z-50 w-full transition-all duration-300
        bg-white/80 border-b border-slate-200
        dark:bg-[#0a0f1e]/90 dark:border-slate-800
        backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4 cursor-pointer group" onClick={onBack}>
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
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Repo<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
            </span>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold
              text-indigo-600 dark:text-indigo-400
              bg-indigo-50 dark:bg-indigo-950/50
              hover:bg-indigo-100 dark:hover:bg-indigo-900/50
              border border-indigo-200 dark:border-indigo-800
              px-4 py-2 rounded-full transition-all"
          >
            <ArrowLeft size={13} /> Back to App
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4">

        {/* HERO */}
        <div className="py-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase
            text-indigo-600 dark:text-indigo-400
            bg-indigo-50 dark:bg-indigo-950/50
            border border-indigo-200 dark:border-indigo-800
            px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Open Source · Free to Use · No Data Stored
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-slate-900 dark:text-white leading-tight">
            Understand any repo{' '}
            <span className="text-indigo-600 dark:text-indigo-400">in one click</span>
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            An AI-powered breakdown of any GitHub repository — tech stack, code quality,
            risks and improvements — without running a single line of code.
          </p>
        </div>

        {/* WHY I BUILT THIS */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">Origin Story</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">Why I built this</h2>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-4 leading-relaxed">
            Every developer knows the feeling. You open a new GitHub repo and spend the first 30 minutes just figuring out what it <em>is</em>. Cloning it, running it, hunting through config files to identify the framework, architecture, and dependencies.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-6 leading-relaxed">
            That friction is worse when evaluating open source projects to contribute to, or onboarding to a company with multiple codebases.
          </p>
          <div className="relative bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-7 overflow-hidden">
            <div className="absolute top-2 left-5 text-7xl font-black text-indigo-200 dark:text-indigo-500/10 leading-none select-none">"</div>
            <p className="relative text-slate-700 dark:text-slate-300 text-base italic leading-relaxed">
              I was browsing GitHub looking for an open source project to contribute to. I opened repo after repo — cloning, running, reading READMEs. An hour later I still hadn't found one. That's when I thought:{' '}
              <strong className="text-indigo-600 dark:text-indigo-400 not-italic">
                what if I could just paste the URL and instantly know what I'm looking at?
              </strong>{' '}
              So I built it.
            </p>
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">Usage Guide</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">How to use RepoLens</h2>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-8">No account needed for public repos. Just paste and go.</p>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-11 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                )}
                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm shrink-0 z-10">
                  {i + 1}
                </div>
                <div className="pb-8">
                  <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRIVACY */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">Privacy & Access</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Your data stays yours</h2>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-8">
            RepoLens does not store, log, or share any user data, tokens, or repository content. Every request is stateless.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {privacyCards.map((card, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="text-slate-800 dark:text-white font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-light leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5">
            <p className="text-slate-700 dark:text-slate-400 text-sm font-light leading-relaxed">
              <strong className="text-indigo-600 dark:text-indigo-400">Zero storage policy:</strong> No database, no user accounts, no analytics, no tracking.
              The only thing that persists is your GitHub token in{' '}
              <code className="text-xs bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">localStorage</code>
              {' '}— cleared anytime by logging out.
            </p>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">Under the Hood</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">How it's built</h2>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-7">
            A student project with a lean modern stack. The AI backbone is{' '}
            <strong className="text-slate-800 dark:text-slate-300">arcee-ai/trinity-large-preview</strong> via{' '}
            <strong className="text-slate-800 dark:text-slate-300">OpenRouter</strong> — making the entire AI layer completely free.
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {techStack.map(t => (
              <div key={t.name}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.color }} />
                {t.name}
                <span className="text-slate-400 dark:text-slate-500">{t.sub}</span>
              </div>
            ))}
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed">
            The backend uses Spring WebFlux for non-blocking HTTP calls to both the GitHub API and OpenRouter.
            Repository code is collected, truncated to fit the model's context window, and analyzed in a single
            prompt designed to return structured JSON parsed directly into the response DTO.
          </p>
        </section>

        {/* LIMITATIONS */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">Known Limitations</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">What to expect</h2>
          <p className="text-slate-600 dark:text-slate-400 font-light mb-7">It works well but has some edges worth knowing about.</p>

          <div className="flex flex-col gap-3">
            {limitations.map((lim, i) => (
              <div key={i} className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                <span className="text-xs font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-2 py-1 rounded shrink-0 mt-0.5">
                  Known
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-light leading-relaxed">{lim}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BUILT BY */}
        <section className="py-12 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-2">The Builder</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Built by Rinsha Mol K S</h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-xl font-black text-indigo-600 dark:text-indigo-400 shrink-0">
              R
            </div>
            <div className="flex-1">
              <p className="text-slate-900 dark:text-white font-semibold text-sm mb-1">Rinsha Mol K S</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light mb-4 leading-relaxed">
                Student developer passionate about building tools that make developers' lives easier.
                RepoLens is a personal project born from a real frustration.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="https://github.com/rinshamol" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold
                    text-slate-700 dark:text-slate-300
                    bg-slate-100 dark:bg-slate-700
                    hover:bg-slate-200 dark:hover:bg-slate-600
                    border border-slate-300 dark:border-slate-600
                    px-3 py-1.5 rounded-lg transition-all">
                  <Github size={13} /> rinshamol
                </a>
                <a href="https://www.linkedin.com/in/rinsha-mol-k-s/" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold
                    text-blue-700 dark:text-blue-400
                    bg-blue-50 dark:bg-blue-900/20
                    hover:bg-blue-100 dark:hover:bg-blue-900/40
                    border border-blue-200 dark:border-blue-800
                    px-3 py-1.5 rounded-lg transition-all">
                  <Linkedin size={13} /> LinkedIn
                </a>
                <a href="mailto:rinshamolks65@gmail.com"
                  className="flex items-center gap-1.5 text-xs font-semibold
                    text-slate-700 dark:text-slate-300
                    bg-slate-100 dark:bg-slate-700
                    hover:bg-slate-200 dark:hover:bg-slate-600
                    border border-slate-300 dark:border-slate-600
                    px-3 py-1.5 rounded-lg transition-all">
                  <Mail size={13} /> rinshamolks65@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-slate-600 dark:text-white">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 p-0.5 bg-indigo-600 rounded-full border-2 border-white dark:border-[#0a0f1e]">
                <Search size={7} className="text-white" strokeWidth={4} />
              </div>
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              Repo<span className="text-indigo-600 dark:text-indigo-400">Lens</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Powered by <span className="text-slate-700 dark:text-slate-300 font-medium">OpenRouter</span> · <span className="text-slate-700 dark:text-slate-300 font-medium">GitHub API</span>
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400">Built with ☕ by Rinsha Mol K S</p>
        </div>
      </footer>

    </div>
  );
};

export default AboutPage;