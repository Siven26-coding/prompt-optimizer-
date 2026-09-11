import React from "react";
import { ArrowRight, Sparkles, Terminal, Cpu, CheckCircle2, Zap } from "lucide-react";

interface HeroProps {
  onOptimizeClick: () => void;
  onExploreTemplatesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOptimizeClick,
  onExploreTemplatesClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-white border-b border-zinc-200">
      {/* Subtle background tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Agent status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs font-mono font-medium text-zinc-700 mb-6 shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]"></span>
            </span>
            <span>Autonomous Prompt Compiler & Evaluator</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-500 font-normal">Gemini Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif] leading-[1.12]">
            Turn messy prompts into{" "}
            <span className="relative inline-block text-zinc-950">
              powerful AI instructions.
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#39FF14]/25 -z-10 rounded-sm"></span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto font-normal">
            PromptForge analyzes your intent, fills the gaps, and transforms rough ideas
            into structured prompts designed for better AI results.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="hero-cta-optimize"
              onClick={onOptimizeClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-950 text-white font-semibold text-base hover:bg-black transition-all shadow-sm hover:shadow-[0_0_20px_rgba(57,255,20,0.35)] flex items-center justify-center gap-2 group cursor-pointer border border-zinc-800"
            >
              <Sparkles className="w-5 h-5 text-[#39FF14] transition-transform group-hover:scale-110" />
              <span>Optimize a Prompt</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="hero-cta-templates"
              onClick={onExploreTemplatesClick}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-base transition-colors flex items-center justify-center gap-2 cursor-pointer border border-zinc-200"
            >
              <span>Explore Templates</span>
            </button>
          </div>
        </div>

        {/* Visual Transformation Representation + Connected Nodes Agent Visual */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 md:p-8 shadow-xl relative overflow-hidden">
            {/* Corner glowing neon accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#39FF14]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                <span className="ml-2 text-xs font-mono text-zinc-400">
                  promptforge-compiler::pipeline
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"></span>
                <span>Active Transformation</span>
              </div>
            </div>

            {/* The 4-Stage Transformation Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* STAGE 1: ROUGH PROMPT */}
              <div className="bg-zinc-900/90 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-red-400 font-semibold tracking-wider uppercase">Stage 01</span>
                    <span className="text-zinc-500">Input</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                    Rough Prompt
                  </h4>
                  <div className="bg-black/60 rounded-lg p-2.5 font-mono text-xs text-zinc-300 border border-zinc-800/80 italic">
                    "make a portfolio website with projects and contact"
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span>
                  Vague intent, no constraints
                </div>
              </div>

              {/* STAGE 2: ANALYZE */}
              <div className="bg-zinc-900/90 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-[#39FF14] font-semibold tracking-wider uppercase">Stage 02</span>
                    <span className="text-zinc-500">Audit</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#39FF14]" />
                    Analyze
                  </h4>
                  <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[11px] text-zinc-400 border border-zinc-800/80 space-y-1">
                    <div className="text-amber-400/90">✗ Missing tech stack</div>
                    <div className="text-amber-400/90">✗ No audience/tone</div>
                    <div className="text-amber-400/90">✗ No acceptance tests</div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  5 critical gaps detected
                </div>
              </div>

              {/* STAGE 3: ENGINEER */}
              <div className="bg-zinc-900/90 rounded-xl p-4 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-[#39FF14] font-semibold tracking-wider uppercase">Stage 03</span>
                    <span className="text-zinc-500">Synthesize</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#39FF14]" />
                    Engineer
                  </h4>
                  <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[11px] text-zinc-400 border border-zinc-800/80 space-y-1">
                    <div className="text-zinc-300">+ Persona calibration</div>
                    <div className="text-zinc-300">+ Negative constraints</div>
                    <div className="text-zinc-300">+ Reusable placeholders</div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#39FF14] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse"></span>
                  10-point framework applied
                </div>
              </div>

              {/* STAGE 4: OPTIMIZED PROMPT */}
              <div className="bg-zinc-900/90 rounded-xl p-4 border border-[#39FF14]/40 flex flex-col justify-between shadow-[0_0_15px_rgba(57,255,20,0.1)]">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-[#39FF14] font-semibold tracking-wider uppercase">Stage 04</span>
                    <span className="text-[#39FF14] font-bold">Score 96</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
                    Optimized Prompt
                  </h4>
                  <div className="bg-black/80 rounded-lg p-2.5 font-mono text-[10.5px] text-zinc-300 border border-zinc-800/90 leading-tight space-y-0.5">
                    <span className="text-[#39FF14] font-bold block">ROLE:</span>
                    <span className="text-zinc-400 block truncate">Staff Frontend Architect</span>
                    <span className="text-[#39FF14] font-bold block mt-1">CONSTRAINTS:</span>
                    <span className="text-zinc-400 block truncate">WCAG AA, responsive, no CDNs</span>
                  </div>
                </div>
                <div className="mt-3 text-[11px] font-mono text-[#39FF14] flex items-center justify-between">
                  <span>Ready to deploy</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#39FF14]/10 text-[#39FF14] text-[10px] uppercase font-bold">100% Copyable</span>
                </div>
              </div>
            </div>

            {/* Connected Nodes Diagram Graphic */}
            <div className="mt-6 pt-5 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-4">
                <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]"></span>
                  Cross-Platform Support:
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Gemini 3.8 / Pro</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">ChatGPT / GPT-4o</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Claude 3.5 Sonnet</span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Autonomous Agents</span>
              </div>
              <div className="text-zinc-500 hidden sm:block">
                Ctrl + Enter to compile
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
