export interface AnalysisResponse {
  repositoryName: string;
  repositoryUrl: string;
  metadata: {
    description: string | null;
    stars: number;
    forks: number;
    language: string;
    defaultBranch: string;
    createdAt: string;
    updatedAt: string;
  };
  analysis: {
    projectStatus: string;
    completionPercentage: number;
    summary: string;
    strengths: string[];
    improvements: Array<{
      id: string;
      description: string;
      priority: string;
      effortLevel: string;
      estimatedHours: number;
      category: string;
      impact: string;
      tags: string[];
    }>;
    suggestedUpdates: Array<{
      id: string;
      packageName: string;
      currentVersion: string;
      recommendedVersion: string;
      priority: string;
      breakingChanges: boolean;
      reason: string;
      riskLevel: string;
    }>;
    techStack: {
      languages: Array<{ name: string; version: string; releaseDate?: string }>;
      frameworks: Array<{ name: string; version: string; releaseDate?: string }>;
      libraries: Array<{ name: string; version: string; purpose: string }>;
      buildTool: { name: string; version: string; releaseDate?: string };
      architecturePatterns: string[];
      targetPlatform: string;
    };
    codeQuality: {
      rating: string;
      issues: string[];
      bestPractices: string[];
      estimatedTestCoverage: number;
    };
    riskAssessment: {
      overallRiskLevel: string;
      risks: Array<{ issue: string; severity: string; mitigation: string }>;
    } | null;
  };
  processingTimeMs: number;
  errorMessage: {
  message: string;
  errorCode: string;
  timestamp: string;
} | null;
}