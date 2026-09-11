import React from "react";
import { History, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { RecentPromptItem } from "../types";

interface RecentHistoryProps {
  items: RecentPromptItem[];
  onSelectItem: (item: RecentPromptItem) => void;
  onClearHistory: () => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  items,
  onSelectItem,
  onClearHistory,
}) => {
  if (items.length === 0) return null;

  return (
    <div className="mt-8 bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-zinc-500" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-800">
            Recent Optimizations (Local Session)
          </h4>
        </div>
        <button
          onClick={onClearHistory}
          className="text-xs text-zinc-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
          title="Clear local history"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {items.slice(0, 6).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 hover:border-zinc-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1.5">
                <span className="uppercase font-semibold text-zinc-600">{item.mode}</span>
                <span className="font-bold text-zinc-800">Score {item.score}/100</span>
              </div>
              <p className="text-xs text-zinc-800 line-clamp-2 font-medium">
                "{item.originalPrompt}"
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-zinc-200/50 flex items-center justify-between text-[11px] text-zinc-500 group-hover:text-zinc-900 font-mono">
              <span>View result</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 text-[#39FF14]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
