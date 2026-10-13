/**
 * Hand-built SVG illustration set — the visual language for sections that
 * have no photography. Duotone brand palette (azure → aqua), soft glass
 * shapes, thin hairlines. Every illustration maps to a service or a
 * section title so imagery always matches the copy.
 */

import { useId } from "react";

type ArtProps = { className?: string };

/** Shared gradient defs — one defs block per illustration id to stay unique. */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#eaf3ff" />
        <stop offset="0.55" stopColor="#f2f8ff" />
        <stop offset="1" stopColor="#e6f8f7" />
      </linearGradient>
      <linearGradient id={`${id}-azure`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#2997ff" />
        <stop offset="1" stopColor="#004a95" />
      </linearGradient>
      <linearGradient id={`${id}-aqua`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#17c1bb" />
        <stop offset="1" stopColor="#0b6e6a" />
      </linearGradient>
      <linearGradient id={`${id}-orchid`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#a98cf9" />
        <stop offset="1" stopColor="#6d3bd6" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0.65" />
      </linearGradient>
      <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#101828" floodOpacity="0.1" />
      </filter>
    </defs>
  );
}

function Frame({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg viewBox="0 0 320 200" className={className} role="presentation" aria-hidden>
      <Defs id={id} />
      <rect width="320" height="200" rx="22" fill={`url(#${id}-bg)`} />
      {/* soft light bloom */}
      <circle cx="272" cy="26" r="60" fill="#ffffff" opacity="0.55" />
      <circle cx="40" cy="184" r="52" fill="#17c1bb" opacity="0.08" />
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Claims Audit & Analysis — magnifier over a claim sheet              */
/* ------------------------------------------------------------------ */
export function AuditArt({ className }: ArtProps) {
  const id = "audit";
  return (
    <Frame id={id} className={className}>
      {/* claim sheet */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="36" y="26" width="132" height="150" rx="14" fill={`url(#${id}-glass)`} />
      </g>
      <rect x="52" y="44" width="72" height="8" rx="4" fill="#0071e3" opacity="0.75" />
      <rect x="52" y="62" width="98" height="6" rx="3" fill="#101828" opacity="0.12" />
      <rect x="52" y="76" width="84" height="6" rx="3" fill="#101828" opacity="0.12" />
      <rect x="52" y="102" width="40" height="30" rx="8" fill="#0fa3a0" opacity="0.16" />
      <path d="M58 126l8 8 16-18" stroke="#0fa3a0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="102" y="102" width="52" height="30" rx="8" fill="#0071e3" opacity="0.1" />
      <path d="M120 117v10m0 0l-5-5m5 5l5-5" stroke="#0071e3" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <rect x="52" y="146" width="98" height="6" rx="3" fill="#101828" opacity="0.1" />
      {/* magnifier */}
      <g filter={`url(#${id}-soft)`}>
        <circle cx="196" cy="82" r="38" fill="#ffffff" opacity="0.55" />
        <circle cx="196" cy="82" r="30" fill="none" stroke={`url(#${id}-azure)`} strokeWidth="7" />
        <path d="M222 108l24 24" stroke={`url(#${id}-azure)`} strokeWidth="11" strokeLinecap="round" />
      </g>
      {/* findings inside lens */}
      <path d="M182 78l9 9 17-19" stroke="#12854b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="212" cy="94" r="4" fill="#e11d48" opacity="0.8" />
      {/* rising bars = missed revenue found */}
      <g opacity="0.9">
        <rect x="252" y="128" width="14" height="30" rx="5" fill={`url(#${id}-azure)`} opacity="0.35" />
        <rect x="272" y="112" width="14" height="46" rx="5" fill={`url(#${id}-azure)`} opacity="0.6" />
        <rect x="292" y="94" width="14" height="64" rx="5" fill={`url(#${id}-azure)`} />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Claims Processing & Submission — pipeline to approved stamp          */
/* ------------------------------------------------------------------ */
export function SubmissionArt({ className }: ArtProps) {
  const id = "sub";
  return (
    <Frame id={id} className={className}>
      {/* track */}
      <path d="M34 100 H286" stroke="#101828" strokeOpacity="0.1" strokeWidth="3" strokeDasharray="7 8" />
      {/* claim card */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="38" y="52" width="96" height="66" rx="14" fill={`url(#${id}-glass)`} />
      </g>
      <rect x="52" y="66" width="46" height="7" rx="3.5" fill="#0071e3" opacity="0.7" />
      <rect x="52" y="80" width="68" height="6" rx="3" fill="#101828" opacity="0.13" />
      <rect x="52" y="92" width="54" height="6" rx="3" fill="#101828" opacity="0.13" />
      <path d="M104 104l14 14 24-26" stroke="#12854b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* nodes */}
      {[
        { x: 158, c: `url(#${id}-azure)` },
        { x: 206, c: `url(#${id}-aqua)` },
        { x: 254, c: `url(#${id}-orchid)` },
      ].map((n, i) => (
        <g key={n.x}>
          <circle cx={n.x} cy="100" r="17" fill="#ffffff" opacity="0.9" filter={`url(#${id}-soft)`} />
          <circle cx={n.x} cy="100" r="9" fill={n.c} opacity={0.35 + i * 0.25} />
          <circle cx={n.x} cy="100" r="3.4" fill="#ffffff" />
        </g>
      ))}
      {/* approved stamp */}
      <g filter={`url(#${id}-soft)`} transform="rotate(-12 268 148)">
        <rect x="228" y="128" width="80" height="34" rx="10" fill="#12854b" opacity="0.12" />
        <rect x="232" y="132" width="72" height="26" rx="8" fill="none" stroke="#12854b" strokeWidth="2.4" opacity="0.75" />
        <text x="268" y="150" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#12854b" opacity="0.9">
          PAID
        </text>
      </g>
      {/* speed ticks */}
      <g stroke="#2997ff" strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M60 176h20M60 168h10" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Accounts Receivable Management — aging bars, coins, recovery arrow   */
/* ------------------------------------------------------------------ */
export function ArArt({ className }: ArtProps) {
  const id = "ar";
  return (
    <Frame id={id} className={className}>
      {/* aging bars */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="34" y="30" width="168" height="140" rx="16" fill={`url(#${id}-glass)`} />
      </g>
      {[
        { x: 54, h: 44, o: 0.9 },
        { x: 82, h: 70, o: 0.7 },
        { x: 110, h: 96, o: 0.5 },
        { x: 138, h: 58, o: 0.35 },
        { x: 166, h: 30, o: 0.25 },
      ].map((b) => (
        <rect key={b.x} x={b.x} y={146 - b.h} width="16" height={b.h} rx="6" fill={`url(#${id}-azure)`} opacity={b.o} />
      ))}
      <path d="M48 62h142" stroke="#101828" strokeOpacity="0.08" strokeWidth="2" />
      <path d="M54 96l22-16 20 12 22-24 20 14 22-22" stroke="#12854b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
      {/* coin stacks */}
      <g filter={`url(#${id}-soft)`}>
        <ellipse cx="238" cy="152" rx="26" ry="8" fill="#101828" opacity="0.08" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx="238" cy={142 - i * 12} rx="22" ry="7" fill="#f5c451" />
            <ellipse cx="238" cy={139 - i * 12} rx="22" ry="7" fill="#ffd977" />
          </g>
        ))}
        <ellipse cx="238" cy="139" rx="22" ry="7" fill="#ffe9a8" />
        <text x="238" y="137" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="800" fill="#a97a12">
          ₹
        </text>
      </g>
      {/* recovery arrow */}
      <g filter={`url(#${id}-soft)`}>
        <circle cx="272" cy="60" r="26" fill="#12854b" opacity="0.12" />
        <path d="M262 66l10-16 10 10 10-14" stroke="#12854b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M282 46h10v10" stroke="#12854b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue Reconciliation — ledger, balance scale, matched rows         */
/* ------------------------------------------------------------------ */
export function ReconcileArt({ className }: ArtProps) {
  const id = "rec";
  return (
    <Frame id={id} className={className}>
      {/* ledger */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="28" y="30" width="150" height="142" rx="14" fill={`url(#${id}-glass)`} />
      </g>
      <path d="M28 44a14 14 0 0114-14h122a14 14 0 0114 14v10H28z" fill="#0071e3" opacity="0.14" />
      <rect x="44" y="66" width="118" height="1.6" fill="#101828" opacity="0.07" />
      {[82, 98, 114, 130, 146].map((y, i) => (
        <g key={y}>
          <rect x="44" y={y} width="52" height="7" rx="3.5" fill="#101828" opacity="0.12" />
          <rect x="104" y={y} width="34" height="7" rx="3.5" fill={i % 2 ? "#0fa3a0" : "#0071e3"} opacity="0.35" />
          <circle cx="152" cy={y + 3.5} r="4.6" fill="#12854b" opacity="0.85" />
          <path d="M150 3.5l1.8 1.9 3-3.4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" transform={`translate(0 ${y})`} />
        </g>
      ))}
      {/* balance scale */}
      <g filter={`url(#${id}-soft)`}>
        <path d="M232 44v108" stroke="#101828" strokeOpacity="0.25" strokeWidth="4" strokeLinecap="round" />
        <path d="M196 58h72" stroke="#101828" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
        <path d="M196 58l-16 30h32z" fill={`url(#${id}-azure)`} opacity="0.55" />
        <path d="M268 58l16 30h-32z" fill={`url(#${id}-aqua)`} opacity="0.6" />
        <rect x="216" y="150" width="32" height="8" rx="4" fill="#101828" opacity="0.25" />
        <path d="M240 88h24" stroke="#12854b" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>
      <circle cx="240" cy="44" r="7" fill={`url(#${id}-orchid)`} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Medical Billing — invoice, card, calculator                        */
/* ------------------------------------------------------------------ */
export function BillingArt({ className }: ArtProps) {
  const id = "bill";
  return (
    <Frame id={id} className={className}>
      {/* invoice */}
      <g filter={`url(#${id}-soft)`} transform="rotate(-4 96 100)">
        <rect x="36" y="30" width="126" height="146" rx="14" fill="#ffffff" />
        <path d="M36 44a14 14 0 0114-14h98a14 14 0 0114 14v18H36z" fill={`url(#${id}-azure)`} opacity="0.18" />
        <rect x="54" y="80" width="60" height="8" rx="4" fill="#0071e3" opacity="0.75" />
        <rect x="54" y="98" width="90" height="6" rx="3" fill="#101828" opacity="0.12" />
        <rect x="54" y="112" width="74" height="6" rx="3" fill="#101828" opacity="0.12" />
        <rect x="54" y="132" width="90" height="1.6" fill="#101828" opacity="0.1" />
        <text x="54" y="158" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800" fill="#101828">
          ₹1,24,500
        </text>
        <path d="M126 150l12 12 22-24" stroke="#12854b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* card */}
      <g filter={`url(#${id}-soft)`} transform="rotate(9 232 88)">
        <rect x="190" y="52" width="92" height="58" rx="12" fill={`url(#${id}-orchid)`} />
        <rect x="190" y="70" width="92" height="12" fill="#101828" opacity="0.35" />
        <rect x="202" y="92" width="40" height="7" rx="3.5" fill="#ffffff" opacity="0.85" />
        <circle cx="266" cy="96" r="8" fill="#ffffff" opacity="0.7" />
      </g>
      {/* calculator keys */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="196" y="120" width="86" height="60" rx="12" fill="#ffffff" />
        <rect x="206" y="128" width="66" height="14" rx="5" fill="#eef3f9" />
        {[130, 148, 166].map((y) =>
          [206, 228, 250].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y + 14} width="16" height="12" rx="4" fill="#0071e3" opacity="0.22" />
          )),
        )}
      </g>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* Query Management — ticket thread with resolution tick               */
/* ------------------------------------------------------------------ */
export function QueryArt({ className }: ArtProps) {
  const id = "qry";
  return (
    <Frame id={id} className={className}>
      {/* ticket */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="30" y="34" width="150" height="72" rx="16" fill="#ffffff" />
        <path d="M180 52h44a10 10 0 0110 10v26a10 10 0 01-10 10h-44z" fill={`url(#${id}-azure)`} opacity="0.5" />
        <circle cx="42" cy="52" r="5" fill="#0071e3" opacity="0.4" />
        <rect x="46" y="58" width="86" height="8" rx="4" fill="#101828" opacity="0.14" />
        <rect x="46" y="76" width="60" height="8" rx="4" fill="#101828" opacity="0.14" />
      </g>
      {/* payer bubble */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="66" y="126" width="132" height="46" rx="18" fill={`url(#${id}-glass)`} />
        <rect x="84" y="140" width="70" height="7" rx="3.5" fill="#101828" opacity="0.16" />
        <rect x="84" y="154" width="96" height="7" rx="3.5" fill="#101828" opacity="0.12" />
        <path d="M80 126l-12 14z" fill="#ffffff" opacity="0.9" />
      </g>
      {/* our reply */}
      <g filter={`url(#${id}-soft)`}>
        <rect x="118" y="52" width="120" height="46" rx="18" fill={`url(#${id}-azure)`} opacity="0.9" />
        <rect x="134" y="66" width="72" height="7" rx="3.5" fill="#ffffff" opacity="0.9" />
        <rect x="134" y="80" width="52" height="7" rx="3.5" fill="#ffffff" opacity="0.6" />
        <path d="M226 98l14 12z" fill="#2997ff" opacity="0.9" />
      </g>
      {/* resolved tick */}
      <g filter={`url(#${id}-soft)`}>
        <circle cx="258" cy="140" r="24" fill="#12854b" opacity="0.14" />
        <circle cx="258" cy="140" r="17" fill="#12854b" />
        <path d="M250 140l6 6 11-12" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* clock */}
      <g opacity="0.85">
        <circle cx="58" cy="150" r="16" fill="#ffffff" />
        <circle cx="58" cy="150" r="16" fill="none" stroke="#0fa3a0" strokeWidth="2.4" />
        <path d="M58 142v8l6 4" stroke="#0fa3a0" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
    </Frame>
  );
}

const SERVICE_ART: Record<string, (p: ArtProps) => React.ReactElement> = {
  "claims-audit-and-analysis": AuditArt,
  "claims-processing-and-submission": SubmissionArt,
  "accounts-receivable-management": ArArt,
  "revenue-reconciliation": ReconcileArt,
  "medical-billing": BillingArt,
  "query-management": QueryArt,
};

export function ServiceArt({ slug, className }: { slug: string; className?: string }) {
  const Art = SERVICE_ART[slug];
  return Art ? <Art className={className} /> : <AuditArt className={className} />;
}

/* ------------------------------------------------------------------ */
/* Small data-viz helpers used by Impact / stat panels                 */
/* ------------------------------------------------------------------ */

/** Before → after comparison bar pair. */
export function DeltaBars({
  before,
  after,
  className = "",
}: {
  before: number;
  after: number;
  className?: string;
}) {
  const max = Math.max(before, after) || 1;
  const b = Math.max(6, Math.round((before / max) * 100));
  const a = Math.max(6, Math.round((after / max) * 100));
  return (
    <svg viewBox="0 0 120 44" className={className} role="presentation" aria-hidden>
      <rect x="0" y="6" width={b} height="12" rx="6" fill="#101828" opacity="0.14" />
      <rect x="0" y="26" width={a} height="12" rx="6" fill="#0071e3" opacity="0.75" />
    </svg>
  );
}

/** Animated sparkline — a rising revenue curve. */
export function Sparkline({ className = "" }: { className?: string }) {
  const gid = `spark-${useId().replace(/[:]/g, "")}`;
  return (
    <svg viewBox="0 0 160 48" className={className} role="presentation" aria-hidden fill="none">
      <defs>
        <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2997ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2997ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M2 40L26 34l24 6 26-14 24 8 26-18 30-8v22H2z" fill={`url(#${gid}-fill)`} />
      <path
        d="M2 40L26 34l24 6 26-14 24 8 26-18 30-8"
        stroke="#0071e3"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="156" cy="8" r="4" fill="#0071e3" />
    </svg>
  );
}

/** Circular progress ring for stats. */
export function Ring({ value, className = "" }: { value: number; className?: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, Math.max(0, value));
  return (
    <svg viewBox="0 0 64 64" className={className} role="presentation" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#101828" strokeOpacity="0.1" strokeWidth="7" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#0071e3"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform="rotate(-90 32 32)"
      />
    </svg>
  );
}
