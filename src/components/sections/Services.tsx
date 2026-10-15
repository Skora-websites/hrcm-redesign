import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Kicker } from "../ui";

/* ------------------------------------------------------------------ */
/*  Service Card Definition (Matching Reference Image)                */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    slug: "claims-audit-and-analysis",
    title: "Claims Audit & Analysis",
    description:
      "HRCM conducts a detailed review of existing claims processes to identify inaccuracies, operational inefficiencies, and potential revenue loss.",
    image: "/images/services/service-audit.png",
    alt: "Healthcare claims audit and analysis illustration with checklist and analytics",
  },
  {
    slug: "claims-processing-and-submission",
    title: "Claims Processing & Submission",
    description:
      "HRCM ensures that claims are accurately prepared and submitted within required timelines to support faster settlement and smoother payment processing.",
    image: "/images/services/service-submission.png",
    alt: "Claims processing and submission workflow illustration with laptop and verified badge",
  },
  {
    slug: "accounts-receivable-management",
    title: "Accounts Receivable Management",
    description:
      "HRCM provides proactive Accounts Receivable (AR) management by closely monitoring pending, delayed, and denied claims.",
    image: "/images/services/service-ar.png",
    alt: "Accounts receivable management illustration with upward trend and status badges",
  },
  {
    slug: "revenue-reconciliation",
    title: "Revenue Reconciliation",
    description:
      "HRCM ensures that claims and payment data are accurately reconciled with hospital accounting systems to maintain financial accuracy and transparency.",
    image: "/images/services/service-reconciliation.png",
    alt: "Hospital revenue reconciliation illustration with verified checks and calculator",
  },
  {
    slug: "medical-billing",
    title: "Medical Billing",
    description:
      "Smart billing workflows with faster submission and claim tracking systems.",
    image: "/images/services/service-billing.png",
    alt: "Medical billing illustration with physician at laptop, medical bill, and rupee symbol",
  },
  {
    slug: "query-management",
    title: "Query Management",
    description:
      "Structured handling and timely resolution of payer queries and documentation requests.",
    image: "/images/services/service-query.png",
    alt: "Query management illustration with customer support specialist and query bubbles",
  },
];

/* ------------------------------------------------------------------ */
/*  ServiceCard Component                                              */
/* ------------------------------------------------------------------ */

function ServiceCard({
  service,
  index,
  visible,
}: {
  service: ServiceItem;
  index: number;
  visible: boolean;
}) {
  const cardDelay = index * 90;

  return (
    <a
      href={`/services/${service.slug}.html`}
      className="service-card group relative flex flex-col h-full rounded-[24px] overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.74)",
        backdropFilter: "blur(24px) saturate(175%)",
        WebkitBackdropFilter: "blur(24px) saturate(175%)",
        border: "1px solid rgba(255, 255, 255, 0.88)",
        boxShadow:
          "0 4px 20px -2px rgba(16, 24, 40, 0.05), 0 1px 3px rgba(16, 24, 40, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${cardDelay}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${cardDelay}ms, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease`,
      }}
    >
      {/* ── Top Liquid Refraction Highlight Line ── */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none rounded-t-[24px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 4%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.6) 75%, transparent 96%)",
        }}
      />

      {/* ── Top Illustration Plate ── */}
      <div className="relative w-full aspect-[760/365] overflow-hidden bg-gradient-to-b from-[#eaf5fc]/80 to-[#f4f9fd]/80">
        <img
          src={service.image}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ imageRendering: "-webkit-optimize-contrast" }}
        />
        {/* Subtle glass reflection highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent opacity-90" />
      </div>

      {/* ── Card Content ── */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-[1.22rem] sm:text-[1.32rem] font-bold text-[#0f172a] tracking-tight leading-[1.25] font-display transition-colors duration-200 group-hover:text-[#0071e3]">
          {service.title}
        </h3>

        <p className="mt-3 text-[0.9rem] sm:text-[0.93rem] leading-[1.62] text-[#475467] font-normal font-sans">
          {service.description}
        </p>

        {/* ── Learn More Link ── */}
        <div className="mt-auto pt-6 flex items-center gap-1.5 text-[0.92rem] font-semibold text-[#0071e3] font-sans">
          <span className="transition-colors group-hover:text-[#005bb5]">Learn more</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </a>
  );
}

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
      { threshold: 0.12 },
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
      <style>{`
        /* Card Hover Elevation */
        .service-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease,
                      background 0.35s ease;
        }
        .service-card:hover {
          transform: translateY(-7px) !important;
          box-shadow: 0 24px 48px -8px rgba(0, 113, 227, 0.16),
                      0 12px 24px -4px rgba(16, 24, 40, 0.08),
                      inset 0 1px 1px rgba(255, 255, 255, 1) !important;
          border-color: rgba(0, 113, 227, 0.35) !important;
          background: rgba(255, 255, 255, 0.88) !important;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .service-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Gradients */}
      <div
        className="absolute -top-36 -left-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 113, 227, 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-36 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(15, 163, 160, 0.06) 0%, transparent 70%)",
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

        {/* ── 6 Cards Grid (3 Columns x 2 Rows) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {SERVICE_ITEMS.map((service, idx) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={idx}
              visible={visible}
            />
          ))}
        </div>
      </div>

      <style>{`
        .service-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.35s ease,
                      background 0.35s ease !important;
        }
        .service-card:hover {
          background: rgba(255, 255, 255, 0.90) !important;
          border-color: rgba(0, 113, 227, 0.35) !important;
          box-shadow: 0 22px 40px -10px rgba(0, 113, 227, 0.14),
                      0 10px 22px -6px rgba(15, 23, 42, 0.08),
                      inset 0 1.5px 1px rgba(255, 255, 255, 1) !important;
          transform: translateY(-5px) !important;
        }
      `}</style>
    </section>
  );
}
