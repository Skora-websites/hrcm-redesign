import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PAGE_HEROES, CONTACT } from "../data/content";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Send,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "rcm-analyst",
    title: "Senior Healthcare RCM Analyst",
    department: "Operations & Auditing",
    location: "Greater Noida HQ (NX One)",
    type: "Full-Time",
    experience: "3 - 6 Years",
    description:
      "Lead claims scrutiny, denial root-cause analysis, and payer guideline compliance for tier-1 partner hospitals across private TPAs and government schemes.",
    requirements: [
      "In-depth knowledge of Indian healthcare insurance, TPAs, CGHS, and state health panels",
      "Hands-on expertise in claims deduction analysis and turnaround-time (TAT) monitoring",
      "Proficiency with hospital HIS billing workflows and reconciliation ledgers",
    ],
  },
  {
    id: "claims-audit-specialist",
    title: "Claims Audit & Reconciliation Specialist",
    department: "Finance & Accounts",
    location: "Greater Noida HQ",
    type: "Full-Time",
    experience: "2 - 5 Years",
    description:
      "Manage end-to-end reconciliation between bank remittances, settlement vouchers, and hospital financial records to detect and recover revenue leakage.",
    requirements: [
      "Strong background in hospital accounting reconciliation and dispute resolution",
      "Experience conducting line-by-line tariff and deduction audits against agreed payer MOUs",
      "Proficient in Excel, analytical financial modeling, and audit documentation",
    ],
  },
  {
    id: "software-engineer",
    title: "Healthcare Software Engineer (AI & Full-Stack)",
    department: "Technology & Software",
    location: "Greater Noida / Hybrid",
    type: "Full-Time",
    experience: "2 - 5 Years",
    description:
      "Build and optimize HRCM Software's proprietary AI claim-scrubbing engine, HIS API connectors, and automated OCR document ingestion pipelines.",
    requirements: [
      "Experience building scalable TypeScript, React, and Node.js or Python systems",
      "Familiarity with OCR engines, document parsing, and RESTful API integrations",
      "Interest in healthcare data standards, HIPAA compliance, and enterprise workflows",
    ],
  },
  {
    id: "tpa-coordinator",
    title: "TPA & Government Panel Relations Lead",
    department: "Payer Relations",
    location: "Greater Noida / Hospital Embedded",
    type: "Full-Time",
    experience: "4 - 8 Years",
    description:
      "Drive strategic coordination and query resolution with leading private insurance TPAs, CGHS, ESI, and state health authority desks.",
    requirements: [
      "Proven relationship management with key TPA claims heads and panel nodal officers",
      "Deep understanding of pre-authorization protocols, query escalations, and settlement norms",
      "Exceptional communication, dispute management, and negotiation skills",
    ],
  },
  {
    id: "medical-coding-specialist",
    title: "Medical Data & Coding Executive",
    department: "Clinical Documentation",
    location: "Greater Noida HQ",
    type: "Full-Time",
    experience: "1 - 4 Years",
    description:
      "Review discharge summaries, diagnostic reports, and surgical billings to ensure accurate ICD/CPT coding and zero documentation deficiencies.",
    requirements: [
      "Certified or trained in clinical documentation improvement and standard medical coding",
      "Meticulous attention to detail in verifying investigations against billed procedures",
      "Background in pharmacy, nursing, or life sciences preferred",
    ],
  },
  {
    id: "ar-executive",
    title: "Accounts Receivable (AR) Follow-up Executive",
    department: "Receivables Management",
    location: "Greater Noida HQ",
    type: "Full-Time",
    experience: "1 - 3 Years",
    description:
      "Actively follow up on pending, delayed, and short-paid claims with insurers to accelerate hospital cash realization within statutory timelines.",
    requirements: [
      "Experience following up with payer portals, tracking claims, and resolving query holds",
      "Disciplined adherence to daily TAT tracking and escalation schedules",
      "Goal-driven mindset with dedication to lowering aging receivables",
    ],
  },
];

const PERKS = [
  {
    title: "Competitive Compensation",
    description: "Industry-leading salary packages with performance-linked incentives and bonuses.",
    icon: TrendingUp,
  },
  {
    title: "Healthcare & Life Coverage",
    description: "Comprehensive medical insurance covering you and your immediate dependents.",
    icon: CheckCircle2,
  },
  {
    title: "Fast-Track Career Growth",
    description: "Rapid advancement pathways in a high-growth healthcare technology environment.",
    icon: Sparkles,
  },
  {
    title: "Modern HQ at NX One",
    description: "State-of-the-art office infrastructure located at NX One, Techzone-4, Greater Noida.",
    icon: Building2,
  },
  {
    title: "Mentorship by Industry Veterans",
    description: "Work directly alongside founders with 30+ years of healthcare leadership experience.",
    icon: GraduationCap,
  },
  {
    title: "Collaborative Impact Culture",
    description: "Be part of a mission-driven team making a tangible difference to hospitals across India.",
    icon: HeartHandshake,
  },
];

