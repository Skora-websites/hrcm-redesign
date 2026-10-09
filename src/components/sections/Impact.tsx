import { useReveal } from "../../hooks/useReveal";
import { IMPACT } from "../../data/content";
import { Icon } from "../Icon";
import { SectionHeading } from "../ui";
import { BarChart, DonutChart } from "../Charts";

/** "50% Faster" → { value: 50, suffix: "Faster" }; "91% Reduction" → { 91, "Reduction" } */
function parseResult(result: string): { value: number; suffix: string } {
  const m = result.match(/^([\d.]+)%\s*(\w+)/);
  return { value: m ? Number(m[1]) : 0, suffix: m ? m[2] : "" };
}

export function Impact() {
  const layer1Ref = useReveal<HTMLDivElement>();
  const layer2Ref = useReveal<HTMLDivElement>();
  const layer3Ref = useReveal<HTMLDivElement>();

  return (
    <section id="impact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={IMPACT.label} title={IMPACT.heading} intro={IMPACT.intro} />

        {/* Layer 1 — open stat columns: bold top rule, unit, animated bars */}
        <div
          ref={layer1Ref}
          className="stagger-grid mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-4"
        >
          {IMPACT.metrics.map((m) => (
            <div key={m.title} className="border-t-2 border-navy-900 pt-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[0.95rem] font-semibold text-navy-900">{m.title}</h3>
                <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-500">
                  {m.unit}
                </span>
              </div>

              <div className="mt-5">
                <BarChart metric={m} />
              </div>

              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-lg font-bold text-rose-600">{m.beforeLabel}</span>
                <span aria-hidden className="text-ink-400">
                  →
                </span>
                <span className="text-lg font-bold text-signal-600">{m.afterLabel}</span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[0.95rem] font-bold text-navy-900">
                <Icon name="check" className="h-4 w-4 text-signal-500" strokeWidth={2.5} />
                {m.result}
              </p>
            </div>
          ))}
        </div>

        {/* Layer 2 — donut visuals in an open row, separated by hairlines */}
        <div
          ref={layer2Ref}
          className="stagger-grid mt-20 grid gap-12 border-t border-mist-200 pt-14 sm:grid-cols-2 xl:grid-cols-4"
        >
          {IMPACT.metrics.map((m) => {
            const { value, suffix } = parseResult(m.result);
            return (
              <div key={m.title} className="text-center">
                <DonutChart
                  percent={value}
                  label={suffix}
                  color={suffix === "Faster" ? "#0ea5e9" : "#10b981"}
                />
                <h3 className="mt-5 text-[0.95rem] font-semibold text-navy-900">{m.title}</h3>
                <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                  <span className="font-semibold text-rose-600">{m.beforeLabel}</span>
                  <span aria-hidden className="text-ink-400">
                    →
                  </span>
                  <span className="font-semibold text-signal-600">{m.afterLabel}</span>
                  <span className="text-ink-500">{m.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Layer 3 — benefits as an open grid, each with a hairline top rule */}
        <div
          ref={layer3Ref}
          className="stagger-grid mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {IMPACT.cards.map((c) => (
            <div key={c.title} className="border-t border-mist-200 pt-5">
              <span className="inline-flex text-azure-500">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-[0.95rem] font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
