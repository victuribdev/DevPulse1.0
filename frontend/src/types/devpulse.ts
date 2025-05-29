export interface DevPulseAnalysis {
  username: string;
  averageCommitsPerDay: number;
  lateNightCommits: number;
  weekendCommitRatio: number;
  consecutiveDays: number;
  idleDays: number;
  suspectWords: string[];
  trend: string;
  recommendationScore: number;
  advice: string;
  commitFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  workLifeBalance: number;
  productivityScore: number;
  commitPatterns: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  activityHours: Record<string, number>;
  projectDiversity: number;
}

export interface DevPulseReport {
  username: string;
  totalCommits: number;
  totalRepositories: number;
  averageCommitsPerRepo: number;
  analysisDate: string;
}

export interface DevPulseTrend {
  username: string;
  weeklyTrend: number[];
  monthlyTrend: number[];
  activityLevel: 'low' | 'medium' | 'high';
}

export interface DevPulseRecommendation {
  username: string;
  recommendations: string[];
  score: number;
  healthLevel: 'good' | 'warning' | 'critical';
}
