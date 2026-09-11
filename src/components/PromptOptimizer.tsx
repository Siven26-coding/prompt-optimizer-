import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, ArrowRight, CornerDownLeft, AlertCircle, RotateCcw, Zap, ShieldCheck, Bot, FileCheck } from "lucide-react";
import { OptimizationMode, OptimizationResult } from "../types";

interface PromptOptimizerProps {
  initialPrompt?: string;
  initialMode?: OptimizationMode;
  onOptimizationSuccess: (result: OptimizationResult, originalPrompt: string, mode: OptimizationMode) => void;
}

const EXAMPLE_PROMPTS = [
  "make a portfolio website",
  "create an Instagram ad for my cafe",
  "explain JavaScript promises",
  "build a React dashboard",
];

const MODES: { id: OptimizationMode; label: string; description: string; badge: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    id: "quick",
    label: "Quick",
    description: "Rapid polish with minimal boilerplate, preserving brevity.",
    badge: "Fast",
    icon: Zap,
  },
  {
    id: "professional",
    label: "Professional",
    description: "Standard executive structure: Role + Objective + Context + Output.",
    badge: "Default",
    icon: ShieldCheck,
  },
  {
    id: "expert",
    label: "Expert",
    description: "Deep prompt engineering: Chain-of-thought, negative constraints & rubrics.",
    badge: "Advanced",
    icon: Terminal,
  },
  {
    id: "agent",
    label: "Agent",
    description: "Autonomous agentic loop: Tools, memory, error policies & JSON actions.",
    badge: "Agentic",
    icon: Bot,
  },
];

const LOADING_STAGES = [
  "Understanding your intent",
  "Analyzing prompt structure",
  "Detecting missing context",
  "Engineering optimized prompt",
  "Validating output",
];

