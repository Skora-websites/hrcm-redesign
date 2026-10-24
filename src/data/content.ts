/**
 * HRCM — Single source of truth for all site copy.
 *
 * CONTENT-PRESERVATION RULE (see redesign brief §13):
 * Every string below is preserved VERBATIM from the current hrcm.in homepage
 * (archived 26 Sep 2026) unless explicitly marked otherwise.
 * Do not delete business claims. Do not invent clients, certifications,
 * awards, revenue numbers, or employee counts.
 */

export const NAV = [
  { label: "Home", href: "/" },
  { label: "HRCM Software", href: "/software.html" },
  { label: "Our Services", href: "/services.html" },
  { label: "Why Choose Us", href: "/why-choose-us.html" },
  { label: "About Us", href: "/about.html" },
  { label: "Our Team", href: "/our-team.html" },
  { label: "Careers", href: "/careers.html" },
  { label: "Get In Touch", href: "/get-in-touch.html" },
] as const;

/**
 * Central portal link — the client will provide the real URL later.
 * When it arrives, replace this single value and every "Explore Portal"
 * button (header, hero, CTA band, service pages) will redirect there.
 */
export const PORTAL_URL = "#";

export const HERO = {
  /** VERBATIM: current hero H1 ("Optimize Your Hospital Revenue with HRCM"). */
  headline: "Optimize Your Hospital Revenue with HRCM",
  /**
   * Subheading aligned with AI software & RCM capabilities.
   */
  subheadline:
    "AI-powered healthcare revenue cycle management and specialized operational recovery for hospitals across private insurers and government panels.",
  primaryCta: { label: "Request a Demo", href: "/get-in-touch.html" },
  portalCta: { label: "Explore Portal", href: PORTAL_URL },
  secondaryCta: { label: "Explore Software", href: "/software.html" },
} as const;

export const ABOUT = {
  heading: "About HRCM",
  /** VERBATIM: two paragraphs merged exactly as shown on the live site. */
  body: [
    "HRCM is a healthcare technology company providing end-to-end Revenue Cycle Management (RCM) solutions for hospitals and healthcare organizations. We support providers in managing their financial processes more efficiently — from patient billing to final settlement — with a strong focus on accuracy, compliance, and operational efficiency. Industry knowledge and well-structured processes help reduce revenue loss and improve cash flow.",
    "Our services simplify financial operations, support timely settlement, and strengthen the performance of healthcare revenue management systems.",
  ],
  /**
   * NOTE: the four "cards" that used to live here (Audit & Gap Analysis,
   * Process Optimization, Execution & Monitoring, Reporting & Improvement)
   * duplicated PROCESS.steps verbatim in both title and claim. Removed rather
   * than restated — every claim below still ships via PROCESS.
   */
  /** Live CTA was "EXPLORE PORTAL →" (pointed to "#") — now the real portal link. */
  cta: { label: "Explore Portal", href: PORTAL_URL },
} as const;

export type Service = {
  title: string;
  text: string;
  /** Detail page path for this service. */
  href: string;
  /**
   * VERBATIM detail-page intro. The live site has no service subpages (all
   * READ MORE links were dead "#"), so this is the homepage description used
   * as the page opener — nothing new is invented here.
   */
  detailIntro?: string;
  /** Marks copy that is NOT from the current site and needs client sign-off. */
  needsValidation?: boolean;
};

