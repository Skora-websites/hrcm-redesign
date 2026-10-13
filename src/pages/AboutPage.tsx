import { ABOUT, IMPACT, PAGE_HEROES, PROCESS } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal, SectionHeading } from "../components/ui";
import { ImpactCards } from "../components/ImpactCards";
import { Sparkline } from "../components/art";
import { ArrowUpRight } from "lucide-react";

export function AboutPage() {
  return (
    <main>
      <PageHero data={PAGE_HEROES.about} eyebrow="About us" crumbs="Revenue Cycle Management" />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      <section className="relative py-20 sm:py-28">
        <div className="mx-auto grid max-w-[102rem] gap-8 px-8 sm:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Story */}
          <Reveal y={18}>
            <div className="glass h-full rounded-[var(--r-hero)] p-8 sm:p-10">
              <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.025em] text-ink-900 sm:text-[2.3rem]">
                {ABOUT.heading}
              </h2>
              {ABOUT.body.map((p, i) => (
                <p key={i} className="mt-4 text-[1.05rem] leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
              <dl className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Accuracy", v: "Checked at each stage" },
                  { k: "Compliance", v: "Payer requirements built in" },
                  { k: "Efficiency", v: "Processes that scale" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl bg-white/70 p-4 backdrop-blur-md">
                    <dt className="text-[0.72rem] font-semibold tracking-[-0.005em] text-azure-700">
                      {s.k}
                    </dt>
                    <dd className="mt-1.5 text-[0.9rem] leading-snug text-ink-700">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Photo + process */}
          <div className="grid gap-8">
            <Reveal delay={0.08} y={18}>
              <figure className="image-frame relative">
                <img
                  src="/images/about-1.png"
                  alt="HRCM team managing hospital billing, claims and revenue data"
                  className="h-64 w-full object-cover sm:h-72"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/70 px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-800 backdrop-blur-xl">
                  One accountable team across the revenue cycle
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.14} y={18}>
              <div className="clay-card p-8">
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink-900 sm:text-[1.85rem]">
                  {PROCESS.heading}
                </h2>
                <ol className="mt-7 space-y-5">
                  {PROCESS.steps.map((s) => (
                    <li key={s.num} className="flex gap-4">
                      <span className="num-badge tabular flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[0.85rem] font-bold text-azure-700">
                        {s.num}
                      </span>
                      <div>
                        <h3 className="text-[1.02rem] font-semibold text-ink-900">{s.title}</h3>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-600">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-white/70 p-5 backdrop-blur-md">
                  <div>
                    <p className="text-[0.72rem] font-semibold tracking-[-0.005em] text-ink-500">
                      Payment turnaround
                    </p>
                    <p className="tabular mt-1 text-[1.6rem] font-semibold leading-none tracking-[-0.02em] text-ink-900">
                      120 → 60 days
                    </p>
                  </div>
                  <Sparkline className="h-10 w-28" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Business impact summary — figures preserved exactly from the homepage */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-[102rem] px-8 sm:px-12">
          <SectionHeading align="left" title={IMPACT.heading} intro={IMPACT.intro} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {IMPACT.metrics.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06} y={18}>
                <div className="glass h-full rounded-[var(--r-card)] p-6">
                  <h3 className="text-[0.88rem] font-medium text-ink-600">{m.title}</h3>
                  <p className="tabular mt-4 text-[2.3rem] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                    {m.result.split(" ")[0]}
                    <span className="ml-1 text-[0.95rem] font-semibold text-azure-600">
                      {m.result.split(" ").slice(1).join(" ")}
                    </span>
                  </p>
                  <p className="tabular mt-3 text-[0.82rem] text-ink-500">{m.beforeLabel} → {m.afterLabel}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ImpactCards className="mt-8" />
          <Reveal delay={0.1} y={12}>
            <a
              href="/get-in-touch.html"
              className="press mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-azure-500 to-azure-600 px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-brand ring-1 ring-inset ring-white/20"
            >
              Request a Demo
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
