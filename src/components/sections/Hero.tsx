import { useEffect, useRef, type CSSProperties } from "react";
import { HERO, IMPACT, metricPair } from "../../data/content";
import { StudioBackdrop } from "../backdrops/StudioBackdrop";
import { gsap, withFailsafe } from "../../lib/gsap";
import { HeroObject } from "../hero/HeroObject";
import { CountUp, CTAButton } from "../ui";
import { Clock, Percent, ShieldCheck, Wallet } from "lucide-react";

/**
 * Hero. The page opens on the product itself: headline on the left, and the
 * HRCM AI software shown as a 3D glass workspace on the right — an intelligent
 * core with a live ECG pulse and capability tiles, no claim data.
 *
 * The ground is a light green pastel studio lifted from the HRCM logo (₹ /
 * ECG green, bridged to the logo's teal arc), so the deep-green headline and
 * the green accent are the only saturated things on screen.
 */

/** Numeric part of a result string, e.g. "50% Faster" → { num: 50, rest: "% Faster" }. */
function splitResult(result: string): { num: number | null; rest: string } {
  const m = result.match(/^([\d.]+)(.*)$/);
  if (!m) return { num: null, rest: result };
  return { num: Number(m[1]), rest: m[2] };
}

/** Per-module identity — accent, glow, and its own sigil. All in the logo's
 *  green family (logo green, sprout, teal, deep green) so the ledger stays
 *  cohesive with the green hero. */
const MODULE_LOOK = [
  {
    tag: "TURNAROUND SPEED",
    accent: "#0071e3",
    gradient: "linear-gradient(135deg, #0071e3 0%, #2997ff 100%)",
    glow: "rgba(0,113,227,0.24)",
    patternClass: "hero-pattern-dots",
    badgeBg: "rgba(0,113,227,0.08)",
    badgeText: "#0071e3",
    delta: "2x Faster",
    Glyph: Clock,
  },
  {
    tag: "LEAKAGE PREVENTION",
    accent: "#0fa3a0",
    gradient: "linear-gradient(135deg, #0fa3a0 0%, #17c1bb 100%)",
    glow: "rgba(15,163,160,0.24)",
    patternClass: "hero-pattern-grid",
    badgeBg: "rgba(15,163,160,0.08)",
    badgeText: "#0b7270",
    delta: "↓ 91% Deductions",
    Glyph: Percent,
  },
  {
    tag: "CAPITAL RECOVERY",
    accent: "#2997ff",
    gradient: "linear-gradient(135deg, #2997ff 0%, #6cc4ff 100%)",
    glow: "rgba(41,151,255,0.24)",
    patternClass: "hero-pattern-stripes",
    badgeBg: "rgba(41,151,255,0.08)",
    badgeText: "#0066cc",
    delta: "84 pts Reclaimed",
    Glyph: Wallet,
  },
  {
    tag: "PAYER COMPLIANCE",
    accent: "#004a95",
    gradient: "linear-gradient(135deg, #004a95 0%, #0071e3 100%)",
    glow: "rgba(0,74,149,0.24)",
    patternClass: "hero-pattern-cross",
    badgeBg: "rgba(0,74,149,0.08)",
    badgeText: "#003b77",
    delta: "Zero-Omission",
    Glyph: ShieldCheck,
  },
];

/**
 * HeroModule — creative bento feature card.
 *
 * Micro-architectural pattern, frosted dimensional glass, glowing
 * comparison gauge, and interactive hover lift.
 */
