import React from "react";
import { CheckCircle2, Sliders, Shield, Terminal, Bot, Zap, Sparkles, Layers } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const frameworkSteps = [
    { num: "01", name: "Role Calibration", desc: "Injects authoritative domain expertise and contextually tuned persona." },
    { num: "02", name: "Objective Anchoring", desc: "Isolates the single essential goal and primary intended deliverable." },
    { num: "03", name: "Context Grounding", desc: "Adds environmental parameters with bracketed [PLACEHOLDERS] for user variables." },
    { num: "04", name: "Task Imperatives", desc: "Converts passive requests into active, unambiguous operational commands." },
    { num: "05", name: "Input Schemas", desc: "Specifies required source data, formats, and parameter structures." },
    { num: "06", name: "Negative Constraints", desc: "Defines strict boundaries, anti-patterns, and explicit things NOT to do." },
    { num: "07", name: "Reasoning Process", desc: "Mandates step-by-step thinking or chain-of-thought before output production." },
    { num: "08", name: "Output Format", desc: "Enforces exact structural format: Markdown, tables, JSON schemas, or typed code." },
    { num: "09", name: "Quality Benchmarks", desc: "Supplies acceptance criteria, tests, and self-critique metrics." },
    { num: "10", name: "Edge Case Safety", desc: "Mitigates ambiguous inputs, exceptions, and fallback behaviors." },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <Sliders className="w-3.5 h-3.5 text-zinc-700" />
            <span>Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            The 10-Point Engineering Framework
          </h2>
          <p className="text-base text-zinc-600 mt-2">
            PromptForge isn't a wrapper with generic boilerplate. It deploys an algorithmic evaluation model
            grounded in state-of-the-art prompt compilation standards.
          </p>
        </div>

        {/* 10-Point Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {frameworkSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-xl border border-zinc-200 p-4 shadow-2xs hover:border-zinc-300 transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#39FF14] bg-zinc-950 px-1.5 py-0.5 rounded w-fit mb-2.5">
                {step.num}
              </div>
              <h4 className="text-sm font-bold text-zinc-900 mb-1">
                {step.name}
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Modes breakdown */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-zinc-950 mb-6 font-['Plus_Jakarta_Sans',sans-serif] flex items-center gap-2">
            <Layers className="w-5 h-5 text-zinc-700" />
            <span>Optimization Mode Calibration</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 font-mono">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Quick</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Minimal structural adjustments. Sharpens phrasing and clarifies intent while preserving natural brevity for rapid queries.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200 ring-1 ring-zinc-950/10">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 font-mono">
                <Shield className="w-4 h-4 text-[#39FF14]" />
                <span>Professional</span>
                <span className="text-[10px] bg-zinc-950 text-white px-1.5 py-0.2 rounded font-mono">DEFAULT</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Balanced corporate standard: Persona + Objective + Context + Requirements + Explicit Output Formatting.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 font-mono">
                <Terminal className="w-4 h-4 text-zinc-800" />
                <span>Expert</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Deep structured prompt engineering with chain-of-thought, negative constraints, and dynamic placeholders for complex systems.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
              <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 font-mono">
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>Agent</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Autonomous agent loop optimization: Goal decomposition, tool assumptions, state memory, retry policies, and structured JSON output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
