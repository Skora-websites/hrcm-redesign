import { IMPACT, WHY } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal } from "../components/ui";

export function WhyPage() {
  return (
    <main>
      <PageHero data={WHY_PAGE_HERO} />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Why Choose Us" }]} />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Editorial numbered rows — hairline-separated, no cards */}
          <div className="border-t border-navy-900/10">
            {WHY.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="grid grid-cols-[2.75rem_1fr] items-start gap-x-5 border-b border-navy-900/10 py-8 md:grid-cols-[5rem_19rem_1fr] md:gap-x-10">
                  <span className="text-xl font-bold text-azure-500/70 md:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg font-semibold text-navy-900 md:text-xl">
                    {item.title}
                  </h2>
                  <p className="col-span-2 mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 md:col-span-1 md:mt-0">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business impact — archived figures preserved exactly */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-600">
              <span className="h-px w-6 bg-current" aria-hidden />
              {IMPACT.label}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {IMPACT.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">
              {IMPACT.intro}
            </p>
          </Reveal>
          <div className="stagger-grid mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {IMPACT.cards.map((c) => (
              <div key={c.title} className="border-t border-mist-200 pt-5">
                <h3 className="text-[0.95rem] font-semibold text-navy-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}

const WHY_PAGE_HERO = {
  eyebrow: WHY.label,
  title: WHY.heading,
  intro: WHY.intro,
};
