import React from 'react';
import {
  Cpu,
  ShieldCheck,
  RotateCcw,
  Sun,
  Moon,
  Sparkles,
  Users,
  Compass,
  FileCheck2,
  AlertCircle,
  Activity,
  Layers,
} from 'lucide-react';
import type { Persona } from '../types';
import { useToast } from '../context/ToastContext';
import { PragatiLogo } from './PragatiLogo';

interface NavbarProps {
  currentTab: 'feed' | 'report' | 'submissions';
  onTabChange: (tab: 'feed' | 'report' | 'submissions') => void;
  persona: Persona;
  onPersonaChange: (persona: Persona) => void;
  stats: {
    totalProblems: number;
    solvedCount: number;
    totalImpactPoints: number;
  };
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onResetDemoData: () => void;
  onOpenVerifyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  persona,
  onPersonaChange,
  stats,
  theme,
  onToggleTheme,
  onResetDemoData,
  onOpenVerifyModal,
}) => {
  const { showToast } = useToast();

  const handleReset = () => {
    onResetDemoData();
    showToast({
      type: 'info',
      title: 'Demo Data Reset',
      description: 'Loaded multi-domain engineering challenges and verified student credentials.',
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-[#080b11]/95 border-b border-slate-200/90 dark:border-slate-800/80 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Telemetry */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onTabChange('feed')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
            >
              <PragatiLogo size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors whitespace-nowrap font-mono">
                    Pragati<span className="text-amber-600 dark:text-amber-400 ml-1 font-sans">Grid</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30">
                    v2.5 AI
                  </span>
                </div>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                  Autonomous Multi-Domain Problem Triage
                </span>
              </div>
            </button>

            {/* Live Counters */}
            <div className="hidden lg:flex items-center gap-2.5 pl-3 ml-2 border-l border-slate-200 dark:border-slate-800 text-xs">
              <span className="inline-flex items-center gap-1 font-mono text-slate-600 dark:text-slate-300">
                <Activity className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{stats.totalProblems}</strong> Problems
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-1 font-mono text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{stats.solvedCount}</strong> Solved
              </span>
              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-1 font-mono text-slate-600 dark:text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <strong className="text-slate-900 dark:text-slate-100 font-bold">{stats.totalImpactPoints}</strong> Impact Pts
              </span>
            </div>
          </div>

          {/* Instant Persona Switcher Pill */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => {
                onPersonaChange('citizen');
                showToast({
                  type: 'info',
                  title: 'Switched to Citizen Reporter Mode',
                  description: 'Submit raw public complaints with multimodal AI triage & PII redaction.',
                });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                persona === 'citizen'
                  ? 'bg-white dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-slate-200 dark:border-amber-500/30 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Citizen Reporter
            </button>

            <button
              onClick={() => {
                onPersonaChange('student');
                showToast({
                  type: 'info',
                  title: 'Switched to Student Innovator Mode',
                  description: 'Inspect multi-domain engineering specs, zip code analysis & blueprints.',
                });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                persona === 'student'
                  ? 'bg-white dark:bg-indigo-500/20 text-indigo-900 dark:text-indigo-300 border border-slate-200 dark:border-indigo-500/30 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Student Innovator
            </button>

            <button
              onClick={() => {
                onPersonaChange('leaderboard');
                showToast({
                  type: 'info',
                  title: 'Switched to Impact Leaderboard',
                  description: 'Viewing top student innovators and university engineering rankings.',
                });
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                persona === 'leaderboard'
                  ? 'bg-white dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-slate-200 dark:border-emerald-500/30 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Leaderboard
            </button>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Verify Credential Button */}
            <button
              onClick={onOpenVerifyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0e1420] dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              title="Verify a student certificate by ID"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Verify Credential</span>
              <span className="sm:hidden">Verify</span>
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light theme"
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-[#0e1420] border border-slate-300 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={handleReset}
              aria-label="Reset demo data"
              title="Reset to default multi-domain challenges & credentials"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-[#0e1420] border border-slate-300 dark:border-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="hidden xl:inline">Reset Demo</span>
            </button>
          </div>
        </div>

        {/* Second Sub-Bar: Navigation Tabs */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 py-2 gap-3 overflow-x-auto">
          {/* Main View Tabs */}
          <nav className="flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => onTabChange('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
                currentTab === 'feed'
                  ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Problem Grid & Telemetry
            </button>

            <button
              onClick={() => onTabChange('report')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
                currentTab === 'report'
                  ? 'bg-amber-600 text-white dark:bg-amber-500/20 dark:text-amber-300 dark:border dark:border-amber-500/40 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              Report Local Bottleneck
            </button>

            <button
              onClick={() => onTabChange('submissions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap font-medium ${
                currentTab === 'submissions'
                  ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-indigo-500" />
              My Submissions & Certificates
            </button>
          </nav>

          {/* Mobile Persona Switcher */}
          <div className="flex md:hidden items-center gap-1 shrink-0">
            <button
              onClick={() =>
                onPersonaChange(
                  persona === 'citizen' ? 'student' : persona === 'student' ? 'leaderboard' : 'citizen'
                )
              }
              className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 dark:bg-[#0e1420] border border-slate-300 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
            >
              Role: <strong className="text-amber-600 dark:text-amber-400 capitalize">{persona}</strong>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
