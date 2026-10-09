import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../../lib/gsap";
import { HERO } from "../../data/content";
import { CTAButton } from "../ui";
import { TechCanvas } from "../TechCanvas";

const TRUST_CHIPS = [
  "Claims Audit",
  "AR Management",
  "Medical Billing",
  "Reconciliation",
  "Denial Reduction",
];

function TelemetryCard() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.9 });
      tl.from("[data-chip]", {
        opacity: 0,
        x: 18,
        duration: 0.5,
        stagger: 0.18,
        ease: "power2.out",
      })
        .from(
          "[data-settle]",
          { opacity: 0, y: 24, duration: 0.55, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          "[data-settle-bar]",
          { width: "0%" },
          { width: "86%", duration: 0.9, ease: "power2.out" },
          "-=0.1",
        )
        .from(
          "[data-row]",
          { opacity: 0, y: 10, duration: 0.4, stagger: 0.12, ease: "power2.out" },
          "-=0.5",
        );
      window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 3600);
    }, el);
    return () => ctx.revert();
  }, []);

  const chips = [
    { label: "Claim 1042", status: "Verified", cls: "text-signal-600 border-signal-500/40 bg-signal-50" },
    { label: "Claim 1043", status: "Submitting", cls: "text-azure-700 border-azure-500/40 bg-azure-50" },
    { label: "Claim 1044", status: "Audited", cls: "text-signal-600 border-signal-500/40 bg-signal-50" },
  ];

  const rows = [
    { k: "Claims processed", v: "1,284" },
    { k: "Denial rate", v: "2.3%" },
    { k: "Avg. turnaround", v: "60 days" },
  ];

  return (
    <div ref={root} className="relative mx-auto w-full max-w-md" aria-hidden>
      {/* Live pipeline chips */}
      <div className="mb-4 space-y-2.5">
        {chips.map((c, i) => (
          <div
            key={c.label}
            data-chip
            className={`w-fit rounded-xl border px-4 py-2.5 backdrop-blur-sm shadow-card ${
              i === 1 ? "ml-auto" : i === 2 ? "ml-6" : ""
            } ${c.cls}`}
          >
            <div className="text-sm font-semibold text-navy-900">{c.label}</div>
            <div className="text-[0.7rem] font-semibold uppercase tracking-wider opacity-80">
              {c.status}
            </div>
          </div>
        ))}
      </div>

      {/* Settlement card */}
      <div
        data-settle
        className="rounded-3xl border border-mist-200 bg-white/90 p-6 shadow-lift backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-signal-600">
            Settlement
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-500 animate-pulse-ring" />
            Live
          </span>
        </div>
        <div className="mt-1.5 text-3xl font-extrabold tracking-tight text-navy-900">₹ 48.6 L</div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist-200">
          <div data-settle-bar className="h-full rounded-full bg-gradient-to-r from-signal-500 to-azure-500" />
        </div>
        <div className="mt-1.5 text-[0.72rem] text-ink-500">86% recovered this cycle</div>

        <dl className="mt-5 space-y-2.5 border-t border-mist-200 pt-4">
          {rows.map((r) => (
            <div key={r.k} data-row className="flex items-center justify-between">
              <dt className="text-[0.82rem] text-ink-500">{r.k}</dt>
              <dd className="text-[0.85rem] font-bold text-navy-900">{r.v}</dd>
            </div>
          ))}
        </dl>
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
          { opacity: 0, y: 30, rotate: 2, duration: 0.55, stagger: 0.06 },
          "-=0.15",
        )
        .from("[data-hero-sub]", { opacity: 0, y: 18, duration: 0.6 }, "-=0.2")
        .from("[data-hero-cta]", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
        .from(
          "[data-hero-chip]",
          { opacity: 0, y: 12, duration: 0.4, stagger: 0.07 },
          "-=0.3",
        )
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
    <section ref={root} id="home" className="relative overflow-hidden bg-gradient-to-b from-azure-50/70 via-white to-white">
      {/* Premium layered backdrop: glow blobs → dot grid → tech canvas → soft veil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Depth glow blobs */}
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-azure-300/25 blur-3xl" />
        <div className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-signal-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-azure-200/30 blur-3xl" />
        {/* Subtle data dot grid, faded at the edges */}
        <div
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(2_132_199/0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(1200px_600px_at_50%_20%,black,transparent_75%)]"
        />
        {/* Animated tech texture network */}
        <TechCanvas />
        {/* Soft veil only behind the copy side, so the texture stays visible */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.78)_0%,rgb(255_255_255/0.45)_38%,transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-32 lg:pt-44">
        <div>
          <span
            data-hero-badge
            className="inline-flex items-center gap-2 rounded-full border border-azure-200 bg-azure-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-azure-700 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-signal-500" />
            Healthcare Revenue Cycle Management
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.6rem]">
            {words.map((w, i) => (
              <span
                key={i}
                data-hero-word
                className={`inline-block ${
                  w === "Revenue"
                    ? "bg-gradient-to-r from-azure-600 to-azure-500 bg-clip-text text-transparent"
                    : w === "HRCM"
                      ? "text-signal-600"
                      : ""
                }`}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          <p data-hero-sub className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            {HERO.subheadline}
          </p>

          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-4">
            <CTAButton href={HERO.primaryCta.href} variant="primary">
              {HERO.primaryCta.label}
            </CTAButton>
            <CTAButton href={HERO.secondaryCta.href} variant="outline">
              {HERO.secondaryCta.label}
            </CTAButton>
          </div>

          {/* Trust chips */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {TRUST_CHIPS.map((c) => (
              <span
                key={c}
                data-hero-chip
                className="rounded-full border border-mist-200 bg-white/70 px-3.5 py-1.5 text-[0.8rem] font-medium text-ink-600 shadow-card backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-visual>
          <TelemetryCard />
        </div>
      </div>

    </section>
  );
}
