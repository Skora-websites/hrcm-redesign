import { useEffect, useRef, useState } from "react";
import { gsap, shouldSkipAnimation } from "../lib/gsap";

/**
 * Lightweight animated chart primitives (bar / donut / horizontal bar) built
 * with SVG + GSAP so we ship no charting-library dependency. Each animates on
 * first scroll-into-view and snaps to its final value if the tab is throttled
 * or the user prefers reduced motion.
 */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldSkipAnimation()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

type Metric = {
  title: string;
  unit: string;
  before: number;
  after: number;
  beforeLabel: string;
  afterLabel: string;
  result: string;
};

/* ------------------------------------------------------------------ */
/* Vertical bar chart: before vs after                                 */
/* ------------------------------------------------------------------ */

export function BarChart({ metric }: { metric: Metric }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const beforeRef = useRef<SVGRectElement>(null);
  const afterRef = useRef<SVGRectElement>(null);

  const max = Math.max(metric.before, metric.after) * 1.15 || 1;
  const H = 150;
  const beforeH = (metric.before / max) * H;
  const afterH = (metric.after / max) * H;

  useEffect(() => {
    if (!inView) return;
    if (shouldSkipAnimation()) return;
    const tl = gsap.timeline();
    if (beforeRef.current) {
      tl.fromTo(
        beforeRef.current,
        { attr: { height: 0, y: H } },
        { attr: { height: beforeH, y: H - beforeH }, duration: 0.9, ease: "power3.out" },
      );
    }
    if (afterRef.current) {
      tl.fromTo(
        afterRef.current,
        { attr: { height: 0, y: H } },
        { attr: { height: afterH, y: H - afterH }, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      );
    }
    return () => {
      tl.kill();
    };
  }, [inView, beforeH, afterH]);

  const barW = 46;
  const gap = 40;
  const totalW = barW * 2 + gap;
  const vbW = 220;

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${vbW} ${H + 8}`}
        className="w-full"
        role="img"
        aria-label={`${metric.title}: ${metric.beforeLabel} before, ${metric.afterLabel} after`}
      >
        <defs>
          <linearGradient id={`bar-before-${metric.title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id={`bar-after-${metric.title}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1="0"
            x2={vbW}
            y1={H - H * t}
            y2={H - H * t}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        <g transform={`translate(${(vbW - totalW) / 2}, 4)`}>
          <rect
            ref={beforeRef}
            x="0"
            y={H - beforeH}
            width={barW}
            height={beforeH}
            rx="8"
            fill={`url(#bar-before-${metric.title})`}
          />
          <rect
            ref={afterRef}
            x={barW + gap}
            y={H - afterH}
            width={barW}
            height={afterH}
            rx="8"
            fill={`url(#bar-after-${metric.title})`}
          />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut chart: a single "recovered / reduced" share                   */
/* ------------------------------------------------------------------ */

export function DonutChart({
  percent,
  label,
  color = "#10b981",
}: {
  percent: number;
  label: string;
  color?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const arcRef = useRef<SVGCircleElement>(null);
  const [display, setDisplay] = useState(0);

  const R = 54;
  const C = 2 * Math.PI * R;
  const target = (Math.min(Math.max(percent, 0), 100) / 100) * C;

  useEffect(() => {
    if (!inView) return;
    if (shouldSkipAnimation()) {
      setDisplay(percent);
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: percent,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => setDisplay(obj.v),
      onComplete: () => setDisplay(percent),
    });
    if (arcRef.current) {
      gsap.fromTo(
        arcRef.current,
        { attr: { "stroke-dashoffset": C } },
        { attr: { "stroke-dashoffset": C - target }, duration: 1.2, ease: "power2.out" },
      );
    }
    return () => {
      tween.kill();
    };
  }, [inView, percent, target, C]);

  return (
    <div ref={ref} className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#e2e8f0" strokeWidth="14" />
        <circle
          ref={arcRef}
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={inView ? C - target : C}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-navy-900">{display.toFixed(0)}%</span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-ink-500">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bar: before vs after, relative widths                    */
/* ------------------------------------------------------------------ */

export function HBarChart({ metric }: { metric: Metric }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(metric.before, metric.after) || 1;
  const beforePct = (metric.before / max) * 100;
  const afterPct = (metric.after / max) * 100;

  return (
    <div ref={ref} className="space-y-4">
      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">Before</span>
          <span className="text-sm font-bold text-rose-600">{metric.beforeLabel}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-mist-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-400 transition-[width] duration-1000 ease-out"
            style={{ width: inView ? `${beforePct}%` : "0%" }}
          />
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">After</span>
          <span className="text-sm font-bold text-signal-600">{metric.afterLabel}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-mist-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal-500 to-signal-400 transition-[width] duration-1000 ease-out delay-150"
            style={{ width: inView ? `${afterPct}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}
