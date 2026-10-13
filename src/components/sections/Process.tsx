import { useEffect, useRef } from "react";
import { PROCESS } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { Card, Kicker, Reveal, StaggerContainer, StaggerItem, useGsapReveal } from "../ui";
import { CircleCheck } from "lucide-react";
import { gsap } from "../../lib/gsap";

/**
 * How it works — a timeline, not a card grid.
 *
 * Each step sits on a vertical rail. As the section scrolls, the
 * rail fills behind each card in turn and the card's badge and
 * border take the brand colour, so the reader watches the
 * engagement progress down the page.
 */

/** Per-step accent — the pipeline's own colour story. */
const STEP_TONE = [
  { line: "#0071e3" },
  { line: "#17c1bb" },
  { line: "#76c40b" },
  { line: "#8b5cf6" },
] as const;

export function Process() {
  const revealRef = useGsapReveal<HTMLDivElement>();
  const railFillRef = useRef<HTMLDivElement>(null);
  const hRailFillRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);

  /* Timeline fill — the rail colours as each card enters. */
  useEffect(() => {
    const fill = railFillRef.current;
    const hFill = hRailFillRef.current;
    const steps = stepsRef.current.filter(Boolean) as HTMLLIElement[];
    // Trigger on the list itself, never on a rail: the vertical rail is
    // lg:hidden, so a display:none trigger can never compute a position.
    const trigger = steps[0]?.closest("ol") as HTMLOListElement | null;
    if (!trigger || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // The rail starts empty and fills to each step in turn.
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });

      steps.forEach((step, i) => {
        const tone = STEP_TONE[i % STEP_TONE.length];
        const badge = step.querySelector("[data-step-badge]") as HTMLElement | null;
        const title = step.querySelector("[data-step-title]") as HTMLElement | null;
        const pct = ((i + 1) / steps.length) * 100;

        // the line climbs to this step — both orientations together
        if (fill) tl.to(fill, { height: `${pct}%`, duration: 0.5 }, i * 0.5);
        if (hFill) tl.to(hFill, { scaleX: pct / 100, duration: 0.5 }, i * 0.5);

        // the badge pulses and the step takes its colour in one tween.
        // `active` lands on the .group <li> so the group-[.active]: variants
        // inside the card can see it.
        const target = badge ?? step;
        tl.to(
          target,
          {
            scale: badge ? 1.08 : 1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            onStart: () => {
              step.classList.add("active");
              if (title) title.style.color = tone.line;
            },
            onReverseComplete: () => {
              step.classList.remove("active");
              if (title) title.style.color = "";
            },
          },
          i * 0.5 + 0.1,
        );
      });

      // No failsafe here: nothing in a scrub timeline is ever left
      // invisible — the cards render in their default state until the
      // rail reaches them, which is exactly the intended reveal.
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative overflow-hidden py-16 sm:py-20" ref={revealRef}>
      <SectionSurface variant="sprout" />

      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div data-gsap-reveal className="max-w-2xl">
          <Kicker tone="sprout">How it works</Kicker>
          <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
              {PROCESS.heading}
            </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">
              A structured engagement — from the first audit to continuous improvement, with your
              team seeing progress at every step.
            </p>
        </div>

        <StaggerContainer className="relative mt-12" staggerDelay={0.12}>
          {/* Vertical rail — mobile. Fills with colour as you scroll. */}
          <div
            aria-hidden
            className="absolute bottom-10 left-[2.4rem] top-10 w-[3px] rounded-full bg-ink-900/8 lg:hidden"
          >
            <div
              ref={railFillRef}
              className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-azure-500 via-aqua-500 to-orchid-500"
              style={{ height: "0%" }}
            />
          </div>

          {/* Horizontal rail — desktop. Same timeline drives it. */}
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[2.55rem] hidden h-[2px] rounded-full bg-ink-900/8 lg:block"
          >
            <div
              ref={hRailFillRef}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-azure-500 via-aqua-500 to-orchid-500"
              style={{ width: "100%", transform: "scaleX(0)", transformOrigin: "left center" }}
            />
          </div>

          <ol className="grid gap-4 lg:grid-cols-4 lg:gap-5">
            {PROCESS.steps.map((s, i) => {
              const tone = STEP_TONE[i % STEP_TONE.length];
              return (
                <StaggerItem key={s.num} className="h-full">
                  <li
                    ref={(el) => {
                      stepsRef.current[i] = el;
                    }}
                    className="group relative h-full"
                  >
                    <Card
                      variant="clay"
                      data-step-card
                      className="flex h-full flex-col p-5 transition-shadow duration-500 group-[.active]:shadow-[0_18px_44px_-20px_rgba(16,24,40,0.28)]"
                      hover
                    >
                      {/* numbered clay badge — takes the step's colour on scroll */}
                      <span
                        data-step-badge
                        className="num-badge tabular relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-xl text-[0.95rem] font-bold text-white shadow-[0_8px_20px_-8px_rgba(16,24,40,0.35)] transition-transform duration-300"
                        style={{
                          background: `linear-gradient(145deg, ${tone.line}, ${tone.line}dd)`,
                        }}
                      >
                        {s.num}
                        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/50" />
                      </span>
                      <h3
                        data-step-title
                        className="mt-3.5 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink-900 transition-colors duration-500"
                      >
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-600">{s.text}</p>

                      {/* hover tint wash */}
                      <span className="pointer-events-none absolute inset-0 rounded-[var(--r-card)] bg-gradient-to-br from-azure-100/0 via-azure-100/0 to-aqua-100/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-azure-100/40 group-hover:to-aqua-100/30" />
                    </Card>
                  </li>
                </StaggerItem>
              );
            })}
          </ol>
        </StaggerContainer>

        {/* Assurance strip */}
        <Reveal delay={0.1} y={14}>
          <div className="glass mt-10 flex flex-col items-center justify-center gap-4 rounded-[var(--r-card)] px-6 py-6 text-center sm:flex-row sm:gap-8 sm:text-left">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal-100 text-signal-600">
              <CircleCheck className="h-5 w-5" aria-hidden />
            </span>
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink-700">
              Claims, AR follow-ups and reconciliation are managed with continuous monitoring — so
              improvements are measured against your own baseline, not assumptions.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
