import { useReveal } from "../../hooks/useReveal";
import { useCountUpPair } from "../../hooks/useCountUp";
import { IMPACT } from "../../data/content";
import { Icon } from "../Icon";
import { SectionHeading } from "../ui";

type Metric = (typeof IMPACT.metrics)[number];

function MetricCard({ m }: { m: Metric }) {
  const decimals = m.before % 1 !== 0 || m.after % 1 !== 0 ? 1 : 0;
  const [pairRef, beforeVal, afterVal] = useCountUpPair(m.before, m.after, {
    decimals,
  });
  const scale = m.before || 1;

  return (
    <div className="rounded-3xl border border-mist-200 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-navy-900">{m.title}</h3>
        <span className="rounded-full bg-mist-100 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ink-500">
          {m.unit}
        </span>
      </div>

      <div ref={pairRef} className="mt-6 space-y-4">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink-500">Before HRCM</span>
            <span className="text-xl font-bold text-ink-900">{beforeVal}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-mist-200">
            <div
              className="h-full rounded-full bg-ink-600/45 transition-[width] duration-1000 ease-out"
              style={{ width: `${(m.before / scale) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-azure-600">After HRCM</span>
            <span className="text-xl font-bold text-azure-600">
              {afterVal}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-azure-50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-azure-500 to-signal-500 transition-[width] duration-1000 ease-out"
              style={{ width: `${Math.max((m.after / scale) * 100, 6)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-mist-100 pt-4">
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
    <section id="impact" className="bg-mist-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label={IMPACT.label}
          title={IMPACT.heading}
          intro={IMPACT.intro}
        />

        <div ref={metricsRef} className="stagger-grid mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {IMPACT.metrics.map((m) => (
            <MetricCard key={m.title} m={m} />
          ))}
        </div>

        <div ref={cardsRef} className="stagger-grid mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
