import React from 'react';
import { ExternalLink, RefreshCw, Star, GitFork, Calendar, Clock } from 'lucide-react';
import type { AnalysisResponse } from '../../types/analysis';
import TechStack from './TechStack';
import CodeQuality from './CodeQuality';
import RiskAssessment from './RiskAssessment';


interface Props {
  data: AnalysisResponse;
  onReset: () => void;
}

const getPriorityColor = (priority: string) => {
  if (priority === 'Critical') return 'bg-red-100 text-red-700';
  if (priority === 'High') return 'bg-orange-100 text-orange-700';
  if (priority === 'Medium') return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
};

const getStatusColor = (status: string) => {
  if (status === 'Complete') return 'bg-green-100 text-green-700';
  if (status === 'In Progress') return 'bg-blue-100 text-blue-700';
  return 'bg-gray-100 text-gray-600';
};

const AnalysisResult: React.FC<Props> = ({ data, onReset }) => {
  const { analysis, repositoryName, repositoryUrl, metadata, processingTimeMs } = data;
   if (!analysis) {
    return null;
  }
  // Parse summary if it's a raw JSON string (backend bug workaround)
  let parsedAnalysis = analysis;
  if (analysis.summary?.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(analysis.summary);
      parsedAnalysis = { ...analysis, ...parsed };
    } catch {
      // keep original if parse fails
    }
  }

  const {
    projectStatus,
    completionPercentage,
    summary,
    strengths,
    improvements,
    suggestedUpdates,
    techStack,
    codeQuality,
    riskAssessment,
  } = parsedAnalysis;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-700">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
              {repositoryName}
              <a href={repositoryUrl} target="_blank" rel="noreferrer"
                className="text-indigo-500 hover:opacity-80">
                <ExternalLink size={20} />
              </a>
            </h2>
            {metadata?.description && (
              <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">{metadata.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Star size={14} /> {metadata?.stars ?? 0}</span>
              <span className="flex items-center gap-1"><GitFork size={14} /> {metadata?.forks ?? 0}</span>
              {metadata?.language && <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">{metadata.language}</span>}
              {metadata?.updatedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> Updated {new Date(metadata.updatedAt).toLocaleDateString()}
                </span>
              )}
              <span className="flex items-center gap-1"><Clock size={14} /> {(processingTimeMs / 1000).toFixed(1)}s</span>
            </div>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shrink-0"
          >
            <RefreshCw size={18} /> New Analysis
          </button>
        </div>
      </div>

      {/* Status + Completion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-2">Project Status</p>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(projectStatus)}`}>
            {projectStatus ?? 'Unknown'}
          </span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-2">Completion</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 dark:bg-slate-600 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${completionPercentage ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-bold dark:text-white">{completionPercentage ?? 0}%</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && !summary.trim().startsWith('{') && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-lg mb-3 dark:text-white">Summary</h3>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Strengths */}
      {strengths?.length > 0 && strengths[0] !== 'Unable to parse detailed strengths' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-lg mb-3 dark:text-white">Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                <span className="text-green-500 mt-0.5">✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech / Quality / Risk */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TechStack stack={techStack} metadataLanguage={metadata?.language} />
        <CodeQuality quality={codeQuality} />
        <RiskAssessment risks={riskAssessment} />
      </div>

      {/* Improvements */}
      {improvements?.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-lg mb-4 dark:text-white">Improvements</h3>
          <div className="space-y-3">
            {improvements.map((imp) => (
              <div key={imp.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
                <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 mt-0.5 ${getPriorityColor(imp.priority)}`}>
                  {imp.priority}
                </span>
                <div>
                  <p className="text-sm text-gray-800 dark:text-slate-200">{imp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {imp.category && <span className="text-xs text-gray-500 dark:text-slate-400">{imp.category}</span>}
                    {imp.effortLevel && <span className="text-xs text-gray-400">· {imp.effortLevel}</span>}
                    {imp.estimatedHours > 0 && <span className="text-xs text-gray-400">· ~{imp.estimatedHours}h</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Updates */}
      {suggestedUpdates?.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-lg mb-4 dark:text-white">Suggested Package Updates</h3>
          <div className="space-y-3">
            {suggestedUpdates.map((upd) => (
              <div key={upd.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600">
                <span className={`px-2 py-0.5 rounded text-xs font-bold shrink-0 ${getPriorityColor(upd.priority)}`}>
                  {upd.priority}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold dark:text-white">{upd.packageName}</span>
                    <span className="text-xs text-gray-400 line-through">{upd.currentVersion}</span>
                    <span className="text-xs">→</span>
                    <span className="text-xs text-green-600 font-medium">{upd.recommendedVersion}</span>
                    {upd.breakingChanges && (
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">Breaking</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{upd.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AnalysisResult;