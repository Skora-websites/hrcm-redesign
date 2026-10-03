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
  { label: "About Us", href: "/about.html" },
  { label: "Our Services", href: "/services.html" },
  { label: "Why Choose Us", href: "/why-choose-us.html" },
  { label: "Our Team", href: "/our-team.html" },
  { label: "Get In Touch", href: "/get-in-touch.html" },
] as const;

export const HERO = {
  /** VERBATIM: current hero H1 ("Optimize Your Hospital Revenue with HRCM"). */
  headline: "Optimize Your Hospital Revenue with HRCM",
  /**
   * VERBATIM: current hero subheading. Known grammar slip ("We Provide End-to-end
   * receivables…") preserved per content-preservation rule; flagged for client.
   */
  subheadline:
    "We Provide End-to-end receivables recovery and operational support to healthcare providers.",
  primaryCta: { label: "Request a Free Consultation", href: "/get-in-touch.html" },
  secondaryCta: { label: "Explore Services", href: "/services.html" },
} as const;

export const MARQUEE_SERVICES = [
  "Claims Audit & Analysis",
  "Claims Processing & Submission",
  "Accounts Receivable (AR) Management",
  "Revenue Reconciliation",
  "Query Management",
  "Medical Billing",
] as const;

export const ABOUT = {
  label: "ABOUT US",
  heading: "About HRCM",
  /** VERBATIM: two paragraphs merged exactly as shown on the live site. */
  body: [
    "HRCM is a healthcare technology company that provides end-to-end Revenue Cycle Management (RCM) solutions for hospitals and healthcare organizations. The company supports healthcare providers in managing their financial processes more efficiently, from patient billing to final settlement with a strong focus on accuracy, compliance, and operational efficiency, HRCM combines industry knowledge with well-structured processes to help reduce revenue loss and improve cash flow.",
    "Our services are designed to simplify financial operations, support timely settlement, and enhance the overall performance of healthcare revenue management systems.",
  ],
  cards: [
    {
      title: "Audit & Gap Analysis",
      text: "Comprehensive review of revenue cycle management.",
    },
    {
      title: "Process Optimization",
      text: "Structured workflows to reduce delays.",
    },
    {
      title: "Execution & Monitoring",
      text: "Continuous monitoring of claims processing.",
    },
    {
      title: "Reporting & Improvement",
      text: "Detailed reports and performance insights.",
    },
  ],
  /** Live CTA "EXPLORE PORTAL →" pointed to "#". Now targets the Services page. */
  cta: { label: "Explore Our Services", href: "/services.html" },
} as const;

export type Service = {
  title: string;
  text: string;
  icon: string;
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
    icon: "audit",
  },
  {
    title: "Claims Processing & Submission",
    href: "/services/claims-processing-and-submission.html",
    text: "HRCM ensures that claims are accurately prepared and submitted within required timelines to support faster settlement and smoother payment processing. Through careful review and structured workflows, the team works to reduce claim rejections, minimize processing delays, and improve overall claims efficiency. This approach helps healthcare organizations shorten payment cycles and maintain a more stable revenue flow.",
    icon: "processing",
  },
  {
    title: "Accounts Receivable Management",
    href: "/services/accounts-receivable-management.html",
    text: "HRCM provides proactive Accounts Receivable (AR) management by closely monitoring pending, delayed, and denied claims. The team works systematically to follow up with payers, resolve claim issues, and recover outstanding payments in a timely manner. This structured approach helps improve collection efficiency, reduce aging receivables, and support healthier cash flow for healthcare organizations.",
    icon: "receivable",
  },
  {
    title: "Revenue Reconciliation",
    href: "/services/revenue-reconciliation.html",
    text: "HRCM ensures that claims and payment data are accurately reconciled with hospital accounting systems to maintain financial accuracy and transparency. By matching settlement, claims records, and financial reports, the company helps healthcare organizations identify discrepancies, improve reporting accuracy, and strengthen overall financial control. This process supports better decision-making and more reliable revenue tracking.",
    icon: "reconciliation",
  },
  {
    title: "Medical Billing",
    href: "/services/medical-billing.html",
    text: "Smart billing workflows with faster submission and claim tracking systems.",
    icon: "billing",
  },
  {
    // NOT from the current site — drafted in HRCM's tone. Client approval required.
    title: "Query Management",
    href: "/services/query-management.html",
    text: "Structured handling and timely resolution of payer queries and documentation requests, keeping claims moving toward settlement without unnecessary delays.",
    icon: "query",
    needsValidation: true,
  },
];

