import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PAGE_HEROES, CONTACT } from "../data/content";
import { Link } from "../components/Link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileCheck2,
  FileSearch,
  Inbox,
  Layers,
  LucideIcon,
  Mail,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Interactive 3-Stage Workflow Data                                 */
/* ------------------------------------------------------------------ */

interface WorkflowStage {
  id: string;
  stageNumber: string;
  name: string;
  subtitle: string;
  tag: string;
  accent: string;
  accentBg: string;
  steps: {
    title: string;
    description: string;
    icon: LucideIcon;
    highlight?: boolean;
    loopWarning?: string;
  }[];
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: "stage-1",
    stageNumber: "Stage 01",
    name: "Pre-Authorization",
    subtitle: "Upfront AI audit before claims are submitted to payers",
    tag: "Risk Prevention",
    accent: "#5aa318",
    accentBg: "rgba(90, 163, 24, 0.12)",
    steps: [
      {
        title: "HIS Ingestion / Upload",
        description: "Direct API integration with hospital HIS pulls admission details and initial diagnosis instantly.",
        icon: Database,
      },
      {
        title: "AI Audit Run (Scrubbing)",
        description: "Evaluates claim items against payer-specific guidelines. Yields an instant Pass or Fail risk score.",
        icon: ShieldCheck,
        highlight: true,
        loopWarning: "Correction Loop: Discrepancies flagged and corrected before submission.",
      },
      {
        title: "Verified Submission",
        description: "Claim file is routed to insurer/TPA portal only once audit result is a confirmed 100% Pass.",
        icon: FileCheck2,
      },
      {
        title: "Query & Initial Approval",
        description: "Approval letters logged immediately; queries are flagged in real-time to prevent approval delays.",
        icon: Zap,
      },
    ],
  },
  {
    id: "stage-2",
    stageNumber: "Stage 02",
    name: "Pre-Discharge",
    subtitle: "Real-time billing scrutiny before patient discharge",
    tag: "Zero-Hold Discharge",
    accent: "#0071e3",
    accentBg: "rgba(0, 113, 227, 0.12)",
    steps: [
      {
        title: "Pre-Discharge Audit",
        description: "Final bill and clinical discharge summary cross-examined against tariffs and approval limits.",
        icon: FileSearch,
        highlight: true,
        loopWarning: "Correction Loop: Bill lines corrected prior to patient release.",
      },
      {
        title: "Document Portal Upload",
        description: "Scanned documents and investigations filed to payer portal strictly after audit verification.",
        icon: FileCheck2,
      },
      {
        title: "Final Discharge Approval",
        description: "Discharge approval confirmed with signed payer authorization, enabling smooth patient exit.",
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: "stage-3",
    stageNumber: "Stage 03",
    name: "Final Settlement",
    subtitle: "Complete reconciliation & automated payment matching",
    tag: "Cash Realization",
    accent: "#159a8c",
    accentBg: "rgba(21, 154, 140, 0.12)",
    steps: [
      {
        title: "File Submission Audit",
        description: "Full claim file re-audited at submission to eliminate deductions and post-discharge rejections.",
        icon: Scale,
      },
      {
        title: "Submission Mode Logged",
        description: "Online submission, physical file courier, or dual tracking logged with dispatch proof.",
        icon: Inbox,
      },
      {
        title: "Continuous TAT Tracking",
        description: "Monitored against statutory turnaround targets with automated escalation matrix triggers.",
        icon: Clock,
      },
      {
        title: "Bank Reconciliation",
        description: "Incoming payments mapped against claims; variances and unjustified deductions flagged instantly.",
        icon: TrendingUp,
        highlight: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Feature Matrices                                                  */
/* ------------------------------------------------------------------ */

const CORE_FEATURES = [
  {
    title: "AI-Based Claim Scrubbing & Denial Prediction",
    description:
      "Every claim file is screened before submission. Our proprietary AI flags documentation gaps, coding mismatches, and tariff violations beforehand—not weeks later as a denial.",
    icon: ShieldCheck,
    tag: "Pre-Submission",
  },
  {
    title: "Deduction Analysis Against Guidelines",
    description:
      "Each claim file is audited line-by-line against private insurers and government panel guidelines (CGHS, ESI, State schemes), with deductions and exact causes highlighted automatically.",
    icon: Scale,
    tag: "Rule Engine",
  },
  {
    title: "Automated Payment Posting & Reconciliation",
    description:
      "Incoming bank deposits and settlement remittances are automatically matched against hospital claim IDs, with short payments and unauthorized deductions isolated for immediate dispute.",
    icon: TrendingUp,
    tag: "Auto-Reconcile",
  },
  {
    title: "Audit-Ready Settlement Reports",
    description:
      "Consolidated settlement ledgers generated for every payer, panel, and period—giving finance leadership full visibility into paid sums, pending aging balances, and write-offs.",
    icon: FileSearch,
    tag: "Transparency",
  },
  {
    title: "Stage-Driven Accountability Workflow",
    description:
      "Every claim advances through defined operational milestones (submission, scrutiny, query handling, settlement), so billing teams always know exactly what action is due next.",
    icon: Layers,
    tag: "Process Control",
  },
  {
    title: "Unified Coverage: Private & Government Panels",
    description:
      "One single platform manages private credit business and government panel claims alike. No separate tools, redundant logins, or fragmented Excel sheets needed.",
    icon: Cpu,
    tag: "Unified Architecture",
  },
];

const PLATFORM_CAPABILITIES = [
  {
    title: "HIS-Integrated (API-Enabled)",
    description:
      "Connects directly with your hospital HIS to pull admission, diagnostic, and billing data automatically, cutting down repetitive data entry.",
    icon: Database,
  },
  {
    title: "OCR-Enabled Document Reader",
    description:
      "Built-in optical character recognition automatically reads physical discharge summaries, paper bills, and diagnostic reports.",
    icon: FileCheck2,
  },
  {
    title: "Email-Integrated Communication",
    description:
      "Monitors insurer email threads in real time, detecting queries, approvals, and authorization letters so nothing languishes in personal inboxes.",
    icon: Mail,
  },
  {
    title: "TAT-Enabled Escalation Matrix",
    description:
      "Automated turnaround-time alerts routed up the hospital management matrix whenever a claim stage is at risk of slipping past payer deadlines.",
    icon: Clock,
  },
];

/* ------------------------------------------------------------------ */
/*  Comparison Table Data                                             */
/* ------------------------------------------------------------------ */

const COMPARISON_ROWS = [
  {
    capability: "Claim Auditing",
    manual: "Manual review or basic rule checks",
    hrcm: "AI-driven audit at every stage — pre-auth, pre-discharge, and final settlement",
  },
  {
    capability: "HIS Integration",
    manual: "Rarely integrated; data re-keyed manually",
    hrcm: "API-enabled, direct two-way integration with the hospital's HIS",
  },
  {
    capability: "Data Entry",
    manual: "Manual typing from scanned documents",
    hrcm: "OCR-enabled — reads documents directly, no manual entry required",
  },
  {
    capability: "Panel Coverage",
    manual: "Separate spreadsheets for private vs. government panels",
    hrcm: "Single unified platform covering private credit business & government panels (CGHS/ESI)",
  },
  {
    capability: "Deduction Handling",
    manual: "Deductions discovered reactively weeks after settlement",
    hrcm: "Deductions analysed and flagged against payer guidelines proactively",
  },
  {
    capability: "Communication Tracking",
    manual: "Emails and queries tracked manually; easily missed",
    hrcm: "Email-integrated — approvals and queries highlighted automatically in real-time",
  },
  {
    capability: "Turnaround Time (TAT)",
    manual: "No structured tracking or alert system",
    hrcm: "Full TAT tracking with automated escalation-matrix notifications",
  },
  {
    capability: "Settlement Reporting",
    manual: "Manual, error-prone settlement reconciliation",
    hrcm: "Automated, audit-ready settlement reports ready on demand",
  },
  {
    capability: "Deployment Model",
    manual: "Rigid, monolithic all-or-nothing implementation",
    hrcm: "Modular — deploy by stage (Pre-auth, Discharge, Settlement) or complete suite",
  },
];

export function SoftwarePage() {
  const [activeStage, setActiveStage] = useState<string>("stage-1");
  const selectedStage = WORKFLOW_STAGES.find((s) => s.id === activeStage) || WORKFLOW_STAGES[0];

  return (
    <main className="relative min-h-screen bg-studio-50/40 text-ink-900">
      {/* Hero Header */}
      <PageHero
        data={PAGE_HEROES.software}
        eyebrow="Healthcare AI Platform"
        crumbs="AI Scrubbing · Deduction Engine · 3-Stage Workflow"
      />

      <div className="mx-auto max-w-[102rem] px-6 pt-6 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "HRCM Software" }]} />
      </div>

      {/* ============================================================ */}
      {/* Executive Summary & Strategic Overview                       */}
      {/* ============================================================ */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                Next-Generation RCM Technology
              </span>
              <h2 className="mt-4 text-[2.2rem] font-bold tracking-tight text-ink-900 sm:text-[3rem] font-display leading-[1.12]">
                Purpose-Built to Close Revenue Leakage Across Every Stage
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-700">
                HRCM Software is an AI-powered Revenue Cycle Management platform built to eliminate
                the revenue leakage, claim rejections, and manual reconciliation bottlenecks that erode
                hospital margins.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Whether managing corporate credit insurance, TPAs, or government health schemes
                such as CGHS, ESI, and state programs, HRCM Software enforces payer-specific
                guidelines, flags compliance vulnerabilities before submission, and tracks receivables
                until cash lands in the hospital's bank account.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/get-in-touch.html"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-brand transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  Schedule Software Walkthrough
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-6 py-3 text-sm font-semibold text-ink-800 shadow-sm transition-all hover:border-emerald-500 hover:text-emerald-700"
                >
                  Speak with RCM Architect: {CONTACT.phones[0]}
                </a>
              </div>
            </div>

            {/* Quick Stat Highlights Bento */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                  Turnaround Speed
                </p>
                <p className="mt-2 text-3xl font-extrabold text-ink-900 font-display">50% Faster</p>
                <p className="mt-2 text-xs text-ink-500 leading-normal">
                  Reduced from 120 days to 60 days payment turnaround
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 font-mono">
                  Deduction Drop
                </p>
                <p className="mt-2 text-3xl font-extrabold text-ink-900 font-display">91% Less</p>
                <p className="mt-2 text-xs text-ink-500 leading-normal">
                  Deductions drop from 23.5% down to 2.1% across audited panels
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-azure-700 font-mono">
                  Denial Mitigation
                </p>
                <p className="mt-2 text-3xl font-extrabold text-ink-900 font-display">82% Drop</p>
                <p className="mt-2 text-xs text-ink-500 leading-normal">
                  Denial rate dropped from 12.8% to 2.3% via upfront AI scrubbing
                </p>
              </div>

              <div className="rounded-[22px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-700 font-mono">
                  Panel Compatibility
                </p>
                <p className="mt-2 text-3xl font-extrabold text-ink-900 font-display">100%</p>
                <p className="mt-2 text-xs text-ink-500 leading-normal">
                  Private Insurers, TPAs, CGHS, ESI & State Health Schemes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Interactive 3-Stage Audit-Controlled Flow                    */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white/60 via-slate-50/80 to-white/60 border-y border-slate-200/80">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-500/10 border border-azure-500/20 px-3 py-1 text-xs font-semibold text-azure-700">
              <RefreshCw className="h-3 w-3 animate-spin" />
              Continuous Audit-Controlled Flow
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
              How It Works: Built-In Correction Loops at Every Checkpoint
            </h2>
            <p className="mt-3 text-base text-ink-600">
              Unlike traditional tools that notice denials weeks after discharge, HRCM Software
              executes audit checkpoints across three strict stages with automated correction loops.
            </p>
          </div>

          {/* Stage Selector Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {WORKFLOW_STAGES.map((stage) => {
              const active = activeStage === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`relative flex items-center gap-3 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                      : "bg-white/80 text-ink-700 border border-slate-200/90 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: active ? stage.accent : stage.accentBg,
                      color: active ? "#ffffff" : stage.accent,
                    }}
                  >
                    {stage.stageNumber.replace("Stage ", "")}
                  </span>
                  <span>{stage.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      active ? "bg-white/20 text-white" : "bg-slate-100 text-ink-500"
                    }`}
                  >
                    {stage.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage Detail Card with Steps */}
          <div className="mt-10 rounded-[32px] border border-slate-200/90 bg-white/95 p-8 sm:p-12 shadow-[0_12px_40px_-15px_rgba(16,24,40,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-slate-200/80 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                  {selectedStage.stageNumber} — {selectedStage.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-ink-900 font-display mt-1">
                  {selectedStage.name} Stage
                </h3>
                <p className="text-sm text-ink-600 mt-1">{selectedStage.subtitle}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200/60 px-4 py-2 text-xs font-semibold text-emerald-800 self-start sm:self-auto">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Zero-Leakage Enforcement
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {selectedStage.steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className={`relative flex flex-col justify-between rounded-[22px] p-6 transition-all duration-300 ${
                      step.highlight
                        ? "border-2 border-emerald-500/50 bg-emerald-50/40 shadow-sm"
                        : "border border-slate-200/80 bg-slate-50/60"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-900 shadow-sm border border-slate-200/80">
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </span>
                        <span className="text-xs font-mono font-bold text-ink-400">0{idx + 1}</span>
                      </div>
                      <h4 className="mt-4 text-base font-bold text-ink-900 tracking-tight">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink-600">
                        {step.description}
                      </p>
                    </div>

                    {step.loopWarning && (
                      <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[0.72rem] font-medium text-amber-900 flex items-start gap-1.5">
                        <RefreshCw className="h-3.5 w-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{step.loopWarning}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Key Core Features                                            */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-700">
              Core Architecture
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
              Enterprise Features Built for Indian Hospital Realities
            </h2>
            <p className="mt-4 text-base text-ink-600">
              Generic global RCM tools fail in Indian hospital billing because they lack deep
              guideline modeling for Indian private credit TPAs and government schemes. HRCM Software
              is purpose-built from the ground up for this operational landscape.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group relative flex flex-col justify-between rounded-[26px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-emerald-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[0.72rem] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink-900 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Platform Capabilities (HIS, OCR, Email, TAT)                 */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 bg-slate-900 text-white rounded-[36px] mx-4 sm:mx-8 lg:mx-12 overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-azure-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12 lg:px-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Integrations & Automation
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
              Zero Manual Bottlenecks: Connected Platform Capabilities
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Eliminate repetitive human error and document re-typing. HRCM Software connects
              seamlessly into hospital infrastructure and communications channels.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10 hover:border-emerald-400/30"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-5">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-white tracking-tight">{cap.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Comparison Matrix: Generic RCM vs HRCM Software              */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
              Competitive Advantage
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
              How HRCM Software is Different
            </h2>
            <p className="mt-3 text-base text-ink-600">
              Most hospitals either run revenue cycle tasks on spreadsheets or rely on generic billing
              software not built around payer- and panel-specific rules. See how HRCM compares:
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-[28px] border border-slate-200/90 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4.5 px-6 font-bold text-ink-900 font-mono text-xs uppercase tracking-wider w-1/4">
                    Capability
                  </th>
                  <th className="py-4.5 px-6 font-semibold text-ink-600 w-3/8">
                    Manual / Generic RCM Tools
                  </th>
                  <th className="py-4.5 px-6 font-bold text-emerald-800 bg-emerald-50/50 w-3/8">
                    HRCM Software
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={row.capability} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}>
                    <td className="py-4 px-6 font-semibold text-ink-900">{row.capability}</td>
                    <td className="py-4 px-6 text-ink-500 leading-relaxed flex items-center gap-2">
                      <span className="text-slate-400">✕</span>
                      <span>{row.manual}</span>
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-950 bg-emerald-50/30 leading-relaxed">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{row.hrcm}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Modular Purchase & Engagement Model                          */}
      {/* ============================================================ */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-emerald-50/30 border-t border-slate-200/80">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
              Engagement Flexibility
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
              Modular Purchase Options: Scale at Your Hospital's Pace
            </h2>
            <p className="mt-4 text-base text-ink-600 leading-relaxed">
              HRCM Software is modular by design. You are not forced into an all-or-nothing deployment.
              Deploy standalone AI audit, adopt stage-by-stage, or launch the complete end-to-end suite.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Model 1: Stage-Specific */}
            <div className="flex flex-col justify-between rounded-[28px] border border-slate-200/90 bg-white p-8 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-azure-700 bg-azure-50 px-3 py-1 rounded-full border border-azure-200/50">
                  Option 01
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">Single or Dual Stage</h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-600">
                  Target your hospital's most vulnerable bottleneck: choose Pre-Authorization,
                  Discharge Scrutiny, or Final Settlement reconciliation independently.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-ink-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-azure-600" />
                    <span>Focus on pre-auth risk prevention</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-azure-600" />
                    <span>Eliminate discharge-desk delays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-azure-600" />
                    <span>Upgrade to full suite anytime</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold text-ink-500 font-mono">Custom tailored volume pricing</p>
              </div>
            </div>

            {/* Model 2: Standalone AI Audit */}
            <div className="flex flex-col justify-between rounded-[28px] border-2 border-emerald-500 bg-emerald-50/20 p-8 shadow-md relative">
              <span className="absolute -top-3 right-6 rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300/50">
                  Option 02
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">Standalone AI Audit Tool</h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-600">
                  Keep your existing billing staff and HIS untouched. Layer our AI audit and
                  deduction-analysis engine on top to screen every claim file before outward submission.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-ink-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Instant guideline violation flagging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>82% denial rate reduction</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Zero workflow disruption to billing team</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-emerald-200/50">
                <p className="text-xs font-semibold text-emerald-800 font-mono">Plug-and-play AI licensing</p>
              </div>
            </div>

            {/* Model 3: Complete Suite */}
            <div className="flex flex-col justify-between rounded-[28px] border border-slate-200/90 bg-white p-8 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/50">
                  Option 03
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">Complete End-to-End Suite</h3>
                <p className="mt-3 text-xs leading-relaxed text-ink-600">
                  The complete 3-stage platform across Pre-Authorization, Discharge, and Final Settlement.
                  Includes HIS API integration, OCR reader, email monitor, and bank reconciliation.
                </p>
                <ul className="mt-6 space-y-2.5 text-xs text-ink-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>Full lifecycle claim visibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>Turnaround tracked across all panels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600" />
                    <span>Audit-ready settlement ledgers</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold text-ink-500 font-mono">Enterprise hospital deployment</p>
              </div>
            </div>
          </div>

          {/* Bottom Live Demo CTA */}
          <div className="mt-16 rounded-[32px] bg-gradient-to-r from-slate-900 via-studio-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Next Steps
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display mt-1">
                Experience a Live Demonstration of HRCM Software
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                We would welcome the opportunity to walk your hospital leadership and finance team through
                a live walkthrough and discuss a pricing structure tailored to your claim volume and panel mix.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/get-in-touch.html"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-md"
              >
                Request Live Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all"
              >
                Email: {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