function HeroModule({
  metric,
  index,
}: {
  metric: (typeof IMPACT.metrics)[number];
  index: number;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const { num, rest } = splitResult(metric.result);
  const look = MODULE_LOOK[index % MODULE_LOOK.length];
  const { Glyph } = look;

  // how much of "before" is left after engagement — drives the bar
  const ratio = metric.before > 0 ? Math.max(0.04, Math.min(1, metric.after / metric.before)) : 1;

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.style.transform = "scaleX(1)";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: ratio,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.15 + index * 0.1,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [ratio, index]);

  return (
    <div
      className={`hero-bento-card group flex h-full flex-col p-6 sm:p-7 ${look.patternClass}`}
      style={
        {
          "--card-glow": look.glow,
          "--card-gradient": look.gradient,
        } as CSSProperties
      }
    >
      {/* Top subtle iridescent hairline accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] opacity-75 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: look.gradient,
        }}
      />

      {/* Ambient corner light bloom */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: look.accent }}
      />

      {/* Card Header: Tag pill & floating squircle icon */}
      <div className="relative flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-bold tracking-[0.08em] uppercase border border-slate-200/80 bg-white/90 shadow-2xs backdrop-blur-xs"
          style={{ color: look.badgeText }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: look.accent }}
          />
          {look.tag}
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: look.gradient }}
        >
          <Glyph className="h-4.5 w-4.5" aria-hidden />
        </span>
      </div>

      {/* Metric Title */}
      <h4 className="relative mt-5 text-[0.98rem] font-bold leading-snug tracking-tight text-slate-800 font-sans">
        {metric.title}
      </h4>

      {/* The Big Result Number */}
      <div className="relative mt-3 flex items-baseline gap-1.5">
        <span className="tabular text-[2.6rem] font-bold leading-none tracking-[-0.035em] text-slate-900 font-display">
          {num !== null ? (
            <CountUp to={num} decimals={metric.result.includes(".") ? 1 : 0} />
          ) : (
            metric.result
          )}
        </span>
        <span className="text-[1.05rem] font-bold tracking-tight" style={{ color: look.accent }}>
          {rest}
        </span>
      </div>

      {/* Before / After Dual-Stage Progress Instrument */}
      <div className="relative mt-auto pt-6">
        <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs">
          <div className="flex items-center justify-between text-[0.7rem] pb-1.5 font-medium">
            <span className="text-slate-500">Baseline Before</span>
            <span className="tabular font-semibold text-slate-700">{metric.beforeLabel} {metric.unit}</span>
          </div>

          <div className="hero-module-track my-1">
            <div ref={fillRef} className="hero-module-fill" />
          </div>

          <div className="flex items-center justify-between text-[0.72rem] pt-1.5 font-bold" style={{ color: look.accent }}>
            <span>HRCM Optimized</span>
            <span className="tabular font-extrabold">{metric.afterLabel} {metric.unit}</span>
          </div>
        </div>

        {/* Delta Tag */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[0.72rem] font-medium text-slate-500">
            {metricPair(metric)}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.68rem] font-bold"
            style={{ backgroundColor: look.badgeBg, color: look.badgeText }}
          >
            {look.delta}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-kicker]", { opacity: 0, x: -12, duration: 0.5 })
        .from("[data-hero-line]", { opacity: 0, y: 34, duration: 0.85, stagger: 0.09 }, "-=0.25")
        .from("[data-hero-copy]", { opacity: 0, y: 18, duration: 0.7 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from("[data-board-frame]", { opacity: 0, y: 24, duration: 0.7 }, "-=0.7")
        .from("[data-board-row]", { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, "-=0.55")
        .from("[data-hero-ledger]", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4");

      // Failsafe for throttled webviews: never leave content hidden.
      withFailsafe(tl, 2600);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="home"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <StudioBackdrop />

      {/* 3D gradient ground — the volumetric washes, floor plane,
          key light and blooms. The windmill renders ABOVE these. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-depth-haze" />
        <div className="hero-texture" />
        <div className="hero-floor" />
      </div>

      {/* top-anchored key light — fills the upper hero so it
          never reads as vacant behind the navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[46rem]"
        style={{
          background:
            "radial-gradient(85% 60% at 50% 0%, rgba(255,255,255,0.7) 0%, rgba(227,242,255,0.45) 34%, rgba(227,242,255,0) 68%)",
        }}
      />

      {/* light blue blooms sitting behind the object, so it glows in-set */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="studio-bloom"
          style={{
            right: "4%",
            top: "14%",
            height: "32rem",
            width: "32rem",
            background: "radial-gradient(circle, rgba(227,242,255,0.9) 0%, rgba(227,242,255,0) 68%)",
          }}
        />
        <div
          className="studio-bloom"
          style={{
            right: "26%",
            bottom: "4%",
            height: "24rem",
            width: "24rem",
            background: "radial-gradient(circle, rgba(0,113,227,0.18) 0%, rgba(0,113,227,0) 70%)",
          }}
        />
      </div>

      {/* The windmill — six blade panes sweeping past a soft hub.
          Rendered ABOVE every wash and bloom so the panes of light
          are unmistakably visible as they turn. Alternating azure and
          teal ribbons create dynamic depth across the light-blue ground. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-windmill">
          <div className="hero-blade" style={{ transform: "rotate(0deg)", "--tint": "rgba(0,113,227,0.44)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(60deg)", "--tint": "rgba(23,193,187,0.52)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(120deg)", "--tint": "rgba(41,151,255,0.42)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(180deg)", "--tint": "rgba(15,163,160,0.52)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(240deg)", "--tint": "rgba(77,217,212,0.48)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(300deg)", "--tint": "rgba(0,113,227,0.38)" } as CSSProperties} />
          <div className="hero-hub" />
        </div>
      </div>

      <div className="relative z-0 mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="grid items-center gap-x-14 gap-y-14 lg:grid-cols-[1.04fr_0.96fr]">
          {/* ---------------- Copy ---------------- */}
          <div>
            <div data-hero-kicker className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-azure-600 to-transparent" />
              <span className="text-[0.82rem] font-medium tracking-[-0.005em] text-azure-700">
                AI-Powered Healthcare Revenue Cycle Management
              </span>
            </div>

            <h1 className="mt-6 max-w-[20ch] text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] text-studio-950 sm:text-[3.4rem] lg:text-[4.05rem]">
              <span data-hero-line className="block">
                Optimize your
              </span>
              <span data-hero-line className="block">
                hospital revenue
              </span>
              <span data-hero-line className="block text-studio-500">
                with HRCM AI
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-studio-700 sm:text-[1.15rem]"
            >
              Automated claim scrubbing, deduction analysis, and settlement tracking across private insurers and government panels.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <div data-hero-cta>
                <CTAButton
                  href={HERO.primaryCta.href}
                  size="lg"
                  className="bg-studio-950 text-white shadow-[0_14px_34px_-14px_rgba(30,26,40,0.55)] ring-1 ring-inset ring-white/10 hover:bg-studio-900"
                >
                  {HERO.primaryCta.label}
                </CTAButton>
              </div>
              <div data-hero-cta>
                <CTAButton href={HERO.secondaryCta.href} variant="glass" size="lg" arrow>
                  {HERO.secondaryCta.label}
                </CTAButton>
              </div>
            </div>
          </div>

          {/* ---------------- 3D glass AI workspace ---------------- */}
          <div className="relative flex justify-center lg:-ml-10 lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(56% 56% at 62% 42%, rgba(255,255,255,0.8) 0%, rgba(227,242,255,0.55) 45%, rgba(227,242,255,0) 72%)",
              }}
            />
            <HeroObject className="w-full" />
          </div>
        </div>

        {/* ---------------- Feature modules ---------------- */}
        <div data-hero-ledger className="mt-16 lg:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6">
            <div>
              <span className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-azure-700">
                Verified Hospital Performance
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-studio-950 font-display">
                What changes after HRCM takes over
              </h3>
            </div>
            <p className="text-xs text-studio-500 font-medium sm:text-right">
              Measured against hospital baselines across recent engagements
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.metrics.map((m, i) => (
              <HeroModule key={m.title} metric={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
