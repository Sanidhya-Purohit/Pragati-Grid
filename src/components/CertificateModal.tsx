import React, { useState } from 'react';
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Check,
  Copy,
  X,
  FileBadge,
  Sparkles,
} from 'lucide-react';
import type { CivicCertificate } from '../types';
import { buildLinkedInCertUrl } from '../utils/civicLogic';
import { useToast } from '../context/ToastContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CivicCertificate | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen || !certificate) return null;

  const linkedInUrl = buildLinkedInCertUrl({
    certificateId: certificate.id,
    problemTitle: certificate.problemTitle,
    studentName: certificate.studentName,
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.id);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Certificate ID Copied',
      description: `${certificate.id} copied to clipboard for recruiter verification.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Generates a high-res (2000x1400) PNG certificate on HTML5 Canvas and triggers instant download
   */
  const handleDownloadPng = () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context not available');

      canvas.width = 2000;
      canvas.height = 1400;

      // 1. Dark Slate Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 2000, 1400);
      bgGrad.addColorStop(0, '#080c14');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Ornate Border Accents (Double Ring)
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#f59e0b'; // Amber 500
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#334155'; // Slate 700
      ctx.strokeRect(75, 75, canvas.width - 150, canvas.height - 150);

      // Corner Ornaments
      const cornerSize = 40;
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#10b981'; // Emerald 500
      // Top Left
      ctx.beginPath();
      ctx.moveTo(60, 60 + cornerSize);
      ctx.lineTo(60, 60);
      ctx.lineTo(60 + cornerSize, 60);
      ctx.stroke();
      // Top Right
      ctx.beginPath();
      ctx.moveTo(canvas.width - 60 - cornerSize, 60);
      ctx.lineTo(canvas.width - 60, 60);
      ctx.lineTo(canvas.width - 60, 60 + cornerSize);
      ctx.stroke();
      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(60, canvas.height - 60 - cornerSize);
      ctx.lineTo(60, canvas.height - 60);
      ctx.lineTo(60 + cornerSize, canvas.height - 60);
      ctx.stroke();
      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(canvas.width - 60 - cornerSize, canvas.height - 60);
      ctx.lineTo(canvas.width - 60, canvas.height - 60);
      ctx.lineTo(canvas.width - 60, canvas.height - 60 - cornerSize);
      ctx.stroke();

      // 3. Header Branding
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.fillText('PRAGATI GRID · NATIONAL ENGINEERING NETWORK', 1000, 160);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('VERIFIED IMPACT CREDENTIAL', 1000, 230);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('THIS FORMAL CITATION OF CIVIC ENGINEERING EXCELLENCE IS CONFERRED UPON', 1000, 310);

      // 4. Student Name & Institution
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 72px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(certificate.studentName.toUpperCase(), 1000, 420);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(certificate.university, 1000, 480);

      if (certificate.degreeBranch) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '24px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(certificate.degreeBranch, 1000, 525);
      }

      // Horizontal Divider
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(350, 560);
      ctx.lineTo(1650, 560);
      ctx.stroke();

      // 5. Solved Challenge Statement
      ctx.fillStyle = '#94a3b8';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('FOR AUTONOMOUSLY ENGINEERING A VERIFIED FIELD SOLUTION FOR:', 1000, 620);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`"${certificate.problemTitle}"`, 1000, 675);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(
        `Domain: ${certificate.domain || certificate.category || 'Engineering'}  ·  Location: ${certificate.location}`,
        1000,
        720
      );

      // 6. Evaluator Verdict Box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(350, 780, 1300, 190);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(350, 780, 1300, 190);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SENIOR LEAD EVALUATOR VERDICT', 1000, 825);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'italic 22px "Plus Jakarta Sans", sans-serif';
      const verdict = `"${certificate.evaluatorVerdict}"`;
      if (verdict.length > 120) {
        const mid = verdict.lastIndexOf(' ', 110);
        ctx.fillText(verdict.substring(0, mid), 1000, 880);
        ctx.fillText(verdict.substring(mid + 1), 1000, 920);
      } else {
        ctx.fillText(verdict, 1000, 895);
      }

      // 7. Bottom Badges: Score & Verification Hash
      // Impact Score Badge
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(480, 1150, 80, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#020617';
      ctx.font = 'bold 48px "Space Grotesk", monospace';
      ctx.fillText(`${certificate.impactScore}`, 480, 1155);

      ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('IMPACT SCORE', 480, 1195);

      // Metadata Texts
      ctx.textAlign = 'left';
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('AI Verified Credential', 600, 1130);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px "Space Grotesk", monospace';
      ctx.fillText(`Issued: ${certificate.issueDate}`, 600, 1170);

      // Tamper-Proof Cryptographic Signature Details
      ctx.textAlign = 'right';
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 22px "Space Grotesk", monospace';
      ctx.fillText(`ID: ${certificate.id}`, 1650, 1125);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px "Space Grotesk", monospace';
      ctx.fillText(`Verification Hash: ${certificate.verificationHash}`, 1650, 1165);

      ctx.fillStyle = '#10b981';
      ctx.font = '18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Verifiable on Pragati Grid Registry', 1650, 1200);

      // Trigger automatic PNG download
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      downloadLink.download = `Pragati-Grid-${certificate.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      showToast({
        type: 'success',
        title: 'High-Res Certificate Downloaded',
        description: `Saved Pragati-Grid-${certificate.id}.png (2000x1400 PNG).`,
      });
    } catch (err: any) {
      console.error('Download error:', err);
      showToast({
        type: 'error',
        title: 'Download Failed',
        description: err.message || 'Could not export canvas certificate.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const domain = certificate.domain || certificate.category || 'Multi-Domain Engineering';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8 my-6 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close certificate modal"
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between mb-4 pr-8">
          <div className="flex items-center gap-2">
            <FileBadge className="w-5 h-5 text-amber-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Verified Academic & Engineering Credential
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">ID:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{certificate.id}</span>
            <button
              onClick={handleCopyId}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded cursor-pointer"
              title="Copy Certificate ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* The Live Certificate Document Frame */}
        <div className="relative rounded-2xl bg-slate-950 text-slate-100 border-2 border-amber-500/50 p-6 sm:p-10 shadow-2xl overflow-hidden mb-6">
          {/* Subtle Corner Ornaments */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

          {/* Certificate Inner Content */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              Pragati Grid Academic & Engineering Credential
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-100 uppercase font-sans">
              Verified Real-World Impact Credential
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              This official citation of civic engineering excellence is conferred upon:
            </p>

            {/* Student Name */}
            <div className="py-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-sky-300 tracking-tight">
                {certificate.studentName}
              </h2>
              <p className="text-sm sm:text-base font-semibold text-sky-400 mt-1">
                {certificate.university}
              </p>
              {certificate.degreeBranch && (
                <p className="text-xs text-slate-400">{certificate.degreeBranch}</p>
              )}
            </div>

            {/* Solved Challenge */}
            <div className="max-w-2xl mx-auto py-2 border-y border-slate-800">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                For Autonomously Engineering a Validated Field Solution for:
              </p>
              <h3 className="text-base sm:text-lg font-bold text-slate-100">
                "{certificate.problemTitle}"
              </h3>
              <p className="text-xs text-amber-400 font-mono mt-1">
                Domain: {domain} · Location: {certificate.location}
              </p>
            </div>

            {/* Evaluator Verdict Quote */}
            <p className="text-xs sm:text-sm text-slate-300 italic max-w-xl mx-auto leading-relaxed pt-2">
              "{certificate.evaluatorVerdict}"
            </p>

            {/* Certificate Bottom Registry Metadata */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-800/80 gap-4 text-left">
              {/* Seal Badge */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-amber-500/15 border border-amber-500/40 flex flex-col items-center justify-center font-mono">
                  <span className="text-lg font-extrabold text-amber-400 leading-none">
                    {certificate.impactScore}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold mt-0.5">
                    Impact
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">AI Impact Verified</p>
                  <p className="text-[11px] text-slate-400 font-mono">Issue Date: {certificate.issueDate}</p>
                </div>
              </div>

              {/* ID & Verification Hash */}
              <div className="text-center sm:text-right font-mono text-[11px] text-slate-400 space-y-0.5">
                <p>
                  Certificate ID: <strong className="text-slate-200">{certificate.id}</strong>
                </p>
                <p className="text-[10px] text-slate-500">
                  Verification Hash: {certificate.verificationHash}
                </p>
                <p className="text-[10px] text-emerald-400">Tamper-Proof Deterministic Signature</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyId}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'ID Copied!' : 'Copy Certificate ID'}</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            {/* Add to LinkedIn Button */}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Add to LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Download High-Res PNG Button */}
            <button
              onClick={handleDownloadPng}
              disabled={isDownloading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Rendering 2K PNG...' : 'Download Certificate (PNG)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
