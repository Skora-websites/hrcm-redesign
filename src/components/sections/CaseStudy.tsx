import { useState } from "react";
import { Kicker } from "../ui";
import {
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Building2,
  Sparkles,
  Layers,
  RotateCcw,
} from "lucide-react";

interface MetricCard {
  label: string;
  before: string;
  after: string;
  improvement: string;
  subtext: string;
  icon: typeof Clock;
  tone: "azure" | "aqua" | "emerald" | "amber";
}

const HIGHLIGHT_METRICS: MetricCard[] = [
  {
    label: "Payment Turnaround",
    before: "230 Days",
    after: "90 Days",
    improvement: "61% Faster",
    subtext: "Down from 202–262 day average to 56–121 days",
    icon: Clock,
    tone: "azure",
  },
  {
    label: "Deduction Percentage",
    before: "Up to 23%",
    after: "As low as 1%",
    improvement: "95% Reduction",
    subtext: "Eliminated line-item leakages & documentation cuts",
    icon: TrendingDown,
    tone: "emerald",
  },
  {
    label: "Unsettled Balances",
    before: "₹23.5 Cr",
    after: "Nil (100% Resolved)",
    improvement: "100% Cleared",
    subtext: "Full resolution of multi-crore legacy backlogs",
    icon: DollarSign,
    tone: "aqua",
  },
  {
    label: "Rejected Claims Recovered",
    before: "Negligible",
    after: "₹10+ Crore",
    improvement: "Capital Restored",
    subtext: "Forensic recovery from historical rejected dockets",
    icon: RotateCcw,
    tone: "amber",
  },
];

interface ComparisonRow {
  parameter: string;
  before: string;
  after: string;
  detail: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    parameter: "Claims in Query",
    before: "High (Multi-Crore Levels)",
    after: "Minimal (Down to Lakhs)",
    detail: "Pre-submission audits & standardized dockets reduced queries at the source",
  },
  {
    parameter: "Payment TAT",
    before: "200+ Days (202–262d avg)",
    after: "56–121 Days (90d avg)",
    detail: "Timely docket submission & dedicated multi-tier payer follow-up protocols",
  },
  {
    parameter: "Deduction %",
    before: "Up to 23%",
    after: "As low as 1%",
    detail: "Detailed deduction analysis & root-cause corrections prior to resubmission",
  },
  {
    parameter: "Unsettled Balances",
    before: "₹23.5 Crore Backlog",
    after: "Nil (Fully Cleared)",
    detail: "Systematic reconciliation & accounts alignment to ensure zero leakage",
  },
  {
    parameter: "Rejected Claim Recovery",
    before: "Negligible / Abandoned",
    after: "₹10+ Crore Recovered",
    detail: "Dedicated recovery-driven follow-ups across TPAs, insurers & PSU panels",
  },
];

interface ChallengeCard {
  id: string;
  challengeTitle: string;
  statBadge: string;
  intervention: string;
  outcome: string;
}

const CHALLENGES_INTERVENTIONS: ChallengeCard[] = [
  {
    id: "queries",
    challengeTitle: "High Outstanding Queried Claims",
    statBadge: "Up to ₹7.21 Cr in Query",
    intervention:
      "Deployed on-site pre-submission audits and standardized docket packaging. Insurer queries were analyzed proactively to resolve medical documentation deficiencies before claim submission.",
    outcome:
      "Reduced pending query volume from multi-crore exposure down to manageable routine operational levels.",
  },
  {
    id: "tat",
    challengeTitle: "Extended Payment Turnarounds",
    statBadge: "202 – 262 Days Average TAT",
    intervention:
      "Instituted strict multi-channel dispatch (physical and electronic) combined with continuous tracking, escalation matrix alerts, and dedicated liaison desks with payer authorities.",
    outcome:
      "Compressed payment settlement cycles by over 60%, delivering normalized 56–121 day realization.",
  },
  {
    id: "deductions",
    challengeTitle: "Excessive Payer Deductions",
    statBadge: "Up to 23% Deduction Rate",
    intervention:
      "Conducted granular deduction code audits. Mapped hospital charge items against insurer agreements and government panel tariffs to rectify coding errors before final billing.",
    outcome:
      "Deduction percentage dropped to as low as 1%, protecting hospital margins across all major specialties.",
  },
  {
    id: "balances",
    challengeTitle: "Accumulated Unsettled Balances",
    statBadge: "₹23.5 Cr Unsettled Balance",
    intervention:
      "Executed an end-to-end ledger audit matching bank deposits, TDS certificates, and remittance advices directly against hospital HIS accounts.",
    outcome:
      "Complete reconciliation of historical unadjusted credits, eliminating ₹23.5 Cr in uncollected receivables.",
  },
  {
    id: "rejections",
    challengeTitle: "Low Recovery from Denials",
    statBadge: "Historically Abandoned Claims",
    intervention:
      "Created a specialized appeals and recovery squad. Re-audited clinical dossiers, obtained supplemental justification, and pursued structured escalated appeals with TPAs and state boards.",
    outcome:
      "Direct recovery of over ₹10 Crore in previously written-off or rejected hospital claims.",
  },
];

