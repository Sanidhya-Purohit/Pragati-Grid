import { useState, useEffect, useCallback, useMemo } from 'react';
import type { CivicProblem, StudentSolution, CivicCertificate, Persona, LeaderboardEntry } from '../types';
import {
  INITIAL_PROBLEMS,
  INITIAL_VERIFIED_SOLUTION,
  INITIAL_CERTIFICATES,
  INITIAL_LEADERBOARD,
} from '../mockData';
import { nudgePriorityScore } from '../utils/civicLogic';

const STORAGE_KEYS = {
  PROBLEMS: 'pragati_problems_v2',
  SOLUTIONS: 'pragati_solutions_v2',
  CERTIFICATES: 'pragati_certificates_v2',
  THEME: 'pragati_theme_v2',
  PERSONA: 'pragati_persona_v2',
  UPVOTED_PROBLEMS: 'pragati_upvoted_problems_v2',
};

export function useCivicData() {
  const [problems, setProblems] = useState<CivicProblem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      return saved ? JSON.parse(saved) : INITIAL_PROBLEMS;
    } catch {
      return INITIAL_PROBLEMS;
    }
  });

  const [solutions, setSolutions] = useState<StudentSolution[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOLUTIONS);
      return saved ? JSON.parse(saved) : [INITIAL_VERIFIED_SOLUTION];
    } catch {
      return [INITIAL_VERIFIED_SOLUTION];
    }
  });

  const [certificates, setCertificates] = useState<CivicCertificate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  });

  const [upvotedProblemIds, setUpvotedProblemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UPVOTED_PROBLEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [persona, setPersonaState] = useState<Persona>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONA);
      return (saved === 'citizen' || saved === 'student' || saved === 'leaderboard')
        ? saved
        : 'student';
    } catch {
      return 'student';
    }
  });

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Persist problems
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
  }, [problems]);

  // Persist solutions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOLUTIONS, JSON.stringify(solutions));
  }, [solutions]);

  // Persist certificates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  }, [certificates]);

  // Persist upvoted IDs
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UPVOTED_PROBLEMS, JSON.stringify(upvotedProblemIds));
  }, [upvotedProblemIds]);

  // Persist persona
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PERSONA, persona);
  }, [persona]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setPersona = useCallback((newPersona: Persona) => {
    setPersonaState(newPersona);
  }, []);

  const addProblem = useCallback((problem: CivicProblem) => {
    setProblems((prev) => [problem, ...prev]);
  }, []);

  const hasUserUpvoted = useCallback(
    (problemId: string) => upvotedProblemIds.includes(problemId),
    [upvotedProblemIds]
  );

  /**
   * Enforces 1 upvote per problem per user
   */
  const upvoteProblem = useCallback(
    (problemId: string): { success: boolean; message: string } => {
      if (upvotedProblemIds.includes(problemId)) {
        return {
          success: false,
          message: 'You have already upvoted this bottleneck (strictly 1 vote per problem allowed).',
        };
      }

      setUpvotedProblemIds((prev) => [...prev, problemId]);

      setProblems((prev) =>
        prev.map((p) => {
          if (p.id === problemId) {
            const newUpvotes = p.upvotes + 1;
            const nudgedScore = nudgePriorityScore(p.metrics.overallPriorityScore, newUpvotes);
            return {
              ...p,
              upvotes: newUpvotes,
              metrics: {
                ...p.metrics,
                overallPriorityScore: nudgedScore,
              },
            };
          }
          return p;
        })
      );

      return {
        success: true,
        message: 'Upvote recorded! AI rank slightly adjusted.',
      };
    },
    [upvotedProblemIds]
  );

  const addSolution = useCallback(
    (solution: StudentSolution, certificate?: CivicCertificate) => {
      setSolutions((prev) => [solution, ...prev]);

      if (certificate) {
        setCertificates((prev) => [certificate, ...prev]);
      }

      // Update the problem status & solutionsCount
      setProblems((prev) =>
        prev.map((p) => {
          if (p.id === solution.problemId) {
            const isVerified = Boolean(certificate);
            return {
              ...p,
              solutionsCount: p.solutionsCount + 1,
              status: isVerified
                ? 'Verified Solved'
                : p.status === 'Verified Solved'
                ? 'Verified Solved'
                : 'Solution Submitted',
            };
          }
          return p;
        })
      );
    },
    []
  );

  const resetDemoData = useCallback(() => {
    setProblems(INITIAL_PROBLEMS);
    setSolutions([INITIAL_VERIFIED_SOLUTION]);
    setCertificates(INITIAL_CERTIFICATES);
    setUpvotedProblemIds([]);
    localStorage.removeItem(STORAGE_KEYS.PROBLEMS);
    localStorage.removeItem(STORAGE_KEYS.SOLUTIONS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.UPVOTED_PROBLEMS);
  }, []);

  const findCertificate = useCallback(
    (certId: string): CivicCertificate | undefined => {
      const trimmed = certId.trim().toUpperCase();
      return certificates.find(
        (c) =>
          c.id.toUpperCase() === trimmed ||
          c.solutionId.toUpperCase() === trimmed ||
          (c.hash && c.hash.toUpperCase() === trimmed) ||
          (c.verificationHash && c.verificationHash.toUpperCase() === trimmed)
      );
    },
    [certificates]
  );

  const stats = useMemo(() => {
    const totalProblems = problems.length;
    const solvedCount = problems.filter((p) => p.status === 'Verified Solved').length;
    const totalImpactPoints = certificates.reduce(
      (acc, c) => acc + (c.impactScore || c.verifiedMetrics?.realWorldImpact || 85),
      0
    );

    return {
      totalProblems,
      solvedCount,
      totalImpactPoints,
    };
  }, [problems, certificates]);

  const leaderboard: LeaderboardEntry[] = useMemo(() => {
    const base = [...INITIAL_LEADERBOARD];

    solutions.forEach((sol) => {
      if (sol.evaluation && sol.evaluation.isApprovedForCertificate) {
        const existing = base.find((entry) => entry.name.toLowerCase() === sol.studentName.toLowerCase());
        if (existing) {
          existing.problemsSolved += 1;
          existing.totalImpactPoints += sol.evaluation.overallScore;
          existing.verifiedCertificates += 1;
        } else {
          const matchingProblem = problems.find((p) => p.id === sol.problemId);
          base.push({
            rank: base.length + 1,
            name: sol.studentName,
            university: sol.university,
            problemsSolved: 1,
            totalImpactPoints: sol.evaluation.overallScore,
            topDomain: matchingProblem?.domain || 'Software & AI Systems',
            verifiedCertificates: 1,
          });
        }
      }
    });

    return base
      .sort((a, b) => b.totalImpactPoints - a.totalImpactPoints)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
  }, [solutions, problems]);

  return {
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
  };
}
