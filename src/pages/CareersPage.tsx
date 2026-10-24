import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PAGE_HEROES, CONTACT } from "../data/content";
import {
  Building2,
  CheckCircle2,
  Clock,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  FileCheck2,
  ExternalLink,
} from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  tagline: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  qualification: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  experienceDetail: string;
  whyJoin: string;
  badges: string[];
}

const JOB_OPENINGS: JobOpening[] = [
  {
    id: "mis-executive",
    title: "MIS Executive",
    tagline: "Join HRCM and be a part of a team that drives data, insights and better healthcare outcomes.",
    department: "Healthcare Analytics & MIS",
    location: "Noida, Uttar Pradesh",
    type: "Full-Time · On-Site",
    experience: "1 – 3 Years",
    qualification: "Graduate in any discipline. Candidates with strong Excel and MIS skills are encouraged to apply.",
    description:
      "Join HRCM and be a part of a team that drives data, insights and better healthcare outcomes. As an MIS Executive, you will prepare and maintain daily, weekly & monthly MIS reports, validate and consolidate operational hospital data, track hospital claims and collections, monitor turnaround times (TATs), and support operations and finance teams with data-driven insights.",
    responsibilities: [
      "Prepare and maintain daily, weekly & monthly MIS reports",
      "Collect, validate, consolidate and analyse operational data",
      "Track hospital claims, billing, collections, outstanding & settlement data",
      "Prepare dashboards and management reports for internal review",
      "Monitor key KPIs, TATs, productivity and performance metrics",
      "Identify data discrepancies and coordinate with respective teams for correction",
      "Maintain accurate databases and ensure timely reporting",
      "Generate ad-hoc reports and analysis as required by management",
      "Support operations and finance teams with data-driven insights",
      "Ensure data accuracy, confidentiality and timely submission of reports",
    ],
    skills: [
      "Advanced MS Excel (Pivot Tables, VLOOKUP/XLOOKUP, SUMIFS, COUNTIFS, IF formulas, data cleaning & reporting)",
      "Knowledge of MIS dashboards and data analysis",
      "Strong analytical and problem-solving skills",
      "Good attention to detail and accuracy",
      "Ability to work with large volumes of data",
      "Good communication and coordination skills",
      "Ability to manage multiple reports and deadlines",
    ],
    experienceDetail:
      "1–3 years of experience in MIS / Reporting / Data Management. Experience in Healthcare, Hospital, TPA, Insurance, Billing, Claims or Revenue Cycle Management will be an added advantage.",
    whyJoin:
      "Work at the intersection of Healthcare + Finance + Technology + Data and help hospitals improve their revenue realization and operational efficiency.",
    badges: ["Full-Time On-site", "Noida, UP", "1–3 Years Exp", "Healthcare MIS & Excel"],
  },
  {
    id: "billing-claims-auditor",
    title: "Billing & Claims Auditor",
    tagline: "Accurate Claims. Healthier Hospitals.",
    department: "Healthcare Hospital RCM & Audit",
    location: "Noida, Uttar Pradesh",
    type: "Full-Time · On-Site",
    experience: "4 – 8 Years",
    qualification:
      "Graduate in any discipline. Experience in Hospital Administration, Healthcare RCM, Medical Billing, Hospital Finance or Claims Management will be preferred.",
    description:
      "HRCM is looking for an experienced Billing & Claims Auditor with hands-on expertise in hospital billing, claims auditing, Government Healthcare Schemes (CGHS, ECHS, ESIC, Ayushman Bharat PM-JAY & State Schemes) and TPA/Insurance processes. The candidate will review claims, identify discrepancies, analyse deductions, and help hospitals improve revenue realization.",
    responsibilities: [
      "Audit hospital bills and claims for accuracy, completeness & compliance",
      "Review Government Schemes and TPA/Insurance claims",
      "Verify package rates, tariffs, procedures, investigations, medicines, implants & consumables",
      "Review CGHS, ECHS, ESIC, Ayushman Bharat/PM-JAY & State Schemes",
      "Identify billing errors, missed charges & revenue leakage",
      "Analyse deductions, rejections, denials & short payments",
      "Verify medical records, authorizations and claim documentation",
      "Support claim correction, resubmission, reconciliation & recovery",
      "Prepare audit reports, MIS and management observations",
      "Coordinate with hospital billing, finance, medical records, TPA/Insurance and scheme teams",
      "Stay updated on Government Scheme guidelines, package rates and TPA/Insurance policies",
    ],
    skills: [
      "4–8 years of relevant experience in Hospital Billing, Claims, Audit or Healthcare RCM",
      "Hands-on experience with Government Healthcare Schemes AND TPA/Insurance",
      "Strong understanding of hospital billing & claims processes",
      "Excellent analytical and auditing skills",
      "Good knowledge of MS Excel & MIS reporting",
      "Strong attention to detail and communication skills",
    ],
    experienceDetail:
      "4–8 years of relevant experience in Hospital Billing, Claims, Audit or Healthcare RCM with hands-on experience in CGHS, ECHS, ESIC, Ayushman Bharat PM-JAY and TPA/Insurance processes.",
    whyJoin:
      "Join HRCM and work with healthcare organizations to strengthen Revenue Cycle Management, reduce revenue leakage and improve claim realization, with exposure to Government Schemes and TPA/Insurance operations.",
    badges: [
      "Full-Time On-site",
      "Noida, UP",
      "4–8 Years Exp",
      "CGHS · ECHS · ESIC · PM-JAY · TPA",
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

function getGmailComposeUrl(jobTitle: string): string {
  const subject = encodeURIComponent(`Job Application: ${jobTitle} - HRCM`);
  const body = encodeURIComponent(
`Dear HRCM Hiring Team,

I would like to apply for the position of ${jobTitle} at HRCM (Noida, UP).

--- APPLICANT DETAILS ---
Full Name: 
Phone Number: 
Current Location: 
Total Years of Experience: 
Current / Previous Organization: 
Notice Period / Availability: 
Key Skills & Highlights: 

(Please attach your Resume/CV to this email before sending)

Looking forward to hearing from your recruitment team.

Best regards,
`
  );
  return `https://mail.google.com/mail/?view=cm&fs=1&to=info@hrcm.in&su=${subject}&body=${body}`;
}

function getMailtoUrl(jobTitle: string): string {
  const subject = encodeURIComponent(`Job Application: ${jobTitle} - HRCM`);
  const body = encodeURIComponent(
`Dear HRCM Hiring Team,

I would like to apply for the position of ${jobTitle} at HRCM.

--- APPLICANT DETAILS ---
Full Name: 
Phone Number: 
Current Location: 
Total Years of Experience: 
Notice Period: 

(Please attach your Resume/CV to this email before sending)

Best regards,
`
  );
  return `mailto:info@hrcm.in?subject=${subject}&body=${body}`;
}

export function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantRole, setApplicantRole] = useState("");
  const [applicantNote, setApplicantNote] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(
      `Job Application: ${applicantRole || "Career Opportunity"} - ${applicantName}`
    );
    const body = encodeURIComponent(
`Dear HRCM Hiring Team,

I am submitting my application for career opportunities at HRCM.

--- APPLICANT DETAILS ---
Full Name: ${applicantName}
Email: ${applicantEmail}
Phone Number: ${applicantPhone}
Role Interested In: ${applicantRole}
Brief Note / Experience:
${applicantNote}

(Please attach your Resume/CV to this email before sending)

Looking forward to hearing from your recruitment team.

Thank you,
${applicantName}
`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=info@hrcm.in&su=${subject}&body=${body}`,
      "_blank"
    );
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
                pioneering technology with deep operational expertise to protect provider margins,
                eliminate revenue loss, and streamline insurance recovery.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                Whether you are a seasoned hospital claims auditor or an analytics professional
                passionate about healthcare data, you will find meaningful, high-impact work and an
                empowering team at HRCM.
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
                    <strong className="text-ink-900 font-semibold">Headquarters:</strong> Tower 4, NX One,
                    Techzone-4, Greater Noida, UP, equipped with modern analytics labs and operations centers.
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
                Official Hiring Opportunities
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl font-display">
                Current Openings
              </h2>
            </div>
            <p className="text-sm text-ink-600 max-w-md">
              Ready to apply? Click the apply button to open Gmail with a pre-filled template composed to{" "}
              <a href="mailto:info@hrcm.in" className="font-semibold text-emerald-700 hover:underline">
                info@hrcm.in
              </a>
              . Our recruitment team will review your CV and connect with you.
            </p>
          </div>

          <div className="mt-8 grid gap-8">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="rounded-[28px] border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-lg"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {job.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-xs font-semibold text-emerald-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight font-display">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-emerald-700 font-sans">
                      {job.tagline}
                    </p>
                    <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Apply Actions Box */}
                  <div className="shrink-0 flex flex-col gap-2.5 sm:min-w-[240px]">
                    <a
                      href={getGmailComposeUrl(job.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                    >
                      <Mail className="h-4 w-4" />
                      Apply via Gmail
                      <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                    </a>
                    <a
                      href={getMailtoUrl(job.title)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      Open in Default Mail App
                    </a>
                    <p className="text-[0.72rem] text-slate-500 text-center leading-tight">
                      Opens Gmail composed to <strong className="text-slate-700">info@hrcm.in</strong>. Fill your details & attach your CV.
                    </p>
                  </div>
                </div>

                {/* Details Breakdown Grid */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Key Responsibilities */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                        <FileCheck2 className="h-3.5 w-3.5" />
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 font-mono">
                        Key Responsibilities
                      </h4>
                    </div>
                    <ul className="space-y-2 text-xs text-ink-700">
                      {job.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Required Skills, Experience & Qualification */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Required Skills */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-azure-50 text-azure-700">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900 font-mono">
                          Required Skills & Competencies
                        </h4>
                      </div>
                      <ul className="space-y-2 text-xs text-ink-700">
                        {job.skills.map((skill, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-azure-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Experience & Qualification Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                          Experience Required
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-800">
                          {job.experience}
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-600 leading-snug">
                          {job.experienceDetail}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5">
                        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-500 font-mono">
                          Qualification
                        </p>
                        <p className="mt-1 text-xs font-semibold text-slate-800">
                          Graduate in any discipline
                        </p>
                        <p className="mt-1 text-[0.7rem] text-slate-600 leading-snug">
                          {job.qualification}
                        </p>
                      </div>
                    </div>

                    {/* Why Join HRCM Card */}
                    <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4">
                      <p className="text-[0.72rem] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                        Why Join HRCM?
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-emerald-950 font-sans">
                        {job.whyJoin}
                      </p>
                    </div>
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
                  Send your CV directly to our talent team at{" "}
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@hrcm.in&su=Job%20Application%20-%20HRCM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline font-semibold"
                  >
                    info@hrcm.in
                  </a>{" "}
                  with your portfolio and notice period, or reach our Greater Noida talent desk at{" "}
                  <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="text-white font-semibold">
                    {CONTACT.phones[0]}
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                    Tower 4, NX One, Techzone-4, Greater Noida, UP 201306
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
                    <h4 className="mt-3 text-lg font-bold text-white">Gmail Compose Opened!</h4>
                    <p className="mt-2 text-xs text-slate-300">
                      Your details were formatted into an email to <strong className="text-white">info@hrcm.in</strong>.
                      Please review, attach your CV/Resume, and hit send. The HRCM recruitment team will contact you shortly!
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 rounded-xl bg-white/20 hover:bg-white/30 px-4 py-2 text-xs text-white"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">Express Your Interest</h4>
                      <span className="text-[0.7rem] text-slate-400">Composes to info@hrcm.in</span>
                    </div>
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
                      <select
                        required
                        value={applicantRole}
                        onChange={(e) => setApplicantRole(e.target.value)}
                        className="rounded-xl border border-white/20 bg-slate-900 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="" disabled>Select Role Interested In</option>
                        <option value="MIS Executive">MIS Executive (1–3 Yrs Exp)</option>
                        <option value="Billing & Claims Auditor">Billing & Claims Auditor (4–8 Yrs Exp)</option>
                        <option value="Other Healthcare Role">Other Healthcare Role</option>
                      </select>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Brief note about your experience, current CTC/notice period, or LinkedIn URL"
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-xs font-semibold text-white transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Apply via Gmail to info@hrcm.in
                    </button>
                    <p className="text-[0.68rem] text-slate-400 text-center">
                      Opens Gmail with pre-filled details to info@hrcm.in. Attach your CV and our HR team will contact you.
                    </p>
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
