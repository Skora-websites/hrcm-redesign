import { FOUNDERS } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal } from "../components/ui";

export function TeamPage() {
  return (
    <main>
      <PageHero
        data={{
          eyebrow: FOUNDERS.label,
          title: FOUNDERS.heading,
          intro: FOUNDERS.intro,
        }}
      />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Our Team" }]} />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {FOUNDERS.people.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1} className="h-full">
                <article className="group glass h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5">
                  <div className="relative aspect-[4/4.4] overflow-hidden bg-mist-100">
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy-950/55 to-transparent" />
                    <span className="absolute bottom-4 left-5 rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-azure-600 backdrop-blur">
                      {p.role}
                    </span>
                  </div>
                  <div className="p-7">
                    <h2 className="text-xl font-bold text-navy-900">{p.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
