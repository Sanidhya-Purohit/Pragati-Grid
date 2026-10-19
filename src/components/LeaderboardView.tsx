import React from 'react';
import {
  Trophy,
  Award,
  Medal,
  Users,
  Building2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardViewProps {
  leaderboard: LeaderboardEntry[];
  onNavigateToFeed: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboard,
  onNavigateToFeed,
}) => {
  return (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>National Student Engineering Honor Roll</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-2">
            Multi-Domain Engineering Impact Rankings
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
            Recognizing university engineering students and interdisciplinary teams who have formulated, coded, and deployed verified solutions across Software, Electrical, Mechanical, Civil, and BioTech bottlenecks.
          </p>

          <button
            onClick={onNavigateToFeed}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors shadow-sm cursor-pointer"
          >
            <span>Solve Open Challenges to Climb the Ranks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Podium Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((entry, index) => {
          const rankColors = [
            'border-amber-400/80 bg-amber-50/70 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300',
            'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-900 dark:text-slate-200',
            'border-orange-400/80 bg-orange-50/70 dark:bg-orange-950/20 text-orange-900 dark:text-orange-300',
          ];
          const rankLabels = ['1st Place Champion', '2nd Place Runner-Up', '3rd Place Innovator'];

          return (
            <div
              key={entry.rank}
              className={`relative rounded-2xl border p-5 sm:p-6 transition-all hover:scale-[1.01] shadow-xs ${rankColors[index]}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider">
                  {rankLabels[index]}
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-white dark:bg-slate-800 shadow-xs">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                {entry.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-4">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>{entry.university}</span>
              </p>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">Solved</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-slate-100">{entry.problemsSolved}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">Impact</span>
                  <span className="font-bold font-mono text-amber-600 dark:text-amber-400">{entry.totalImpactPoints}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">Certs</span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{entry.verifiedCertificates}</span>
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-white/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <span>Top Domain: {entry.topDomain}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Rankings Table */}
      <div className="rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              National Leaderboard Standings
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated across all university engineering departments in India
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {leaderboard.length} Ranked Teams
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Innovator / Team</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Top Domain</th>
                <th className="py-3 px-4 text-center">Problems Solved</th>
                <th className="py-3 px-4 text-center">Impact Points</th>
                <th className="py-3 px-4 text-center">Credentials</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-normal text-slate-800 dark:text-slate-200">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-100 text-amber-900 font-bold'
                          : entry.rank === 2
                          ? 'bg-slate-200 text-slate-800 font-bold'
                          : entry.rank === 3
                          ? 'bg-orange-100 text-orange-900 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    {entry.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {entry.university}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {entry.topDomain}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold">
                    {entry.problemsSolved}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                    {entry.totalImpactPoints}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {entry.verifiedCertificates}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
