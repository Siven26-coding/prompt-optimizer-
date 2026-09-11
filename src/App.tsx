import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PromptOptimizer } from "./components/PromptOptimizer";
import { PromptAnalysis } from "./components/PromptAnalysis";
import { OptimizedResult } from "./components/OptimizedResult";
import { TemplateLibrary } from "./components/TemplateLibrary";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { RecentHistory } from "./components/RecentHistory";
import { SetupGuideModal } from "./components/SetupGuideModal";
import { OptimizationResult, OptimizationMode, PromptTemplate, RecentPromptItem } from "./types";
import { Sparkles, ArrowDown, CheckCircle2 } from "lucide-react";

const HISTORY_STORAGE_KEY = "promptforge_recent_history_v1";

export default function App() {
  const [activePrompt, setActivePrompt] = useState<string>("");
  const [activeMode, setActiveMode] = useState<OptimizationMode>("professional");
  const [currentResult, setCurrentResult] = useState<OptimizationResult | null>(null);
  const [lastOptimizedOriginal, setLastOptimizedOriginal] = useState<string>("");
  const [recentHistory, setRecentHistory] = useState<RecentPromptItem[]>([]);
  const [showSetupModal, setShowSetupModal] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);
  const optimizerRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setRecentHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load recent history from localStorage:", e);
    }
  }, []);

  // Save history to localStorage
  const saveHistoryItem = (originalPrompt: string, mode: OptimizationMode, result: OptimizationResult) => {
    const newItem: RecentPromptItem = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      originalPrompt,
      mode,
      score: result.score,
      timestamp: Date.now(),
      result,
    };

    setRecentHistory((prev) => {
      const updated = [newItem, ...prev.filter((i) => i.originalPrompt !== originalPrompt)].slice(0, 12);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn("Could not save recent history to localStorage:", e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setRecentHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
  };

  const handleOptimizationSuccess = (
    result: OptimizationResult,
    originalPrompt: string,
    mode: OptimizationMode
  ) => {
    setCurrentResult(result);
    setLastOptimizedOriginal(originalPrompt);
    setActiveMode(mode);
    saveHistoryItem(originalPrompt, mode, result);

    // Smooth scroll to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleSelectTemplate = (template: PromptTemplate) => {
    setActivePrompt(template.roughPrompt);
    setActiveMode(template.recommendedMode);

    // Scroll to optimizer
    const el = document.getElementById("optimizer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectHistoryItem = (item: RecentPromptItem) => {
    setActivePrompt(item.originalPrompt);
    setActiveMode(item.mode);
    setCurrentResult(item.result);
    setLastOptimizedOriginal(item.originalPrompt);

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleRegenerate = async () => {
    if (!lastOptimizedOriginal) return;

    // Trigger re-optimization via optimizer
    setActivePrompt(lastOptimizedOriginal);
    const el = document.getElementById("btn-optimize-submit");
    if (el) {
      el.click();
    }
  };

  const handleImproveAgain = () => {
    if (currentResult?.optimizedPrompt) {
      setActivePrompt(currentResult.optimizedPrompt);
    }
    const el = document.getElementById("optimizer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-[#39FF14] selection:text-black">
      {/* Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenSetupGuide={() => setShowSetupModal(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOptimizeClick={() => handleNavigate("optimizer")}
          onExploreTemplatesClick={() => handleNavigate("templates")}
        />

        {/* Optimizer Section */}
        <div ref={optimizerRef}>
          <PromptOptimizer
            initialPrompt={activePrompt}
            initialMode={activeMode}
            onOptimizationSuccess={handleOptimizationSuccess}
          />
        </div>

        {/* Results Workspace: Displayed when prompt optimization succeeds */}
        {currentResult && (
          <section
            id="results"
            ref={resultsRef}
            className="py-16 bg-zinc-100/70 border-b border-zinc-200 scroll-mt-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Section Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
                    <span>Compilation Complete</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                    Optimized Prompt & Analysis
                  </h2>
                  <p className="text-sm text-zinc-600 mt-1">
                    Your prompt was evaluated, structured into standard engineering blocks, and calibrated for modern LLMs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-500">Mode:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-950 text-white font-mono text-xs uppercase font-bold tracking-wider">
                    {activeMode}
                  </span>
                </div>
              </div>

              {/* 2-Column Desktop / Stacked Mobile Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Prompt Analysis & Scores (5 cols on lg) */}
                <div className="lg:col-span-5 space-y-6">
                  <PromptAnalysis result={currentResult} />
                </div>

                {/* Right Column: Code-Editor Optimized Prompt (7 cols on lg) */}
                <div className="lg:col-span-7 space-y-6">
                  <OptimizedResult
                    result={currentResult}
                    mode={activeMode}
                    onRegenerate={handleRegenerate}
                    onImproveAgain={handleImproveAgain}
                  />
                </div>
              </div>

              {/* Recent History (if any) */}
              <RecentHistory
                items={recentHistory}
                onSelectItem={handleSelectHistoryItem}
                onClearHistory={handleClearHistory}
              />
            </div>
          </section>
        )}

        {/* Template Library */}
        <TemplateLibrary onSelectTemplate={handleSelectTemplate} />

        {/* How it Works / 10-Point Framework */}
        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer
        onOpenSetup={() => setShowSetupModal(true)}
        onNavigate={handleNavigate}
      />

      {/* Setup & Deployment Guide Modal */}
      <SetupGuideModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      />
    </div>
  );
}
