export type OptimizationMode = "quick" | "professional" | "expert" | "agent";

export interface ScoreBreakdown {
  context: number;
  specificity: number;
  constraints: number;
  outputFormat: number;
  clarity: number;
}

export interface OptimizationResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingElements: string[];
  improvements: string[];
  recommendedModel: string;
  complexity: "simple" | "intermediate" | "advanced" | "agentic" | string;
  breakdown: ScoreBreakdown;
  optimizedPrompt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Design" | "Marketing" | "AI" | "Education" | "Business";
  roughPrompt: string;
  recommendedMode: OptimizationMode;
  tags: string[];
}

export interface RecentPromptItem {
  id: string;
  originalPrompt: string;
  mode: OptimizationMode;
  score: number;
  timestamp: number;
  result: OptimizationResult;
}
