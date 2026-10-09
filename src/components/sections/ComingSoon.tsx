import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../../lib/gsap";
import { COMING_SOON } from "../../data/content";
import { CTAButton } from "../ui";

export function ComingSoon() {
  const root = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || shouldSkipAnimation()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-cs-badge]", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
      gsap.from("[data-cs-heading]", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        scrollTrigger: { trigger: el, start: "top 76%", once: true },
      });
      gsap.from("[data-cs-card]", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-cs-grid]", start: "top 84%", once: true },
      });
      gsap.from("[data-cs-support], [data-cs-cta]", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: { trigger: "[data-cs-support]", start: "top 88%", once: true },
      });
      // Gentle float on the visual
      gsap.to("[data-cs-visual]", {
        y: -12,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      // Fail-safe for throttled webviews: complete all entrance tweens
      window.setTimeout(() => {
        gsap.globalTimeline
          .getChildren(false, false, true)
          .forEach((t) => {
            const st = (t as unknown as { scrollTrigger?: { start: number; end: number } })
              .scrollTrigger;
            if (!st && t.progress() < 1 && t.repeat() === 0) t.progress(1);
          });
      }, 2600);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="ai-platform"
      className="relative overflow-hidden bg-navy-900 py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="animate-gradient-drift pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_20%,rgb(14_165_233/0.22),transparent_60%),radial-gradient(700px_400px_at_85%_75%,rgb(16_185_129/0.12),transparent_55%)] bg-[length:180%_180%]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span
              data-cs-badge
              className="inline-flex items-center gap-2 rounded-full border border-signal-400/40 bg-signal-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-signal-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-400" />
              </span>
              {COMING_SOON.label}
            </span>

            <h2
              data-cs-heading
              className="mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.9rem]"
            >
              Something Big Is About to Change{" "}
              <span className="bg-gradient-to-r from-azure-400 to-signal-400 bg-clip-text text-transparent">
                Healthcare Forever.
              </span>
            </h2>

            <div data-cs-grid className="mt-10 grid gap-4 sm:grid-cols-3">
              {COMING_SOON.questions.map((q, i) => (
                <div
                  data-cs-card
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors duration-300 hover:border-azure-400/40"
                >
                  <span className="text-2xl" aria-hidden>
                    {["🛡️", "⚡", "🧠"][i]}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100/85">{q}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={visualRef} className="relative mx-auto w-full max-w-xs">
            <div
              data-cs-visual
              className="overflow-hidden rounded-3xl border border-white/10 shadow-lift"
            >
              <img
                src="/images/ai-visual.png"
                alt="Hourglass with a medical shield — HRCM's upcoming AI claims platform"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/92 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-navy-900 backdrop-blur">
              AI Claims Platform
            </span>
          </div>
        </div>

        <p
          data-cs-support
          className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-navy-100/75 sm:text-lg"
        >
          {COMING_SOON.support}
        </p>

        <div data-cs-cta className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href={COMING_SOON.cta.href} variant="primary">
            {COMING_SOON.cta.label}
          </CTAButton>
          <span className="text-xs uppercase tracking-[0.2em] text-white/45">
            AI Claims Platform · In development
          </span>
        </div>
      </div>
    </section>
  );
}
