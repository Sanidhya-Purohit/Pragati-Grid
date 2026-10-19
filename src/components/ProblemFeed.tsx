import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  X,
  Code,
  Cpu,
  Zap,
  Cog,
  Droplet,
  HeartPulse,
  Leaf,
  Layers,
  Flame,
  PlusCircle,
  Users,
  TrendingUp,
} from 'lucide-react';
import type { CivicProblem, EngineeringDomain, ProblemType, ProblemStatus, Persona } from '../types';
import { calculateMultiFactorRankScore } from '../utils/civicLogic';
import { ProblemCard } from './ProblemCard';

interface ProblemFeedProps {
  problems: CivicProblem[];
  persona: Persona;
  hasUserUpvoted: (id: string) => boolean;
  onUpvote: (id: string) => void;
  onSelectProblem: (problem: CivicProblem) => void;
  onNavigateToReport: () => void;
}

const DOMAINS: ('All' | EngineeringDomain)[] = [
  'All',
  'Software & AI Systems',
  'Hardware & Embedded IoT',
  'Electrical & Energy Grids',
  'Mechanical & Robotics',
  'Civil, Urban & Hydraulics',
  'Healthcare & Assistive Tech',
  'Biotech & Environmental',
];

const PROBLEM_TYPES: ('All' | ProblemType)[] = [
  'All',
  'Software Application / AI',
  'Hardware / Physical Device',
  'System Architecture / Process',
  'Hybrid (Hardware + Software)',
];

const STATUSES: ('All' | ProblemStatus)[] = [
  'All',
  'Open',
  'Solution Submitted',
  'Verified Solved',
];

