export type EngineeringDomain =
  | 'Software & AI Systems'
  | 'Hardware & Embedded IoT'
  | 'Electrical & Energy Grids'
  | 'Mechanical & Robotics'
  | 'Civil, Urban & Hydraulics'
  | 'Biotech & Environmental'
  | 'Healthcare & Assistive Tech'
  | 'Agriculture & Rural Tech';

export type CivicCategory = EngineeringDomain;

export type ProblemType =
  | 'Software Application / AI'
  | 'Hardware / Physical Device'
  | 'System Architecture / Process'
  | 'Hybrid (Hardware + Software)';

export type ProblemStatus = 'Open' | 'Solution Submitted' | 'Verified Solved';

export interface ProblemMetrics {
  urgency: number; // 1-100 (urgency of bottleneck)
  populationImpact: number; // 1-100 (magnitude of affected population)
  severity: number; // 1-100 (severity of harm or economic loss)
  environmentalRisk: number; // 1-100
  solutionImprovementPotential?: number; // 1-100 (how much better if a solution came)
  targetAudienceText?: string; // e.g. "42,000 smallholder agricultural families"
  affectedPopulationEstimate?: number; // raw numeric count e.g. 42000
  overallPriorityScore: number; // 1-100 composite priority
  calculatedRankScore?: number; // AI multi-factor rank including modest upvote weighting
}

export interface CollabRequest {
  id: string;
  studentName: string;
  university: string;
  roleNeeded: string;
  message: string;
  createdAt: string;
}

export interface CivicProblem {
  id: string;
  originalComplaint: string;
  location: string;
  domain: EngineeringDomain;
  category?: string; // Legacy fallback
  problemType: ProblemType;
  imageUrls: string[]; // Multiple photos support
  formalTitle: string;
  formattedProblemStatement: string; // 3-sentence: Who is affected, What the bottleneck is, Why it matters
  detailedDescription: string;
  rootCauses: string[]; // 3 items
  expectedOutcomes: string[]; // 3 items
  sdgGoals: string[];
  metrics: ProblemMetrics;
  recommendedStudentSkills: string[];
  upvotes: number;
  status: ProblemStatus;
  createdAt: string;
  reportedBy?: string;
  solutionsCount: number;
  collabRequests?: CollabRequest[];
  estimatedCommunityROI?: {
    annualCostSavings: string;
    paybackPeriodMonths: number;
    directBeneficiaries: string;
  };
}

export interface TechnicalBlueprint {
  problemId: string;
  formalTitle: string;
  executiveConcept: string;
  domain: EngineeringDomain;
  problemType: ProblemType;
  threeStepRoadmap: {
    step: number;
    title: string;
    duration: string;
    details: string;
  }[];
  recommendedHardwareSoftwareStack: {
    category: string;
    items: string[];
  }[];
  estimatedBudgetTier: string;
  keyTechnicalChallenges: string[];
  targetMilestones: string[];
}

export interface EvaluationSubScores {
  problemFit: number;
  feasibility: number;
  costEffectiveness: number;
  innovation: number;
  realWorldImpact: number;
}

export interface CodeAnalysisResult {
  codeQualityScore: number; // 0-100
  maintainabilityScore: number; // 0-100
  securityCheck: string;
  modularityReview: string;
  testingReadiness: string;
  keyFileInsights: { fileName: string; insight: string }[];
  totalFilesAnalyzed: number;
  batchesAnalyzedCount: number;
}

export interface SolutionEvaluation {
  overallScore: number;
  isApprovedForCertificate: boolean;
  subScores: EvaluationSubScores;
  strengths: string[];
  improvements: string[];
  weaknesses?: string[];
  implementationRisks?: string[];
  nextSteps?: string[];
  peerReviewCouncilVerdict?: string;
  evaluatorVerdict: string;
  evaluatedAt: string;
  codeAnalysis?: CodeAnalysisResult;
}

export interface StudentSolution {
  id: string;
  problemId: string;
  problemTitle: string;
  studentName: string;
  university: string;
  degreeBranch: string;
  teamMembers?: string;
  solutionTitle: string;
  executiveSummary: string;
  technicalArchitecture: string;
  materialsAndTech: string[];
  estimatedCost: string;
  scalabilityPlan: string;
  demoOrGithubLink?: string;
  codeZipFileName?: string;
  codeFilesAnalyzedCount?: number;
  submittedAt: string;
  evaluation?: SolutionEvaluation;
  certificateId?: string;
}

export interface CivicCertificate {
  id: string; // e.g., PRG-2026-4B9F12
  studentName: string;
  university: string;
  degreeBranch: string;
  problemTitle: string;
  domain: EngineeringDomain;
  category?: string;
  problemType?: ProblemType;
  location?: string;
  impactScore?: number;
  evaluatorVerdict?: string;
  councilVerdict?: string;
  issueDate: string;
  solutionId: string;
  problemId: string;
  verificationHash?: string;
  hash?: string;
  verifiedMetrics?: EvaluationSubScores;
}

export type Persona = 'citizen' | 'student' | 'leaderboard';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  university: string;
  problemsSolved: number;
  totalImpactPoints: number;
  topDomain: EngineeringDomain;
  verifiedCertificates: number;
}
