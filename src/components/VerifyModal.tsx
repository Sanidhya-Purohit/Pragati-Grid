import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Award,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import type { CivicCertificate, StudentSolution } from '../types';
import { useToast } from '../context/ToastContext';

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLookup: (id: string) => CivicCertificate | undefined;
  onOpenCertificate: (cert: CivicCertificate) => void;
  solutions: StudentSolution[];
}

export const VerifyModal: React.FC<VerifyModalProps> = ({
  isOpen,
  onClose,
  onLookup,
  onOpenCertificate,
  solutions,
}) => {
  const { showToast } = useToast();
  const [certInput, setCertInput] = useState('');
  const [result, setResult] = useState<CivicCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (idToVerify?: string) => {
    const query = idToVerify || certInput;
    if (!query.trim()) {
      showToast({
        type: 'warning',
        title: 'Input Required',
        description: 'Please paste a valid Certificate ID (e.g. PRG-2026-B8E29A).',
      });
      return;
    }

    setHasSearched(true);
    const found = onLookup(query);
    if (found) {
      setResult(found);
      showToast({
        type: 'success',
        title: 'Authentic Credential Verified',
        description: `Verified for ${found.studentName} (${found.university}).`,
      });
    } else {
      setResult(null);
      showToast({
        type: 'error',
        title: 'Unverified ID',
        description: 'No matching certificate found in the Pragati Grid registry.',
      });
    }
  };

  const matchingSolution = result
    ? solutions.find((s) => s.certificateId === result.id || s.id === result.solutionId)
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close verify modal"
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Public Credential Verification</span>
        </div>

        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          Verify Pragati Grid Credential
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
          Recruiters, universities, and government bodies can enter any issued Certificate ID to audit student identity, evaluation sub-scores, and tamper-proof hash authenticity.
        </p>

        {/* Input & Search Button */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value.toUpperCase())}
              placeholder="e.g. PRG-2026-B8E29A"
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-mono uppercase bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={() => handleVerify()}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Verify
          </button>
        </div>

        {/* Quick Demo Paste Helper */}
        <div className="flex items-center gap-2 mb-5 text-[11px] text-slate-500 dark:text-slate-400">
          <span>Test Pre-Seeded Credential:</span>
          <button
            onClick={() => {
              setCertInput('PRG-2026-B8E29A');
              handleVerify('PRG-2026-B8E29A');
            }}
            className="text-amber-600 dark:text-amber-400 hover:underline font-mono font-medium cursor-pointer"
          >
            PRG-2026-B8E29A
          </button>
        </div>

        {/* Verification Result Display */}
        {hasSearched && (
          <div>
            {result ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-emerald-300 dark:border-emerald-500/40 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                        Authentic Verified Credential
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {result.studentName}
                      </h4>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                    Score: {result.impactScore}/100
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-800 pt-2 font-mono">
                  <p>Institution: <strong className="text-slate-800 dark:text-slate-200">{result.university}</strong></p>
                  <p>Challenge: <strong className="text-slate-800 dark:text-slate-200">{result.problemTitle}</strong></p>
                  <p>Domain: <strong className="text-amber-600 dark:text-amber-400">{result.domain || result.category}</strong></p>
                  <p>Issue Date: {result.issueDate}</p>
                  <p className="text-[10px] text-slate-500 truncate">Verification Hash: {result.verificationHash}</p>
                </div>

                {matchingSolution?.evaluation && (
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 italic">
                    "{matchingSolution.evaluation.evaluatorVerdict}"
                  </div>
                )}

                <button
                  onClick={() => onOpenCertificate(result)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-slate-950 transition-colors shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Full Verified Certificate & Export 2K PNG</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-500/30 text-center">
                <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto mb-1.5" />
                <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300">
                  Certificate ID Not Found
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  No record matches this identifier. Please double check the ID format.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
