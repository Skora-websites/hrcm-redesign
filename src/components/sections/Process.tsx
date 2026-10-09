import { useEffect, useRef } from "react";
import { shouldSkipAnimation } from "../../lib/gsap";
import { useReveal } from "../../hooks/useReveal";
import { PROCESS } from "../../data/content";
import { SectionHeading } from "../ui";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useReveal<HTMLOListElement>();

  // Line progress driven by a scroll listener (event-based, rAF-independent)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldSkipAnimation()) {
      section
        ?.querySelectorAll<HTMLElement>("[data-process-line-h],[data-process-line-v]")
        .forEach((el) => {
          el.style.transform = "none";
        });
      return;
    }

    const hLine = section.querySelector<HTMLElement>("[data-process-line-h]");
    const vLine = section.querySelector<HTMLElement>("[data-process-line-v]");

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top reaches 70% of viewport; 1 at 45%
      const raw = (vh * 0.7 - rect.top) / (vh * 0.25 + rect.height * 0.55);
      const p = Math.max(0, Math.min(1, raw));
      if (hLine) hLine.style.transform = `scaleX(${p})`;
      if (vLine) vLine.style.transform = `scaleY(${p})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const steps = PROCESS.steps;

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-mist-50 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_80%_0%,rgb(14_165_233/0.10),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={PROCESS.label} title={PROCESS.heading} />

        {/* Desktop: horizontal timeline */}
        <div className="mt-16 hidden lg:block">
          <div className="relative mb-10 h-0.5 rounded bg-mist-200">
            <div
              data-process-line-h
              className="absolute inset-0 origin-left rounded bg-gradient-to-r from-azure-500 to-signal-500"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <ol ref={itemsRef} className="stagger-grid grid grid-cols-4 gap-8">
            {steps.map((s) => (
              <li data-process-item key={s.num} className="relative">
                <div className="absolute -top-[3.28rem] left-0 flex h-4 w-4 items-center justify-center">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-azure-500 bg-white" />
                </div>
                <div className="text-5xl font-bold text-azure-500/15">{s.num}</div>
                <h3 className="mt-3 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile/tablet: vertical timeline */}
        <div className="mt-12 lg:hidden">
          <div className="relative">
            <div className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded bg-mist-200">
              <div
                data-process-line-v
                className="absolute inset-0 origin-top rounded bg-gradient-to-b from-azure-500 to-signal-500"
                style={{ transform: "scaleY(0)" }}
              />
            </div>
            <ol ref={itemsRef} className="stagger-grid space-y-9 pl-9">
              {steps.map((s) => (
                <li data-process-item key={s.num} className="relative">
                  <span className="absolute -left-9 top-1 h-4 w-4 rounded-full border-2 border-azure-500 bg-white" />
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-azure-600">{s.num}</span>
                    <h3 className="text-lg font-semibold text-navy-900">{s.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
