import React, { useState } from "react";
import { X, Copy, Check, Terminal, Shield, Key, Sparkles, CheckCircle2 } from "lucide-react";

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SetupGuideModal: React.FC<SetupGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl border border-zinc-200 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-[#39FF14]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif]">
                PromptForge Architecture & Setup
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Developer instructions & production deployment guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Section 1: NPM Install */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-mono">1</span>
              Install Dependencies
            </h4>
            <p className="text-xs text-zinc-600">
              Install the required server, frontend, and SDK packages:
            </p>
            <div className="relative group bg-zinc-950 rounded-xl p-3 font-mono text-xs text-zinc-200 border border-zinc-800">
              <code>npm install</code>
              <button
                onClick={() => copySnippet("npm install", "install")}
                className="absolute right-2.5 top-2.5 p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                {copiedSection === "install" ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Section 2: Environment Variables */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-mono">2</span>
              Environment Variables & Gemini Configuration
            </h4>
            <p className="text-xs text-zinc-600">
              Create a <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 font-mono">.env</code> file in your project root. The Gemini API key is accessed exclusively server-side and never exposed to the client bundle:
            </p>
            <div className="relative group bg-zinc-950 rounded-xl p-3 font-mono text-xs text-zinc-200 border border-zinc-800">
              <pre>{`# .env
GEMINI_API_KEY="your-google-gemini-api-key"
PORT=3000`}</pre>
              <button
                onClick={() => copySnippet('GEMINI_API_KEY="your-google-gemini-api-key"\nPORT=3000', "env")}
                className="absolute right-2.5 top-2.5 p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                {copiedSection === "env" ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Section 3: Development Server */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-mono">3</span>
              Launch Development Server
            </h4>
            <p className="text-xs text-zinc-600">
              Run the full-stack server with Vite middleware and Express API routes:
            </p>
            <div className="relative group bg-zinc-950 rounded-xl p-3 font-mono text-xs text-zinc-200 border border-zinc-800">
              <code>npm run dev</code>
              <button
                onClick={() => copySnippet("npm run dev", "dev")}
                className="absolute right-2.5 top-2.5 p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                {copiedSection === "dev" ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Section 4: Production Build */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-mono">4</span>
              Production Build & Start
            </h4>
            <p className="text-xs text-zinc-600">
              Compile the frontend bundle with Vite and bundle the backend into a standalone CommonJS server:
            </p>
            <div className="relative group bg-zinc-950 rounded-xl p-3 font-mono text-xs text-zinc-200 border border-zinc-800">
              <pre>{`npm run build
npm start`}</pre>
              <button
                onClick={() => copySnippet("npm run build\nnpm start", "build")}
                className="absolute right-2.5 top-2.5 p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
              >
                {copiedSection === "build" ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
