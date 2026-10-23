import { WHY } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { Kicker, StaggerContainer, StaggerItem, useGsapReveal } from "../ui";
import { TexCard } from "../TexCard";
import { Brain, Cpu, Eye, Gauge, Layers, ShieldCheck, Users } from "lucide-react";

const ICONS: Record<string, typeof Users> = {
  "Unified Private & Government Panel Coverage": Layers,
  "AI-Driven Scrutiny for Indian Healthcare": Brain,
  "Multi-Stage Audit Checkpoints & Loops": ShieldCheck,
  "Strict TAT Tracking with Escalation Matrix": Gauge,
  "API-Enabled HIS & Built-In OCR Automation": Cpu,
  "Modular Deployment & Full Audit Transparency": Eye,
};

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

        {/* 3 × 2 grid of descriptive why choose us cards */}
        <StaggerContainer
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {WHY.items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <TexCard index={i} variant="g" icon={ICONS[item.title] ?? Users} title={item.title}>
                {item.text}
              </TexCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
