import { motion } from "framer-motion";
import type { PageHero as PageHeroData } from "../data/content";
import { gsap, withFailsafe } from "../lib/gsap";
import { useEffect, useRef } from "react";
import { Kicker } from "./ui";
import { StudioBackdrop } from "./backdrops/StudioBackdrop";

/** Shared subpage hero — layered light backdrop, claim-flow texture. */
export function PageHero({
  data,
  crumbs,
  eyebrow,
}: {
  data: PageHeroData;
  crumbs?: string;
  eyebrow?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-ph-kicker]", { opacity: 0, x: -12, duration: 0.5 })
        .from("[data-ph-title]", { opacity: 0, y: 28, duration: 0.8 }, "-=0.25")
        .from("[data-ph-intro]", { opacity: 0, y: 16, duration: 0.65 }, "-=0.5")
        .from("[data-ph-crumbs]", { opacity: 0, y: 12, duration: 0.5 }, "-=0.4");
      withFailsafe(tl, 2400);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pb-16 pt-28 sm:pb-16 sm:pt-32">
      <StudioBackdrop soft />

      {/* 3D gradient ground — the same volumetric washes, floor
          plane and key light as the main hero, so every subpage
          carries the hero's texture. */}
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
            "radial-gradient(85% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, rgba(244,250,238,0.4) 34%, rgba(244,250,238,0) 68%)",
        }}
      />

      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {eyebrow ? (
            <Kicker tone="violet" className="mb-6">
              {eyebrow}
            </Kicker>
          ) : null}

          <h1
            data-ph-title
            className="text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink-900 sm:text-6xl"
          >
            {data.title}
          </h1>
          <p
            data-ph-intro
            className="mt-4 max-w-2xl text-lg leading-[1.7] text-ink-600 sm:text-xl"
          >
            {data.intro}
          </p>

          {crumbs && (
            <p
              data-ph-crumbs
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[0.8rem] font-medium text-ink-600 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-azure-500" />
              {crumbs}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
