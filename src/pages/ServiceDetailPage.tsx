import { PORTAL_URL, SERVICES, SERVICE_POINTS } from "../data/content";
import { TechCanvas } from "../components/TechCanvas";
import { Icon } from "../components/Icon";
import { CTABand } from "../components/CTABand";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../components/Link";
import { Reveal } from "../components/ui";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = SERVICES.find(
    (s) => s.href.replace(/^\/services\//, "").replace(/\.html$/, "") === slug,
  );
  if (!service) return null;
  const points = SERVICE_POINTS[slug] ?? [];
  const others = SERVICES.filter((s) => s.title !== service.title);

  return (
    <main>
      {/* Detail hero — light theme, premium layered backdrop (matches PageHero) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-azure-50/70 via-white to-white pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(2_132_199/0.16)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(1000px_500px_at_50%_0%,black,transparent_75%)]"
          />
          <TechCanvas density={0.0001} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.8)_0%,rgb(255_255_255/0.5)_42%,transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-600">
              <span className="h-px w-6 bg-current" aria-hidden />
              OUR SERVICES
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
              {service.detailIntro ?? service.text}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Our Services", href: "/services.html" }, { label: service.title }]}
        />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                What we do
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">
                {service.text}
              </p>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((pt, i) => (
                <Reveal key={pt.title} delay={0.1 + i * 0.06} className="h-full">
                  <div className="flex h-full gap-3.5 rounded-2xl border border-mist-200 bg-white p-5 shadow-card">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500/12 text-signal-500">
                      <Icon name="check" className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy-900">{pt.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">{pt.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            {service.needsValidation && (
              <p className="mt-6 rounded-xl border border-mist-200 bg-white px-4 py-3 text-xs leading-relaxed text-ink-500">
                Note: this service's page copy is a draft pending HRCM validation. The
                service itself appears on the current website's service strip.
              </p>
            )}
          </div>

          <aside>
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-mist-200 bg-white p-7 shadow-card">
                <h2 className="text-lg font-bold text-navy-900">Other services</h2>
                <ul className="mt-4 space-y-1">
                  {others.map((o) => (
                    <li key={o.title}>
                      <Link
                        href={o.href}
                        className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:bg-azure-50 hover:text-azure-600"
                      >
                        {o.title}
                        <span
                          aria-hidden
                          className="text-azure-500 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/get-in-touch.html"
                  className="mt-5 block rounded-full bg-azure-500 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-azure-600"
                >
                  Request a Demo
                </Link>
                <Link
                  href={PORTAL_URL}
                  className="mt-3 block rounded-full border-2 border-navy-900/15 bg-white px-5 py-3 text-center text-sm font-semibold text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500 hover:text-azure-600"
                >
                  Explore Portal
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTABand
        title={`Need ${service.title.toLowerCase()} for your organization?`}
      />
    </main>
  );
}