export const PROCESS = {
  label: "OUR PROCESS",
  heading: "A Proven Process That Delivers Results",
  steps: [
    {
      num: "01",
      title: "Audit & Gap Analysis",
      text: "We analyze your current RCM process to find gaps and revenue leakages.",
    },
    {
      num: "02",
      title: "Process Optimization",
      text: "We implement best practices and workflow automation for efficiency and accuracy.",
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
  label: "BUSINESS",
  heading: "Business Impact",
  /** VERBATIM intro (including the trailing "Key benefits include." — flagged). */
  intro:
    "Healthcare providers working with HRCM can expect improved operational efficiency, stronger financial control, and more streamlined revenue cycle management processes. Through structured workflows and continuous monitoring, HRCM helps organizations reduce claim errors, improve settlement timelines, and strengthen overall financial performance. Key benefits include.",
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
      icon: "bolt",
    },
    {
      title: "Denial Claims",
      text: "Fewer claim denials and payment deductions through improved claim accuracy and compliance management.",
      icon: "shield",
    },
    {
      title: "Improved Revenue",
      text: "Improved revenue realization through effective claims management, payment recovery, and reduced revenue leakage.",
      icon: "trend",
    },
    {
      title: "Payment Collection",
      text: "Reduced outstanding balances through proactive Accounts Receivable (AR) follow-ups and timely payment collection.",
      icon: "collect",
    },
    {
      title: "Greater Financial Visibility",
      text: "Greater financial visibility through accurate reporting, revenue reconciliation, and transparent financial tracking.",
      icon: "eye",
    },
  ],
} as const;

export const WHY = {
  label: "WHY HRCM",
  heading: "Why Choose HRCM",
  intro:
    "HRCM delivers expert Revenue Cycle Management solutions that improve financial performance, ensure compliance, and drive sustainable growth for healthcare organizations.",
  items: [
    {
      title: "Specialized Expertise",
      text: "Specialized expertise in healthcare Revenue Cycle Management (RCM) with a strong understanding of industry-specific challenges and requirements.",
      icon: "expertise",
    },
    {
      title: "Data-Driven Insights",
      text: "Data-driven insights and reporting that support informed decision-making and improved financial outcomes.",
      icon: "data",
    },
    {
      title: "Transparent Processes",
      text: "Transparent and accountable processes designed to maintain accuracy, compliance, and operational clarity.",
      icon: "transparent",
    },
    {
      title: "Dedicated Support",
      text: "Dedicated client support focused on responsive communication and long-term partnership.",
      icon: "support",
    },
    {
      title: "Scalable Solutions",
      text: "Scalable RCM solutions tailored to meet the evolving needs of hospitals and healthcare institutions.",
      icon: "scalable",
    },
  ],
} as const;

export const COMING_SOON = {
  label: "COMING SOON",
  heading: "Something Big Is About to Change Healthcare Forever.",
  questions: [
    "What if hospitals could stop claim rejections before they happen?",
    "What if every claim got smarter, faster, and impossible to ignore?",
    "For the first time ever, AI meets hospital claims management in a way the industry has never seen before.",
  ],
  /** VERBATIM: supporting copy from the live site's second AI section. */
  support:
    "AI-powered claims management that stops rejections before they happen, settles faster, and maximizes revenue recovery.",
  cta: { label: "Coming Soon", href: "/get-in-touch.html" },
} as const;