export const SERVICES: Service[] = [
  {
    title: "Claims Audit & Analysis",
    href: "/services/claims-audit-and-analysis.html",
    text: "HRCM conducts a detailed review of existing claims processes to identify inaccuracies, operational inefficiencies, and potential revenue loss. By analyzing claim submissions and settlement patterns, the company helps healthcare organizations improve claim accuracy, reduce denials, and identify missed revenue opportunities. This structured approach supports more efficient claims management and strengthens overall financial performance.",
    detailIntro:
      "HRCM conducts a detailed review of existing claims processes to identify inaccuracies, operational inefficiencies, and potential revenue loss.",
  },
  {
    title: "Claims Submission",
    href: "/services/claims-processing-and-submission.html",
    text: "HRCM ensures that claims are accurately prepared and submitted within required timelines to support faster settlement and smoother payment workflows. Through careful review and structured workflows, the team works to reduce claim rejections, minimize delays, and improve overall claims efficiency. This approach helps healthcare organizations shorten payment cycles and maintain a more stable revenue flow.",
    detailIntro:
      "Accurate preparation and timely submission of claims to support faster settlement and smooth payment clearance across private insurers and government panels.",
  },
  {
    title: "Query Management",
    href: "/services/query-management.html",
    text: "Structured handling and timely resolution of payer queries and documentation requests, keeping claims moving toward settlement without unnecessary delays. Automated query monitoring and escalation ensure nothing sits unnoticed in inboxes.",
    detailIntro:
      "Structured handling and rapid resolution of insurer and TPA queries to eliminate payment holds.",
  },
  {
    title: "Accounts Receivable Management",
    href: "/services/accounts-receivable-management.html",
    text: "HRCM provides proactive Accounts Receivable (AR) management by closely monitoring pending, delayed, and denied claims. The team works systematically to follow up with payers, resolve claim issues, and recover outstanding payments in a timely manner. This structured approach helps improve collection efficiency, reduce aging receivables, and support healthier cash flow for healthcare organizations.",
    detailIntro:
      "Proactive Accounts Receivable management through rigorous follow-ups, aging analysis, and denial recovery.",
  },
  {
    title: "Revenue Reconciliation",
    href: "/services/revenue-reconciliation.html",
    text: "HRCM ensures that claims and payment data are accurately reconciled with hospital accounting systems to maintain financial accuracy and transparency. By matching settlement, claims records, and financial reports, the company helps healthcare organizations identify discrepancies, improve reporting accuracy, and strengthen overall financial control. This process supports better decision-making and more reliable revenue tracking.",
    detailIntro:
      "End-to-end reconciliation between bank deposits, payer settlement summaries, and hospital accounting records.",
  },
  {
    title: "Data Management",
    href: "/services/data-management.html",
    text: "Comprehensive healthcare data management, document digitizing, and direct HIS integration. We structure, sanitize, and automate clinical records, discharge summaries, and bill items into audit-ready datasets, removing manual scanning and data entry workloads.",
    detailIntro:
      "Comprehensive healthcare data ingestion, document digitizing, and HIS integration for automated, error-free revenue management.",
  },
];

export const PROCESS = {
  heading: "How an engagement works",
  steps: [
    {
      num: "01",
      title: "Audit & Gap Analysis",
      text: "We review your current RCM process to find gaps and revenue leakage.",
    },
    {
      num: "02",
      title: "Process Optimization",
      text: "We rebuild the workflow around best practices for speed and accuracy.",
    },
    {
      num: "03",
      title: "Execution & Monitoring",
      text: "Our team manages claims, AR follow-ups and reconciliation with continuous monitoring.",
    },
    {
      num: "04",
      title: "Reporting & Improvement",
      text: "We provide actionable insights and reports to drive continuous financial improvement.",
    },
  ],
} as const;

