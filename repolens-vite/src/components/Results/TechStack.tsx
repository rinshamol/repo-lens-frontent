import React from 'react';
import { Layers } from 'lucide-react';
import type { AnalysisResponse } from '../../types/analysis';

interface Props {
  stack: AnalysisResponse['analysis']['techStack'];
  metadataLanguage?: string | null;
}

const TechStack: React.FC<Props> = ({ stack, metadataLanguage }) => {
  if (!stack) return null;

  const languages = stack?.languages?.length > 0
    ? stack.languages
    : metadataLanguage
      ? [{ name: metadataLanguage, version: '' }]
      : [];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
        <Layers size={20} /> Tech Stack
      </div>

      {languages.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((l) => (   
              <span key={l.name} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-md font-medium">
                {l.name} {l.version}
              </span>
            ))}
          </div>
        </div>
      )}

      {stack.frameworks?.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">Frameworks</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.frameworks.map((f) => (
              <span key={f.name} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                {f.name} {f.version}
              </span>
            ))}
          </div>
        </div>
      )}

      {stack.libraries?.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">Libraries</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.libraries.map((l) => (
              <span key={l.name} title={l.purpose} className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-md font-medium cursor-help">
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {stack.architecturePatterns?.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">Patterns</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.architecturePatterns.map((p) => (
              <span key={p} className="px-2 py-1 bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded-md">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {stack.targetPlatform && stack.targetPlatform !== 'Unknown' && (
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1.5">Platform</p>
          <span className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-md font-medium">
            {stack.targetPlatform}
          </span>
        </div>
      )}

      {!languages.length && !stack.frameworks?.length && !stack.libraries?.length && (
        <p className="text-sm text-gray-400">No tech stack data available</p>
      )}
    </div>
  );
};

export default TechStack;