const TRUSTED_HOSPITALS = [
  "Yatharth Super Speciality Hospitals",
  "Primus Super Speciality Hospital",
  "Sharda Hospital & Medical Sciences",
  "Dr. Shroff's Charity Eye Hospital",
  "Ujala Cygnus Healthcare Services",
  "Aarvy Healthcare Super Speciality Hospital",
];

export function CaseStudy() {
  const [activeTab, setActiveTab] = useState<"matrix" | "interventions">("matrix");

  return (
    <section id="case-study" className="relative overflow-hidden py-20 sm:py-28 bg-[#f8fafc]">
      {/* Subtle Ambient Lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(0, 113, 227, 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[480px] w-[480px] rounded-full blur-3xl opacity-35"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-16">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-slate-200/80">
          <div className="max-w-3xl">
            <Kicker tone="azure">PROVEN CASE STUDY</Kicker>
            <h2 className="mt-3 text-[2.1rem] sm:text-[2.85rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#0f172a] font-display">
              Transformation of Hospital Credit Business
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#64748b] font-sans">
              How a leading multi-specialty hospital network engaged HRCM to overcome multi-crore
              query backlogs, eliminate ₹23.5 Cr in unsettled balances, and compress payment turnarounds from 230 to 90 days.
            </p>
          </div>

          {/* Context Badge Pill */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-azure-200 bg-azure-50/90 px-3.5 py-1.5 text-xs font-semibold text-azure-800">
              <Building2 className="h-3.5 w-3.5 text-azure-600" />
              Client: Multi-Specialty Hospital Network
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Partner: HRCM Receivables Recovery
            </span>
          </div>
        </div>

        {/* ── 4 Hero Metric Cards ── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HIGHLIGHT_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-azure-300 overflow-hidden"
              >
                {/* Top subtle highlight */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1"
                  style={{
                    background:
                      item.tone === "emerald"
                        ? "linear-gradient(90deg, #10b981, #059669)"
                        : item.tone === "aqua"
                        ? "linear-gradient(90deg, #06b6d4, #0891b2)"
                        : item.tone === "amber"
                        ? "linear-gradient(90deg, #f59e0b, #d97706)"
                        : "linear-gradient(90deg, #0284c7, #0369a1)",
                  }}
                />

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    {item.label}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                    <Icon className="h-4 w-4 text-azure-600" />
                  </span>
                </div>

                {/* Big Result with Before/After Tag */}
                <div className="mt-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                      {item.after}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700 line-through">
                      Was: {item.before}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      {item.improvement}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── View Toggle Tabs ── */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1.5 border border-slate-300/60">
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === "matrix"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="h-4 w-4" />
              Before & After Transformation Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("interventions")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === "interventions"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Root Challenges & HRCM Interventions
            </button>
          </div>

          <span className="text-xs text-slate-500 font-sans">
            Source: HRCM Hospital Deployment & Credit Audit Data
          </span>
        </div>

        {/* ── Tab 1: Transformation Matrix Table ── */}
        {activeTab === "matrix" && (
          <div className="mt-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                    <th scope="col" className="px-6 py-4">Parameter</th>
                    <th scope="col" className="px-6 py-4">Before HRCM (From Source)</th>
                    <th scope="col" className="px-6 py-4">After HRCM (Delivered Result)</th>
                    <th scope="col" className="px-6 py-4 hidden md:table-cell">Operational Impact & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr
                      key={idx}
                      className="transition-colors hover:bg-slate-50/60"
                    >
                      <td className="px-6 py-4.5 font-bold text-slate-900">
                        {row.parameter}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {row.before}
                        </span>
                      </td>
                      <td className="px-6 py-4.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          {row.after}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 hidden md:table-cell text-xs text-slate-600 leading-relaxed max-w-md">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary Note */}
            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Root causes addressed through audit standardization, multi-tier follow-up, and recovery focus.
              </span>
              <span className="font-semibold text-slate-700">
                100% Audit Verified Outcomes
              </span>
            </div>
          </div>
        )}

        {/* ── Tab 2: Detailed Challenges & Interventions ── */}
        {activeTab === "interventions" && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHALLENGES_INTERVENTIONS.map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[0.7rem] font-bold text-slate-700">
                      Phase 0{idx + 1}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-[0.7rem] font-semibold text-rose-700 border border-rose-200/60">
                      {item.statBadge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900 font-sans">
                    {item.challengeTitle}
                  </h3>

                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-azure-700">
                        HRCM Intervention:
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {item.intervention}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3.5">
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-emerald-700">
                    Delivered Outcome:
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-800 leading-snug">
                    {item.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Hospital Partners Banner (From PDF Page 5) ── */}
        <div className="mt-14 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Trusted by India's Leading Healthcare Brands
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900 font-sans">
                Partnerships Delivering Measurable Financial Turnaround
              </h3>
            </div>
            <span className="text-xs font-semibold text-azure-600">
              Pan-India Hospital Network Deployments
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRUSTED_HOSPITALS.map((hospital, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200/70 p-3 text-center transition-colors hover:bg-azure-50/50 hover:border-azure-200"
              >
                <span className="text-xs font-semibold text-slate-700 leading-tight">
                  {hospital}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
