"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export type NoteTheme = "pastel-blue" | "pastel-green";

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple" | "teal" | "green";
  theme?: NoteTheme;
  href?: string;
  badge?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

interface CardProps {
  number: string;
  title: string;
  description: string;
  theme?: NoteTheme;
  className?: string;
  rotate?: string;
  href?: string;
  badge?: string;
}

/** Tactile metallic push-pin icon with realistic cast drop shadow */
const Pin = ({ className, pinColor = "#0071e3" }: { className?: string; pinColor?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill={pinColor}
    className={className}
    style={{ filter: "drop-shadow(0 3px 4px rgba(45, 60, 80, 0.28))" }}
    aria-hidden="true"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

/** Design tokens for alternating pastel blue and pastel green paper notes */
const NOTE_THEMES: Record<
  NoteTheme,
  {
    bgGradient: string;
    border: string;
    shadow: string;
    pinColor: string;
    innerBg: string;
    innerBorder: string;
    ruledLine: string;
    numberColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    linkColor: string;
    hoverShadow: string;
  }
> = {
  "pastel-blue": {
    bgGradient: "linear-gradient(150deg, #e0f2fe 0%, #bae6fd 100%)",
    border: "1.5px solid #7dd3fc",
    shadow:
      "0 6px 16px -2px rgba(2, 132, 199, 0.12), 0 16px 32px -6px rgba(2, 132, 199, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    hoverShadow: "0 22px 46px -8px rgba(2, 132, 199, 0.28)",
    pinColor: "#0284c7",
    innerBg: "rgba(255, 255, 255, 0.72)",
    innerBorder: "1px solid rgba(125, 211, 252, 0.55)",
    ruledLine: "linear-gradient(rgba(186, 230, 253, 0.4) 1px, transparent 1px)",
    numberColor: "#0284c7",
    badgeBg: "#e0f2fe",
    badgeText: "#0369a1",
    badgeBorder: "#7dd3fc",
    linkColor: "#0284c7",
  },
  "pastel-green": {
    bgGradient: "linear-gradient(150deg, #dcfce7 0%, #bbf7d0 100%)",
    border: "1.5px solid #86efac",
    shadow:
      "0 6px 16px -2px rgba(22, 163, 74, 0.12), 0 16px 32px -6px rgba(22, 163, 74, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    hoverShadow: "0 22px 46px -8px rgba(22, 163, 74, 0.28)",
    pinColor: "#10b981",
    innerBg: "rgba(255, 255, 255, 0.72)",
    innerBorder: "1px solid rgba(134, 239, 172, 0.55)",
    ruledLine: "linear-gradient(rgba(187, 247, 208, 0.4) 1px, transparent 1px)",
    numberColor: "#16a34a",
    badgeBg: "#dcfce7",
    badgeText: "#15803d",
    badgeBorder: "#86efac",
    linkColor: "#16a34a",
  },
};

/** Paper Note component with pastel color pattern and paper texture */
const Card = ({
  number,
  title,
  description,
  theme = "pastel-blue",
  className = "",
  rotate = "",
  href,
  badge,
}: CardProps) => {
  const style = NOTE_THEMES[theme] || NOTE_THEMES["pastel-blue"];

  const content = (
    <div
      className="paper-note relative p-5 sm:p-6 rounded-[22px] transition-all duration-300"
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperGrain)' opacity='0.038'/%3E%3C/svg%3E"),
          ${style.bgGradient}
        `,
        border: style.border,
        boxShadow: style.shadow,
      }}
    >
      {/* Metallic Push Pin with cast shadow */}
      <div className="relative mx-auto -mt-2 mb-3 flex items-center justify-center">
        <Pin className="w-8 h-8" pinColor={style.pinColor} />
        <span className="absolute -bottom-1 h-1.5 w-3.5 rounded-full bg-slate-900/18 blur-[1px]" />
      </div>

      {/* Note Inner Surface with subtle ruled lines */}
      <div
        className="rounded-[15px] p-4 flex flex-col relative overflow-hidden"
        style={{
          backgroundColor: style.innerBg,
          border: style.innerBorder,
          backgroundImage: style.ruledLine,
          backgroundSize: "100% 26px",
        }}
      >
        {/* Header: Stage Number & Badge */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-mono text-2xl font-black tracking-tight"
            style={{ color: style.numberColor }}
          >
            {number}
          </span>
          {badge && (
            <span
              className="text-[0.66rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
              style={{
                backgroundColor: style.badgeBg,
                color: style.badgeText,
                border: `1px solid ${style.badgeBorder}`,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Note Title */}
        <h3 className="text-xl font-bold text-[#0f172a] leading-snug mb-2 font-display">
          {title}
        </h3>

        {/* Note Body Copy */}
        <p className="text-[#334155] text-[0.88rem] leading-relaxed font-sans">
          {description}
        </p>

        {/* Action Link */}
        {href && (
          <div
            className="mt-4 pt-3 flex items-center justify-between text-xs font-bold transition-colors group/link"
            style={{
              borderTop: `1px dashed ${style.innerBorder}`,
              color: style.linkColor,
            }}
          >
            <span>Explore Service</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`relative w-full md:w-[325px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      {href ? (
        <a
          href={href}
          className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-azure-500 rounded-[22px]"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-[10px] md:left-[12%]", rotate: "rotate-4" },
  { className: "md:absolute md:top-[160px] md:right-[12%]", rotate: "-rotate-4" },
  { className: "md:absolute md:top-[480px] md:left-[13%]", rotate: "rotate-5" },
  { className: "md:absolute md:top-[680px] md:right-[12%]", rotate: "-rotate-5" },
  { className: "md:absolute md:top-[1000px] md:left-[12%]", rotate: "rotate-4" },
  { className: "md:absolute md:top-[1200px] md:right-[13%]", rotate: "-rotate-4" },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Claims Audit & Analysis",
      description:
        "Comprehensive review of claims processes to identify inaccuracies, operational inefficiencies, and eliminate revenue loss.",
      theme: "pastel-green",
      href: "/services/claims-audit-and-analysis.html",
      badge: "Stage 01",
    },
    {
      title: "Claims Submission",
      description:
        "Accurate preparation and submission within required timelines to support faster settlement and smoother payment clearance.",
      theme: "pastel-blue",
      href: "/services/claims-processing-and-submission.html",
      badge: "Stage 02",
    },
    {
      title: "Query Management",
      description:
        "Structured handling and rapid resolution of payer queries and documentation requests to keep hospital claims moving continuously.",
      theme: "pastel-blue",
      href: "/services/query-management.html",
      badge: "Stage 03",
    },
    {
      title: "Accounts Receivable Management",
      description:
        "Proactive AR recovery by rigorously tracking, following up, and resolving pending, delayed, and denied hospital claims.",
      theme: "pastel-green",
      href: "/services/accounts-receivable-management.html",
      badge: "Stage 04",
    },
    {
      title: "Revenue Reconciliation",
      description:
        "Exact reconciliation of claims and settlement data with hospital accounting systems for zero leakage and audit transparency.",
      theme: "pastel-blue",
      href: "/services/revenue-reconciliation.html",
      badge: "Stage 05",
    },
    {
      title: "Data Management",
      description:
        "Intelligent healthcare data ingestion, clinical document digitizing, and direct HIS integration for automated revenue ops.",
      theme: "pastel-green",
      href: "/services/data-management.html",
      badge: "Stage 06",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  // Calibrate canvas height according to step count
  let height = 1520;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 500;
  else if (data.length === 3) height = 820;
  else if (data.length === 4) height = 1040;
  else if (data.length === 5) height = 1280;
  else height = 1520;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`relative max-md:pt-4 max-md:pb-14 md:py-14 px-4 sm:px-8 rounded-[32px] border border-slate-200/90 overflow-hidden bg-white/70 shadow-xs ${className}`}
        style={{
          boxShadow: "0 10px 30px -10px rgba(0, 74, 149, 0.05)",
        }}
      >
        {/* Authentic Notebook Ruled Line Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(186, 210, 235, 0.45) 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "6px",
          }}
        />

        {/* Authentic Left Notebook Margin Line (Red/Coral) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-6 sm:left-12 w-px pointer-events-none opacity-35 bg-rose-400"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {/* Animated Dashed Connecting Line weaving through pinned notes */}
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0)
                      return "M 290 170 C 500 170, 550 310, 710 310"; // 1 -> 2
                    if (index === 1)
                      return acc + " C 850 310, 500 480, 290 630"; // 2 -> 3
                    if (index === 2)
                      return acc + " C 290 770, 550 830, 710 830"; // 3 -> 4
                    if (index === 3)
                      return acc + " C 850 830, 500 1000, 290 1150"; // 4 -> 5
                    if (index === 4)
                      return acc + " C 290 1280, 550 1350, 710 1350"; // 5 -> 6
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="#0071e3"
                      strokeWidth="2.5"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140, // Seamless loop
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ opacity: 0.65 }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];
              // Alternating pastel blue and pastel green pattern
              const noteTheme: NoteTheme =
                step.theme ||
                (step.colorTheme === "green" || step.colorTheme === "teal"
                  ? "pastel-green"
                  : step.colorTheme === "blue"
                  ? "pastel-blue"
                  : index % 2 === 0
                  ? "pastel-blue"
                  : "pastel-green");

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  theme={noteTheme}
                  rotate={position.rotate}
                  className={position.className}
                  href={step.href}
                  badge={step.badge}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
