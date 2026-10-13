import { useEffect, useRef, type CSSProperties } from "react";
import { HERO, IMPACT, metricPair } from "../../data/content";
import { StudioBackdrop } from "../backdrops/StudioBackdrop";
import { gsap, withFailsafe } from "../../lib/gsap";
import { HeroObject } from "../hero/HeroObject";
import { CountUp, CTAButton } from "../ui";
import { Clock, Percent, ShieldCheck, Wallet } from "lucide-react";

/**
 * Hero. The most characteristic thing in this subject's world is the claim
 * lifecycle, so the page opens on it: headline on the left, and a 3D glass
 * claim sheet on the right with real claim rows at different depths.
 *
 * The ground is a warm pastel studio matched to the reference (peach → mauve
 * → dusty rose, film grain, vignette) — deliberately not blue, so the navy
 * headline and the violet accent are the only saturated things on screen.
 */

/** Numeric part of a result string, e.g. "50% Faster" → { num: 50, rest: "% Faster" }. */
function splitResult(result: string): { num: number | null; rest: string } {
  const m = result.match(/^([\d.]+)(.*)$/);
  if (!m) return { num: null, rest: result };
  return { num: Number(m[1]), rest: m[2] };
}

/** Per-module identity — accent, glow, and its own sigil. */
const MODULE_LOOK = [
  { accent: "#0071e3", glow: "rgba(0,113,227,0.14)", Glyph: Clock },
  { accent: "#17c1bb", glow: "rgba(23,193,187,0.14)", Glyph: Percent },
  { accent: "#9f69c5", glow: "rgba(159,105,197,0.16)", Glyph: Wallet },
  { accent: "#76c40b", glow: "rgba(118,196,11,0.14)", Glyph: ShieldCheck },
];

