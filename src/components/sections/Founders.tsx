import { FOUNDERS } from "../../data/content";
import { Reveal, SectionHeading } from "../ui";

export function Founders() {
  return (
    <section id="leadership" className="bg-mist-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={FOUNDERS.label} title={FOUNDERS.heading} intro={FOUNDERS.intro} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FOUNDERS.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
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
                  <h3 className="text-xl font-bold text-navy-900">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
