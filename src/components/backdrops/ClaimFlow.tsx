import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../../lib/gsap";

/**
 * HeroBackdrop — the site's signature background, built from the subject
 * matter: claim sheets. Three layers of depth, all driven by the niche:
 *
 * 1. Claim sheets — translucent claim documents drifting at different
 *    depths, each showing the rows a real claim sheet carries (hairline
 *    title, status dot, amount). Slow, never looping visually.
 * 2. The lifecycle rail — audit → submission → payer review → settled,
 *    with claim tokens travelling it; denied claims loop back to audit.
 * 3. The settlement curve — revenue recovering, drawn once on load.
 *
 * `quiet` dims the whole thing so hero copy stays the loudest element.
 * Everything is inert under prefers-reduced-motion.
 */

/** Pipeline nodes, as fractions of the viewBox. */
const STAGES = [
  { x: 0.1, y: 0.26, label: "Audit" },
  { x: 0.36, y: 0.2, label: "Submission" },
  { x: 0.62, y: 0.28, label: "Payer review" },
  { x: 0.88, y: 0.22, label: "Settled" },
];

const CLAIMS = [
  { id: "CL-4821", amount: "₹1.8L", denied: false, delay: 0 },
  { id: "CL-4827", amount: "₹0.9L", denied: true, delay: 1.6 },
  { id: "CL-4833", amount: "₹3.4L", denied: false, delay: 3.1 },
  { id: "CL-4841", amount: "₹2.2L", denied: false, delay: 4.6 },
  { id: "CL-4849", amount: "₹1.2L", denied: true, delay: 6.2 },
  { id: "CL-4855", amount: "₹4.6L", denied: false, delay: 7.7 },
];

/** Drifting claim sheets behind the copy. Position/size in px of the viewBox. */
const SHEETS = [
  { x: 86, y: 24, w: 132, h: 92, r: -7, tint: "azure", speed: 0.55 },
  { x: 250, y: 96, w: 118, h: 84, r: 5, tint: "aqua", speed: 0.85 },
  { x: 640, y: 40, w: 140, h: 98, r: 6, tint: "orchid", speed: 0.7 },
  { x: 780, y: 138, w: 124, h: 86, r: -5, tint: "azure", speed: 1 },
  { x: 470, y: 12, w: 108, h: 78, r: 8, tint: "aqua", speed: 0.9 },
];

const TINT: Record<string, string> = {
  azure: "#0071e3",
  aqua: "#0fa3a0",
  orchid: "#8b5cf6",
};

const VB_W = 1000;
const VB_H = 260;

/** Path through the four stages (smooth cubic segments). */
function pipelinePath(denied: boolean): string {
  const [a, b, c, d] = STAGES;
  if (!denied) {
    return [
      `M ${a.x * VB_W} ${a.y * VB_H}`,
      `C ${(a.x + 0.09) * VB_W} ${a.y * VB_H} ${(b.x - 0.11) * VB_W} ${b.y * VB_H} ${b.x * VB_W} ${b.y * VB_H}`,
      `S ${(c.x - 0.1) * VB_W} ${c.y * VB_H} ${c.x * VB_W} ${c.y * VB_H}`,
      `S ${(d.x - 0.08) * VB_W} ${d.y * VB_H} ${d.x * VB_W} ${d.y * VB_H}`,
    ].join(" ");
  }
  // Denied: audit → payer, then loops back under the line to audit.
  return [
    `M ${a.x * VB_W} ${a.y * VB_H}`,
    `C ${(a.x + 0.09) * VB_W} ${a.y * VB_H} ${(b.x - 0.11) * VB_W} ${b.y * VB_H} ${b.x * VB_W} ${b.y * VB_H}`,
    `S ${(c.x - 0.1) * VB_W} ${c.y * VB_H} ${c.x * VB_W} ${c.y * VB_H}`,
    `C ${(c.x - 0.06) * VB_W} ${0.78 * VB_H} ${0.42 * VB_W} ${0.86 * VB_H} ${0.3 * VB_W} ${0.62 * VB_H}`,
    `C ${0.24 * VB_W} ${0.5 * VB_H} ${0.16 * VB_W} ${0.42 * VB_H} ${a.x * VB_W} ${a.y * VB_H}`,
  ].join(" ");
}

