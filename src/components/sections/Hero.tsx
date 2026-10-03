import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../../lib/gsap";
import { HERO } from "../../data/content";
import { CTAButton } from "../ui";

function ClaimFlowVisual() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("[data-chip]", {
        opacity: 0,
        x: -18,
        duration: 0.5,
        stagger: 0.22,
        delay: 1.0,
        ease: "power2.out",
      })
        .from("[data-settle]", {
          opacity: 0,
          y: 22,
          duration: 0.55,
          delay: 0.2,
          ease: "power3.out",
        })
        .fromTo(
          "[data-settle-bar]",
          { width: "0%" },
          { width: "86%", duration: 0.9, ease: "power2.out" },
        );
      window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 4200);
    }, el);
    return () => ctx.revert();
  }, []);

  const chips = [
    { label: "Claim 1042", status: "Verified", cls: "text-signal-400 border-signal-500/40 bg-signal-500/10", pos: "left-0 top-6" },
    { label: "Claim 1043", status: "Submitting", cls: "text-azure-300 border-azure-400/40 bg-azure-500/10", pos: "left-10 top-24 sm:left-16" },
    { label: "Claim 1044", status: "Audited", cls: "text-signal-400 border-signal-500/40 bg-signal-500/10", pos: "left-4 top-44 sm:left-8" },
  ];

  return (
    <div ref={root} className="relative mx-auto w-full max-w-md" aria-hidden>
      <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lift">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-64 w-full object-cover sm:h-72"
          loading="eager"
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-navy-950/90 via-navy-950/45 to-azure-600/20" />
      </div>

      <div className="pointer-events-none absolute inset-0 p-6">
        <div className="flex items-center justify-between text-xs font-medium text-white/80">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-signal-400 animate-pulse-ring" />
            Live RCM pipeline
          </span>
          <span>Today</span>
        </div>

        <div className="relative mt-4 h-64">
          {chips.map((c) => (
            <div
              key={c.label}
              data-chip
              className={`absolute ${c.pos} rounded-xl border px-4 py-3 backdrop-blur-sm ${c.cls}`}
            >
              <div className="text-sm font-semibold">{c.label}</div>
              <div className="mt-0.5 text-[0.7rem] uppercase tracking-wider opacity-80">
                {c.status}
              </div>
            </div>
          ))}

          <div
            data-settle
            className="absolute bottom-0 right-0 w-48 rounded-2xl border border-signal-500/40 bg-white/95 p-4 text-navy-900 shadow-lift sm:right-2"
          >
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-signal-500">
              Settlement
            </div>
            <div className="mt-1 text-2xl font-bold">₹ 48.6 L</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist-200">
              <div data-settle-bar className="h-full rounded-full bg-signal-500" />
            </div>
            <div className="mt-1.5 text-[0.7rem] text-ink-500">86% recovered this cycle</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { opacity: 0, y: 14, duration: 0.5 })
        .from(
          "[data-hero-word]",
          { opacity: 0, y: 30, rotate: 2, duration: 0.55, stagger: 0.07 },
          "-=0.15",
        )
        .from("[data-hero-sub]", { opacity: 0, y: 18, duration: 0.6 }, "-=0.2")
        .from("[data-hero-cta]", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
        .from(
          "[data-hero-visual]",
          { opacity: 0, y: 34, scale: 0.97, duration: 0.7 },
          0.5,
        );
      // Fail-safe: if the ticker is throttled (hidden webview), snap to end.
      window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 2600);
    }, el);
    return () => ctx.revert();
  }, []);

  const words = HERO.headline.split(" ");

  return (
    <section ref={root} id="home" className="relative overflow-hidden bg-navy-950">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-gradient-drift absolute inset-0 bg-[radial-gradient(1200px_600px_at_15%_-10%,rgb(8_88_184/0.35),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgb(95_191_63/0.12),transparent_55%),radial-gradient(700px_700px_at_60%_110%,rgb(8_168_248/0.18),transparent_60%)] bg-[length:180%_180%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgb(5_15_34/0.6))]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-40">
        <div>
          <span
            data-hero-badge
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-azure-300"
          >
            Healthcare Revenue Cycle Management
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            {words.map((w, i) => (
              <span
                key={i}
                data-hero-word
                className={`inline-block ${
                  w === "Revenue" ? "text-azure-400" : w === "HRCM" ? "text-signal-400" : ""
                }`}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          <p data-hero-sub className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/85">
            {HERO.subheadline}
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
            <CTAButton href={HERO.primaryCta.href} variant="primary">
              {HERO.primaryCta.label}
            </CTAButton>
            <CTAButton href={HERO.secondaryCta.href} variant="ghost-light">
              {HERO.secondaryCta.label}
            </CTAButton>
          </div>
        </div>

        <div data-hero-visual>
          <ClaimFlowVisual />
        </div>
      </div>

      <svg
        aria-hidden
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-10 w-full text-mist-50 sm:h-14"
      >
        <path d="M0 64h1440V24c-240 32-480 40-720 24S240 8 0 24v40z" fill="currentColor" />
      </svg>
    </section>
  );
}
