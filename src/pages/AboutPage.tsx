import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ABOUT, PAGE_HEROES, PROCESS } from "../data/content";
import { CTABand } from "../components/CTABand";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Kicker } from "../components/ui";
import { Impact } from "../components/sections/Impact";
import { Sparkline } from "../components/art";
import { ShieldCheck, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  // GSAP Animations: Organic floating fluid orbs + staggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Organic Fluid Orb Movements (Infinite Liquid Floating)
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 40,
          y: 35,
          scale: 1.12,
          rotation: 15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -50,
          y: 40,
          scale: 1.18,
          rotation: -20,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.8,
        });
      }
      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: 35,
          y: -30,
          scale: 1.15,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      // 2. Staggered Entrance Animation for Content Cards
      const elementsToAnimate = [
        leftCardRef.current,
        rightCardRef.current,
      ];
      gsap.fromTo(
        elementsToAnimate,
        {
          opacity: 0,
          y: 36,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
        }
      );

      // Stagger items inside the left card
      gsap.fromTo(
        ".fluid-pillar-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.35,
          ease: "power2.out",
        }
      );

      // Stagger steps inside the right card
      gsap.fromTo(
        ".fluid-process-step",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.1,
          delay: 0.45,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        data={PAGE_HEROES.about}
        eyebrow="About us"
        crumbs="Revenue Cycle Management"
      />

      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "About Us" }]} />
      </div>

      {/* ── Redesigned Content-Led Section with GSAP & Liquid Glass ── */}
      <section
        ref={containerRef}
        className="relative overflow-hidden py-16 sm:py-24"
      >
        {/* Floating Fluid Liquid Orbs (Driven by GSAP) */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            ref={orb1Ref}
            className="absolute -left-20 -top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-azure-400/20 via-sky-300/15 to-transparent blur-3xl"
          />
          <div
            ref={orb2Ref}
            className="absolute -right-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-gradient-to-bl from-teal-400/15 via-azure-300/15 to-transparent blur-3xl"
          />
          <div
            ref={orb3Ref}
            className="absolute -bottom-20 left-1/3 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-sky-400/15 via-indigo-300/10 to-transparent blur-3xl"
          />
        </div>

        <div className="relative mx-auto max-w-[102rem] px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* ── Left Column: Story & Core Operating Principles (Filled, No Vacant Space) ── */}
            <div
              ref={leftCardRef}
              className="lg:col-span-6 relative flex flex-col justify-between rounded-[28px] p-8 sm:p-10 transition-all duration-300 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.78)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow:
                  "0 12px 36px -4px rgba(16, 24, 40, 0.06), 0 2px 6px rgba(16, 24, 40, 0.03), inset 0 1px 2px rgba(255, 255, 255, 1)",
              }}
            >
              {/* Liquid Refraction Top Hairline */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 4%, rgba(255, 255, 255, 0.95) 25%, rgba(0, 113, 227, 0.4) 50%, rgba(255, 255, 255, 0.95) 75%, transparent 96%)",
                }}
              />

              <div>
                <Kicker tone="azure">WHO WE ARE</Kicker>
                <h2 className="mt-3 text-[1.85rem] sm:text-[2.25rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#0f172a] font-display">
                  {ABOUT.heading} — Hospital Revenue Intelligence
                </h2>

                <div className="mt-5 space-y-4 text-[0.98rem] sm:text-[1.02rem] leading-[1.68] text-[#475467] font-sans">
                  {ABOUT.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* 3 Core Operating Principles — Liquid Glass Chips */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    {
                      title: "Accuracy",
                      desc: "Checked at each clinical stage",
                      icon: ShieldCheck,
                      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
                    },
                    {
                      title: "Compliance",
                      desc: "50+ payer & TPA rules built in",
                      icon: CheckCircle2,
                      color: "text-azure-600 bg-azure-500/10 border-azure-500/20",
                    },
                    {
                      title: "Efficiency",
                      desc: "Scalable automated workflows",
                      icon: TrendingUp,
                      color: "text-teal-600 bg-teal-500/10 border-teal-500/20",
                    },
                  ].map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={pillar.title}
                        className="fluid-pillar-item relative rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: "rgba(255, 255, 255, 0.72)",
                          border: "1px solid rgba(255, 255, 255, 0.85)",
                          boxShadow: "0 4px 14px -2px rgba(16, 24, 40, 0.04)",
                        }}
                      >
                        <div
                          className={`inline-flex p-2 rounded-xl border ${pillar.color} mb-2.5`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-[0.9rem] font-bold text-[#0f172a] font-display">
                          {pillar.title}
                        </h4>
                        <p className="mt-1 text-[0.78rem] leading-snug text-[#64748b] font-sans">
                          {pillar.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#64748b] font-mono">
                  Full Claim Lifecycle Support
                </span>
                <a
                  href="/services.html"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071e3] font-sans hover:text-[#005bb5] transition-colors"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* ── Right Column: 4-Step RCM Delivery Framework + Live Turnaround ── */}
            <div
              ref={rightCardRef}
              className="lg:col-span-6 relative flex flex-col justify-between rounded-[28px] p-8 sm:p-10 transition-all duration-300 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.78)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow:
                  "0 12px 36px -4px rgba(16, 24, 40, 0.06), 0 2px 6px rgba(16, 24, 40, 0.03), inset 0 1px 2px rgba(255, 255, 255, 1)",
              }}
            >
              {/* Liquid Refraction Top Hairline */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 4%, rgba(255, 255, 255, 0.95) 25%, rgba(0, 113, 227, 0.4) 50%, rgba(255, 255, 255, 0.95) 75%, transparent 96%)",
                }}
              />

              <div>
                <Kicker tone="azure">HOW WE DELIVER</Kicker>
                <h2 className="mt-3 text-[1.85rem] sm:text-[2.25rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#0f172a] font-display">
                  {PROCESS.heading}
                </h2>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-[#64748b] font-sans">
                  A structured four-phase execution model transforming complex hospital receivables into predictable cash flow.
                </p>

                {/* 4 Process Steps with Number Badges */}
                <div className="mt-6 space-y-4">
                  {PROCESS.steps.map((step) => (
                    <div
                      key={step.num}
                      className="fluid-process-step relative flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white/80"
                      style={{
                        background: "rgba(255, 255, 255, 0.55)",
                        border: "1px solid rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-700 font-mono font-bold text-sm border border-azure-200/60 shadow-sm">
                        {step.num}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[0.98rem] font-bold text-[#0f172a] font-display">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-[#475467] font-sans">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liquid Turnaround Benchmark Box */}
              <div
                className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(234, 245, 252, 0.9) 0%, rgba(244, 249, 253, 0.9) 100%)",
                  border: "1px solid rgba(0, 113, 227, 0.2)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 1)",
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[0.76rem] font-bold uppercase tracking-wider text-azure-800 font-mono">
                      Payment Turnaround Acceleration
                    </p>
                  </div>
                  <p className="tabular mt-1.5 text-[1.85rem] font-bold leading-none tracking-[-0.03em] text-[#0f172a] font-display">
                    120 → 60 days
                  </p>
                  <p className="mt-1 text-[0.76rem] text-[#64748b] font-sans">
                    50% reduction in hospital receivable aging
                  </p>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                  <Sparkline className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Business Impact Section (Identical 3D Interactive Presentation from Homepage) ── */}
      <Impact />

      {/* ── Bottom CTA Band ── */}
      <CTABand />
    </main>
  );
}
