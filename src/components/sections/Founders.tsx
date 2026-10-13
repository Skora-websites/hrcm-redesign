import { motion } from "framer-motion";
import { FOUNDERS } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { Kicker, StaggerContainer, StaggerItem, useGsapReveal } from "../ui";

/** Brand glyph isn't in the icon set — inline SVG, same as the footer. */
function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

/**
 * Leadership. Content is exactly what hrcm.in publishes — the full
 * bio verbatim, the role, and the LinkedIn link — set in our own
 * type and in a card structure that is ours: a photo band clipped
 * open on reveal, a name plate straddling the photo and the body,
 * and a rule that draws itself as the card arrives.
 */

export function Founders() {
  const revealRef = useGsapReveal<HTMLDivElement>();
  return (
    <section id="leadership" className="relative overflow-hidden py-16 sm:py-20" ref={revealRef}>
      <SectionSurface variant="sand" />

      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div data-gsap-reveal className="max-w-3xl">
          <Kicker tone="sprout">Leadership</Kicker>
          <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
              {FOUNDERS.heading}
            </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{FOUNDERS.intro}</p>
        </div>

        <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3" staggerDelay={0.14}>
          {FOUNDERS.people.map((p, i) => (
            <StaggerItem key={p.name} className="h-full" y={0}>
              <motion.article
                className="founder-card group"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Photo band — clipped open from the top as it arrives */}
                <motion.div
                  className="founder-photo"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={p.photo} alt={p.name} loading="lazy" decoding="async" />
                  <span className="founder-photo-scrim" aria-hidden />

                  {/* role pill, sitting on the photo */}
                  <motion.span
                    className="founder-role"
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.55 + i * 0.13 }}
                  >
                    {p.role}
                  </motion.span>
                </motion.div>

                {/* Name plate — straddles the photo and the body */}
                <motion.div
                  className="founder-plate"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.4 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3>{p.name}</h3>
                  <motion.hr
                    className="founder-plate-rule"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>

                {/* Body — the bio, verbatim from hrcm.in */}
                <motion.div
                  className="founder-body"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.55 + i * 0.13 }}
                >
                  <p className="founder-bio">{p.bio}</p>

                  <div className="founder-foot">
                    <a
                      href="https://www.linkedin.com/company/hrcm-consultancy-services-pvt-ltd/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} on LinkedIn`}
                      className="founder-link"
                    >
                      <LinkedInGlyph className="h-3.5 w-3.5" aria-hidden />
                      LinkedIn
                    </a>
                  </div>
                </motion.div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
