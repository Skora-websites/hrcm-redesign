import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../../lib/gsap";
import { useReveal } from "../../hooks/useReveal";
import { ABOUT } from "../../data/content";
import { CTAButton } from "../ui";

function AboutCollage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-collage-1]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      gsap.from("[data-collage-2]", {
        opacity: 0,
        y: 60,
        delay: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      // Subtle scroll parallax (brief §12: image/visual parallax)
      gsap.to("[data-collage-1]", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to("[data-collage-2]", {
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
      <div
        data-collage-1
        className="absolute left-0 top-0 h-3/5 w-3/5 overflow-hidden rounded-3xl border-4 border-white shadow-lift"
      >
        <img
          src="/images/about-1.png"
          alt="HRCM financial operations — billing and analysis work"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div
        data-collage-2
        className="absolute bottom-0 right-0 h-3/5 w-3/5 overflow-hidden rounded-3xl border-4 border-white shadow-lift"
      >
        <img
          src="/images/about-2.png"
          alt="HRCM analyst monitoring claims dashboards"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function About() {
  const cardsRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="bg-mist-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-azure-600">
              <span className="h-px w-6 bg-current" aria-hidden />
              {ABOUT.label}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              {ABOUT.heading}
            </h2>
            {ABOUT.body.map((p, i) => (
              <p key={i} className="mb-5 mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
                {p}
              </p>
            ))}
            <CTAButton href={ABOUT.cta.href} variant="outline" className="mt-2">
              {ABOUT.cta.label}
            </CTAButton>
          </div>

          <AboutCollage />
        </div>

        <div ref={cardsRef} className="stagger-grid mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.cards.map((c, i) => (
            <div key={c.title} className="border-t-2 border-azure-500/80 pt-5">
              <span className="text-xs font-bold text-azure-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