export function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantRole, setApplicantRole] = useState("");
  const [applicantNote, setApplicantNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-studio-50/40 text-ink-900">
      {/* Hero */}
      <PageHero
        data={PAGE_HEROES.careers}
        eyebrow="Join Our Mission"
        crumbs="Open Roles · Healthcare Innovation · Culture"
      />

      <div className="mx-auto max-w-[102rem] px-6 pt-6 sm:px-10 lg:px-12">
        <Breadcrumbs items={[{ label: "Careers" }]} />
      </div>

      {/* Culture Intro */}
      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                <Users className="h-3.5 w-3.5 text-emerald-600" />
                People & Purpose
              </span>
              <h2 className="mt-4 text-[2.2rem] font-bold tracking-tight text-ink-900 sm:text-[3rem] font-display leading-[1.12]">
                Build What Powers Healthcare Financial Health
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-700">
                Hospitals cannot save lives without sustainable financial health. At HRCM, we combine
                pioneering AI technology with deep operational expertise to protect provider margins,
                eliminate revenue loss, and streamline insurance recovery.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Whether you are a seasoned revenue cycle analyst, a medical coder, or a software
                engineer passionate about transforming healthtech, you will find meaningful, high-impact
                work and an empowering team at HRCM.
              </p>
            </div>

            <div className="lg:col-span-5 rounded-[32px] border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm">
              <h3 className="text-xl font-bold text-ink-900 font-display">Fast Facts About HRCM</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <p className="text-sm text-ink-700">
                    <strong className="text-ink-900 font-semibold">Leadership Heritage:</strong> Founded by
                    executives with over 30 years in hospital administration, insurance broking, and AR recovery.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <p className="text-sm text-ink-700">
                    <strong className="text-ink-900 font-semibold">Pan-India Operations:</strong> Managing
                    private credit, TPA, CGHS, and state scheme claims across top hospitals.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <p className="text-sm text-ink-700">
                    <strong className="text-ink-900 font-semibold">Headquarters:</strong> NX One, Greater
                    Noida Techzone-4, equipped with modern analytics labs and ops centers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Benefits Grid */}
      <section className="relative py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
              Why Join Us
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
              Perks & Employee Wellbeing
            </h2>
            <p className="mt-3 text-sm text-ink-600">
              We invest in our team with comprehensive benefits, mentorship, and a thriving workplace.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.title}
                  className="rounded-[24px] border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-500/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-ink-900 tracking-tight">{perk.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-600">{perk.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Open Positions */}
      <section id="openings" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                Career Opportunities
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
                Current Openings
              </h2>
            </div>
            <p className="text-sm text-ink-600 max-w-md">
              Don't see your exact role? Send your resume directly to{" "}
              <a href={`mailto:${CONTACT.email}`} className="font-semibold text-emerald-700 hover:underline">
                {CONTACT.email}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 grid gap-5">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="rounded-[24px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                        {job.department}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-700 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-700 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {job.type}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-medium text-slate-700 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.experience}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-ink-900 tracking-tight">{job.title}</h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed max-w-3xl">
                      {job.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs font-semibold text-ink-800 uppercase tracking-wider font-mono">
                        Key Requirements:
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-ink-600">
                        {job.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <a
                      href={`mailto:${CONTACT.email}?subject=Job Application: ${encodeURIComponent(job.title)}&body=Dear HRCM Team,%0D%0A%0D%0AI would like to apply for the position of ${encodeURIComponent(job.title)}.%0D%0A%0D%0APlease find my resume attached.`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all"
                    >
                      Apply via Email
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Application Box */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-12">
          <div className="rounded-[32px] bg-slate-900 text-white p-8 sm:p-12 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Direct Talent Channel
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-display">
                  Fast-Track Your Application
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Send your CV directly to our HR team at{" "}
                  <a href={`mailto:${CONTACT.email}`} className="text-emerald-400 underline font-semibold">
                    {CONTACT.email}
                  </a>{" "}
                  with your portfolio and current notice period, or reach our Greater Noida talent desk at{" "}
                  <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="text-white font-semibold">
                    {CONTACT.phones[0]}
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    Techzone-4, Greater Noida, UP 201306
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                    Responses within 48 business hours
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/10">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
                    <h4 className="mt-3 text-lg font-bold text-white">Application Received!</h4>
                    <p className="mt-2 text-xs text-slate-300">
                      Thank you for your interest in joining HRCM. Our recruitment team will review your profile
                      and connect with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="text-sm font-semibold text-white">Express Your Interest</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Role Interested In"
                        value={applicantRole}
                        onChange={(e) => setApplicantRole(e.target.value)}
                        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Brief note about your experience / LinkedIn profile URL"
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
