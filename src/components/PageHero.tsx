import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../lib/gsap";
import type { PageHero as PageHeroData } from "../data/content";

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
    <section ref={root} className="relative overflow-hidden bg-navy-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
      <div
        aria-hidden
        className="animate-gradient-drift pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_-10%,rgb(8_88_184/0.4),transparent_60%),radial-gradient(700px_400px_at_88%_0%,rgb(8_168_248/0.22),transparent_55%)] bg-[length:180%_180%]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <span
          data-ph-eyebrow
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-300"
        >
          <span className="h-px w-6 bg-current" aria-hidden />
          {data.eyebrow}
        </span>
        <h1
          data-ph-title
          className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
        >
          {data.title}
        </h1>
        <p
          data-ph-intro
          className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/85"
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
