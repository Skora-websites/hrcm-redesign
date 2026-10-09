import { PROCESS, SERVICES } from "../data/content";
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
          {/* Editorial index list — hairline-separated rows, no cards */}
          <div className="border-t border-navy-900/10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <Link
                  href={s.href}
                  className="group grid grid-cols-[3rem_1fr_auto] items-start gap-x-6 border-b border-navy-900/10 py-8 transition-colors duration-300 hover:bg-white/70 md:grid-cols-[4rem_22rem_1fr_3rem] md:items-center md:gap-x-8"
                >
                  <span className="pt-1 text-sm font-bold text-azure-500 md:pt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="flex items-center gap-3 text-lg font-semibold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-azure-600 md:text-xl">
                      {s.title}
                      {s.needsValidation && (
                        <span
                          className="rounded-full bg-mist-100 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink-500"
                          title="Copy pending client validation"
                        >
                          Draft
                        </span>
                      )}
                    </h2>
                    <p className="col-span-2 mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 md:col-span-1 md:col-start-3 md:row-start-1 md:mt-0">
                      {s.text.length > 190 ? s.text.slice(0, 187).trimEnd() + "…" : s.text}
                    </p>
                  </div>

                  <span
                    aria-hidden
                    className="col-start-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 text-azure-500 transition-all duration-300 group-hover:border-azure-500 group-hover:bg-azure-500 group-hover:text-white md:col-start-4"
                  >
                    →
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
          <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08} className="h-full">
                <li className="h-full border-t-2 border-azure-500/80 pt-5">
                  <span className="text-xs font-bold text-azure-500">{s.num}</span>
                  <h3 className="mt-2 font-semibold text-navy-900">{s.title}</h3>
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