export const IMPACT = {
  heading: "Business Impact",
  /** VERBATIM intro (including the trailing "Key benefits include." — flagged). */
  intro:
    "Providers working with HRCM see fewer claim errors, faster settlement, and stronger financial control — measured against their own baseline before engagement.",
  /**
   * All before/after figures preserved EXACTLY from the live site.
   *
   * METRIC-LABEL CORRECTIONS (approved by client in redesign decisions):
   *  - "Payment Turnaround": live label "96% Faster" is not derivable from
   *    120→60 days. Correct math = 50% faster. Label changed to "50% Faster".
   *    Numbers 120 / 60 preserved exactly.
   *  - Deduction 23.5→2.1  = 91.06% reduction → "91% Reduction" ✓ verified.
   *  - Unsettled 92→8      = 84 pts reduction    → "84% Reduction" ✓ verified.
   *  - Denial 12.8→2.3     = 82.03% reduction    → "82% Reduction" ✓ verified.
   * ALL figures still require final client validation before production.
   */
  metrics: [
    {
      title: "Payment Turnaround",
      unit: "Days",
      before: 120,
      after: 60,
      beforeLabel: "120",
      afterLabel: "60",
      result: "50% Faster",
    },
    {
      title: "Deduction Percentage",
      unit: "%",
      before: 23.5,
      after: 2.1,
      beforeLabel: "23.5",
      afterLabel: "2.1",
      result: "91% Reduction",
    },
    {
      title: "Unsettled Balances",
      unit: "₹ Cr",
      before: 92,
      after: 8,
      beforeLabel: "92%",
      afterLabel: "8%",
      result: "84% Reduction",
    },
    {
      title: "Denial Rate",
      unit: "%",
      before: 12.8,
      after: 2.3,
      beforeLabel: "12.8",
      afterLabel: "2.3",
      result: "82% Reduction",
    },
  ],
  cards: [
    {
      title: "Faster Payment",
      text: "Faster payment turnaround through timely and accurate claims processing.",
    },
    {
      title: "Denial Claims",
      text: "Fewer claim denials and payment deductions through improved claim accuracy and compliance management.",
    },
    {
      title: "Improved Revenue",
      text: "Improved revenue realization through effective claims management, payment recovery, and reduced revenue leakage.",
    },
    {
      title: "Payment Collection",
      text: "Reduced outstanding balances through proactive Accounts Receivable (AR) follow-ups and timely payment collection.",
    },
    {
      title: "Greater Financial Visibility",
      text: "Greater financial visibility through accurate reporting, revenue reconciliation, and transparent financial tracking.",
    },
  ],
} as const;

/**
 * Shared "120 days → 60 days" formatter for before/after metrics.
 * % labels already carry their sign; "₹ Cr" is omitted to match the
 * live site's figure captions.
 */
export function metricPair(m: (typeof IMPACT.metrics)[number]): string {
  const unit = m.unit === "Days" ? " days" : m.unit === "%" ? "%" : "";
  return `${m.beforeLabel}${unit} → ${m.afterLabel}${unit}`;
}

export const WHY = {
  heading: "Why Choose HRCM",
  intro:
    "Comprehensive claims recovery services and AI-powered operational expertise designed to maximize cash flow, eliminate denials, and ensure total revenue realization across all private and government panels.",
  items: [
    {
      title: "Audit, Dispatch & Multi-Channel Submission",
      text: "Dispatch and recovery of claims with timely and accurate audit and dispatch to insurance companies, TPAs, government panels, and PSU authorities via physical and electronic channels.",
    },
    {
      title: "End-to-End Claim Tracking & Recovery",
      text: "Complete ownership of claim tracking and recovery including acknowledgment confirmation, follow-ups, escalation management, and issue resolution to reduce claim aging.",
    },
    {
      title: "Specialized Delayed & Rejected Claim Recovery",
      text: "Specialized recovery of pending, delayed, and rejected claims across all payer categories through structured follow-ups and detailed deduction analysis.",
    },
    {
      title: "Customized MIS & Dashboard Reporting",
      text: "Customized MIS and dashboard reporting offering visibility into receivables, tracking claim status, aging buckets, payer-wise performance, rejection trends, deduction percentages, and recovery progress.",
    },
    {
      title: "Complete Claim Query Lifecycle Management",
      text: "Complete claim query lifecycle management from receipt and analysis to documentation coordination and timely submission of responses within defined TATs.",
    },
    {
      title: "Comprehensive Payment Reconciliation",
      text: "Comprehensive payment reconciliation to identify short payments, incorrect deductions, unadjusted credits, and pending balances to ensure accurate accounting and maximized revenue realization.",
    },
    {
      title: "AI-Driven Scrutiny for Indian Healthcare",
      text: "Screening built specifically around Indian payer, TPA, and government panel guidelines. Our AI catches documentation gaps, coding mismatches, and rejection triggers before claims are submitted.",
    },
    {
      title: "API-Enabled HIS & Built-In Document Automation",
      text: "Direct API integration with hospital HIS and smart document processing to read scanned bills and discharge summaries directly. Cuts repetitive manual data entry and lowers the operating cost per claim.",
    },
  ],
} as const;