export const ProblemFeed: React.FC<ProblemFeedProps> = ({
  problems,
  persona,
  hasUserUpvoted,
  onUpvote,
  onSelectProblem,
  onNavigateToReport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<'All' | EngineeringDomain>('All');
  const [selectedType, setSelectedType] = useState<'All' | ProblemType>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProblemStatus>('All');
  const [sortBy, setSortBy] = useState<
    'ai-rank' | 'urgency' | 'population' | 'improvement' | 'upvotes' | 'newest'
  >('ai-rank');

  // Filtered and sorted problems
  const filteredProblems = useMemo(() => {
    let result = problems.filter((problem) => {
      // Domain filter
      if (selectedDomain !== 'All') {
        const problemDomain = problem.domain || (problem.category as any);
        if (problemDomain !== selectedDomain) return false;
      }

      // Type filter
      if (selectedType !== 'All') {
        if (problem.problemType !== selectedType) return false;
      }

      // Status filter
      if (selectedStatus !== 'All') {
        if (problem.status !== selectedStatus) return false;
      }

      // Search query across title, description, location, skills, and target audience
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = problem.formalTitle.toLowerCase().includes(query);
        const matchesDesc =
          problem.formattedProblemStatement.toLowerCase().includes(query) ||
          problem.detailedDescription.toLowerCase().includes(query) ||
          problem.originalComplaint.toLowerCase().includes(query);
        const matchesLocation = problem.location.toLowerCase().includes(query);
        const matchesSkills = problem.recommendedStudentSkills.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesAudience =
          problem.metrics.targetAudienceText?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesLocation && !matchesSkills && !matchesAudience) {
          return false;
        }
      }

      return true;
    });

    // Multi-factor sorting
    return result.sort((a, b) => {
      if (sortBy === 'ai-rank') {
        const scoreA = calculateMultiFactorRankScore(a).rankScore;
        const scoreB = calculateMultiFactorRankScore(b).rankScore;
        return scoreB - scoreA;
      }
      if (sortBy === 'urgency') {
        return (b.metrics.urgency || 0) - (a.metrics.urgency || 0);
      }
      if (sortBy === 'population') {
        const popA = a.metrics.affectedPopulationEstimate || (a.metrics.populationImpact * 200);
        const popB = b.metrics.affectedPopulationEstimate || (b.metrics.populationImpact * 200);
        return popB - popA;
      }
      if (sortBy === 'improvement') {
        return (
          (b.metrics.solutionImprovementPotential ?? 85) -
          (a.metrics.solutionImprovementPotential ?? 85)
        );
      }
      if (sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [problems, selectedDomain, selectedType, selectedStatus, searchQuery, sortBy]);

  // Counts by domain
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = { All: problems.length };
    DOMAINS.forEach((d) => {
      if (d !== 'All') {
        counts[d] = problems.filter((p) => (p.domain || p.category) === d).length;
      }
    });
    return counts;
  }, [problems]);

  const getDomainIcon = (d: string) => {
    switch (d) {
      case 'Software & AI Systems':
        return <Code className="w-3.5 h-3.5" />;
      case 'Hardware & Embedded IoT':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'Electrical & Energy Grids':
        return <Zap className="w-3.5 h-3.5" />;
      case 'Mechanical & Robotics':
        return <Cog className="w-3.5 h-3.5" />;
      case 'Civil, Urban & Hydraulics':
        return <Droplet className="w-3.5 h-3.5" />;
      case 'Healthcare & Assistive Tech':
        return <HeartPulse className="w-3.5 h-3.5" />;
      case 'Biotech & Environmental':
      case 'Agriculture & Rural Tech':
        return <Leaf className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner: Multi-Domain Problem Grid */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 dark:from-[#090d15] dark:via-[#0e1422] dark:to-[#141b2d] border border-slate-700/60 dark:border-slate-800/80 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Multi-Domain Autonomous Innovation Grid</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Solve Real Bottlenecks Across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400">
              All Engineering Domains
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            From cryptographic land mutation ledgers and rural power grid telemetry to low-cost fluorosis filters and culvert desilting rovers. Submit working websites, GitHub repositories, or multi-file ZIP archives for sequential Gemini 2.5 Flash batch analysis.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToReport}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Report Local Bottleneck (AI Auto-Fill)</span>
            </button>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Multi-Factor AI Ranking
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Verified Impact Certificates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Filters Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          <span>Filter by Engineering Domain:</span>
          <span>{filteredProblems.length} Challenges Listed</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {DOMAINS.map((d) => {
            const count = domainCounts[d] || 0;
            const isSelected = selectedDomain === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDomain(d)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-500/25'
                    : 'bg-white dark:bg-[#0c1017] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {d !== 'All' && getDomainIcon(d)}
                <span>{d}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search, Modality, Status and Multi-Factor Sorting Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200/90 dark:border-slate-800/80 shadow-xs">
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems by keywords, city, required skills, or domain..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#090d14] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Modality Filter */}
        <div className="md:col-span-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#090d14] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
          >
            <option value="All">All Modalities</option>
            {PROBLEM_TYPES.filter((t) => t !== 'All').map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#090d14] text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Solution Submitted">Solution Submitted</option>
            <option value="Verified Solved">Verified Solved</option>
          </select>
        </div>

        {/* Multi-Factor AI Ranking Sorting */}
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-[#090d14] text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/60"
            >
              <option value="ai-rank">✨ AI Impact & Urgency Priority (Multi-Factor)</option>
              <option value="urgency">🚨 Highest Urgency Rating</option>
              <option value="population">👥 Largest Affected Population</option>
              <option value="improvement">⚡ Greatest Solution Improvement Delta</option>
              <option value="upvotes">👍 Most Community Upvotes</option>
              <option value="newest">🕒 Latest Reported</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problem Cards Grid */}
      {filteredProblems.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#0c1017] border border-dashed border-slate-300 dark:border-slate-800">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
            No matching engineering challenges found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
            Try adjusting your search query, selecting another domain, or reset active filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All');
              setSelectedType('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProblems.map((problem, idx) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              rank={idx + 1}
              hasUpvoted={hasUserUpvoted(problem.id)}
              onUpvote={onUpvote}
              onSelect={onSelectProblem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
