import { motion } from "framer-motion";
import { ABOUT, IMPACT } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { Sparkline } from "../art";
import { BentoGrid, BentoItem, Card, CTAButton, Kicker, Reveal, useGsapReveal } from "../ui";
import { ArrowRight, ClipboardCheck, Wallet } from "lucide-react";

/**
 * Who we are — six cards of exactly the same size in a 3 × 2 grid. Every card
 * carries either a full-bleed photograph or a photograph strip at the bottom,
 * so no card is ever left half-empty, and the row heights never disagree.
 */

type Capability = {
  icon: typeof Wallet;
  title: string;
  text: string;
  image: string;
  alt: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Wallet,
    title: "Cash flow first",
    text: "Structured follow-ups that turn pending claims into settled payments.",
    image: "/images/payment.jpg",
    alt: "Card payment being taken at a front desk",
  },
  {
    icon: ClipboardCheck,
    title: "Accuracy by process",
    text: "Every claim documented, checked and accountable at each stage.",
    image: "/images/docs.jpg",
    alt: "Two specialists reviewing documents and figures together",
  },
];

const PRINCIPLES = [
  "Accuracy at every stage",
  "Compliance with payer requirements",
  "Operational efficiency that scales",
];

/** Bottom photo strip — keeps every text card visually complete. */
function PhotoStrip({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="card-photo mt-auto h-28 w-full">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

/**
 * Card texture — a faint graph-paper ground shared by every text card
 * in this section, masked so it never reaches the copy. Pinned to one
 * texture so all six cards read as the same surface family.
 */
function CardTexture() {
  return <div className="about-card-texture" aria-hidden />;
}

export function About() {
  const revealRef = useGsapReveal<HTMLDivElement>();

  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-20">
      <SectionSurface variant="aqua" />

      <div ref={revealRef} className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div data-gsap-reveal className="max-w-2xl">
            <Kicker tone="aqua">Who we are</Kicker>
            <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
              {ABOUT.heading}
            </h2>
          </div>
          <p data-gsap-reveal className="max-w-md text-[0.95rem] leading-relaxed text-ink-500">
            {ABOUT.body[1]}
          </p>
        </div>

        <BentoGrid cols={3} gap="gap-4">
          {/* 1 — Copy: what we do, with the headline outcome */}
          <BentoItem>
            <Card variant="glass" className="relative flex h-full min-h-[27rem] flex-col p-6">
              <CardTexture />
              <Kicker tone="azure" rule={false}>
                End-to-end RCM for hospitals
              </Kicker>
              <p className="mt-4 text-[0.98rem] leading-[1.75] text-ink-600">{ABOUT.body[0]}</p>

              <div className="mt-7 rounded-[var(--r-tile)] bg-ink-900/[0.03] p-5">
                <p className="text-[0.72rem] text-ink-500">Payment turnaround</p>
                <p className="tabular mt-1 text-[1.9rem] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                  120 → 60 days
                </p>
                <Sparkline className="mt-4 h-9 w-full" />
                <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-500">
                  Measured against a client's own baseline.
                </p>
              </div>

              <CTAButton href={ABOUT.cta.href} variant="link" className="mt-7" arrow>
                {ABOUT.cta.label}
              </CTAButton>
            </Card>
          </BentoItem>

          {/* 2 — Photo: the team that runs it */}
          <BentoItem>
            <Card variant="bento" className="h-full min-h-[27rem] p-0">
              <div className="relative h-full">
                <motion.img
                  src="/images/about-1.png"
                  alt="HRCM analysts reconciling hospital billing and revenue data"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[0.95rem] font-medium leading-snug text-white">
                    Billing, claims and reconciliation run by one accountable team
                  </p>
                </div>
              </div>
            </Card>
          </BentoItem>

          {/* 3 — Photo: built for hospital finance */}
          <BentoItem>
            <Card variant="bento" className="h-full min-h-[27rem] p-0">
              <div className="relative h-full">
                <motion.img
                  src="/images/hospital.jpg"
                  alt="Hospital reception desk with a clinician at the counter"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ scale: 1.07 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[0.95rem] font-medium leading-snug text-white">
                    Built around how hospital finance actually runs
                  </p>
                </div>
              </div>
            </Card>
          </BentoItem>

          {/* 4 + 5 — Capability cards with a photo strip */}
          {CAPABILITIES.map((c) => (
            <BentoItem key={c.title}>
              <Card variant="clay" className="relative flex h-full min-h-[27rem] flex-col p-6">
                <CardTexture />
                <span className="clay-card flex h-12 w-12 items-center justify-center rounded-2xl text-azure-600">
                  <c.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.01em] text-ink-900">
                  {c.title}
                </h3>
                <p className="mt-2 max-w-[24ch] text-[0.95rem] leading-relaxed text-ink-600">
                  {c.text}
                </p>
                <PhotoStrip src={c.image} alt={c.alt} />
              </Card>
            </BentoItem>
          ))}

          {/* 6 — Principles list with a photo strip */}
          <BentoItem>
            <Card variant="skeuo" className="relative flex h-full min-h-[27rem] flex-col p-6">
              <CardTexture />
              <span className="clay-card flex h-12 w-12 items-center justify-center rounded-2xl text-aqua-600">
                <ClipboardCheck className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.01em] text-ink-900">
                Built around
              </h3>
              <ul className="mt-4 space-y-2.5">
                {PRINCIPLES.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.92rem] text-ink-700">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-signal-100 text-signal-600">
                      <ArrowRight className="h-2.5 w-2.5" aria-hidden />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-500">{IMPACT.intro}</p>
              <PhotoStrip
                src="/images/team-1.jpg"
                alt="Operations team working through a queue of claims"
              />
            </Card>
          </BentoItem>
        </BentoGrid>

        <Reveal delay={0.1} y={12}>
          <p className="mt-8 text-center text-[0.82rem] text-ink-500">
            Claims audit, submission, accounts receivable, reconciliation and billing — one
            accountable team, reported against your own baseline.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
