import { CONTACT, PORTAL_URL } from "../data/content";
import { FloatingOrbs } from "./Backdrop";
import { CTAButton, Kicker, Reveal } from "./ui";

export function CTABand({
  title = "Ready to strengthen your revenue cycle?",
  text = CONTACT.body,
  primaryLabel = "Request a Demo",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services.html",
  tertiaryLabel = "Explore Portal",
  tertiaryHref = PORTAL_URL,
}: {
  title?: string;
  text?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tertiaryLabel?: string;
  tertiaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {/* Green wash — the closing band carries the logo's green, not blue */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sprout-100/70 via-cloud-50 to-aqua-100/60" />
        <div className="absolute inset-0 pattern-cross opacity-45" />
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-sprout-300/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-aqua-300/25 blur-3xl" />
        <FloatingOrbs />
      </div>

      <div className="relative mx-auto max-w-5xl px-8 sm:px-12">
        <div className="glass relative overflow-hidden rounded-[var(--r-hero)] px-6 py-14 text-center sm:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-azure-300/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-aqua-300/30 blur-3xl"
          />

          <div className="relative">
            <Kicker tone="sprout">Next step</Kicker>
            <Reveal y={14}>
              <h2 className="mx-auto mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] text-ink-900 sm:text-[2.7rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.08} y={12}>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
                {text}
              </p>
            </Reveal>
            <Reveal delay={0.16} y={12}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <CTAButton href="/get-in-touch.html" size="lg">
                  {primaryLabel}
                </CTAButton>
                <CTAButton href={secondaryHref} variant="outline" size="lg" arrow>
                  {secondaryLabel}
                </CTAButton>
                <CTAButton href={tertiaryHref} variant="glass" size="lg" external>
                  {tertiaryLabel}
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={0.22} y={10}>
              <p className="mt-8 text-[0.85rem] text-ink-500">
                <a
                  href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                  className="tabular font-medium text-ink-700 underline-offset-4 transition-colors hover:text-azure-700 hover:underline"
                >
                  {CONTACT.phones[0]}
                </a>
                <span className="px-2">·</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-ink-700 underline-offset-4 transition-colors hover:text-azure-700 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
