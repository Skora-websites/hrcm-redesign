import { CONTACT } from "../data/content";
import { CTAButton, Reveal } from "./ui";

export function CTABand({
  title = "Ready to strengthen your revenue cycle?",
  text = CONTACT.body,
  primaryLabel = "Request a Free Consultation",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services.html",
}: {
  title?: string;
  text?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_15%_0%,rgb(8_136_232/0.25),transparent_60%),radial-gradient(600px_320px_at_90%_100%,rgb(95_191_63/0.12),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-100/80">
            {text}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CTAButton href="/get-in-touch.html" variant="primary">
              {primaryLabel}
            </CTAButton>
            <CTAButton href={secondaryHref} variant="ghost-light">
              {secondaryLabel}
            </CTAButton>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-7 text-sm text-navy-100/60">
            Prefer to talk now?{" "}
            <a
              href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
              className="font-semibold text-azure-300 hover:text-azure-400"
            >
              {CONTACT.phones[0]}
            </a>{" "}
            ·{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-semibold text-azure-300 hover:text-azure-400"
            >
              {CONTACT.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
