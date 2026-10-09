import { useReveal } from "../../hooks/useReveal";
import { IMPACT } from "../../data/content";
import { Icon } from "../Icon";
import { SectionHeading } from "../ui";
import { BarChart, DonutChart } from "../Charts";

type Metric = (typeof IMPACT.metrics)[number];

/** "50% Faster" → { value: 50, suffix: "Faster" }; "91% Reduction" → { 91, "Reduction" } */
function parseResult(result: string): { value: number; suffix: string } {
  const m = result.match(/^([\d.]+)%\s*(\w+)/);
  return { value: m ? Number(m[1]) : 0, suffix: m ? m[2] : "" };
}

/* ------------------------------------------------------------------ */
/* Layer 1 — metric cards with animated before/after bar charts        */
/* ------------------------------------------------------------------ */

function MetricCard({ m }: { m: Metric }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-mist-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-navy-900">{m.title}</h3>
        <span className="rounded-full bg-mist-100 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-500">
          {m.unit}
        </span>
      </div>

      {/* Animated before/after bar chart */}
      <div className="mt-5">
        <BarChart metric={m} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-center">
          <div className="text-[0.68rem] font-semibold uppercase tracking-wide text-ink-500">
            Before
          </div>
          <div className="text-lg font-bold text-rose-600">{m.beforeLabel}</div>
        </div>
        <span aria-hidden className="text-ink-400">
          →
        </span>
        <div className="text-center">
          <div className="text-[0.68rem] font-semibold uppercase tracking-wide text-ink-500">
            After
          </div>
          <div className="text-lg font-bold text-signal-600">{m.afterLabel}</div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-mist-100 pt-4">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-signal-500/12 text-signal-500">
          <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
        </span>
        <span className="text-lg font-bold text-navy-900">{m.result}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 2 — donut cards showing each improvement share                */
/* ------------------------------------------------------------------ */

function ReductionDonutCard({ m }: { m: Metric }) {
  const { value, suffix } = parseResult(m.result);
  return (
    <div className="flex h-full flex-col rounded-3xl border border-mist-200 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift">
      <DonutChart
        percent={value}
        label={suffix}
        color={suffix === "Faster" ? "#0ea5e9" : "#10b981"}
      />
      <h3 className="mt-4 text-[0.95rem] font-semibold text-navy-900">{m.title}</h3>
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
}

/* ------------------------------------------------------------------ */
/* Section — three card layers                                         */
/* ------------------------------------------------------------------ */

export function Impact() {
  const layer1Ref = useReveal<HTMLDivElement>();
  const layer2Ref = useReveal<HTMLDivElement>();
  const layer3Ref = useReveal<HTMLDivElement>();

  return (
    <section id="impact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={IMPACT.label} title={IMPACT.heading} intro={IMPACT.intro} />

        {/* Layer 1 — animated before/after metric cards */}
        <div
          ref={layer1Ref}
          className="stagger-grid mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {IMPACT.metrics.map((m) => (
            <MetricCard key={m.title} m={m} />
          ))}
        </div>

        {/* Layer 2 — donut improvement cards */}
        <div
          ref={layer2Ref}
          className="stagger-grid mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {IMPACT.metrics.map((m) => (
            <ReductionDonutCard key={m.title} m={m} />
          ))}
        </div>

        {/* Layer 3 — benefit cards */}
        <div
          ref={layer3Ref}
          className="stagger-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {IMPACT.cards.map((c) => (
            <div
              key={c.title}
              className="group relative h-full overflow-hidden rounded-2xl border border-mist-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-azure-500 to-signal-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="inline-flex rounded-xl bg-azure-50 p-3 text-azure-600 transition-colors duration-300 group-hover:bg-azure-500 group-hover:text-white">
                <Icon name={c.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-[0.95rem] font-semibold text-navy-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
