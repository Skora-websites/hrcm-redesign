import { useEffect, useRef, useState, useCallback } from "react";
import { Kicker } from "../ui";

/* ------------------------------------------------------------------ */
/*  Station / Hub Data Definition for HRCM (6 Cards: 2 Rows of 3)      */
/* ------------------------------------------------------------------ */

interface HubData {
  id: string;
  territory: string;
  pill: string;
  stationName: string;
  cityRow: string;
  addressLine1: string;
  addressLine2: string;
  contactLine1: string;
  contactLine2: string;
  metadata: string;
  image: string;
  alt: string;
}

const HUBS: HubData[] = [
  // ── ROW 1: Operations & Delivery Hubs ──
  {
    id: "noida",
    territory: "Noida Central",
    pill: "UTC+5:30",
    stationName: "CENTRAL OPERATIONS HUB",
    cityRow: "NOIDA HQ",
    addressLine1: "Tower 4, NX One, Plot No. 17",
    addressLine2: "Techzone-4, Greater Noida, UP",
    contactLine1: "+91 98688 08775",
    contactLine2: "info@hrcm.in",
    metadata: "AUDIT & RECONCILIATION · EST. 2021",
    image: "/images/hub-noida.jpg",
    alt: "Indian healthcare revenue analysts at HRCM headquarters in Noida",
  },
  {
    id: "hospitals",
    territory: "Hospital Desks",
    pill: "ON-SITE & EMBEDDED",
    stationName: "PAN-INDIA PROVIDER NETWORK",
    cityRow: "HOSPITAL EMBEDDED",
    addressLine1: "Tier-1 & Tier-2 Hospital Centers",
    addressLine2: "Dedicated On-Site Claims & Billing Desks",
    contactLine1: "+91 80102 85464",
    contactLine2: "partners@hrcm.in",
    metadata: "BILLING & QUERY MANAGEMENT · ACTIVE OPS",
    image: "/images/hub-hospital.jpg",
    alt: "Indian hospital billing coordinator and physician at patient discharge desk",
  },
  {
    id: "analytics",
    territory: "Analytics Lab",
    pill: "24/7 RECONCILIATION",
    stationName: "AR AUDIT & RECOVERY CENTER",
    cityRow: "ANALYTICS LAB",
    addressLine1: "Automated Payer Rule Engine",
    addressLine2: "Real-time Discrepancy Matching & Settlement",
    contactLine1: "+91 98688 08775",
    contactLine2: "recovery@hrcm.in",
    metadata: "120 → 60 DAYS ACCELERATION · LIVE",
    image: "/images/hub-analytics.jpg",
    alt: "Indian healthcare data analytics specialist analyzing claim settlement data",
  },

  // ── ROW 2: Core Capabilities & Operating Principles ──
  {
    id: "cashflow",
    territory: "Cash Flow First",
    pill: "120 → 60 DAYS",
    stationName: "RECEIVABLES RECOVERY",
    cityRow: "CASH FLOW ACCELERATION",
    addressLine1: "Structured Payer Follow-ups",
    addressLine2: "Turning Pending Claims into Settled Capital",
    contactLine1: "Rapid AR Follow-up Protocols",
    contactLine2: "Measured Against Hospital Baseline",
    metadata: "CASH FLOW FIRST · 50% CYCLE REDUCTION",
    image: "/images/hub-cashflow.jpg",
    alt: "Senior Indian doctor and hospital revenue manager reviewing cash flow performance",
  },
  {
    id: "accuracy",
    territory: "Accuracy by Process",
    pill: "100% VERIFIED",
    stationName: "CLAIMS AUDIT & CHECK",
    cityRow: "AUDIT & COMPLIANCE",
    addressLine1: "Every Claim Checked at Each Stage",
    addressLine2: "Strict Pre-Submission Omission Prevention",
    contactLine1: "Payer-Specific Policy Verification",
    contactLine2: "Minimizing Holds & Initial Denials",
    metadata: "ZERO-OMISSION AUDIT · ACCOUNTABLE OPS",
    image: "/images/hub-audit.jpg",
    alt: "Indian healthcare claims auditor stamping and verifying hospital claim files",
  },
  {
    id: "scale",
    territory: "Built Around Scale",
    pill: "PAYER ALIGNED",
    stationName: "OPERATIONAL EFFICIENCY",
    cityRow: "HEALTHCARE GOVERNANCE",
    addressLine1: "Compliance with Payer & TPA Standards",
    addressLine2: "Workflows Designed for Hospital Scale",
    contactLine1: "Billing, Claims & Reconciliation",
    contactLine2: "One Accountable Hospital Team",
    metadata: "BUILT FOR HEALTHCARE · SUSTAINABLE SCALE",
    image: "/images/hub-efficiency.jpg",
    alt: "Indian healthcare executive board reviewing hospital revenue performance metrics",
  },
];

