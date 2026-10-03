import { SERVICES, SERVICE_POINTS } from "../data/content";
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
      {/* Detail hero — navy like other subpages, no PageHero wave */}
      <section className="relative overflow-hidden bg-navy-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-gradient-drift pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_-10%,rgb(8_88_184/0.4),transparent_60%),radial-gradient(700px_400px_at_88%_0%,rgb(8_168_248/0.22),transparent_55%)] bg-[length:180%_180%]"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-azure-300">
              <span className="h-px w-6 bg-current" aria-hidden />
              OUR SERVICES
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100/85">
              {service.detailIntro ?? service.text}
            </p>
          </Reveal>
        </div>
        <svg
          aria-hidden
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-10 w-full text-mist-50 sm:h-14"
        >
          <path d="M0 64h1440V24c-240 32-480 40-720 24S240 8 0 24v40z" fill="currentColor" />
        </svg>
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
                  Request a Free Consultation
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
