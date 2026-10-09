import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../lib/gsap";
import type { PageHero as PageHeroData } from "../data/content";
import { TechCanvas } from "./TechCanvas";

export function PageHero({ data }: { data: PageHeroData }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ph-eyebrow]", { opacity: 0, y: 12, duration: 0.45 })
        .from("[data-ph-title]", { opacity: 0, y: 26, duration: 0.55 }, "-=0.15")
        .from("[data-ph-intro]", { opacity: 0, y: 18, duration: 0.55 }, "-=0.25");
      // Fail-safe for throttled webviews
      window.setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 2200);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white pb-16 pt-32 sm:pb-20 sm:pt-40"
    >
      {/* Tech animation texture backdrop (consistent with hero) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <TechCanvas density={0.00007} />
        <div className="absolute inset-0 bg-[radial-gradient(900px_460px_at_18%_-10%,rgb(14_165_233/0.12),transparent_60%),radial-gradient(700px_400px_at_88%_0%,rgb(16_185_129/0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span
          data-ph-eyebrow
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-600"
        >
          <span className="h-px w-6 bg-current" aria-hidden />
          {data.eyebrow}
        </span>
        <h1
          data-ph-title
          className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl"
        >
          {data.title}
        </h1>
        <p
          data-ph-intro
          className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600"
        >
          {data.intro}
        </p>
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
