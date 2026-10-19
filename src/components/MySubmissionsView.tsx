import React from 'react';
import {
  FileCheck2,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Calendar,
  Building2,
  CheckCircle2,
  AlertTriangle,
  FolderArchive,
  Code2,
} from 'lucide-react';
import type { StudentSolution, CivicCertificate, SolutionEvaluation } from '../types';

interface MySubmissionsViewProps {
  solutions: StudentSolution[];
  certificates: CivicCertificate[];
  onOpenCertificate: (cert: CivicCertificate) => void;
  onOpenScorecard: (
    evaluation: SolutionEvaluation,
    studentName: string,
    solutionTitle: string,
    problemTitle: string,
    cert?: CivicCertificate
  ) => void;
  onNavigateToFeed: () => void;
}

export const MySubmissionsView: React.FC<MySubmissionsViewProps> = ({
  solutions,
  certificates,
  onOpenCertificate,
  onOpenScorecard,
  onNavigateToFeed,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-500/15 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 mb-3">
            <FileCheck2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Student Innovation Portfolio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-2">
            My Submissions & Verified Credentials
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
            Track all submitted engineering interventions, inspect AI evaluation peer-review scorecards, batch code analysis audits, and export verified high-resolution academic certificates.
          </p>

          <button
            onClick={onNavigateToFeed}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors shadow-sm cursor-pointer"
          >
            <span>Browse Active Problem Feed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Submissions List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Submitted Proposals ({solutions.length})
        </h3>

        {solutions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 shadow-xs">
            <FileCheck2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              No Solutions Submitted Yet
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
              Select any open problem on the Pragati Grid, generate an architectural blueprint, and submit your code repository or ZIP archive.
            </p>
            <button
              onClick={onNavigateToFeed}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-sm transition-colors cursor-pointer"
            >
              Explore Open Challenges
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {solutions.map((sol) => {
              const cert = certificates.find(
                (c) => c.solutionId === sol.id || (sol.certificateId && c.id === sol.certificateId)
              );
              const isVerified = sol.evaluation?.isApprovedForCertificate;

              return (
                <div
                  key={sol.id}
                  className="rounded-2xl bg-white dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-0.5">
                        Target Challenge:
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {sol.problemTitle}
                      </h4>
                    </div>

                    {sol.evaluation && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono shrink-0 ${
                          isVerified
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                        }`}
                      >
                        {isVerified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        Score: {sol.evaluation.overallScore}/100
                      </span>
                    )}
                  </div>

                  {/* Solution Title & Summary */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-4">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                      {sol.solutionTitle}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {sol.executiveSummary || sol.technicalArchitecture}
                    </p>
                  </div>

                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span>
                      Author: <strong className="text-slate-800 dark:text-slate-200">{sol.studentName}</strong>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {sol.university}
                    </span>
                    {sol.codeFilesAnalyzedCount && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold font-mono">
                          <Code2 className="w-3.5 h-3.5" />
                          {sol.codeFilesAnalyzedCount} Code Files Audited
                        </span>
                      </>
                    )}
                    {sol.codeZipFileName && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                          <FolderArchive className="w-3.5 h-3.5 text-indigo-500" />
                          {sol.codeZipFileName}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 gap-2 flex-wrap">
                    {sol.evaluation && (
                      <button
                        onClick={() =>
                          onOpenScorecard(
                            sol.evaluation!,
                            sol.studentName,
                            sol.solutionTitle,
                            sol.problemTitle,
                            cert
                          )
                        }
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                      >
                        View AI Review Scorecard
                      </button>
                    )}

                    {cert && (
                      <button
                        onClick={() => onOpenCertificate(cert)}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 transition-colors shadow-xs cursor-pointer"
                      >
                        <Award className="w-4 h-4" />
                        <span>Open Verified Certificate ({cert.id})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
