import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  Upload,
  Sparkles,
  Camera,
  CheckCircle2,
  X,
  FileText,
  ShieldCheck,
  Loader2,
  Trash2,
  Layers,
  MapPin,
  Users,
  TrendingUp,
  Cpu,
  Zap,
  Cog,
  Droplet,
  HeartPulse,
  Leaf,
  Code,
  Image as ImageIcon,
  HelpCircle,
  Edit3,
} from 'lucide-react';
import type { EngineeringDomain, ProblemType, CivicProblem } from '../types';
import { clientAnalyzeProblem, clientAutofillProblem } from '../services/geminiClient';
import { validateImageUpload, sanitizeInput, calculatePriorityScore } from '../utils/civicLogic';
import { useToast } from '../context/ToastContext';

interface ReportProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemCreated: (newProblem: CivicProblem) => void;
}

interface UploadedPhoto {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

const PRESET_SAMPLES = [
  {
    label: '💧 Civil: Stormwater Choke & Silt Inundation',
    text: 'Silk Board junction is completely submerged in knee-deep water again every time it rains for 20 mins. The storm drains are packed with plastic trash and construction mud. Daily commuters, buses and emergency ambulances are stuck for 3 hours. Please fix before next downpour!',
  },
  {
    label: '⚡ Electrical: Open High-Tension Transformer Sparking',
    text: 'Gali no 4 near Bailey road, high tension transformer is hanging loose without safety wire or ground gate. Frequent sparking during rains and small street animals getting shocked. Kids play nearby daily, danger of major electrocution and transformer blast.',
  },
  {
    label: '💻 Software: Municipal Ration ePoS Machine Offline Fraud',
    text: 'In our mountain villages, mobile network is down 18 days a month. Fair Price Shop owners claim biometric machine is not working and refuse subsidised wheat and rice to 600 elderly widows and MGNREGA workers, while secretly selling our rations to private grocery stores in town.',
  },
  {
    label: '🧪 Biotech: Groundwater Fluoride Staining Children Teeth',
    text: 'In our village Chityal, borewell water tastes bitter and yellow. Children have brown stained teeth and older people suffer from terrible joint stiffness and knee deformities. RO plant installed 3 years back is broken because replacement filters are too costly. We need low-cost decentralized water purification urgently.',
  },
  {
    label: '🤖 Mechanical: Manual Sewage Culvert Desilting Hazard',
    text: 'In our old city wards, stormwater drains run through 1-meter narrow covered concrete culverts under shops. Every pre-monsoon season, sanitary workers are forced to enter these hazardous toxic gas channels with iron rods to dig out hardened sewage sediment. It is hazardous manual scavenging and workers risk asphyxiation from hydrogen sulfide gas.',
  },
];

const ALL_DOMAINS: { id: EngineeringDomain; label: string; icon: React.ElementType }[] = [
  { id: 'Software & AI Systems', label: 'Software & AI', icon: Code },
  { id: 'Hardware & Embedded IoT', label: 'Hardware & IoT', icon: Cpu },
  { id: 'Electrical & Energy Grids', label: 'Electrical & Energy', icon: Zap },
  { id: 'Mechanical & Robotics', label: 'Mechanical & Robotics', icon: Cog },
  { id: 'Civil, Urban & Hydraulics', label: 'Civil & Hydraulics', icon: Droplet },
  { id: 'Biotech & Environmental', label: 'Biotech & Environment', icon: Leaf },
  { id: 'Healthcare & Assistive Tech', label: 'Healthcare & Assistive', icon: HeartPulse },
];

const PROBLEM_TYPES: ProblemType[] = [
  'Software Application / AI',
  'Hardware / Physical Device',
  'System Architecture / Process',
  'Hybrid (Hardware + Software)',
];

export const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  isOpen,
  onClose,
  onProblemCreated,
}) => {
  const { showToast } = useToast();

  // Step 1: The very first thing asked - Raw Citizen Complaint
  const [complaint, setComplaint] = useState('');
  
  // AI Autofilled Fields (Citizen can review and edit)
  const [hasAutofilled, setHasAutofilled] = useState(false);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [formalTitle, setFormalTitle] = useState('');
  const [location, setLocation] = useState('');
  const [domain, setDomain] = useState<EngineeringDomain>('Civil, Urban & Hydraulics');
  const [problemType, setProblemType] = useState<ProblemType>('Hybrid (Hardware + Software)');
  const [targetAudience, setTargetAudience] = useState('');
  const [affectedPopulation, setAffectedPopulation] = useState<number>(10000);
  const [urgency, setUrgency] = useState<number>(85);
  const [severity, setSeverity] = useState<number>(85);
  const [solutionImprovement, setSolutionImprovement] = useState<number>(90);
  const [estimatedSavings, setEstimatedSavings] = useState('');
  const [paybackMonths, setPaybackMonths] = useState<number>(3);
  const [skills, setSkills] = useState<string[]>([]);
  const [reporterName, setReporterName] = useState('');
  
  // Photos
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  // Trigger AI Autofill from Description
  const triggerAutofill = async (textToAnalyze: string) => {
    if (!textToAnalyze.trim() || textToAnalyze.trim().length < 20) return;

    setIsAutofilling(true);
    try {
      const result = await clientAutofillProblem(textToAnalyze);
      setFormalTitle(result.formalTitle);
      if (!location || location === 'Bengaluru, Karnataka') {
        setLocation(result.suggestedLocation);
      }
      setDomain(result.domain);
      setProblemType(result.problemType);
      setTargetAudience(result.targetAudience);
      setAffectedPopulation(result.affectedPopulation);
      setUrgency(result.urgency);
      setSeverity(result.severity);
      setSolutionImprovement(result.solutionImprovementPotential);
      setEstimatedSavings(result.estimatedCostSavings);
      setPaybackMonths(result.paybackPeriodMonths);
      setSkills(result.recommendedSkills);
      setHasAutofilled(true);

      showToast({
        type: 'success',
        title: '✨ AI Auto-Classification Complete!',
        description: `Classified as ${result.domain} (${result.problemType}). Review or adjust details below.`,
      });
    } catch (err: any) {
      console.error('Autofill error:', err);
    } finally {
      setIsAutofilling(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setComplaint(val);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    // If citizen finishes typing a substantial sentence (>35 chars) and pauses for 1.2s, trigger autofill
    if (val.trim().length >= 35 && !hasAutofilled) {
      debounceTimerRef.current = setTimeout(() => {
        triggerAutofill(val);
      }, 1200);
    }
  };

  const handleDescriptionBlur = () => {
    if (complaint.trim().length >= 25 && !hasAutofilled && !isAutofilling) {
      triggerAutofill(complaint);
    }
  };

  const handleApplyPreset = (sampleText: string) => {
    setComplaint(sampleText);
    triggerAutofill(sampleText);
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (photos.length + files.length > 5) {
      showToast({
        type: 'warning',
        title: 'Maximum 5 Photos Allowed',
        description: 'You can upload up to 5 visual reference images per challenge report.',
      });
      return;
    }

    files.forEach((file) => {
      const validation = validateImageUpload(file.size, file.type);
      if (!validation.valid) {
        showToast({
          type: 'error',
          title: `Skipped ${file.name}`,
          description: validation.error,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [
          ...prev,
          {
            id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            dataUrl: reader.result as string,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complaint.trim() || complaint.trim().length < 15) {
      showToast({
        type: 'warning',
        title: 'Description too short',
        description: 'Please describe the problem in at least 15 characters.',
      });
      return;
    }

    if (!location.trim()) {
      showToast({
        type: 'warning',
        title: 'Location required',
        description: 'Please provide the city, campus, or specific locality.',
      });
      return;
    }

    setIsSubmitting(true);
    setLoadingStep('Activating Pragati AI Triage Engine & PII Redaction Filter...');

    try {
      const stepTimer1 = setTimeout(() => {
        setLoadingStep(`Synthesizing ${domain} architecture spec & multi-factor metrics...`);
      }, 1000);

      const analysis = await clientAnalyzeProblem({
        complaint: sanitizeInput(complaint),
        location: sanitizeInput(location),
        domain,
        problemType,
        imageUrls: photos.map((p) => p.dataUrl),
      });

      clearTimeout(stepTimer1);

      if (analysis.isSpamOrInvalid) {
        showToast({
          type: 'error',
          title: 'Report Flagged as Spam or Insufficient',
          description:
            'The AI triage engine could not identify an actionable engineering problem. Please provide more real-world details.',
        });
        setIsSubmitting(false);
        return;
      }

      // Compute multi-factor rank score
      const calculatedScore = calculatePriorityScore({
        urgency,
        populationImpact: Math.min(100, Math.max(10, Math.round(Math.log10(affectedPopulation + 10) * 20))),
        severity,
        environmentalRisk: analysis.metrics.environmentalRisk || 60,
        solutionImprovementPotential: solutionImprovement,
      });

      const newProblem: CivicProblem = {
        id: `prob-${Date.now()}`,
        formalTitle: formalTitle.trim() || analysis.formalTitle,
        originalComplaint: complaint.trim(),
        location: location.trim(),
        domain,
        problemType,
        imageUrls: photos.map((p) => p.dataUrl),
        formattedProblemStatement: analysis.formattedProblemStatement,
        detailedDescription: analysis.detailedDescription,
        rootCauses: analysis.rootCauses,
        expectedOutcomes: analysis.expectedOutcomes,
        sdgGoals: analysis.sdgGoals,
        metrics: {
          urgency,
          populationImpact: Math.min(100, Math.max(10, Math.round(Math.log10(affectedPopulation + 10) * 20))),
          severity,
          environmentalRisk: analysis.metrics.environmentalRisk || 60,
          solutionImprovementPotential: solutionImprovement,
          targetAudienceText: targetAudience.trim() || 'Regional Affected Citizens',
          affectedPopulationEstimate: affectedPopulation,
          overallPriorityScore: calculatedScore,
        },
        recommendedStudentSkills: skills.length > 0 ? skills : analysis.recommendedStudentSkills,
        upvotes: 1,
        status: 'Open',
        createdAt: new Date().toISOString(),
        reportedBy: reporterName.trim() || 'Local Citizen / Ward Reporter',
        solutionsCount: 0,
        estimatedCommunityROI: {
          annualCostSavings: estimatedSavings.trim() || analysis.estimatedCommunityROI?.annualCostSavings || '₹6.5 Lakhs ($7.8K)',
          paybackPeriodMonths: paybackMonths || analysis.estimatedCommunityROI?.paybackPeriodMonths || 3,
          directBeneficiaries: targetAudience.trim() || `${affectedPopulation.toLocaleString()} Residents`,
        },
      };

      onProblemCreated(newProblem);

      showToast({
        type: 'success',
        title: 'Problem Triaged & Published!',
        description: `Rank Score: ${calculatedScore}/100 in ${domain}. Ready for student innovators!`,
      });

      onClose();
    } catch (err: any) {
      console.error(err);
      showToast({
        type: 'error',
        title: 'Triage Failed',
        description: err.message || 'Could not complete AI problem analysis.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-white dark:bg-[#0c1017] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0f141f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Report a Local Problem
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                  AI Auto-Fill Enabled
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Local citizens don't need technical jargon. Just describe what is broken — Gemini AI classifies domains and impact automatically.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: FIRST THING ASKED - RAW PROBLEM DESCRIPTION */}
          <div className="space-y-3 bg-amber-50/50 dark:bg-amber-950/10 p-4 rounded-xl border border-amber-200/80 dark:border-amber-500/20">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-600 text-white text-xs font-mono">1</span>
                What problem did you notice? Describe in plain words <span className="text-amber-600 dark:text-amber-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => triggerAutofill(complaint)}
                disabled={isAutofilling || complaint.trim().length < 15}
                className="text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 transition-colors shadow-xs"
              >
                {isAutofilling ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Auto-Fill Details by AI
                  </>
                )}
              </button>
            </div>

            <textarea
              value={complaint}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              rows={4}
              placeholder="Describe what is broken, leaking, failing, or causing trouble in your area... (e.g. Silk Board storm drain overflowing with mud; OR distribution transformer catching fire; OR borewell water causing stained teeth; OR offline ration machine fraud...)"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 transition-colors placeholder:text-slate-400"
              required
            />

            {/* Quick Preset Prompts for rapid testing */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-amber-500" /> Or click a real-world citizen sample to auto-fill:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(sample.text)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-colors text-left"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI AUTOFILL CONFIRMATION BANNER */}
          {hasAutofilled && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 dark:text-emerald-200">
                <p className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-0.5">
                  ✨ AI Auto-Filled Engineering Parameters
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  Domain: <strong>{domain}</strong> · Modality: <strong>{problemType}</strong> · Affected: <strong>{affectedPopulation.toLocaleString()} people</strong>. You can review or tweak any values below before submitting.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: AUTO-FILLED FIELDS & CITIZEN REFINEMENT */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                Technical Attributes & Impact Metrics (Auto-filled by AI, customizable)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Formal Problem Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  Formal Engineering Title
                  {hasAutofilled && <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">(AI Inferred)</span>}
                </label>
                <input
                  type="text"
                  value={formalTitle}
                  onChange={(e) => setFormalTitle(e.target.value)}
                  placeholder="e.g. Digital Land Mutation Fraud & Forged Patta Prevention via Cryptographic State Ledger"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" /> Location / Region <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, Karnataka (Silk Board Corridor)"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Engineering Domain */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" /> Engineering Domain
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value as EngineeringDomain)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                >
                  {ALL_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Problem Modality */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Problem Modality
                </label>
                <select
                  value={problemType}
                  onChange={(e) => setProblemType(e.target.value as ProblemType)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {PROBLEM_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Audience & Affected Group */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-500" /> Target Audience & Affected Group
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. 42,000 smallholder agricultural families"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Affected Population Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Estimated Affected Population</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{affectedPopulation.toLocaleString()} people</span>
                </label>
                <input
                  type="number"
                  min={10}
                  step={100}
                  value={affectedPopulation}
                  onChange={(e) => setAffectedPopulation(Number(e.target.value) || 1000)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Urgency Rating Slider */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Urgency Level (Crisis factor)</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{urgency}/100</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={urgency}
                  onChange={(e) => setUrgency(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Severity Rating Slider */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Hardship & Damage Severity</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{severity}/100</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={severity}
                  onChange={(e) => setSeverity(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              {/* Solution Improvement Potential Slider */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Solution Improvement Delta (How much better if solved)</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{solutionImprovement}/100</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={solutionImprovement}
                  onChange={(e) => setSolutionImprovement(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Estimated ROI Savings */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Estimated Community Savings
                </label>
                <input
                  type="text"
                  value={estimatedSavings}
                  onChange={(e) => setEstimatedSavings(e.target.value)}
                  placeholder="e.g. ₹8.5 Lakhs / year in avoided losses"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Reporter Name (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Name or Community Organization (Optional)
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Resident Welfare Association / Student"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#090d14] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: MULTIPLE PHOTO UPLOADS (MAX 5) */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-500" /> Upload Photos / Evidence (Up to 5 images)
              </label>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {photos.length}/5 photos attached
              </span>
            </div>

            {/* Photo Thumbnails */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#090d14] border border-slate-200 dark:border-slate-800">
                {photos.map((photo, idx) => (
                  <div key={photo.id} className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square bg-slate-100 dark:bg-slate-900">
                    <img
                      src={photo.dataUrl}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[10px] text-white truncate max-w-full px-1">{photo.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="mt-1 p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-black/70 text-[9px] font-mono text-white">
                      #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {photos.length < 5 && (
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl hover:border-amber-500 dark:hover:border-amber-400 cursor-pointer bg-slate-50/50 dark:bg-slate-900/30 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-amber-500 mb-1" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to select photos or drag & drop (JPG, PNG, WebP &lt; 4MB)
                </span>
                <span className="text-[11px] text-slate-400">
                  Multiple photos help students inspect physical context and dimensions
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleMultipleFiles}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Privacy & Safety Note */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#0e1420] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>PII Redaction:</strong> Pragati Grid automatically strips phone numbers, house addresses, and personal identities before making the challenge visible to universities.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !complaint.trim()}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md shadow-amber-600/25 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingStep || 'Triaging Bottleneck...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Challenge to Pragati Grid</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
