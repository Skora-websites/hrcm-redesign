import { useEffect, useRef, useState } from "react";
import { Kicker } from "../ui";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

/* ------------------------------------------------------------------ */
/*  Scope of Services — 6 Sequential Stages                           */
/* ------------------------------------------------------------------ */

const SERVICE_STEPS: Step[] = [
  {
    title: "Claims Audit & Analysis",
    description:
      "HRCM conducts a detailed review of existing claims processes to identify inaccuracies, operational inefficiencies, and potential revenue loss.",
    theme: "pastel-green",
    href: "/services/claims-audit-and-analysis.html",
    badge: "Stage 01 · Pre-Audit",
  },
  {
    title: "Claims Submission",
    description:
      "HRCM ensures that claims are accurately prepared and submitted within required timelines to support faster settlement and smoother payment workflows.",
    theme: "pastel-blue",
    href: "/services/claims-processing-and-submission.html",
    badge: "Stage 02 · Submission",
  },
  {
    title: "Query Management",
    description:
      "Structured handling and timely resolution of payer queries and documentation requests to keep claims moving continuously.",
    theme: "pastel-blue",
    href: "/services/query-management.html",
    badge: "Stage 03 · Resolution",
  },
  {
    title: "Accounts Receivable Management",
    description:
      "HRCM provides proactive Accounts Receivable (AR) management by closely monitoring pending, delayed, and denied claims.",
    theme: "pastel-green",
    href: "/services/accounts-receivable-management.html",
    badge: "Stage 04 · AR Recovery",
  },
  {
    title: "Revenue Reconciliation",
    description:
      "HRCM ensures that claims and payment data are accurately reconciled with hospital accounting systems to maintain financial accuracy and transparency.",
    theme: "pastel-blue",
    href: "/services/revenue-reconciliation.html",
    badge: "Stage 05 · Reconciliation",
  },
  {
    title: "Data Management",
    description:
      "Intelligent healthcare data ingestion, document digitizing, and direct HIS integration for automated, error-free revenue management.",
    theme: "pastel-green",
    href: "/services/data-management.html",
    badge: "Stage 06 · Ingestion",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Services Section                                              */
/* ------------------------------------------------------------------ */

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#f8fafc" }}
    >
      {/* Atmospheric Ambient Gradients */}
      <div
        className="absolute -top-36 -left-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-36 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(15, 163, 160, 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-16">
        {/* ── Section Header ── */}
        <div
          className="max-w-3xl mb-12 sm:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <Kicker tone="azure">SCOPE OF SERVICES</Kicker>
          <h2 className="mt-3 text-[2rem] sm:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#0f172a] font-display">
            End-to-end revenue cycle support — from claim audit to final
            reconciliation
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#64748b] font-sans">
            HRCM covers the full claims lifecycle with structured workflows,
            rigorous audit protocols, and proactive payer follow-ups.
          </p>
        </div>

        {/* ── Interactive Pinned Roadmap ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.75s ease 0.15s, transform 0.75s ease 0.15s",
          }}
        >
          <HowItWorks features={SERVICE_STEPS} />
        </div>
      </div>
    </section>
  );
}
