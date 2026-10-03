import { PROCESS, SERVICES } from "../data/content";
import { Icon } from "../components/Icon";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../components/Link";
import { Reveal } from "../components/ui";

export function ServicesPage() {
  return (
    <main>
      <PageHero
        data={{
          eyebrow: "SERVICES",
          title: "Scope Of Services",
          intro:
            "End-to-end revenue cycle support — from claim audit to final reconciliation.",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Our Services" }]} />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-3xl border border-mist-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-azure-300 hover:shadow-lift"
                >
                  {s.needsValidation && (
                    <span className="absolute right-5 top-5 rounded-full bg-mist-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-500">
                      Draft
                    </span>
                  )}
                  <div className="inline-flex w-fit rounded-2xl bg-navy-900 p-3.5 text-azure-400 transition-colors duration-300 group-hover:bg-azure-500 group-hover:text-white">
                    <Icon name={s.icon} className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold leading-snug text-navy-900">
                    {s.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">{s.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-azure-600 transition-colors group-hover:text-azure-500">
                    Read more
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our process — archived copy, restated on the services overview */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-600">
              <span className="h-px w-6 bg-current" aria-hidden />
              {PROCESS.label}
            </span>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {PROCESS.heading}
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08} className="h-full">
                <li className="h-full rounded-2xl border border-mist-200 bg-mist-50 p-6">
                  <span className="text-3xl font-bold text-azure-500">{s.num}</span>
                  <h3 className="mt-3 font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