/** Settlement curve — revenue recovering. */
const CURVE =
  "M 40 214 C 150 210 210 178 300 168 C 420 154 470 120 580 108 C 700 96 760 62 860 54 C 910 50 945 46 968 44";

export function ClaimFlow({
  className = "",
  quiet = false,
}: {
  className?: string;
  quiet?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;

    const ctx = gsap.context(() => {
      /* ---- 1. claim sheets drift ---- */
      el.querySelectorAll<SVGGElement>("[data-sheet]").forEach((sheet) => {
        const speed = Number(sheet.dataset.speed ?? 1);
        const dir = Number(sheet.dataset.dir ?? 1);
        gsap.to(sheet, {
          y: dir * 16 * speed,
          x: dir * 7 * speed,
          rotation: dir * 1.6 * speed,
          duration: 7 * speed,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* ---- 2. tokens travel the lifecycle rail ---- */
      el.querySelectorAll<SVGGElement>("[data-claim]").forEach((chip) => {
        const denied = chip.dataset.denied === "true";
        const delay = Number(chip.dataset.delay ?? 0);
        const path = pipelinePath(denied);

        gsap.to(chip, {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false },
          duration: denied ? 7.5 : 6.5,
          delay,
          repeat: -1,
          repeatDelay: 0.4,
          ease: "none",
        });

        if (denied) {
          const dot = chip.querySelector<SVGCircleElement>("[data-dot]");
          if (dot) {
            gsap.to(dot, {
              attr: { fill: "var(--color-alert-500)" },
              duration: 0.35,
              repeat: -1,
              repeatDelay: 6.4,
              yoyo: true,
              yoyoEase: "power1.inOut",
            });
          }
        }
      });

      /* ---- 3. stage nodes breathe in sequence ---- */
      gsap.to(el.querySelectorAll("[data-stage-ring]"), {
        scale: 1.14,
        opacity: 0.35,
        duration: 1.5,
        repeat: -1,
        stagger: { each: 1.4, repeat: -1 },
        ease: "sine.inOut",
        transformOrigin: "center center",
      });

      /* ---- settlement curve draws once ---- */
      const curve = el.querySelector<SVGPathElement>("[data-curve]");
      if (curve) {
        const len = curve.getTotalLength();
        gsap.set(curve, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(curve, {
          strokeDashoffset: 0,
          duration: 2.6,
          delay: 0.5,
          ease: "power2.inOut",
        });
      }

      /* ---- rails crawl in the direction of travel ---- */
      gsap.to(el.querySelectorAll("[data-flow]"), {
        strokeDashoffset: -220,
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        quiet ? "claim-flow-quiet" : ""
      } ${className}`}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="cf-line" x1="0" y1="0" x2={VB_W} y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0071e3" stopOpacity="0.05" />
            <stop offset="0.45" stopColor="#0071e3" stopOpacity="0.22" />
            <stop offset="0.8" stopColor="#0fa3a0" stopOpacity="0.24" />
            <stop offset="1" stopColor="#12854b" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="cf-curve" x1="0" y1="0" x2={VB_W} y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0071e3" stopOpacity="0" />
            <stop offset="0.3" stopColor="#0071e3" stopOpacity="0.5" />
            <stop offset="0.75" stopColor="#0fa3a0" stopOpacity="0.55" />
            <stop offset="1" stopColor="#12854b" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="cf-fill" x1="0" y1="0" x2="0" y2={VB_H} gradientUnits="userSpaceOnUse">
            <stop stopColor="#2997ff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#2997ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cf-sheet" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>
          <filter id="cf-sheet-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#101828" floodOpacity="0.09" />
          </filter>
          <radialGradient id="cf-bloom" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#12854b" stopOpacity="0.22" />
            <stop offset="1" stopColor="#12854b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---- Layer 1: drifting claim sheets ---- */}
        <g className="claim-sheet-group">
          {SHEETS.map((s, i) => (
            <g
              key={i}
              data-sheet
              data-speed={s.speed}
              data-dir={i % 2 === 0 ? 1 : -1}
              transform={`translate(${s.x} ${s.y}) rotate(${s.r})`}
              filter={quiet ? undefined : "url(#cf-sheet-shadow)"}
            >
              <rect
                width={s.w}
                height={s.h}
                rx="12"
                fill="url(#cf-sheet)"
                fillOpacity={quiet ? 0.5 : 0.85}
                stroke="rgba(16,24,40,0.06)"
                strokeWidth="1"
              />
              {/* tinted header bar */}
              <rect width={s.w} height="16" rx="12" fill={TINT[s.tint]} opacity={quiet ? 0.1 : 0.18} />
              <rect y="12" width={s.w} height="4" fill={TINT[s.tint]} opacity={quiet ? 0.1 : 0.18} />
              {/* mock claim rows */}
              <circle cx="12" cy="34" r="3" fill={TINT[s.tint]} opacity="0.75" />
              <rect x="22" y="31" width={s.w * 0.5} height="5" rx="2.5" fill="#101828" opacity="0.1" />
              <rect x="12" y="48" width={s.w * 0.68} height="5" rx="2.5" fill="#101828" opacity="0.08" />
              <rect x="12" y="62" width={s.w * 0.42} height="5" rx="2.5" fill="#101828" opacity="0.08" />
              <text
                x="12"
                y={s.h - 10}
                fontFamily="Inter, sans-serif"
                fontSize="10"
                fontWeight="700"
                fill="#101828"
                opacity="0.32"
              >
                ₹
                {(i + 2) * 7}.5L
              </text>
            </g>
          ))}
        </g>

        {/* ---- Layer 2: settlement curve + area ---- */}
        <path d={`${CURVE} L 968 250 L 40 250 Z`} fill="url(#cf-fill)" />
        <path data-curve d={CURVE} stroke="url(#cf-curve)" strokeWidth="2.5" strokeLinecap="round" />

        {/* bloom at the settled node */}
        <circle cx={0.88 * VB_W} cy={0.22 * VB_H} r="70" fill="url(#cf-bloom)" />

        {/* ---- rails ---- */}
        {[false, true].map((denied) => (
          <path
            key={String(denied)}
            data-flow={denied ? "denied" : "main"}
            d={pipelinePath(denied)}
            stroke={denied ? "var(--color-alert-500)" : "url(#cf-line)"}
            strokeWidth={denied ? 1.4 : 2}
            strokeDasharray={denied ? "3 7" : "5 6"}
            strokeOpacity={denied ? 0.35 : 1}
            strokeLinecap="round"
          />
        ))}

        {/* ---- stage nodes ---- */}
        {STAGES.map((s, i) => (
          <g key={s.label}>
            <circle
              data-stage-ring
              cx={s.x * VB_W}
              cy={s.y * VB_H}
              r="15"
              fill="none"
              stroke="url(#cf-line)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <circle
              cx={s.x * VB_W}
              cy={s.y * VB_H}
              r="5"
              fill={i === 3 ? "#76c40b" : i === 2 ? "var(--color-aqua-500)" : "#0071e3"}
              opacity={i === 3 ? 0.95 : 0.7}
            />
            {!quiet && (
              <text
                x={s.x * VB_W}
                y={s.y * VB_H + 30}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#667085"
                opacity="0.7"
              >
                {s.label}
              </text>
            )}
          </g>
        ))}

        {/* ---- travelling claim tokens ---- */}
        {CLAIMS.map((c) => (
          <g
            key={c.id}
            data-claim
            data-delay={c.delay}
            data-denied={String(c.denied)}
            className="claim-chip"
          >
            <rect
              x="-34"
              y="-13"
              width="68"
              height="26"
              rx="8"
              fill="#ffffff"
              fillOpacity={quiet ? 0.55 : 0.92}
              stroke={c.denied ? "var(--color-alert-200)" : "rgba(16,24,40,0.07)"}
              strokeWidth="1"
            />
            <circle
              data-dot
              cx="-22"
              cy="0"
              r="3.5"
              fill={c.denied ? "var(--color-alert-500)" : "var(--color-signal-500)"}
              opacity={quiet ? 0.7 : 1}
            />
            <text
              x="-10"
              y="4"
              fontFamily="Inter, sans-serif"
              fontSize="11"
              fontWeight="600"
              fill="#344054"
              opacity={quiet ? 0.55 : 1}
            >
              {c.amount}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
