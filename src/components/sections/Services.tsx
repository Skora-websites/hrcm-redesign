import { motion } from "framer-motion";
import { SERVICES } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { ServiceArt } from "../art";
import {
  BentoGrid,
  BentoItem,
  CTAButton,
  Kicker,
  IconTile,
  Reveal,
  useGsapReveal,
} from "../ui";
import { ArrowUpRight } from "lucide-react";

/** One tile per service: illustration + copy + link. All tiles identical. */
function ServiceTile({ slug, title, text }: { slug: string; title: string; text: string }) {
  return (
    <BentoItem>
      <motion.a
        href={`/services/${slug}.html`}
        className="group bento-item flex h-full min-h-[22rem] flex-col"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Illustration plate */}
        <div className="relative overflow-hidden rounded-t-[var(--r-bento)] bg-gradient-to-br from-azure-50 to-aqua-50">
          <ServiceArt slug={slug} className="h-40 w-full sm:h-44" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/45 to-transparent" />
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/70 text-azure-600 opacity-0 shadow-[var(--glass-shadow)] backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.015em] text-ink-900 transition-colors duration-300 group-hover:text-azure-700 sm:text-[1.25rem]">
            {title}
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{text}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.85rem] font-semibold text-azure-600">
            Learn more
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </motion.a>
    </BentoItem>
  );
}

/** Short opener — first sentence only, keeps the bento tiles even. */
function opener(text: string): string {
  const m = text.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : text).trim();
}

const SHORT: Record<string, string> = {
  "Medical Billing": "Smart billing workflows with faster submission and claim tracking systems.",
  "Query Management":
    "Structured handling and timely resolution of payer queries and documentation requests.",
};

export function Services() {
  const revealRef = useGsapReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative overflow-hidden py-16 sm:py-20">
      <SectionSurface variant="paper" />

      <div ref={revealRef} className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div data-gsap-reveal className="max-w-2xl">
            <Kicker tone="azure">Scope of services</Kicker>
            <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
              End-to-end revenue cycle support — from claim audit to final reconciliation
            </h2>
          </div>

          <div data-gsap-reveal className="flex items-center gap-4">
            <IconTile size="lg" variant="glass" tone="aqua">
              <span className="text-[1.05rem] font-semibold">6</span>
            </IconTile>
            <div className="leading-tight">
              <p className="text-[0.95rem] font-semibold text-ink-900">Service lines</p>
              <p className="text-[0.85rem] text-ink-500">Covering the full claims lifecycle</p>
            </div>
            <CTAButton
              href="/services.html"
              variant="glass"
              className="ml-2 hidden sm:inline-flex"
              arrow
            >
              All services
            </CTAButton>
          </div>
        </div>

        <BentoGrid cols={3} gap="gap-4">
          {SERVICES.map((s) => {
            const slug = s.href.replace(/^\/services\//, "").replace(/\.html$/, "");
            return (
              <ServiceTile
                key={s.title}
                slug={slug}
                title={s.title}
                text={SHORT[s.title] ?? opener(s.text)}
              />
            );
          })}
        </BentoGrid>

        <Reveal delay={0.1} y={12}>
          <div className="mt-12 flex justify-center">
            <CTAButton href="/services.html" variant="outline" size="lg" arrow>
              Explore all six service lines
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
