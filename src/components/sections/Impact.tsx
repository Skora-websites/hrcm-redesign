import { IMPACT, metricPair } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { DeltaBars } from "../art";
import { Card, CountUp, Kicker, StaggerContainer, StaggerItem, useGsapReveal } from "../ui";
import { TexCard } from "../TexCard";
import {
  Banknote,
  Eye,
  HandCoins,
  ShieldCheck,
  Timer,
} from "lucide-react";

const CARD_ICONS: Record<string, typeof Timer> = {
  "Faster Payment": Timer,
  "Denial Claims": ShieldCheck,
  "Improved Revenue": Banknote,
  "Payment Collection": HandCoins,
  "Greater Financial Visibility": Eye,
};

/** Numeric part of a result string, e.g. "50% Faster" → 50. */
function leadNumber(result: string): number {
  const m = result.match(/^([\d.]+)/);
  return m ? Number(m[1]) : 0;
}

function metricAccent(title: string): string {
  // Money outcomes read green — the same green as the logo's ₹ mark
  if (title.includes("Turnaround") || title.includes("Revenue")) return "text-sprout-700";
  if (title.includes("Deduction")) return "text-orchid-600";
  if (title.includes("Unsettled")) return "text-aqua-700";
  return "text-sprout-700";
}

export function Impact() {
  const revealRef = useGsapReveal<HTMLDivElement>();
  return (
    <section id="impact" className="relative overflow-hidden py-16 sm:py-20" ref={revealRef}>
      <SectionSurface variant="cream" />

      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div data-gsap-reveal className="max-w-3xl">
          <Kicker tone="sprout">Measured outcomes</Kicker>
          <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
              {IMPACT.heading}
            </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{IMPACT.intro}</p>
        </div>

        {/* Before → after metric cards */}
        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" staggerDelay={0.09}>
          {IMPACT.metrics.map((m) => {
            const accent = metricAccent(m.title);
            const result = m.result;
            const num = leadNumber(result);
            const rest = result.replace(/^[\d.]+\s*/, "");
            return (
              <StaggerItem key={m.title} className="h-full">
                <Card variant="glass" className="h-full p-6" hover>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[0.95rem] font-medium text-ink-600">{m.title}</h3>
                    <span className={`rounded-full bg-cloud-100 px-2.5 py-1 text-[0.68rem] font-semibold tracking-[-0.005em] ${accent}`}>
                      {rest}
                    </span>
                  </div>

                  <p className="tabular mt-4 flex items-baseline gap-1 text-[3rem] font-semibold leading-none tracking-[-0.03em] text-ink-900">
                    <CountUp to={num} decimals={result.includes(".") ? 1 : 0} />
                    <span className={`text-[1.1rem] font-semibold ${accent}`}>
                      {result.replace(/^[\d.]+/, "")}
                    </span>
                  </p>

                  <div className="mt-4">
                    <DeltaBars before={m.before} after={m.after} className="h-11 w-full" />
                    <p className="tabular mt-3 text-[0.85rem] text-ink-500">{metricPair(m)}</p>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Benefit bento — six tiles so the 3 × 2 grid never leaves a gap */}
        <div className="mt-14">
          <h3 className="max-w-xl text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] text-ink-900 sm:text-[1.85rem]">
              What providers actually get
          </h3>

          {/* Benefit bento — six tiles so the 3 × 2 grid never leaves a gap.
              One pinned design for the whole section: the same texture and
              accent on every card, so the set reads as one surface family. */}
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
            {IMPACT.cards.map((c, i) => (
              <StaggerItem key={c.title} className="h-full">
                <TexCard index={i} variant="a" icon={CARD_ICONS[c.title] ?? ShieldCheck} title={c.title}>
                  {c.text}
                </TexCard>
              </StaggerItem>
            ))}

            {/* Sixth tile — same design, closing the 3 × 2 grid */}
            <StaggerItem className="h-full">
              <TexCard index={5} variant="a" icon={Timer} title="Faster payment cycles">
                Days of payment turnaround reduced from 120 to 60 across recent engagements.
              </TexCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