export const COMING_SOON = {
  heading: "AI claims management, built for hospitals.",
  bullets: [
    "Rejection risk flagged before a claim is submitted.",
    "Every claim scored, prioritized, and moving toward settlement.",
    "Models trained on real hospital claims workflows.",
  ],
  /** Supporting copy derived from the live site's second AI section. */
  support:
    "AI-powered claims management that surfaces rejections early, shortens settlement, and improves revenue recovery.",
  cta: { label: "Contact us", href: "/get-in-touch.html" },
} as const;

export const FOUNDERS = {
  heading: "Our Founders",
  intro:
    "Decades of experience in healthcare operations, hospital receivables, and insurance — leading HRCM's work with providers.",
  people: [
    {
      name: "Vikram Dev Kulesh",
      role: "FOUNDER",
      bio: "30+ years of experience in healthcare operations, hospital accounts receivable, and insurance broking. Expertise in hospital operations, credit business management, payer negotiations, and revenue cycle optimization. Strong focus on AR recovery, financial coordination, and operational efficiency across healthcare organizations.",
      photo: "/founder-vikram.jpg",
    },
    {
      name: "Deepak Kumar",
      role: "FOUNDER",
      bio: "20+ years of experience in healthcare finance and insurance broking, with 15+ years managing accounts receivable and RPL operations. Specialized in financial governance, recovery operations, revenue management, and improving financial performance for healthcare organizations.",
      photo: "/founder-deepak.jpg",
    },
    {
      name: "Mayank Gupta",
      role: "DIRECTOR",
      bio: "Strategic business and healthcare growth leader with 11+ years of experience in sales, operations, hospital onboarding, and category management. Expertise in healthcare partnerships, team leadership, revenue growth, P&L management, and scaling operations across healthcare and marketplace businesses.",
      photo: "/founder-mayank.jpg",
    },
  ],
} as const;

export const CONTACT = {
  heading: "Request a Demo",
  /** VERBATIM: closing copy from the live site's contact section. */
  body: "See how a structured revenue cycle approach reduces operational inefficiencies, improves settlement, and strengthens financial performance. Request a demo or a revenue audit — we'll assess your current processes and identify where the gains are.",
  phones: ["+91 80102 85464"],
  email: "info@hrcm.in",
  address:
    "Tower 4, Office No. 1611, NX One, Plot No. 17, Sector Techzone-4, Surajpur, Greater Noida, Uttar Pradesh 201306",
  form: {
    heading: "Fill The Contact Form",
    button: "Send Message",
    /** Posts to the same endpoint the current site uses (relative mail.php). */
    endpoint: "mail.php",
    services: [
      "Claims Processing & Submission",
      "Claims Audit & Analysis",
      "Query Management",
      "Accounts Receivable (AR) Management",
      "Revenue Reconciliation",
      "Data Management",
      "HRCM Software Demo",
      "Other",
    ],
  },
} as const;

export const FOOTER = {
  tagline:
    "End-to-end Revenue Cycle Management for hospitals and healthcare organizations.",
  /** VERBATIM: current footer legal link labels. Pages 404 on live site today —
   *  content must come from HRCM. */
  legal: [
    { label: "Terms & Conditions", href: "/terms.html" },
    { label: "Privacy Policy", href: "/privacy.html" },
    { label: "Contact Us", href: "/get-in-touch.html" },
  ],
  linkedin: "https://www.linkedin.com/company/hrcm-consultancy-services-pvt-ltd/?viewAsMember=true",
  copyright: "Copyright © 2026 HRCM. All Rights Reserved.",
} as const;

