import { PAGE_HEROES, PROCESS } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal, SectionHeading } from "../components/ui";
import { ServicesIndex } from "../components/ServicesIndex";
import { Check } from "lucide-react";

export function ServicesPage() {
  return (
    <main>
      <PageHero
        data={PAGE_HEROES.services}
        eyebrow="Our services"
        crumbs="From claim audit to final reconciliation"
      />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Our Services" }]} />
      </div>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[102rem] px-8 sm:px-12">
          <ServicesIndex heading="h2" />
        </div>
      </section>

      {/* Our process — archived copy, restated on the services overview */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 pattern-cross opacity-60" />
        <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
          <SectionHeading align="left" title={PROCESS.heading} />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08} y={18} className="h-full">
                <div className="clay-card group h-full p-6">
                  <span className="num-badge tabular inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[1.05rem] font-bold text-azure-700">
                    {s.num}
                  </span>
                  <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.015em] text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-signal-600">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                    Measured at every step
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
