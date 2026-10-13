import { LEGAL_PAGES } from "../data/content";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHero } from "../components/PageHero";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/ui";

export function LegalPage({ which }: { which: "terms" | "privacy" }) {
  const data = LEGAL_PAGES[which];
  return (
    <main>
      <PageHero data={{ title: data.title, intro: data.intro }} eyebrow="Legal" crumbs={data.updated} />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: data.title }]} />
      </div>

      <section className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-8 sm:px-12">
          <Reveal y={10}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3.5 py-1.5 text-[0.75rem] font-semibold tracking-[-0.005em] text-ink-500 backdrop-blur-md">
              {data.updated}
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {data.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05} y={16}>
                <div className="glass rounded-[var(--r-card)] p-6">
                  <h2 className="text-lg font-semibold text-ink-900">{s.heading}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} y={12}>
            <p className="mt-8 rounded-[20px] border border-azure-200/70 bg-azure-50/70 px-5 py-4 text-[0.85rem] leading-relaxed text-ink-600">
              Note: the live HRCM site's legal pages were unavailable (404) at redesign time. This
              draft uses standard structure with placeholders — HRCM must review and finalize all
              marked items before publishing.
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
