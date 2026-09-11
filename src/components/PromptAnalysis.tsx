import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, TrendingUp, Cpu, Gauge } from "lucide-react";
import { OptimizationResult } from "../types";

interface PromptAnalysisProps {
  result: OptimizationResult;
}

export const PromptAnalysis: React.FC<PromptAnalysisProps> = ({ result }) => {
  const { score, summary, strengths, weaknesses, missingElements, improvements, recommendedModel, complexity, breakdown } = result;

  // Visual color determination for overall score
  const getScoreColor = (val: number) => {
    if (val >= 80) return "text-[#39FF14]";
    if (val >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (val: number) => {
    if (val >= 80) return "bg-[#39FF14]";
    if (val >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const getScoreGrade = (val: number) => {
    if (val >= 80) return "High Quality";
    if (val >= 50) return "Moderate / Incomplete";
    return "Needs Heavy Engineering";
  };

  const breakdownMetrics = [
    { label: "Context", value: breakdown?.context ?? 30, desc: "Background domain and environment info" },
    { label: "Specificity", value: breakdown?.specificity ?? 45, desc: "Concrete detail vs vague descriptions" },
    { label: "Constraints", value: breakdown?.constraints ?? 20, desc: "Explicit technical or styling boundaries" },
    { label: "Output Format", value: breakdown?.outputFormat ?? 10, desc: "Markdown, JSON, schema or code structure" },
    { label: "Clarity", value: breakdown?.clarity ?? 70, desc: "Unambiguous language without conflict" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Score Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              <Gauge className="w-3.5 h-3.5 text-zinc-700" />
              <span>Diagnostic Report</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif]">
              Original Prompt Audit
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Evaluation before PromptForge optimization was applied
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Prompt Quality
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-extrabold font-mono tracking-tight ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className="text-zinc-400 font-mono text-lg font-medium">/100</span>
              </div>
            </div>

            <div className="hidden sm:block">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold font-mono border ${
                score >= 80
                  ? "bg-[#39FF14]/10 text-zinc-900 border-[#39FF14]/40"
                  : score >= 50
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}>
                {getScoreGrade(score)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-out rounded-full ${getScoreBg(score)}`}
              style={{ width: `${Math.max(5, score)}%` }}
            />
          </div>
        </div>

        {/* Summary note */}
        {summary && (
          <p className="mt-4 text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/80">
            <span className="font-semibold text-zinc-900">Diagnosis:</span> {summary}
          </p>
        )}

        {/* Model and Complexity Badges */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500">Recommended Model:</span>
            <span className="font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {recommendedModel || "Gemini 3.8 / GPT-4o / Claude 3.5"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Complexity:</span>
            <span className="capitalize font-semibold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {complexity || "intermediate"}
            </span>
          </div>
        </div>
      </div>

      {/* Structured Metric Breakdown */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 font-mono">
          Structured Dimensional Breakdown
        </h4>

        <div className="space-y-4">
          {breakdownMetrics.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-800">{item.label}</span>
                  <span className="text-zinc-400 hidden sm:inline">• {item.desc}</span>
                </div>
                <span className="font-bold text-zinc-900">{item.value}/100</span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    item.value >= 70
                      ? "bg-zinc-900"
                      : item.value >= 40
                      ? "bg-zinc-600"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 mb-3">
            <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0" />
            <span>Strengths Detected</span>
          </div>
          {strengths && strengths.length > 0 ? (
            <ul className="space-y-2 text-xs text-zinc-600">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-zinc-400 mt-0.5">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-400 italic">No significant strengths found in rough input.</p>
          )}
        </div>

        {/* Weaknesses */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Weaknesses Identified</span>
          </div>
          {weaknesses && weaknesses.length > 0 ? (
            <ul className="space-y-2 text-xs text-zinc-600">
              {weaknesses.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-400 italic">No major structural flaws identified.</p>
          )}
        </div>
      </div>

      {/* Missing Elements & Key Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Missing Elements */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 mb-3">
            <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>Missing Elements</span>
          </div>
          {missingElements && missingElements.length > 0 ? (
            <ul className="space-y-2 text-xs text-zinc-700">
              {missingElements.map((elem, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="font-medium">{elem}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-400 italic">No missing core elements identified.</p>
          )}
        </div>

        {/* Improvements Added */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 mb-3">
            <TrendingUp className="w-4 h-4 text-zinc-950 shrink-0" />
            <span>Improvements Engineered</span>
          </div>
          {improvements && improvements.length > 0 ? (
            <ul className="space-y-2 text-xs text-zinc-700">
              {improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shrink-0 mt-1.5" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-zinc-400 italic">Standard structural upgrades applied.</p>
          )}
        </div>
      </div>
    </div>
  );
};
