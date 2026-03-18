import React from 'react';
import { AlertOctagon, ShieldAlert } from 'lucide-react';
import type { AnalysisResponse } from '../../types/analysis';

interface Props {
  risks: AnalysisResponse['analysis']['riskAssessment'];
}

const RiskAssessment: React.FC<Props> = ({ risks }) => {
  const getRiskColor = (level: string) => {
    if (level === 'Critical' || level === 'High') return 'text-red-700 border-red-200 bg-red-50 dark:bg-red-900/20 dark:text-red-300';
    if (level === 'Medium') return 'text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300';
    return 'text-green-700 border-green-200 bg-green-50 dark:bg-green-900/20 dark:text-green-300';
  };

  if (!risks) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4 text-red-500 font-bold">
          <AlertOctagon size={20} /> Risk Assessment
        </div>
        <p className="text-sm text-gray-400">No risk data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4 text-red-500 font-bold">
        <AlertOctagon size={20} /> Risk Assessment
      </div>

      <div className={`mb-4 p-3 rounded-lg border font-bold text-center text-sm ${getRiskColor(risks.overallRiskLevel)}`}>
        Overall Risk: {risks.overallRiskLevel}
      </div>

      {risks.risks?.length > 0 && (
        <div className="space-y-3">
          <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
            Vulnerabilities
          </label>
          <ul className="space-y-2">
            {risks.risks.map((risk, i) => (
              <li key={i} className="text-xs group relative cursor-help border-b border-gray-50 dark:border-slate-700 pb-1 last:border-0">
                <div className="flex items-start gap-2 text-gray-700 dark:text-slate-300">
                  <ShieldAlert size={14} className="shrink-0 text-red-500 mt-0.5" />
                  <span>{risk.issue}</span>
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-0 z-10 w-full p-2 mb-1 bg-gray-900 text-white text-[10px] rounded shadow-xl">
                  Mitigation: {risk.mitigation}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;