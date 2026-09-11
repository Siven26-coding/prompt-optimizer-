import React from "react";
import { Logo } from "./Logo";
import { Terminal, Shield, Sparkles, ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenSetup: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSetup, onNavigate }) => {
  return (
    <footer className="bg-white border-t border-zinc-200 py-12 text-sm text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-2">
            <Logo size="md" />
            <p className="text-zinc-600 text-sm max-w-sm leading-relaxed">
              "Turn messy prompts into powerful AI instructions."
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Engineered with Google Gemini 3.8 Flash • Production Full-Stack Architecture
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
              Product
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("optimizer")}
                  className="hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  Prompt Optimizer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("templates")}
                  className="hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  Template Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("how-it-works")}
                  className="hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  10-Point Framework
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSetup}
                  className="hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  Setup & API Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: System Status & Security */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900">
              System & Security
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-zinc-700 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse"></span>
                <span>API Gateway Active</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Zero client-side API key exposure. Prompts processed transiently without persistent server logging.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-mono">
          <div>
            © {new Date().getFullYear()} PromptForge. Built for developers, prompt engineers, and AI builders.
          </div>
          <div className="flex items-center gap-4">
            <span>Shortcut: Ctrl + Enter to Compile</span>
            <span>•</span>
            <span className="text-zinc-500">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
