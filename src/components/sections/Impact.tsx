import { useReveal } from "../../hooks/useReveal";
import { IMPACT } from "../../data/content";
import { Icon } from "../Icon";
import { SectionHeading } from "../ui";
import { BarChart, HBarChart } from "../Charts";

type Metric = (typeof IMPACT.metrics)[number];

function MetricCard({ m }: { m: Metric }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-mist-200 bg-white p-6 shadow-card sm:p-7">
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

export function Impact() {
  const metricsRef = useReveal<HTMLDivElement>();
  const cardsRef = useReveal<HTMLDivElement>();

  return (
    <section id="impact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={IMPACT.label} title={IMPACT.heading} intro={IMPACT.intro} />

        {/* Headline visual: horizontal before/after comparison */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-mist-200 bg-mist-50 p-6 shadow-card sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-azure-600">
                Performance Snapshot
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-600">
                Structured workflows and continuous monitoring move every metric in the right
                direction — faster settlement, fewer denials, and healthier cash flow.
              </p>
              <div className="mt-6 space-y-6">
                {IMPACT.metrics.slice(0, 2).map((m) => (
                  <div key={m.title}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy-900">{m.title}</span>
                      <span className="rounded-full bg-signal-50 px-2.5 py-1 text-[0.7rem] font-bold text-signal-600">
                        {m.result}
                      </span>
                    </div>
                    <HBarChart metric={m} />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {IMPACT.metrics.map((m) => (
                <div
                  key={m.title}
                  className="self-start rounded-2xl border border-mist-200 bg-white p-4 text-center shadow-card"
                >
                  <div className="text-[0.7rem] font-semibold uppercase tracking-wide text-ink-500">
                    {m.title}
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-signal-600">{m.afterLabel}</div>
                  <div className="text-[0.68rem] text-ink-500">from {m.beforeLabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={metricsRef} className="stagger-grid mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {IMPACT.metrics.map((m) => (
            <MetricCard key={m.title} m={m} />
          ))}
        </div>

        <div
          ref={cardsRef}
          className="stagger-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {IMPACT.cards.map((c) => (
            <div
              key={c.title}
              className="group h-full rounded-2xl border border-mist-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift"
            >
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
