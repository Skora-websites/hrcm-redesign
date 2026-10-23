import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { COMING_SOON } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { CTAButton, Kicker, Reveal } from "../ui";
import { Brain, Check, Clock4, Radar } from "lucide-react";

/**
 * Upcoming AI claims platform — light glass band with the product visual,
 * animated scanning line and floating orbs.
 */
export function ComingSoon() {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: panel,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);

  return (
    <section id="ai-platform" className="relative overflow-hidden py-16 sm:py-20">
      <SectionSurface variant="peach" />

      <div ref={panel} className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Kicker tone="azure">Developed</Kicker>
            <h2 className="mt-4 max-w-2xl text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
                {COMING_SOON.heading}
              </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                {COMING_SOON.support}
              </p>

            <Reveal delay={0.14} y={12}>
              <ul className="mt-10 grid gap-3">
                {COMING_SOON.bullets.map((q, i) => (
                  <motion.li
                    key={q}
                    initial={reduce ? false : { opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-start gap-4 rounded-[var(--r-tile)] border border-white/70 bg-white/55 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-azure-200 hover:bg-white/80"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-azure-100 text-azure-600 transition-colors duration-300 group-hover:bg-azure-600 group-hover:text-white">
                      {i === 0 ? (
                        <Radar className="h-5 w-5" aria-hidden />
                      ) : i === 1 ? (
                        <Brain className="h-5 w-5" aria-hidden />
                      ) : (
                        <Clock4 className="h-5 w-5" aria-hidden />
                      )}
                    </span>
                    <span className="text-[1.02rem] leading-relaxed text-ink-700">{q}</span>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} y={12}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <CTAButton href={COMING_SOON.cta.href} size="lg">
                  {COMING_SOON.cta.label}
                </CTAButton>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-[0.8rem] font-medium text-ink-600 backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                  </span>
                  HRCM AI Claims Platform · Developed
                </span>
              </div>
            </Reveal>
          </div>

          {/* Visual */}
          <motion.div style={{ y: visualY }} className="relative">

            <div className="relative mx-auto max-w-lg">
              {/* glow plate */}
              <div
                aria-hidden
                className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-azure-300/40 to-aqua-300/40 blur-3xl"
              />
              <div className="glass relative overflow-hidden rounded-[32px] p-3 shadow-xl border border-white/80">
                <div className="relative overflow-hidden rounded-[var(--r-card)] bg-white/70">
                  <img
                    src="/images/hrcm-ai-platform.jpg"
                    alt="HRCM AI Claims Platform — automated claim scrubbing, denial risk prediction and settlement analytics"
                    className="h-[20rem] w-full object-cover object-top sm:h-[24rem]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* scanning line */}
                  {!reduce && (
                    <motion.div
                      aria-hidden
                      className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-azure-400/25 to-transparent"
                      initial={{ y: -96 }}
                      animate={{ y: 400 }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}

                  {/* overlay readouts */}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-100 text-signal-600">
                        <Check className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-[0.85rem] font-semibold text-ink-900">
                        Rejection risk flagged early
                      </span>
                    </div>
                    <span className="tabular hidden text-[0.75rem] font-medium text-ink-500 sm:block">
                      pre-submission
                    </span>
                  </div>
                </div>
              </div>

              {/* clay corner badge */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="clay-card absolute -left-4 top-8 flex items-center gap-2 rounded-2xl px-4 py-3"
              >
                <Brain className="h-4 w-4 text-orchid-600" aria-hidden />
                <span className="text-[0.85rem] font-semibold text-ink-900">Models trained on hospital workflows</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