/* ------------------------------------------------------------------ */
/*  Card Component                                                     */
/* ------------------------------------------------------------------ */

interface CardProps {
  hub: HubData;
  index: number;
  isOpen: boolean;
  isClosed: boolean;
  onToggle: (id: string) => void;
  onMouseLeave: () => void;
}

function StationCard({
  hub,
  index,
  isOpen,
  isClosed,
  onToggle,
  onMouseLeave,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(hub.id);
    }
  };

  // Entrance delay cascading across all 6 cards
  const delays = [0.24, 0.32, 0.40, 0.48, 0.56, 0.64];
  const delaySec = delays[index] ?? 0.32;

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onToggle(hub.id)}
      onKeyDown={handleKeyDown}
      onMouseLeave={onMouseLeave}
      className={`station-card group relative select-none ${
        isOpen ? "is-open" : ""
      } ${isClosed ? "is-closed" : ""}`}
      style={
        {
          "--d": `${delaySec}s`,
          "--card-index": index,
        } as React.CSSProperties
      }
    >
      {/* ── Neutral / Abstract CSS Landscape Fallback ── */}
      <div
        className="station-fallback absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(175deg, #e5e5e5 0%, #dedede 42%, #d4d4d4 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.6) 0%, transparent 60%), linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.06) 65%, transparent 95%)",
          }}
        />
      </div>

      {/* ── Media Image Layer (Indian Healthcare Editorial Photography) ── */}
      {!imgError && (
        <img
          src={hub.image}
          alt={hub.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`station-media absolute inset-0 h-full w-full object-cover object-center z-0 transition-opacity duration-500 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* ── Contrast Scrim Layer (Ensures 100% visibility of text over photos) ── */}
      <div
        className="station-scrim pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.68) 0%, rgba(15, 23, 42, 0.1) 32%, rgba(15, 23, 42, 0.18) 58%, rgba(15, 23, 42, 0.85) 100%)",
        }}
      />

      {/* ── Top Bar Overlay (Territory & Timezone Pill) ── */}
      <div className="station-top-overlay pointer-events-none absolute inset-x-0 top-0 z-[2] flex items-center justify-between">
        <h3 className="station-territory text-white font-bold">{hub.territory}</h3>
        <div className="station-tz-pill text-slate-900 font-bold">{hub.pill}</div>
      </div>

      {/* ── Bottom Station Row (Default State) ── */}
      <div className="station-bottom-row pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between">
        <span className="station-name text-white font-bold">{hub.stationName}</span>
        <div className="station-arrow text-[#ff8a00]">
          <svg
            viewBox="0 0 24 24"
            className="w-[1.35rem] h-[1.35rem]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 19 19 5M13 5h6v6" />
          </svg>
        </div>
      </div>

      {/* ── Frosted Detail Panel (Appears on Hover / Open) ── */}
      <div className="station-panel pointer-events-none absolute inset-x-0 bottom-0 z-[3] overflow-hidden">
        {/* Solid Frosted Glass Surface */}
        <div className="station-blur-layer absolute inset-0" />

        {/* 4 Stacked Detail Items */}
        <div className="station-panel-content relative flex flex-col">
          {/* 1. Station Row with Left Arrow */}
          <div
            className="panel-item panel-station-row flex items-center gap-2 pb-[0.45rem] border-b border-slate-200/90"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <svg
              width="14"
              height="9"
              viewBox="0 0 16 10"
              fill="none"
              className="shrink-0 text-slate-900"
            >
              <path
                d="M5 1L1 5M1 5L5 9M1 5H15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-mono text-slate-900 font-bold tracking-[0.14em] uppercase text-[clamp(0.72rem,0.8vw,0.82rem)]">
              {hub.cityRow}
            </span>
          </div>

          {/* 2. Address Lines */}
          <div
            className="panel-item panel-address-row pt-[0.45rem] pb-[0.45rem] border-b border-slate-200/90"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <p className="font-sans font-bold text-slate-900 tracking-[-0.02em] leading-tight text-[clamp(0.82rem,0.92vw,0.95rem)]">
              {hub.addressLine1}
            </p>
            <p className="font-sans font-medium text-slate-600 tracking-[-0.02em] leading-tight mt-[0.15rem] text-[clamp(0.74rem,0.82vw,0.85rem)]">
              {hub.addressLine2}
            </p>
          </div>

          {/* 3. Phone & Email (Selectable) */}
          <div
            className="panel-item panel-contact-row pt-[0.45rem] pb-[0.45rem] border-b border-slate-200/90 select-text pointer-events-auto"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <p className="font-sans font-bold text-slate-900 tracking-[-0.02em] leading-tight text-[clamp(0.82rem,0.92vw,0.95rem)]">
              {hub.contactLine1}
            </p>
            <p className="font-sans font-medium text-slate-600 tracking-[-0.02em] leading-tight mt-[0.15rem] text-[clamp(0.74rem,0.82vw,0.85rem)]">
              {hub.contactLine2}
            </p>
          </div>

          {/* 4. Metadata Line */}
          <div
            className="panel-item panel-meta-row pt-[0.45rem]"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <p className="font-mono font-bold text-slate-500 tracking-[0.12em] uppercase text-[clamp(0.66rem,0.72vw,0.75rem)]">
              {hub.metadata}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main "About HRCM" Section (6-Card Dual-Row Showcase)              */
/* ------------------------------------------------------------------ */

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const [isIn, setIsIn] = useState(false);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [closedCardId, setClosedCardId] = useState<string | null>(null);

  // Entrance motion: after 2 rAF calls, apply .is-in
  useEffect(() => {
    let af1: number;
    let af2: number;
    af1 = requestAnimationFrame(() => {
      af2 = requestAnimationFrame(() => {
        setIsIn(true);
      });
    });
    return () => {
      cancelAnimationFrame(af1);
      cancelAnimationFrame(af2);
    };
  }, []);

  // Close open cards when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenCardId(null);
        setClosedCardId(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Card toggle logic:
  // If card is open -> click adds is-closed so hover won't immediately reopen it.
  // mouseleave removes is-closed.
  const handleToggle = useCallback((id: string) => {
    setOpenCardId((prev) => {
      if (prev === id) {
        setClosedCardId(id);
        return null;
      }
      setClosedCardId(null);
      return id;
    });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setClosedCardId(null);
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className={`relative overflow-hidden py-20 sm:py-28 lg:py-32 stations ${isIn ? "is-in" : ""}`}
    >
      <style>{`
        /* ========================================================== */
        /* Design Tokens & Canvas Geometry                            */
        /* ========================================================== */
        .stations {
          --card-pad: clamp(14px, 1.4vw, 20px);
          --radius: 22px;
          --accent: #0071e3;
        }

        /* ── Uniform Portrait Card Sizing (Slightly Wider Stance) ── */
        .station-card {
          width: 100%;
          aspect-ratio: 4 / 4.7;
          border-radius: var(--radius);
          overflow: hidden;
          isolation: isolate;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #0f172a;
          box-shadow: 0 4px 18px -2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.04);
          cursor: pointer;
          outline: none;
          margin: 0;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .station-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 36px -10px rgba(15, 23, 42, 0.18), 0 6px 14px -4px rgba(15, 23, 42, 0.06);
        }

        .station-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* Card Top Overlay */
        .station-top-overlay {
          padding: var(--card-pad);
        }

        .station-territory {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(1.15rem, 1.25vw, 1.35rem);
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #ffffff !important;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
          margin: 0;
        }

        .station-tz-pill {
          background: rgba(255, 255, 255, 0.95) !important;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          padding: 0.3rem 0.65rem;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(0.68rem, 0.72vw, 0.78rem);
          line-height: 1;
          color: #0f172a !important;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.18);
        }

        /* Card Bottom Row */
        .station-bottom-row {
          padding: var(--card-pad);
          transition: opacity 0.3s ease;
        }

        .station-name {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(0.68rem, 0.72vw, 0.76rem);
          letter-spacing: 0.12em;
          line-height: 1;
          color: #ffffff !important;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
        }

        .station-arrow {
          color: #ff8a00 !important;
          transform: translateY(-1px);
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.7));
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Media */
        .station-media {
          filter: brightness(1.02) contrast(1.02);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* ── Frosted Detail Panel ── */
        .station-panel {
          height: 65%;
          min-height: 250px;
        }

        .station-blur-layer {
          border-radius: 0 0 var(--radius) var(--radius);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          opacity: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.16);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 10%, #000 24%, #000 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 10%, #000 24%, #000 100%);
        }

        /* Fallback if backdrop-filter is not supported */
        @supports not (backdrop-filter: blur(30px)) {
          .station-blur-layer {
            background: rgba(250, 250, 248, 0.96);
          }
        }

        .station-panel-content {
          padding: 1rem var(--card-pad) var(--card-pad);
          height: 100%;
          justify-content: flex-end;
        }

        .panel-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.48s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i) * 55ms);
        }

        /* ── Hover / Open Interaction States ── */
        @media (hover: hover) and (pointer: fine) {
          .station-card:hover:not(.is-closed) .station-blur-layer,
          .station-card.is-open .station-blur-layer {
            opacity: 1;
          }

          .station-card:hover:not(.is-closed) .station-bottom-row,
          .station-card.is-open .station-bottom-row {
            opacity: 0;
          }

          .station-card:hover:not(.is-closed) .station-arrow,
          .station-card.is-open .station-arrow {
            transform: translate(2px, -3px);
          }

          .station-card:hover:not(.is-closed) .station-media,
          .station-card.is-open .station-media {
            transform: scale(1.05);
          }

          .station-card:hover:not(.is-closed) .panel-item,
          .station-card.is-open .panel-item {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Touch / Forced is-open */
        .station-card.is-open .station-blur-layer {
          opacity: 1;
        }
        .station-card.is-open .station-bottom-row {
          opacity: 0;
        }
        .station-card.is-open .station-arrow {
          transform: translate(2px, -3px);
        }
        .station-card.is-open .station-media {
          transform: scale(1.05);
        }
        .station-card.is-open .panel-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Entrance Animation (.is-in) ── */
        .stations .station-card {
          opacity: 0;
          filter: blur(4px);
          transform: translateY(18px) scale(0.985);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--d),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) var(--d),
                      filter 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--d);
        }

        .stations.is-in .station-card {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* Media settle animation on entrance */
        .stations.is-in .station-card .station-media {
          animation: mediaSettle 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--d) + 0.04s);
        }
        @keyframes mediaSettle {
          from { transform: scale(1.04); }
          to   { transform: scale(1); }
        }

        /* ── Reduced Motion Preference ── */
        @media (prefers-reduced-motion: reduce) {
          .stations .station-card,
          .panel-item {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Standard Full-Width Website Container (Eliminates excessive side spacing) ── */}
      <div className="relative mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-16">
        {/* ── Section Header (Standard Website Style) ── */}
        <div className="mb-10 sm:mb-14">
          <Kicker tone="azure">WHO WE ARE</Kicker>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <h2 className="lg:col-span-7 text-[2rem] sm:text-[2.75rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#0f172a] font-display">
              Six operational pillars.
              <br />
              One unified hospital team.
            </h2>
            <p className="lg:col-span-5 text-base sm:text-lg leading-relaxed text-[#64748b] font-sans">
              HRCM is an end-to-end healthcare technology company managing hospital
              revenue cycles from admission to final settlement through dedicated operations hubs, on-site hospital desks, and 24/7 recovery specialists.
            </p>
          </div>
        </div>

        {/* ── 6-Card Uniform Grid: Wider Cards & Calibrated Gaps ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {HUBS.map((hub, idx) => (
            <StationCard
              key={hub.id}
              hub={hub}
              index={idx}
              isOpen={openCardId === hub.id}
              isClosed={closedCardId === hub.id}
              onToggle={handleToggle}
              onMouseLeave={handleCardMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
