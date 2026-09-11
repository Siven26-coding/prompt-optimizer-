import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
}) => {
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric Connected-Node Agent Symbol */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} bg-zinc-950 rounded-lg border border-zinc-800 shadow-sm group`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Subtle background grid lines */}
          <path
            d="M8 16H24M16 8V24"
            stroke="#27272A"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Connected Network Nodes */}
          <line
            x1="8"
            y1="10"
            x2="16"
            y2="7"
            stroke="#39FF14"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <line
            x1="16"
            y1="7"
            x2="24"
            y2="10"
            stroke="#39FF14"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <line
            x1="24"
            y1="10"
            x2="21"
            y2="22"
            stroke="#39FF14"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <line
            x1="21"
            y1="22"
            x2="11"
            y2="22"
            stroke="#39FF14"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <line
            x1="11"
            y1="22"
            x2="8"
            y2="10"
            stroke="#39FF14"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Core Synthesis Central Lines */}
          <line
            x1="16"
            y1="7"
            x2="16"
            y2="16"
            stroke="#39FF14"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="10"
            x2="16"
            y2="16"
            stroke="#39FF14"
            strokeWidth="1.5"
          />
          <line
            x1="24"
            y1="10"
            x2="16"
            y2="16"
            stroke="#39FF14"
            strokeWidth="1.5"
          />
          <line
            x1="11"
            y1="22"
            x2="16"
            y2="16"
            stroke="#39FF14"
            strokeWidth="1.5"
          />
          <line
            x1="21"
            y1="22"
            x2="16"
            y2="16"
            stroke="#39FF14"
            strokeWidth="1.5"
          />

          {/* Node Anchors */}
          <circle cx="16" cy="7" r="2" fill="#FFFFFF" stroke="#39FF14" strokeWidth="1" />
          <circle cx="8" cy="10" r="1.75" fill="#FFFFFF" />
          <circle cx="24" cy="10" r="1.75" fill="#FFFFFF" />
          <circle cx="11" cy="22" r="1.75" fill="#FFFFFF" />
          <circle cx="21" cy="22" r="1.75" fill="#FFFFFF" />

          {/* Glowing Central Agent Core */}
          <circle
            cx="16"
            cy="16"
            r="2.5"
            fill="#39FF14"
            className="filter drop-shadow-[0_0_4px_#39FF14]"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-zinc-950 font-['Plus_Jakarta_Sans',sans-serif] ${textSizes[size]}`}>
            Prompt<span className="text-zinc-900 font-medium">Forge</span>
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
            agent
          </span>
        </div>
      )}
    </div>
  );
};
