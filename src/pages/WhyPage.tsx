import { IMPACT, PAGE_HEROES } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SectionHeading } from "../components/ui";
import { WhyGrid } from "../components/WhyGrid";
import { ImpactCards } from "../components/ImpactCards";

export function WhyPage() {
  return (
    <main>
      <PageHero
        data={PAGE_HEROES.why}
        eyebrow="Why choose us"
        crumbs="Compliance, visibility and sustainable growth"
      />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Why Choose Us" }]} />
      </div>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[102rem] px-8 sm:px-12">
          <WhyGrid />
        </div>
      </section>

      {/* Business impact — archived figures preserved exactly */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 pattern-dots opacity-50" />
        <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
          <SectionHeading align="left" title={IMPACT.heading} intro={IMPACT.intro} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {IMPACT.metrics.map((m) => (
              <div
                key={m.title}
                className="glass h-full rounded-[var(--r-card)] p-6 transition-shadow duration-500 hover:shadow-[var(--glass-shadow-lift)]"
              >
                <h3 className="text-[0.88rem] font-medium text-ink-600">{m.title}</h3>
                <p className="tabular mt-4 text-[2.3rem] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                  {m.result.split(" ")[0]}
                  <span className="ml-1 text-[0.95rem] font-semibold text-azure-600">
                    {m.result.split(" ").slice(1).join(" ")}
                  </span>
                </p>
                <p className="tabular mt-3 text-[0.82rem] text-ink-500">
                  {m.beforeLabel} → {m.afterLabel}
                </p>
              </div>
            ))}
          </div>
          <ImpactCards className="mt-8" />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
