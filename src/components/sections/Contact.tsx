import { motion } from "framer-motion";
import { CONTACT } from "../../data/content";
import { SectionSurface } from "../backdrops/SectionSurface";
import { ContactForm } from "../ContactForm";
import { Kicker, Reveal, StaggerContainer, StaggerItem } from "../ui";
import { Clock4, Mail, MapPin, Phone } from "lucide-react";

const DETAILS = [
  {
    icon: Phone,
    label: "Call us",
    values: [] as string[],
  },
  {
    icon: Mail,
    label: "Email us",
    values: [CONTACT.email],
  },
  {
    icon: MapPin,
    label: "Visit us",
    values: [CONTACT.address],
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20">
      <SectionSurface variant="paper" />

      <div className="relative mx-auto max-w-[102rem] px-8 sm:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left — copy + contact tiles */}
          <div>
            <Kicker tone="azure">Get in touch</Kicker>
            <h2 className="mt-5 text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.9rem]">
                {CONTACT.heading}
              </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
                {CONTACT.body}
              </p>

            <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {DETAILS.map((d) => {
                const list = d.values.length ? d.values : CONTACT.phones;
                return (
                  <StaggerItem key={d.label} className="h-full">
                    <motion.div
                      className="group clay-card h-full p-6"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="clay-card flex h-11 w-11 items-center justify-center rounded-2xl text-azure-600">
                        <d.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="mt-4 text-[0.72rem] font-semibold tracking-[-0.005em] text-ink-500">
                        {d.label}
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {list.map((v) => {
                          const isPhone = d.icon === Phone;
                          const isMail = d.icon === Mail;
                          const cls =
                            "block text-[0.95rem] font-medium leading-relaxed text-ink-900 transition-colors";
                          if (isPhone) {
                            return (
                              <a
                                key={v}
                                href={`tel:${v.replace(/\s/g, "")}`}
                                className={`tabular ${cls} hover:text-azure-600`}
                              >
                                {v}
                              </a>
                            );
                          }
                          if (isMail) {
                            return (
                              <a
                                key={v}
                                href={`mailto:${v}`}
                                className={`${cls} hover:text-azure-600`}
                              >
                                {v}
                              </a>
                            );
                          }
                          return (
                            <address key={v} className="not-italic text-[0.92rem] leading-relaxed text-ink-600">
                              {v}
                            </address>
                          );
                        })}
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}

              {/* Response promise tile — same structure as the detail tiles */}
              <StaggerItem className="h-full">
                <motion.div
                  className="group bento-item h-full min-h-[13rem] p-6"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="clay-card flex h-11 w-11 items-center justify-center rounded-2xl text-signal-600">
                    <Clock4 className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 text-[0.72rem] font-semibold tracking-[-0.005em] text-ink-500">
                    Revenue audit
                  </p>
                  <p className="mt-2 text-[0.95rem] font-medium leading-relaxed text-ink-900">
                    On request
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-600">
                    We'll assess your current processes and identify where the gains are.
                  </p>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right — glass form panel */}
          <Reveal delay={0.1} y={20}>
            <div className="glass relative overflow-hidden rounded-[var(--r-hero)] p-1.5">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-azure-300/25 blur-3xl" />
              <div className="relative rounded-[var(--r-card)] bg-white/70 p-6 backdrop-blur-xl sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-600 text-white shadow-brand">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[1.2rem] font-semibold tracking-[-0.015em] text-ink-900">
                      {CONTACT.form.heading}
                    </h3>
                    <p className="text-[0.82rem] text-ink-500">
                      Tell us about your revenue cycle — we'll take it from there.
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
