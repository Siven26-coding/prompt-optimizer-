import React from "react";
import { Logo } from "./Logo";
import { Sparkles, Terminal, BookOpen, Layers, HelpCircle } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenSetupGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenSetupGuide }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          id="nav-brand-logo"
          onClick={() => onNavigate("hero")}
          className="cursor-pointer"
        >
          <Logo size="md" />
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-600">
          <button
            id="nav-link-optimizer"
            onClick={() => onNavigate("optimizer")}
            className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-zinc-500" />
            <span>Optimizer</span>
          </button>

          <button
            id="nav-link-templates"
            onClick={() => onNavigate("templates")}
            className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-zinc-500" />
            <span>Templates</span>
          </button>

          <button
            id="nav-link-how-it-works"
            onClick={() => onNavigate("how-it-works")}
            className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-zinc-500" />
            <span>How it Works</span>
          </button>

          <button
            id="nav-link-setup"
            onClick={onOpenSetupGuide}
            className="px-3 py-1.5 rounded-md hover:text-zinc-950 hover:bg-zinc-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Setup & API Guide"
          >
            <HelpCircle className="w-4 h-4 text-zinc-500" />
            <span>Docs & Setup</span>
          </button>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-500 font-mono bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></span>
            <span>Gemini 3.8 Online</span>
          </div>

          <button
            id="nav-cta-optimize"
            onClick={() => onNavigate("optimizer")}
            className="px-4 py-2 text-sm font-semibold text-zinc-950 bg-zinc-950 hover:bg-black text-white rounded-lg transition-all shadow-sm hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center gap-2 group cursor-pointer border border-zinc-800"
          >
            <Sparkles className="w-4 h-4 text-[#39FF14] transition-transform group-hover:rotate-12" />
            <span>Optimize Prompt</span>
          </button>
        </div>
      </div>
    </header>
  );
};