export const PromptOptimizer: React.FC<PromptOptimizerProps> = ({
  initialPrompt = "",
  initialMode = "professional",
  onOptimizationSuccess,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [mode, setMode] = useState<OptimizationMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync initialPrompt if changed externally (e.g. from template library or history)
  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Manage multi-stage progress ticker when loading
  useEffect(() => {
    let interval: any;
    if (isLoading) {
      setCurrentStageIndex(0);
      interval = setInterval(() => {
        setCurrentStageIndex((prev) => {
          if (prev < LOADING_STAGES.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 900);
    } else {
      setCurrentStageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleOptimize = async () => {
    if (!prompt.trim() || isLoading) return;

    setErrorMessage(null);
    setIsLoading(true);

    // Setup AbortController for timeout / cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          mode,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to optimize prompt. Please try again.");
      }

      onOptimizationSuccess(data, prompt.trim(), mode);
    } catch (err: any) {
      if (err.name === "AbortError") {
        setErrorMessage("The optimization request timed out. Please try with a more focused prompt.");
      } else {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleOptimize();
    }
  };

  const charCount = prompt.length;
  const isOverLimit = charCount > 10000;

  return (
    <section id="optimizer" className="py-12 md:py-16 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-700" />
              <span>Prompt Compiler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Optimize your prompt
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Input a rough idea or incomplete instructions. PromptForge will diagnose and re-engineer it.
            </p>
          </div>

          {/* Shortcut hint */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500 bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs">
            <span>Execute:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-700 font-semibold text-[10px]">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-zinc-700 font-semibold text-[10px]">
              Enter
            </kbd>
          </div>
        </div>

        {/* Editor Main Card */}
        <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-sm overflow-hidden transition-all focus-within:border-zinc-400 focus-within:shadow-md">
          {/* Editor Top Bar: Mode Selector */}
          <div className="p-3.5 bg-zinc-50/90 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-medium text-zinc-500 mr-1.5 hidden sm:inline">
                Mode:
              </span>
              <div className="inline-flex p-1 bg-zinc-200/60 rounded-xl gap-1">
                {MODES.map((m) => {
                  const Icon = m.icon;
                  const isSelected = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      id={`mode-selector-${m.id}`}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setMode(m.id)}
                      className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-zinc-950 text-white font-semibold shadow-xs"
                          : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-[#39FF14]" : "text-zinc-500"}`} />
                      <span>{m.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear button if text exists */}
            {prompt.trim() && (
              <button
                id="btn-clear-prompt"
                type="button"
                disabled={isLoading}
                onClick={() => setPrompt("")}
                className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-200/50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Textarea Area */}
          <div className="relative">
            <textarea
              id="prompt-input-textarea"
              ref={textareaRef}
              rows={6}
              disabled={isLoading}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want the AI to do... (e.g., 'make a portfolio website', 'debug this async function', 'create a high converting ad for my cafe')"
              className="w-full p-4 sm:p-5 text-base sm:text-lg text-zinc-900 placeholder:text-zinc-400 font-sans focus:outline-none resize-y min-h-[160px] leading-relaxed"
            />
          </div>

          {/* Editor Footer Bar */}
          <div className="px-4 py-3 bg-zinc-50/80 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Character counter */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className={isOverLimit ? "text-red-600 font-bold" : "text-zinc-500"}>
                {charCount.toLocaleString()} / 10,000 characters
              </span>
              {prompt.trim() && (
                <span className="text-zinc-400 hidden sm:inline">
                  • ~{Math.ceil(prompt.trim().split(/\s+/).length)} words
                </span>
              )}
            </div>

            {/* Main CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="btn-optimize-submit"
                type="button"
                disabled={isLoading || !prompt.trim() || isOverLimit}
                onClick={handleOptimize}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  isLoading || !prompt.trim() || isOverLimit
                    ? "bg-zinc-200 text-zinc-400 border-zinc-200 cursor-not-allowed"
                    : "bg-zinc-950 text-white hover:bg-black border-zinc-900 shadow-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.35)]"
                }`}
              >
                <Sparkles className={`w-4 h-4 ${prompt.trim() && !isLoading ? "text-[#39FF14]" : "text-zinc-400"}`} />
                <span>{isLoading ? "Optimizing..." : "✨ Optimize Prompt"}</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-zinc-500 hidden sm:inline" />
              </button>
            </div>
          </div>
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 shadow-2xs">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Optimization Failed</p>
              <p className="mt-0.5 text-red-600">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-red-500 hover:text-red-700 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Example prompts pills below the editor */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-zinc-500 mr-1">Examples:</span>
          {EXAMPLE_PROMPTS.map((ex, idx) => (
            <button
              key={idx}
              id={`example-prompt-${idx}`}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setPrompt(ex);
                if (textareaRef.current) textareaRef.current.focus();
              }}
              className="text-xs font-mono text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              "{ex}"
            </button>
          ))}
        </div>

        {/* Multi-Stage Loading Experience Modal / Banner */}
        {isLoading && (
          <div className="mt-6 p-6 rounded-2xl bg-zinc-950 text-white border border-zinc-800 shadow-xl relative overflow-hidden animate-fade-in">
            {/* Glowing neon progress line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-[#39FF14] transition-all duration-700 ease-out shadow-[0_0_12px_#39FF14]"
                style={{
                  width: `${((currentStageIndex + 1) / LOADING_STAGES.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14] animate-ping" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#39FF14]">
                  Synthesis in progress
                </span>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                Stage {currentStageIndex + 1} of {LOADING_STAGES.length}
              </span>
            </div>

            {/* Stages visualization */}
            <div className="space-y-2.5 my-3">
              {LOADING_STAGES.map((stage, idx) => {
                const isCompleted = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                const isPending = idx > currentStageIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 text-sm font-mono transition-all duration-300 ${
                      isCurrent
                        ? "text-white font-semibold translate-x-1"
                        : isCompleted
                        ? "text-zinc-400"
                        : "text-zinc-600 opacity-60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        isCompleted
                          ? "bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40"
                          : isCurrent
                          ? "bg-[#39FF14] text-black font-bold shadow-[0_0_8px_#39FF14]"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <span>{stage}</span>
                    {isCurrent && (
                      <span className="text-[11px] text-[#39FF14] font-normal animate-pulse">
                        (analyzing...)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs font-mono text-zinc-400 pt-3 border-t border-zinc-800/80">
              Transforming intent via PromptForge 10-point framework • Gemini 3.8 Flash
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
