import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  X,
  ShieldCheck,
  TrendingUp,
  Code2,
  Lock,
  Boxes,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { SolutionEvaluation, CivicCertificate } from '../types';

interface EvaluationScorecardModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: SolutionEvaluation;
  studentName: string;
  solutionTitle: string;
  problemTitle: string;
  certificate?: CivicCertificate;
  onViewCertificate: () => void;
  onRefineSolution?: () => void;
}

export const EvaluationScorecardModal: React.FC<EvaluationScorecardModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  studentName,
  solutionTitle,
  problemTitle,
  certificate,
  onViewCertificate,
  onRefineSolution,
}) => {
  const [showFileInsights, setShowFileInsights] = useState(false);

  if (!isOpen) return null;

  const isApproved = evaluation.isApprovedForCertificate;

  const getSubScoreColor = (val: number) => {
    if (val >= 85) return 'bg-emerald-500';
    if (val >= 70) return 'bg-indigo-500';
    return 'bg-amber-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 my-8 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close evaluation modal"
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span>Gemini 2.5 Flash Autonomous Peer Review</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-1">
          Solution Evaluation & Audit Scorecard
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 truncate">
          Evaluated for: <strong className="text-slate-800 dark:text-slate-200">{problemTitle}</strong>
        </p>

        {/* Celebratory or Refinement Banner */}
        {isApproved ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 dark:from-emerald-950/60 dark:via-emerald-900/30 dark:to-slate-900 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 mb-6 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-200/60 dark:bg-emerald-500/20 border border-emerald-400/40 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-300">
                Solution Verified! Pragati Impact Certificate Unlocked
              </p>
              <p className="text-xs text-emerald-800 dark:text-emerald-400/90 mt-0.5 leading-relaxed">
                Overall Score of <strong className="font-mono">{evaluation.overallScore}/100</strong> meets field deployment standards. Your verifiable credential has been minted.
              </p>
            </div>
            <button
              onClick={onViewCertificate}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <span>View Certificate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-200 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-amber-900 dark:text-amber-300">
                Score: {evaluation.overallScore}/100 — Certificate Threshold Not Yet Met
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-400/90 mt-0.5 leading-relaxed">
                A minimum score of 75/100 is required for certified deployment. Address the improvements below and re-submit your proposal.
              </p>
            </div>
          </div>
        )}

        {/* 5 Core Engineering Sub-Scores */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Technical Evaluation Breakdown
            </span>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              Overall: {evaluation.overallScore}/100
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Problem Fit */}
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                <span>Problem Fit & Domain Relevance</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">
                  {evaluation.subScores.problemFit}/100
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getSubScoreColor(
                    evaluation.subScores.problemFit
                  )}`}
                  style={{ width: `${evaluation.subScores.problemFit}%` }}
                />
              </div>
            </div>

            {/* Feasibility */}
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                <span>Feasibility & Field Deployability</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">
                  {evaluation.subScores.feasibility}/100
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getSubScoreColor(
                    evaluation.subScores.feasibility
                  )}`}
                  style={{ width: `${evaluation.subScores.feasibility}%` }}
                />
              </div>
            </div>

            {/* Cost-Effectiveness */}
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                <span>Cost-Effectiveness & Scalability</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">
                  {evaluation.subScores.costEffectiveness}/100
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getSubScoreColor(
                    evaluation.subScores.costEffectiveness
                  )}`}
                  style={{ width: `${evaluation.subScores.costEffectiveness}%` }}
                />
              </div>
            </div>

            {/* Innovation */}
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                <span>Engineering Innovation & Novelty</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">
                  {evaluation.subScores.innovation}/100
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getSubScoreColor(
                    evaluation.subScores.innovation
                  )}`}
                  style={{ width: `${evaluation.subScores.innovation}%` }}
                />
              </div>
            </div>

            {/* Real-World Impact */}
            <div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                <span>Real-World Community Impact</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">
                  {evaluation.subScores.realWorldImpact}/100
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getSubScoreColor(
                    evaluation.subScores.realWorldImpact
                  )}`}
                  style={{ width: `${evaluation.subScores.realWorldImpact}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Code Analysis Result Card (If files were analyzed in batches) */}
        {evaluation.codeAnalysis && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-amber-500" />
                <span>Code Architecture Audit ({evaluation.codeAnalysis.totalFilesAnalyzed} Files · {evaluation.codeAnalysis.batchesAnalyzedCount} Batches)</span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Quality: {evaluation.codeAnalysis.codeQualityScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <Lock className="w-3 h-3 text-emerald-500" />
                  <span>Security Audit</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                  {evaluation.codeAnalysis.securityCheck}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <Boxes className="w-3 h-3 text-indigo-500" />
                  <span>Modularity</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                  {evaluation.codeAnalysis.modularityReview}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  <FileCheck className="w-3 h-3 text-amber-500" />
                  <span>Test Readiness</span>
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                  {evaluation.codeAnalysis.testingReadiness}
                </p>
              </div>
            </div>

            {/* Accordion: File-by-File Insights */}
            {evaluation.codeAnalysis.keyFileInsights && evaluation.codeAnalysis.keyFileInsights.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowFileInsights(!showFileInsights)}
                  className="w-full flex items-center justify-between text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline pt-1 cursor-pointer"
                >
                  <span>
                    {showFileInsights ? 'Hide' : 'View'} File-by-File Insights ({evaluation.codeAnalysis.keyFileInsights.length} files reviewed)
                  </span>
                  {showFileInsights ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showFileInsights && (
                  <div className="mt-2 max-h-36 overflow-y-auto space-y-1.5 p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
                    {evaluation.codeAnalysis.keyFileInsights.map((fi, idx) => (
                      <div key={idx} className="pb-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-none">
                        <span className="font-bold text-slate-900 dark:text-slate-200">{fi.fileName}: </span>
                        <span className="text-slate-600 dark:text-slate-400">{fi.insight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Evaluator Verdict Quote Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Senior Pragati Lead Reviewer Verdict:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
            "{evaluation.evaluatorVerdict}"
          </p>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Key Strengths */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Engineering Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {evaluation.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations / Improvements */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <h4 className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Deployment Improvements
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {evaluation.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Report
          </button>

          <div className="flex items-center gap-2">
            {!isApproved && onRefineSolution && (
              <button
                onClick={onRefineSolution}
                className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refine Proposal</span>
              </button>
            )}

            {isApproved && (
              <button
                onClick={onViewCertificate}
                className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 shadow-sm transition-all cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Open Verified Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
