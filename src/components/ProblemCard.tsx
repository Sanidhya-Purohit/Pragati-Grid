import React, { useState } from 'react';
import {
  MapPin,
  ThumbsUp,
  ArrowRight,
  Sparkles,
  MessageSquare,
  FileCode,
  Flame,
  CheckCircle2,
  Code,
  Cpu,
  Zap,
  Cog,
  Droplet,
  HeartPulse,
  Leaf,
  Layers,
  Image as ImageIcon,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Users,
  TrendingUp,
  Info,
} from 'lucide-react';
import type { CivicProblem, EngineeringDomain } from '../types';
import { calculateMultiFactorRankScore } from '../utils/civicLogic';
import { useToast } from '../context/ToastContext';

interface ProblemCardProps {
  problem: CivicProblem;
  rank: number;
  hasUpvoted?: boolean;
  onUpvote: (id: string) => void;
  onSelect: (problem: CivicProblem) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  rank,
  hasUpvoted = false,
  onUpvote,
  onSelect,
}) => {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'engineering' | 'citizen'>('engineering');
  const [showRankDetails, setShowRankDetails] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const rankDetails = calculateMultiFactorRankScore(problem);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasUpvoted) {
      showToast({
        type: 'info',
        title: 'Already Upvoted',
        description: 'You have already recorded your vote for this bottleneck (strictly 1 vote allowed per problem).',
      });
      return;
    }
    onUpvote(problem.id);
  };

  const getDomainIcon = (domain: EngineeringDomain) => {
    switch (domain) {
      case 'Software & AI Systems':
        return <Code className="w-3.5 h-3.5 text-blue-500" />;
      case 'Hardware & Embedded IoT':
        return <Cpu className="w-3.5 h-3.5 text-amber-500" />;
      case 'Electrical & Energy Grids':
        return <Zap className="w-3.5 h-3.5 text-yellow-500" />;
      case 'Mechanical & Robotics':
        return <Cog className="w-3.5 h-3.5 text-orange-500" />;
      case 'Civil, Urban & Hydraulics':
        return <Droplet className="w-3.5 h-3.5 text-teal-500" />;
      case 'Healthcare & Assistive Tech':
        return <HeartPulse className="w-3.5 h-3.5 text-rose-500" />;
      case 'Biotech & Environmental':
      case 'Agriculture & Rural Tech':
        return <Leaf className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const getPriorityColor = (score: number) => {
    if (score >= 90) {
      return 'text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-500/40 bg-rose-50 dark:bg-rose-500/10 shadow-xs shadow-rose-500/20';
    }
    if (score >= 80) {
      return 'text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 shadow-xs shadow-amber-500/20';
    }
    return 'text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 shadow-xs shadow-emerald-500/20';
  };

  const domain = problem.domain || (problem.category as any) || 'Civil, Urban & Hydraulics';

  return (
    <>
      <div
        onClick={() => onSelect(problem)}
        className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200/90 dark:border-slate-800/80 p-5 sm:p-6 transition-all duration-200 hover:border-amber-500/60 dark:hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer text-slate-900 dark:text-slate-100"
      >
        {/* Top Badges Bar */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Rank Priority Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-500/30">
                <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-500" />
                #{rank} Priority
              </span>

              {/* Engineering Domain */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                {getDomainIcon(domain)}
                {domain}
              </span>

              {/* Modality Tag */}
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {problem.problemType}
              </span>
            </div>

            {/* AI Multi-Factor Impact Score Pill */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRankDetails((prev) => !prev);
                }}
                className={`flex flex-col items-end px-2.5 py-1 rounded-xl border transition-all ${getPriorityColor(
                  rankDetails.rankScore
                )}`}
                title="Click to view AI Multi-Factor Rank breakdown"
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm font-black font-mono leading-none">
                    {rankDetails.rankScore}
                  </span>
                  <Info className="w-3 h-3 opacity-70" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                  AI Rank
                </span>
              </button>
            </div>
          </div>

          {/* Location & Reported Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{problem.location}</span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
            <span className="truncate">Reported by {problem.reportedBy || 'Citizen'}</span>
          </div>

          {/* Problem Title */}
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 mb-2.5">
            {problem.formalTitle}
          </h3>

          {/* Target Audience & Scale Quick Banner */}
          <div className="flex items-center gap-2 mb-3 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0a0e14] border border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
            <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">
              <strong>Affected Audience:</strong> {rankDetails.targetAudience}
            </span>
          </div>

          {/* Toggle between Engineering Statement and Raw Citizen Complaint */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5 text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('engineering');
                }}
                className={`font-semibold pb-0.5 border-b-2 transition-all ${
                  viewMode === 'engineering'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Triage Statement
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('citizen');
                }}
                className={`font-semibold pb-0.5 border-b-2 transition-all ${
                  viewMode === 'citizen'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                Raw Citizen Voice
              </button>
            </div>

            {viewMode === 'engineering' ? (
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {problem.formattedProblemStatement || problem.detailedDescription}
              </p>
            ) : (
              <p className="text-xs italic text-slate-500 dark:text-slate-400 line-clamp-3 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
                "{problem.originalComplaint}"
              </p>
            )}
          </div>

          {/* Multiple Photos Thumbnails Strip */}
          {problem.imageUrls && problem.imageUrls.length > 0 && (
            <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
              <span className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> {problem.imageUrls.length} {problem.imageUrls.length === 1 ? 'photo' : 'photos'}:
              </span>
              {problem.imageUrls.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(url);
                  }}
                  className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 hover:scale-105 transition-transform"
                >
                  <img src={url} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* AI Multi-Factor Ranking Breakdown Dropdown */}
          {showRankDetails && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0f18] border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  AI Impact Rank Analysis Breakdown
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  Score: {rankDetails.rankScore}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">1. Urgency (30% wt)</div>
                  <div className="font-bold font-mono text-slate-800 dark:text-slate-200">
                    {rankDetails.urgencyFactor}/100
                  </div>
                </div>
                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">2. Population (25% wt)</div>
                  <div className="font-bold font-mono text-slate-800 dark:text-slate-200">
                    {rankDetails.populationFactor}/100
                  </div>
                </div>
                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">3. Solution Delta (25% wt)</div>
                  <div className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {rankDetails.solutionImprovementFactor}/100
                  </div>
                </div>
                <div className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">4. Severity (15% wt)</div>
                  <div className="font-bold font-mono text-slate-800 dark:text-slate-200">
                    {rankDetails.severityFactor}/100
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-800/70">
                <span>Community Upvotes Influence:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  +{rankDetails.upvoteBonus} pts (capped at 5 pts)
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                *High-urgency & large-population bottlenecks maintain top rank even if others have more popular upvotes.
              </p>
            </div>
          )}

          {/* Student Skills Needed Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {problem.recommendedStudentSkills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
              >
                {skill}
              </span>
            ))}
            {problem.recommendedStudentSkills.length > 3 && (
              <span className="text-[11px] font-mono text-slate-400 self-center">
                +{problem.recommendedStudentSkills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Upvote, Solutions Count, and Action CTA */}
        <div className="flex items-center justify-between pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            {/* 1 UPVOTE PER PROBLEM RESTRICTION BUTTON */}
            <button
              type="button"
              onClick={handleUpvote}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                hasUpvoted
                  ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 cursor-default'
                  : 'bg-slate-100 dark:bg-slate-800/90 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95'
              }`}
              title={hasUpvoted ? 'You have upvoted this problem (1 vote limit)' : 'Upvote this bottleneck (1 vote allowed)'}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{problem.upvotes}</span>
              {hasUpvoted && <span className="text-[10px] font-bold">✓</span>}
            </button>

            {/* Status / Solutions Badge */}
            {problem.status === 'Verified Solved' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Verified Solved
              </span>
            ) : problem.solutionsCount > 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                <FileCode className="w-3.5 h-3.5" />
                {problem.solutionsCount} {problem.solutionsCount === 1 ? 'Solution' : 'Solutions'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                Open for Solutions
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>Solve Bottleneck</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo Preview */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm cursor-zoom-out"
        >
          <div className="relative max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
            <img src={selectedPhoto} alt="Problem evidence high-res" className="w-full h-auto max-h-[85vh] object-contain" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};
