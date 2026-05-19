import React from "react";
import { ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import type { AnalysisResponse } from "../../types/analysis";

interface Props {
  quality: AnalysisResponse["analysis"]["codeQuality"];
}

const getRatingColor = (rating: string) => {
  if (rating === "Excellent") return { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" };
  if (rating === "Good") return { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" };
  if (rating === "Fair") return { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800" };
  return { bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" };
};

const getCoverageColor = (coverage: number) => {
  if (coverage >= 70) return "bg-green-500";
  if (coverage >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

const CodeQuality: React.FC<Props> = ({ quality }) => {
  if (!quality) return null;

  const ratingColor = getRatingColor(quality.rating);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400 font-bold">
        <ShieldCheck size={20} /> Code Quality
      </div>

      {/* Rating Badge */}
      <div className={`inline-flex items-center px-4 py-2 rounded-lg border mb-4 ${ratingColor.bg} ${ratingColor.border}`}>
        <span className={`text-2xl font-black ${ratingColor.text}`}>{quality.rating ?? 'Unknown'}</span>
      </div>

      {/* Test Coverage */}
      {quality.estimatedTestCoverage !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold tracking-wider">Est. Test Coverage</span>
            <span className="text-xs font-bold dark:text-white">{quality.estimatedTestCoverage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getCoverageColor(quality.estimatedTestCoverage)}`}
              style={{ width: `${quality.estimatedTestCoverage}%` }}
            />
          </div>
        </div>
      )}

      {/* Best Practices */}
      {quality.bestPractices?.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">Best Practices</p>
          <ul className="space-y-1">
            {quality.bestPractices.map((bp, i) => (
              <li key={i} className="text-xs flex items-start gap-2 text-gray-600 dark:text-slate-300">
                <CheckCircle size={12} className="text-green-500 shrink-0 mt-0.5" />
                {bp}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Issues */}
      {quality.issues?.length > 0 && (
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">Key Issues</p>
          <ul className="space-y-1">
            {quality.issues.map((issue, i) => (
              <li key={i} className="text-xs flex items-start gap-2 text-gray-600 dark:text-slate-300">
                <AlertTriangle size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!quality.issues?.length && !quality.bestPractices?.length && (
        <p className="text-sm text-gray-400">No quality data available</p>
      )}
    </div>
  );
};

export default CodeQuality;