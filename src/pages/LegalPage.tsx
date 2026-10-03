import { LEGAL_PAGES } from "../data/content";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHero } from "../components/PageHero";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/ui";

export function LegalPage({ which }: { which: "terms" | "privacy" }) {
  const data = LEGAL_PAGES[which];
  return (
    <main>
      <PageHero
        data={{ eyebrow: data.eyebrow, title: data.title, intro: data.intro }}
      />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: data.title }]} />
      </div>

      <section className="bg-mist-50 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-500">
              {data.updated}
            </p>
          </Reveal>
          <div className="mt-6 space-y-8">
            {data.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <div className="rounded-2xl border border-mist-200 bg-white p-7 shadow-card">
                  <h2 className="text-lg font-bold text-navy-900">{s.heading}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 rounded-xl border border-azure-300/50 bg-azure-50 px-4 py-3 text-xs leading-relaxed text-ink-600">
              Note: the live HRCM site's legal pages were unavailable (404) at redesign
              time. This draft uses standard structure with placeholders — HRCM must
              review and finalize all marked items before publishing.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Questions about this policy?"
        text="Contact HRCM and we'll respond to your enquiry."
        primaryLabel="Contact Us"
        secondaryLabel="Our Services"
      />
    </main>
  );
}
