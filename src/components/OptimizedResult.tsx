import React, { useState } from "react";
import { Copy, Check, Download, RefreshCw, Sparkles, Terminal, FileCode, ExternalLink, Sliders } from "lucide-react";
import { OptimizationResult, OptimizationMode } from "../types";

interface OptimizedResultProps {
  result: OptimizationResult;
  mode: OptimizationMode;
  onRegenerate: () => void;
  onImproveAgain: () => void;
}

export const OptimizedResult: React.FC<OptimizedResultProps> = ({
  result,
  mode,
  onRegenerate,
  onImproveAgain,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"formatted" | "raw">("formatted");

  const promptText = result.optimizedPrompt || "";

  const handleCopy = async () => {
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    if (!promptText) return;
    const blob = new Blob([promptText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `optimized-prompt-${mode}-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const wordCount = promptText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedTokens = Math.round(wordCount * 1.35);

  // Split sections to highlight headers nicely in formatted view
  const renderFormattedPrompt = () => {
    const lines = promptText.split("\n");
    const sectionKeywords = [
      "ROLE",
      "OBJECTIVE",
      "CONTEXT",
      "TASK",
      "INPUTS",
      "CONSTRAINTS",
      "PROCESS",
      "OUTPUT FORMAT",
      "QUALITY CRITERIA",
      "EDGE CASES",
      "INSTRUCTIONS",
      "EVALUATION CRITERIA",
    ];

    return (
      <div className="font-mono text-sm leading-relaxed select-text space-y-1">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          // Check if line matches a capitalized section header e.g. "ROLE:" or "### ROLE"
          const isSectionHeader = sectionKeywords.some(
            (kw) =>
              trimmed === kw ||
              trimmed === `${kw}:` ||
              trimmed.startsWith(`### ${kw}`) ||
              trimmed.startsWith(`## ${kw}`) ||
              trimmed.startsWith(`**${kw}**`) ||
              trimmed.startsWith(`${kw} -`)
          );

          if (isSectionHeader) {
            return (
              <div
                key={idx}
                className="pt-4 pb-1 text-[#39FF14] font-bold tracking-wider uppercase flex items-center gap-2 border-b border-zinc-800/80 mt-2 first:mt-0 first:pt-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]"></span>
                <span>{trimmed.replace(/^[#*]+|\:$/g, "").trim()}</span>
              </div>
            );
          }

          // Check for bracketed placeholders like [INSERT_YOUR_STACK]
          const parts = line.split(/(\[[^\]]+\])/g);

          return (
            <div key={idx} className="text-zinc-300 min-h-[1.25rem]">
              {parts.map((part, pIdx) => {
                if (part.startsWith("[") && part.endsWith("]")) {
                  return (
                    <span
                      key={pIdx}
                      className="bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30 px-1 py-0.5 rounded text-xs font-semibold"
                    >
                      {part}
                    </span>
                  );
                }
                return <span key={pIdx}>{part}</span>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden flex flex-col">
      {/* Code-Editor Top Header Bar */}
      <div className="px-4 py-3 bg-[#0A0D12] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 text-xs font-mono text-zinc-400">
            <FileCode className="w-3.5 h-3.5 text-[#39FF14]" />
            <span className="text-zinc-200 font-semibold">promptforge-compiled.md</span>
            <span className="px-1.5 py-0.2 bg-zinc-900 text-zinc-400 rounded text-[10px] uppercase border border-zinc-800">
              {mode}
            </span>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab("formatted")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "formatted"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Structured View
            </button>
            <button
              onClick={() => setActiveTab("raw")}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "raw"
                  ? "bg-zinc-800 text-white font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Raw Markdown
            </button>
          </div>
        </div>
      </div>

      {/* Editor Content Body */}
      <div className="p-5 sm:p-6 bg-[#0D1117] overflow-x-auto min-h-[380px] max-h-[580px] overflow-y-auto">
        {activeTab === "formatted" ? (
          renderFormattedPrompt()
        ) : (
          <pre className="font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap selection:bg-[#39FF14] selection:text-black">
            {promptText}
          </pre>
        )}
      </div>

      {/* Action Toolbar Bar */}
      <div className="px-5 py-3.5 bg-[#0A0D12] border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>~{estimatedTokens} tokens</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-500">Universal compatibility</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Improve Again Button */}
          <button
            id="btn-improve-again"
            onClick={onImproveAgain}
            className="px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Tweak prompt or try another mode"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Improve Again</span>
          </button>

          {/* Regenerate Button */}
          <button
            id="btn-regenerate"
            onClick={onRegenerate}
            className="px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Generate a fresh variation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>

          {/* Download Button */}
          <button
            id="btn-download"
            onClick={handleDownload}
            className="px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Download as Markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          {/* Primary Copy Button */}
          <button
            id="btn-copy-prompt"
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              copied
                ? "bg-[#39FF14] text-zinc-950 shadow-[0_0_15px_rgba(57,255,20,0.6)]"
                : "bg-[#39FF14] hover:bg-[#32e012] text-zinc-950 shadow-[0_0_10px_rgba(57,255,20,0.3)] hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-black" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
