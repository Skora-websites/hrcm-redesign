import { ABOUT, IMPACT, PAGE_HEROES, PROCESS } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal, SectionHeading } from "../components/ui";

export function AboutPage() {
  return (
    <main>
      <PageHero data={PAGE_HEROES.about} />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            {ABOUT.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-base leading-relaxed text-ink-600 sm:text-lg">{p}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {ABOUT.cards.map((c, i) => (
                  <div key={c.title} className="border-t-2 border-azure-500/80 pt-5">
                    <span className="text-xs font-bold text-azure-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-navy-900">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Our process, restated from the homepage's archived process section */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-600">
                <span className="h-px w-6 bg-current" aria-hidden />
                {PROCESS.label}
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                {PROCESS.heading}
              </h2>
            </Reveal>
            <ol className="mt-7 border-t border-navy-900/10">
              {PROCESS.steps.map((s, i) => (
                <Reveal key={s.num} delay={0.1 + i * 0.07}>
                  <li className="flex gap-5 border-b border-navy-900/10 py-5">
                    <span className="text-sm font-bold text-azure-500">{s.num}</span>
                    <div>
                      <h3 className="font-semibold text-navy-900">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Business impact summary — figures preserved exactly from the homepage */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading label={IMPACT.label} title={IMPACT.heading} intro={IMPACT.intro} />
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