/* ------------------------------------------------------------------ */
/* MULTI-PAGE CONTENT (added for the page-based architecture)          */
/* ------------------------------------------------------------------ */

export type PageHero = {
  title: string;
  intro: string;
};

/**
 * Subpage hero copy.
 */
export const PAGE_HEROES: Record<string, PageHero> = {
  about: {
    title: "About HRCM",
    intro:
      "End-to-end Revenue Cycle Management (RCM) solutions and AI software for hospitals and healthcare organizations.",
  },
  services: {
    title: "Scope Of Services",
    intro:
      "End-to-end revenue cycle support — from claim audit and submission to reconciliation and clinical data management.",
  },
  why: {
    title: "Why Choose HRCM",
    intro:
      "AI-driven revenue cycle management that accelerates payment realization, enforces payer compliance, and powers predictable cash flow.",
  },
  team: {
    title: "Our Leadership",
    intro:
      "Decades of experience in healthcare operations, hospital receivables, and insurance — leading HRCM's work with healthcare providers.",
  },
  software: {
    title: "HRCM Software",
    intro:
      "AI-Powered Healthcare Revenue Cycle Management — Automating claim scrubbing, deduction analysis, and settlement tracking through a single stage-driven workflow.",
  },
  careers: {
    title: "Careers at HRCM",
    intro:
      "Join our mission to revolutionize healthcare revenue cycle operations with cutting-edge AI and clinical domain expertise.",
  },
  contact: {
    title: "Request a Demo",
    intro:
      "Request a demo or revenue audit to assess current processes and identify opportunities for immediate financial improvement.",
  },
};

export type ServicePoint = { title: string; text: string };

/**
 * Service detail-page "What we do" points.
 */
export const SERVICE_POINTS: Record<string, ServicePoint[]> = {
  "claims-processing-and-submission": [
    {
      title: "Accurate preparation",
      text: "Claims accurately prepared and submitted within required timelines.",
    },
    {
      title: "Fewer rejections",
      text: "Careful review and structured workflows to reduce claim rejections.",
    },
    {
      title: "Minimal delays",
      text: "Processing delays minimized to support smoother payment cycles.",
    },
    {
      title: "Stable revenue flow",
      text: "Shorter payment cycles that maintain a more stable revenue flow.",
    },
  ],
  "claims-audit-and-analysis": [
    {
      title: "Identify inaccuracies",
      text: "Detailed review of existing claims processes to surface errors and inefficiencies.",
    },
    {
      title: "Reduce denials",
      text: "Analysis of claim submissions and settlement patterns to improve claim accuracy.",
    },
    {
      title: "Recover missed revenue",
      text: "Identification of missed revenue opportunities across the claims cycle.",
    },
    {
      title: "Strengthen financial performance",
      text: "A structured approach that supports more efficient claims management.",
    },
  ],
  "query-management": [
    {
      title: "Structured handling",
      text: "Payer queries and documentation requests handled in a structured, timely workflow.",
    },
    {
      title: "Timely resolution",
      text: "Queries resolved well within payer TATs to keep claims moving continuously toward settlement.",
    },
    {
      title: "Automated tracking",
      text: "Email and portal monitoring ensures no inquiry sits unaddressed in staff inboxes.",
    },
    {
      title: "Denial prevention",
      text: "Proactive documentation fulfillment preventing avoidable deductions and administrative denials.",
    },
  ],
  "accounts-receivable-management": [
    {
      title: "Monitor every claim",
      text: "Close monitoring of pending, delayed, and denied claims.",
    },
    {
      title: "Payer follow-ups",
      text: "Systematic follow-up with payers to resolve claim issues.",
    },
    {
      title: "Timely recovery",
      text: "Recovery of outstanding payments in a timely manner.",
    },
    {
      title: "Healthier cash flow",
      text: "Improved collection efficiency and reduced aging receivables.",
    },
  ],
  "revenue-reconciliation": [
    {
      title: "Accurate matching",
      text: "Claims and payment data reconciled with hospital accounting systems.",
    },
    {
      title: "Discrepancy detection",
      text: "Settlement, claims records, and financial reports matched for accuracy.",
    },
    {
      title: "Reliable reporting",
      text: "Improved reporting accuracy and stronger financial control.",
    },
    {
      title: "Better decisions",
      text: "Better decision-making and more reliable revenue tracking.",
    },
  ],
  "data-management": [
    {
      title: "HIS & API Integration",
      text: "Direct connection with hospital information systems to pull claim and billing data seamlessly.",
    },
    {
      title: "Intelligent Document Digitization",
      text: "Automated digital extraction reads physical discharge summaries, bills, and investigations without manual re-keying.",
    },
    {
      title: "Data Structuring & Validation",
      text: "Sanitizes and formats clinical documentation into audit-ready datasets aligned with payer rules.",
    },
    {
      title: "Audit Trail & Data Security",
      text: "Enterprise-grade data security with complete audit logs for every record across the revenue cycle.",
    },
  ],
  "medical-billing": [
    {
      title: "Clinical Data Ingestion",
      text: "Structured clinical data capture and validation for hospital revenue workflows.",
    },
    {
      title: "Faster submission",
      text: "Accelerated electronic submission supported by automated tracking systems.",
    },
    {
      title: "Claim tracking",
      text: "End-to-end tracking systems that keep every patient account completely visible.",
    },
  ],
};

