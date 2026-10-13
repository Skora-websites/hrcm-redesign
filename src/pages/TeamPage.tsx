import { PAGE_HEROES } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { FoundersGrid } from "../components/FoundersGrid";
import { Reveal } from "../components/ui";

export function TeamPage() {
  return (
    <main>
      <PageHero
        data={PAGE_HEROES.team}
        eyebrow="Our team"
        crumbs="Healthcare operations, receivables and insurance"
      />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Our Team" }]} />
      </div>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-[102rem] px-8 sm:px-12">
          <Reveal y={14}>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-ink-600">
              The people leading HRCM's work with providers — decades of combined experience in
              hospital operations, accounts receivable and insurance.
            </p>
          </Reveal>
          <FoundersGrid heading="h2" />
        </div>
      </section>

      <CTABand
        title="Work with a team that knows hospital finance"
        text="Request a demo or a revenue audit — we'll assess your current processes and identify where the gains are."
      />
    </main>
  );
}