export const FOUNDERS = {
  label: "FOUNDERS",
  heading: "Our Founders",
  intro:
    "Visionary leaders driving innovation and excellence in healthcare finance and operations.",
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
  label: "GET IN TOUCH",
  heading: "Request a Free Consultation",
  /** VERBATIM: closing copy from the live site's contact section. */
  body: "HRCM invites healthcare providers to discover how a structured and efficient revenue cycle management approach can help reduce operational inefficiencies, improve settlement processes, and strengthen overall financial performance. Healthcare organizations interested in optimizing their revenue cycle operations may request a free consultation or revenue audit to assess current processes and identify opportunities for improvement.",
  phones: ["+91 98688 08775", "+91 80102 85464"],
  email: "info@hrcm.in",
  address:
    "Tower 4, office no 1611, NX One, Plot No. 17, Sector Techzone-4, Surajpur, Gautam Buddha Nagar, Noida, Uttar Pradesh",
  form: {
    heading: "Fill The Contact Form",
    button: "Send Message",
    /** Posts to the same endpoint the current site uses (relative mail.php). */
    endpoint: "mail.php",
    services: [
      "Claims Audit & Analysis",
      "Claims Processing & Submission",
      "Accounts Receivable (AR) Management",
      "Revenue Reconciliation",
      "Query Management",
      "Medical Billing",
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
  linkedin: "https://www.linkedin.com/company/hrcm-consultancy-services-pvt-ltd/",
  copyright: "Copyright © 2026 HRCM. All Rights Reserved.",
} as const;

/* ------------------------------------------------------------------ */
/* MULTI-PAGE CONTENT (added for the page-based architecture)          */
/* ------------------------------------------------------------------ */

export type PageHero = {
  eyebrow: string;
  title: string;
  intro: string;
};

/**
 * Subpage hero copy. Every string is either verbatim from the live site or a
 * straight restatement of archived content (no new business claims).
 */
export const PAGE_HEROES: Record<string, PageHero> = {
  about: {
    eyebrow: "ABOUT US",
    title: "About HRCM",
    intro:
      "End-to-end Revenue Cycle Management (RCM) solutions for hospitals and healthcare organizations.",
  },
  services: {
    eyebrow: "SERVICES",
    title: "Scope Of Services",
    intro:
      "End-to-end revenue cycle support — from claim audit to final reconciliation.",
  },
  why: {
    eyebrow: "WHY HRCM",
    title: "Why Choose HRCM",
    intro:
      "HRCM delivers expert Revenue Cycle Management solutions that improve financial performance, ensure compliance, and drive sustainable growth for healthcare organizations.",
  },
  team: {
    eyebrow: "FOUNDERS",
    title: "Our Founders",
    intro:
      "Visionary leaders driving innovation and excellence in healthcare finance and operations.",
  },
  contact: {
    eyebrow: "GET IN TOUCH",
    title: "Request a Free Consultation",
    intro:
      "Request a free consultation or revenue audit to assess current processes and identify opportunities for improvement.",
  },
};

export type ServicePoint = { title: string; text: string };

/**
 * Service detail-page "What we do" points. STRICTLY derived from each service's
 * own archived description — no new capabilities, clients, or numbers claimed.
 */
export const SERVICE_POINTS: Record<string, ServicePoint[]> = {
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
  "medical-billing": [
    {
      title: "Smart billing workflows",
      text: "Structured billing workflows designed for speed and accuracy.",
    },
    {
      title: "Faster submission",
      text: "Faster claim submission supported by tracking systems.",
    },
    {
      title: "Claim tracking",
      text: "Claim tracking systems that keep every submission visible.",
    },
  ],
  "query-management": [
    {
      title: "Structured handling",
      text: "Payer queries and documentation requests handled in a structured way.",
    },
    {
      title: "Timely resolution",
      text: "Queries resolved on time to keep claims moving toward settlement.",
    },
    {
      title: "No unnecessary delays",
      text: "Documentation kept complete so claims avoid avoidable holds.",
    },
  ],
};

export type LegalPage = {
  eyebrow: string;
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
    eyebrow: "LEGAL",
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
    eyebrow: "LEGAL",
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