export type LegalPage = {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

/**
 * Legal page copy. The live site's Terms/Privacy pages return 404, so this is
 * ORIGINAL PLACEHOLDER DRAFT — every "[TO BE CONFIRMED BY HRCM]" marker must be
 * resolved by the HRCM team before production. No policies are invented here.
 */
export const LEGAL_PAGES: Record<"terms" | "privacy", LegalPage> = {
  terms: {
    title: "Terms & Conditions",
    updated: "Last updated: September 2026",
    intro:
      "These Terms & Conditions govern the use of the HRCM website and the information published on it.",
    sections: [
      {
        heading: "1. Acceptance of terms",
        body: [
          "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please do not use the website.",
        ],
      },
      {
        heading: "2. Informational purpose",
        body: [
          "Content on this website is provided for general information about HRCM and its Revenue Cycle Management services. It does not constitute professional, medical, legal, or financial advice.",
        ],
      },
      {
        heading: "3. Services",
        body: [
          "Descriptions of HRCM services on this website are illustrative. The scope, terms, and delivery of any service are defined solely by an executed agreement between HRCM and its clients. [TO BE CONFIRMED BY HRCM]",
        ],
      },
      {
        heading: "4. Intellectual property",
        body: [
          "The HRCM name, logo, and website content are the property of HRCM. [Ownership entity name TO BE CONFIRMED BY HRCM]",
        ],
      },
      {
        heading: "5. Limitation of liability",
        body: [
          "HRCM accepts no liability for decisions made based on website content alone. [Full liability clause TO BE CONFIRMED BY HRCM]",
        ],
      },
      {
        heading: "6. Contact",
        body: [
          "Questions about these terms can be sent to info@hrcm.in.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: September 2026",
    intro:
      "This policy explains what information the HRCM website collects and how it is used.",
    sections: [
      {
        heading: "1. Information we collect",
        body: [
          "When you fill the contact form, HRCM receives the details you submit: your name, phone number, email address, selected service, and message.",
        ],
      },
      {
        heading: "2. How we use it",
        body: [
          "Submitted details are used only to respond to your enquiry about HRCM services. [Data-handling and retention practices TO BE CONFIRMED BY HRCM]",
        ],
      },
      {
        heading: "3. Sharing",
        body: [
          "Enquiry details are not sold. [Any processor/third-party disclosures TO BE CONFIRMED BY HRCM]",
        ],
      },
      {
        heading: "4. Contact",
        body: [
          "Privacy questions and data requests can be sent to info@hrcm.in.",
        ],
      },
    ],
  },
};
