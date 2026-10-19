import React, { useState } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { useCivicData } from './hooks/useCivicData';
import { Navbar } from './components/Navbar';
import { ProblemFeed } from './components/ProblemFeed';
import { ReportProblemModal } from './components/ReportProblemModal';
import { ProblemDetailModal } from './components/ProblemDetailModal';
import { EvaluationScorecardModal } from './components/EvaluationScorecardModal';
import { CertificateModal } from './components/CertificateModal';
import { VerifyModal } from './components/VerifyModal';
import { LeaderboardView } from './components/LeaderboardView';
import { MySubmissionsView } from './components/MySubmissionsView';
import { PragatiLogo } from './components/PragatiLogo';
import type {
  CivicProblem,
  StudentSolution,
  CivicCertificate,
  SolutionEvaluation,
} from './types';

function PragatiGridApp() {
  const { showToast } = useToast();
  const {
    problems,
    solutions,
    certificates,
    upvotedProblemIds,
    hasUserUpvoted,
    theme,
    persona,
    stats,
    leaderboard,
    toggleTheme,
    setPersona,
    addProblem,
    upvoteProblem,
    addSolution,
    resetDemoData,
    findCertificate,
  } = useCivicData();

  const handleUpvote = (problemId: string) => {
    const res = upvoteProblem(problemId);
    showToast({
      type: res.success ? 'success' : 'info',
      title: res.success ? 'Vote Registered' : 'Already Upvoted',
      description: res.message,
    });
  };

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<'feed' | 'report' | 'submissions'>('feed');

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<CivicProblem | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CivicCertificate | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // Scorecard modal state
  const [scorecardData, setScorecardData] = useState<{
    isOpen: boolean;
    evaluation: SolutionEvaluation | null;
    studentName: string;
    solutionTitle: string;
    problemTitle: string;
    certificate?: CivicCertificate;
  }>({
    isOpen: false,
    evaluation: null,
    studentName: '',
    solutionTitle: '',
    problemTitle: '',
  });

  const handleOpenScorecard = (
    evaluation: SolutionEvaluation,
    studentName: string,
    solutionTitle: string,
    problemTitle: string,
    cert?: CivicCertificate
  ) => {
    setScorecardData({
      isOpen: true,
      evaluation,
      studentName,
      solutionTitle,
      problemTitle,
      certificate: cert,
    });
  };

  const handleSolutionSubmitted = (
    solution: StudentSolution,
    evaluation: SolutionEvaluation,
    certificate?: CivicCertificate
  ) => {
    addSolution(solution, certificate);
    // Close problem detail modal
    setSelectedProblem(null);
    // Open Evaluation Scorecard Modal immediately
    setScorecardData({
      isOpen: true,
      evaluation,
      studentName: solution.studentName,
      solutionTitle: solution.solutionTitle,
      problemTitle: solution.problemTitle,
      certificate,
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        theme === 'dark'
          ? 'bg-[#080b11] text-slate-100 grid-bg-dark'
          : 'bg-[#f8fafc] text-slate-900 grid-bg-light'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (persona === 'leaderboard') {
            setPersona('student');
          }
          if (tab === 'report') {
            setIsReportModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        persona={persona}
        onPersonaChange={(newPersona) => {
          setPersona(newPersona);
          if (newPersona === 'leaderboard') {
            setCurrentTab('feed');
          }
        }}
        stats={stats}
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetDemoData={resetDemoData}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* If persona is Leaderboard, render LeaderboardView */}
        {persona === 'leaderboard' ? (
          <LeaderboardView
            leaderboard={leaderboard}
            onNavigateToFeed={() => {
              setPersona('student');
              setCurrentTab('feed');
            }}
          />
        ) : currentTab === 'submissions' ? (
          <MySubmissionsView
            solutions={solutions}
            certificates={certificates}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onOpenScorecard={handleOpenScorecard}
            onNavigateToFeed={() => setCurrentTab('feed')}
          />
        ) : (
          <ProblemFeed
            problems={problems}
            persona={persona}
            hasUserUpvoted={hasUserUpvoted}
            onUpvote={handleUpvote}
            onSelectProblem={(prob) => setSelectedProblem(prob)}
            onNavigateToReport={() => setIsReportModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#080b11]/90 backdrop-blur-sm py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <PragatiLogo size="sm" />
            <span className="font-extrabold text-slate-900 dark:text-slate-200 font-mono">
              Pragati<span className="text-amber-600 dark:text-amber-400">Grid</span>
            </span>
            <span>·</span>
            <span>Autonomous Multi-Domain Innovation Grid</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Verify Credential
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setPersona('leaderboard');
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              National Rankings
            </button>
            <span>·</span>
            <span>Powered by Gemini 2.5 Flash</span>
          </div>
        </div>
      </footer>

      {/* 1. Report Problem Modal */}
      <ReportProblemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onProblemCreated={(newProb) => {
          addProblem(newProb);
          setCurrentTab('feed');
        }}
      />

      {/* 2. Problem Detail & Solution Submission Drawer / Modal */}
      <ProblemDetailModal
        isOpen={Boolean(selectedProblem)}
        onClose={() => setSelectedProblem(null)}
        problem={selectedProblem}
        onUpvote={upvoteProblem}
        onSolutionSubmitted={handleSolutionSubmitted}
      />

      {/* 3. Evaluation Scorecard Modal */}
      {scorecardData.evaluation && (
        <EvaluationScorecardModal
          isOpen={scorecardData.isOpen}
          onClose={() => setScorecardData((prev) => ({ ...prev, isOpen: false }))}
          evaluation={scorecardData.evaluation}
          studentName={scorecardData.studentName}
          solutionTitle={scorecardData.solutionTitle}
          problemTitle={scorecardData.problemTitle}
          certificate={scorecardData.certificate}
          onViewCertificate={() => {
            if (scorecardData.certificate) {
              setScorecardData((prev) => ({ ...prev, isOpen: false }));
              setActiveCertificate(scorecardData.certificate);
            }
          }}
          onRefineSolution={() => {
            setScorecardData((prev) => ({ ...prev, isOpen: false }));
            // Re-open problem modal in submit tab
            const matchingProb = problems.find((p) => p.formalTitle === scorecardData.problemTitle);
            if (matchingProb) setSelectedProblem(matchingProb);
          }}
        />
      )}

      {/* 4. Verified Certificate Modal */}
      <CertificateModal
        isOpen={Boolean(activeCertificate)}
        onClose={() => setActiveCertificate(null)}
        certificate={activeCertificate}
      />

      {/* 5. Certificate Verification Lookup Modal */}
      <VerifyModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onLookup={findCertificate}
        onOpenCertificate={(cert) => {
          setIsVerifyModalOpen(false);
          setActiveCertificate(cert);
        }}
        solutions={solutions}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PragatiGridApp />
    </ToastProvider>
  );
}
