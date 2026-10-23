import { motion } from "framer-motion";
import { PORTAL_URL, SERVICES, SERVICE_POINTS } from "../data/content";
import { StudioBackdrop } from "../components/backdrops/StudioBackdrop";
import { SectionSurface } from "../components/backdrops/SectionSurface";
import { CTABand } from "../components/CTABand";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Link } from "../components/Link";
import { ServiceArt, Sparkline } from "../components/art";
import { Reveal, StaggerContainer, StaggerItem } from "../components/ui";
import { ArrowUpRight, Check } from "lucide-react";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const resolvedSlug = slug === "medical-billing" ? "data-management" : slug;
  const service = SERVICES.find(
    (s) => s.href.replace(/^\/services\//, "").replace(/\.html$/, "") === resolvedSlug,
  );
  if (!service) return null;
  const points = SERVICE_POINTS[resolvedSlug] ?? SERVICE_POINTS[slug] ?? [];
  const others = SERVICES.filter((s) => s.title !== service.title);

  return (
    <main>
      {/* Detail hero — matches PageHero's warm studio treatment */}
      <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
        <StudioBackdrop soft />
        <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[-0.005em] text-azure-700 backdrop-blur-xl"
              >
                Service line
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-[22ch] text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink-900 sm:text-[3.3rem]"
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl"
              >
                {service.detailIntro ?? service.text}
              </motion.p>
            </div>

            {/* Service illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass hidden overflow-hidden rounded-[28px] p-2 lg:block"
            >
              <ServiceArt slug={slug} className="h-44 w-full rounded-[var(--r-tile)]" />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Our Services", href: "/services.html" }, { label: service.title }]}
        />
      </div>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <SectionSurface variant="paper" />
        <div className="relative mx-auto grid max-w-[102rem] gap-14 px-8 sm:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal y={16}>
              <h2 className="text-[1.7rem] font-semibold tracking-[-0.02em] text-ink-900 sm:text-[2.1rem]">
                What we do
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600">
                {service.text}
              </p>
            </Reveal>

            <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {points.map((pt) => (
                <StaggerItem key={pt.title} className="h-full">
                  <motion.div
                    className="group bento-item h-full p-6"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-100 text-signal-600 transition-colors duration-300 group-hover:bg-signal-500 group-hover:text-white">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.01em] text-ink-900">
                      {pt.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-600">{pt.text}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Inline illustration for mobile (hero art is desktop-only) */}
            <Reveal delay={0.1} y={14}>
              <div className="glass mt-8 overflow-hidden rounded-[var(--r-card)] p-2 lg:hidden">
                <ServiceArt slug={slug} className="h-40 w-full rounded-[20px]" />
              </div>
            </Reveal>
          </div>

          <aside>
            <Reveal delay={0.12} y={18}>
              <div className="sticky top-24 space-y-4">
                <div className="clay-card p-6">
                  <h2 className="text-[1.1rem] font-semibold tracking-[-0.015em] text-ink-900">
                    Other services
                  </h2>
                  <ul className="mt-4 space-y-1">
                    {others.map((o) => (
                      <li key={o.title}>
                        <Link
                          href={o.href}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] text-ink-700 transition-colors hover:bg-white/70 hover:text-azure-700"
                        >
                          {o.title}
                          <span
                            aria-hidden
                            className="text-ink-400 transition-transform duration-300 group-hover:translate-x-1"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass rounded-[var(--r-card)] p-6">
                  <p className="text-[0.72rem] font-semibold tracking-[-0.005em] text-ink-500">
                    Where this helps
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                    Structured execution that shortens payment cycles and keeps revenue visible to
                    your finance team.
                  </p>
                  <Sparkline className="mt-4 h-10 w-full" />
                  <Link
                    href="/get-in-touch.html"
                    className="press mt-4 block rounded-full bg-gradient-to-b from-azure-500 to-azure-600 px-5 py-3 text-center text-[0.95rem] font-semibold text-white shadow-brand ring-1 ring-inset ring-white/20"
                  >
                    Request a Demo
                  </Link>
                  <Link
                    href={PORTAL_URL}
                    className="press mt-3 block rounded-full border border-ink-900/12 bg-white/70 px-5 py-3 text-center text-[0.95rem] font-medium text-ink-900 backdrop-blur-md transition-colors hover:border-azure-300 hover:text-azure-700"
                  >
                    Explore Portal
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTABand title={`Need ${service.title.toLowerCase()} for your organization?`} />
    </main>
  );
}