/**
 * HeroModule — one feature module.
 *
 * A chamfered tile, not a pill: a notched top-right corner, a 1px
 * chamfered edge, its own accent, and a before→after bar that fills
 * as the module scrolls in. The title / number / bar rows share a
 * baseline grid so all four read as one instrument panel.
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
  const ratio = metric.before > 0 ? Math.max(0.03, metric.after / metric.before) : 1;

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
      className="hero-module"
      style={
        {
          "--module-accent": look.accent,
          "--module-glow": look.glow,
        } as CSSProperties
      }
    >
      {/* accent rail — the only furniture; no card surface */}
      <span className="hero-module-rail" aria-hidden />

      <div className="relative flex h-full flex-col pl-4 pr-1 py-1">
        {/* header — title left, sigil right */}
        <div className="flex items-start justify-between gap-3">
          <dt className="text-[0.82rem] font-semibold leading-snug tracking-[-0.005em] text-studio-700">
            {metric.title}
          </dt>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-white"
            style={{ background: look.accent }}
          >
            <Glyph className="h-4 w-4" aria-hidden />
          </span>
        </div>

        {/* the number — anchored so all four align on one baseline */}
        <dd className="mt-6 flex items-baseline gap-1.5">
          <span className="tabular text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-studio-950 sm:text-[2.9rem]">
            {num !== null ? (
              <CountUp to={num} decimals={metric.result.includes(".") ? 1 : 0} />
            ) : (
              metric.result
            )}
          </span>
          <span className="text-[1rem] font-semibold" style={{ color: look.accent }}>
            {rest}
          </span>
        </dd>

        {/* before → after, with a bar that fills */}
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-3 pb-2 text-[0.7rem]">
            <span className="text-studio-400">{metric.beforeLabel}</span>
            <span className="text-studio-400">before</span>
          </div>
          <div className="hero-module-track">
            <div ref={fillRef} className="hero-module-fill" />
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 pb-2 text-[0.7rem]">
            <span className="font-semibold" style={{ color: look.accent }}>
              {metric.afterLabel}
            </span>
            <span className="text-studio-500">after</span>
          </div>
          <p className="tabular pt-1 text-[0.75rem] text-studio-500">{metricPair(metric)}</p>
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
      className="relative overflow-hidden pb-16 pt-24 sm:pt-28 lg:pb-24 lg:pt-32"
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
            "radial-gradient(85% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, rgba(246,233,226,0.35) 34%, rgba(246,233,226,0) 68%)",
        }}
      />

      {/* warm blooms sitting behind the object, so it glows in-set */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="studio-bloom"
          style={{
            right: "4%",
            top: "14%",
            height: "32rem",
            width: "32rem",
            background: "radial-gradient(circle, rgba(246,233,226,0.9) 0%, rgba(246,233,226,0) 68%)",
          }}
        />
        <div
          className="studio-bloom"
          style={{
            right: "26%",
            bottom: "4%",
            height: "24rem",
            width: "24rem",
            background: "radial-gradient(circle, rgba(159,105,197,0.22) 0%, rgba(159,105,197,0) 70%)",
          }}
        />
      </div>

      {/* The windmill — six blade panes sweeping past a soft hub.
          Rendered ABOVE every wash and bloom so the panes of light
          are unmistakably visible as they turn. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-windmill">
          <div className="hero-blade" style={{ transform: "rotate(0deg)", "--tint": "rgba(159,105,197,0.55)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(60deg)", "--tint": "rgba(236,214,205,0.7)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(120deg)", "--tint": "rgba(215,193,189,0.75)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(180deg)", "--tint": "rgba(204,182,184,0.65)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(240deg)", "--tint": "rgba(246,233,226,0.8)" } as CSSProperties} />
          <div className="hero-blade" style={{ transform: "rotate(300deg)", "--tint": "rgba(159,105,197,0.42)" } as CSSProperties} />
          <div className="hero-hub" />
        </div>
      </div>

      <div className="relative z-0 mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="grid items-center gap-x-14 gap-y-14 lg:grid-cols-[1.04fr_0.96fr]">
          {/* ---------------- Copy ---------------- */}
          <div>
            <div data-hero-kicker className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-[#9f69c5] to-transparent" />
              <span className="text-[0.82rem] font-medium tracking-[-0.005em] text-[#9f69c5]">
                Healthcare revenue cycle management
              </span>
            </div>

            <h1 className="mt-6 max-w-[19ch] text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] text-studio-950 sm:text-[3.4rem] lg:text-[4.05rem]">
              <span data-hero-line className="block">
                Optimize your
              </span>
              <span data-hero-line className="block">
                hospital revenue
              </span>
              <span data-hero-line className="block text-studio-500">
                with HRCM
              </span>
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-xl text-[1.05rem] leading-[1.7] text-studio-700 sm:text-[1.15rem]"
            >
              End-to-end receivables recovery and operational support for healthcare providers.
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

          {/* ---------------- 3D glass claims object ---------------- */}
          <div className="relative flex justify-center lg:-ml-10 lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(56% 56% at 62% 42%, rgba(255,255,255,0.75) 0%, rgba(246,233,226,0.5) 45%, rgba(246,233,226,0) 72%)",
              }}
            />
            <HeroObject className="w-full" />
          </div>
        </div>

        {/* ---------------- Feature modules ---------------- */}
        <div data-hero-ledger className="mt-16 lg:mt-20">
          <div className="flex items-end justify-between gap-6 pb-4">
            <p className="text-[0.85rem] text-studio-500">What changes after we take over</p>
            <p className="hidden text-[0.78rem] text-studio-400 sm:block">
              As reported by HRCM across recent engagements
            </p>
          </div>
          <hr className="ledger-rule" />
          <dl className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-studio-200">
            {IMPACT.metrics.map((m, i) => (
              <div key={m.title} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <HeroModule metric={m} index={i} />
              </div>
            ))}
          </dl>
          <hr className="ledger-rule mt-4" />
        </div>
      </div>
    </section>
  );
}
