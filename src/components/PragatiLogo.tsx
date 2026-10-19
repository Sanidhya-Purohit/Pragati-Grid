import React from 'react';

interface PragatiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const PragatiLogo: React.FC<PragatiLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-xl overflow-hidden shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nav-saffron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="nav-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <linearGradient id="nav-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Background Rounded Slate/Obsidian Plate */}
          <rect x="2" y="2" width="96" height="96" rx="24" fill="#0B0F19" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.4" />

          {/* Tech Grid Matrix */}
          <path
            d="M25 20v60 M50 20v60 M75 20v60 M20 25h60 M20 50h60 M20 75h60"
            stroke="#1E293B"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Tri-Node Power Topology */}
          {/* Top Center: Innovation & Energy Pulse */}
          <circle cx="50" cy="24" r="8.5" fill="url(#nav-saffron)" />
          <circle cx="50" cy="24" r="3" fill="#FFFFFF" />

          {/* Bottom Left: Civic & Bio Infrastructure */}
          <circle cx="27" cy="71" r="7.5" fill="url(#nav-emerald)" />
          <circle cx="27" cy="71" r="2.5" fill="#FFFFFF" />

          {/* Bottom Right: Digital Computing & Systems */}
          <circle cx="73" cy="71" r="7.5" fill="url(#nav-blue)" />
          <circle cx="73" cy="71" r="2.5" fill="#FFFFFF" />

          {/* Core Central Microcontroller Hub */}
          <rect
            x="42"
            y="43"
            width="16"
            height="16"
            rx="4"
            transform="rotate(45 50 51)"
            fill="#0F172A"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <circle cx="50" cy="51" r="3" fill="#FFFFFF" />

          {/* Interconnecting High-Speed Bus Lines */}
          <path d="M50 32.5 L50 40 M32.5 65.5 L43.5 56.5 M67.5 65.5 L56.5 56.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M27 71 L73 71" stroke="url(#nav-blue)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M32 67 L46 29 M68 67 L54 29" stroke="url(#nav-saffron)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 font-mono">
              Pragati<span className="text-amber-600 dark:text-amber-400 font-sans ml-1">Grid</span>
            </span>
            <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30">
              v2.5 AI
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Autonomous Multi-Domain Problem Triage
          </span>
        </div>
      )}
    </div>
  );
};
