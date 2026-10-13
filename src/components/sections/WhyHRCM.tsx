import { WHY } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { Kicker, StaggerContainer, StaggerItem, useGsapReveal } from "../ui";
import { TexCard } from "../TexCard";
import { Brain, Eye, Gauge, Layers, LifeBuoy, Users } from "lucide-react";

const ICONS: Record<string, typeof Users> = {
  "Specialized Expertise": Users,
  "Data-Driven Insights": Brain,
  "Transparent Processes": Eye,
  "Dedicated Support": LifeBuoy,
  "Scalable Solutions": Gauge,
};

/** Sixth tile — same design as the other five, closing the 3 × 2 grid. */
function AccountabilityCard() {
  return (
    <StaggerItem className="h-full">
      <TexCard index={5} variant="g" icon={Layers} title="End-to-end accountability">
        Claims audit, submission, accounts receivable, reconciliation and billing handled by a
        single accountable team.
      </TexCard>
    </StaggerItem>
  );
}

export function WhyHRCM() {
  const revealRef = useGsapReveal<HTMLDivElement>();

  return (
    <section id="why-hrcm" className="relative overflow-hidden py-16 sm:py-20">
      <SectionSurface variant="orchid" />

      <div ref={revealRef} className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div data-gsap-reveal className="max-w-3xl">
          <Kicker tone="azure">Why choose HRCM</Kicker>
          <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
            {WHY.heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{WHY.intro}</p>
        </div>

        {/* One pinned design for the whole grid — every card in this
            section shares the same texture and accent, so the section
            reads as a single surface rather than six lookalikes. */}
        <StaggerContainer
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {WHY.items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <TexCard index={i} variant="g" icon={ICONS[item.title] ?? Users} title={item.title}>
                {item.text}
              </TexCard>
            </StaggerItem>
          ))}
          <AccountabilityCard />
        </StaggerContainer>
      </div>
    </section>
  );
}
