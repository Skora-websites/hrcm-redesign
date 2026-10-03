import { IMPACT, WHY } from "../data/content";
import { Icon } from "../components/Icon";
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 0.07}
                className={i === 0 ? "lg:col-span-2 lg:col-start-1" : ""}
              >
                <div className="group flex h-full flex-col rounded-3xl border border-mist-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:shadow-lift">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex rounded-xl bg-navy-900 p-3 text-azure-400 transition-colors duration-300 group-hover:bg-azure-500 group-hover:text-white">
                      <Icon name={item.icon} className="h-5.5 w-5.5" />
                    </span>
                    <h2 className="text-lg font-semibold text-navy-900">{item.title}</h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{item.text}</p>
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
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {IMPACT.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-mist-200 bg-mist-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-azure-300 hover:bg-white hover:shadow-lift">
                  <div className="inline-flex rounded-xl bg-azure-50 p-3 text-azure-600">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-[0.95rem] font-semibold text-navy-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
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

const WHY_PAGE_HERO = {
  eyebrow: WHY.label,
  title: WHY.heading,
  intro: WHY.intro,
};
