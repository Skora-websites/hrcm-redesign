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
      {/* Premium layered backdrop (matches hero): glows → dot grid → tech canvas → veil */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-azure-300/25 blur-3xl" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-signal-300/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(2_132_199/0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(1000px_500px_at_50%_0%,black,transparent_75%)]"
        />
        <TechCanvas density={0.0001} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.8)_0%,rgb(255_255_255/0.5)_42%,transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
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

    </section>
  );
}
