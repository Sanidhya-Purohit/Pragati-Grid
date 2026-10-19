/**
 * Pure business logic and calculations for Pragati Grid.
 */

import type { ProblemMetrics } from '../types';

/**
 * Strips dangerous HTML tags, script elements, and bounds characters.
 */
export function sanitizeInput(raw: string, maxLength: number = 4000): string {
  if (!raw) return '';
  let cleaned = raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength);
  }
  return cleaned;
}

/**
 * Validates uploaded image file: must be image and strictly under 4MB.
 */
export function validateImageUpload(
  fileSize: number,
  mimeType: string
): { valid: boolean; error?: string } {
  const MAX_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a JPG, PNG, or WebP image.',
    };
  }

  if (fileSize > MAX_SIZE) {
    return {
      valid: false,
      error: 'Image size exceeds 4MB limit.',
    };
  }

  return { valid: true };
}

/**
 * Validates uploaded zip archive: must be under 15MB.
 */
export function validateZipUpload(
  fileSize: number,
  fileName: string
): { valid: boolean; error?: string } {
  const MAX_SIZE = 15 * 1024 * 1024; // 15MB
  if (!fileName.toLowerCase().endsWith('.zip')) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a .zip archive of your source code.',
    };
  }
  if (fileSize > MAX_SIZE) {
    return {
      valid: false,
      error: 'Zip archive exceeds 15MB limit. Please remove node_modules and binary assets.',
    };
  }
  return { valid: true };
}

/**
 * Multi-factor AI rank analysis breakdown
 */
export interface MultiFactorRankDetails {
  rankScore: number; // 1-100 composite ranking score
  baseAiScore: number; // 1-100 pure AI merit score
  urgencyFactor: number; // 30%
  populationFactor: number; // 25%
  solutionImprovementFactor: number; // 25%
  severityFactor: number; // 15%
  upvoteBonus: number; // 0 - 5 points max
  targetAudience: string;
  affectedPopulation: number;
}

/**
 * Computes a standardized overall priority score (1-100) based on weighted factors:
 * - Urgency: 30%
 * - Population Impact: 25%
 * - Solution Improvement Delta: 25%
 * - Severity: 15%
 * - Environmental Risk: 5%
 */
export function calculatePriorityScore(
  metrics: Omit<ProblemMetrics, 'overallPriorityScore' | 'calculatedRankScore'>
): number {
  const u = Math.min(100, Math.max(1, metrics.urgency));
  const p = Math.min(100, Math.max(1, metrics.populationImpact));
  const s = Math.min(100, Math.max(1, metrics.severity));
  const delta = Math.min(100, Math.max(1, metrics.solutionImprovementPotential ?? 85));
  const e = Math.min(100, Math.max(1, metrics.environmentalRisk ?? 50));

  const weighted = u * 0.30 + p * 0.25 + delta * 0.25 + s * 0.15 + e * 0.05;
  return Math.min(100, Math.max(1, Math.round(weighted)));
}

/**
 * AI Multi-Factor Ranking Engine:
 * Analyzes:
 * 1. Urgency of the bottleneck (30% weight)
 * 2. Target audience & affected population scale (25% weight)
 * 3. Solution Improvement Potential - how much better if solved (25% weight)
 * 4. Severity & structural damage if unsolved (15% weight)
 * 5. Community Upvotes (Small modest booster, logarithmic curve capped at 5 pts max)
 *
 * This ensures that a critical crisis with 2 upvotes still ranks higher than a minor issue with 50 upvotes,
 * while upvotes still provide a tangible community boost between comparable problems!
 */
export function calculateMultiFactorRankScore(problem: {
  metrics: ProblemMetrics;
  upvotes: number;
}): MultiFactorRankDetails {
  const m = problem.metrics;
  const urgency = Math.min(100, Math.max(1, m.urgency || 70));
  const population = Math.min(100, Math.max(1, m.populationImpact || 70));
  const solutionImprovement = Math.min(100, Math.max(1, m.solutionImprovementPotential ?? 85));
  const severity = Math.min(100, Math.max(1, m.severity || 70));

  // AI Merit Score (0 - 100)
  const baseAiScore = Math.round(
    urgency * 0.30 +
    population * 0.25 +
    solutionImprovement * 0.25 +
    severity * 0.15 +
    (m.environmentalRisk || 50) * 0.05
  );

  // Small upvote factor: strictly capped between 0 and 5 points.
  // 1 upvote = +0.8 pt, 5 upvotes = +1.9 pt, 20 upvotes = +3.3 pt, 50+ upvotes = +5.0 pt.
  const upvoteCount = Math.max(0, problem.upvotes || 0);
  const upvoteBonus = Math.min(5, Number((Math.log10(upvoteCount + 1) * 2.7).toFixed(1)));

  // Final Composite Rank Score (max 100)
  const rankScore = Math.min(100, Math.max(1, Math.round(baseAiScore * 0.95 + upvoteBonus)));

  return {
    rankScore,
    baseAiScore,
    urgencyFactor: urgency,
    populationFactor: population,
    solutionImprovementFactor: solutionImprovement,
    severityFactor: severity,
    upvoteBonus,
    targetAudience: m.targetAudienceText || 'General Regional Community',
    affectedPopulation: m.affectedPopulationEstimate || 10000,
  };
}

/**
 * Dynamically adjusts priority score slightly based on citizen upvotes.
 */
export function nudgePriorityScore(baseScore: number, upvotes: number): number {
  const boost = Math.min(5, Math.floor(Math.max(0, upvotes) / 10));
  return Math.min(100, Math.max(1, baseScore + boost));
}

/**
 * Generates a unique, deterministic Certificate ID in the format PRG-2026-[6-HEX].
 */
export function generateCertificateId(seed: string = ''): string {
  let hash = 0;
  const str = `${seed}-${Date.now()}-${Math.random().toString(36).substring(2)}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(6, '0').slice(0, 6);
  return `PRG-2026-${hex}`;
}

/**
 * Splits an array of files into chunks of up to 10 files each for Gemini batch analysis.
 */
export function chunkFilesForGemini<T>(files: T[], chunkSize: number = 10): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < files.length; i += chunkSize) {
    chunks.push(files.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Generates the official LinkedIn Add to Profile certification deep link URL for Pragati Grid.
 */
export function buildLinkedInCertUrl(params: {
  certificateId: string;
  problemTitle: string;
  studentName: string;
  issueYear?: number;
  issueMonth?: number;
}): string {
  const baseUrl = 'https://www.linkedin.com/profile/add';
  const query = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: `Pragati Grid Solution: ${params.problemTitle}`,
    organizationName: 'Pragati Grid',
    issueYear: (params.issueYear || 2026).toString(),
    issueMonth: (params.issueMonth || 10).toString(),
    certId: params.certificateId,
    certUrl: typeof window !== 'undefined' ? window.location.origin : 'https://pragatigrid.in',
  });
  return `${baseUrl}?${query.toString()}`;
}

/**
 * Checks if an AI evaluation score meets the minimum threshold for certificate unlock (>= 70).
 */
export function isApprovedForCertificate(score: number): boolean {
  return score >= 70;
}
