import { CONTACT } from "../../data/content";
import { Icon } from "../Icon";
import { ContactForm } from "../ContactForm";
import { Reveal, SectionHeading } from "../ui";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading label={CONTACT.label} title={CONTACT.heading} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: copy + contact details */}
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-ink-600 sm:text-lg">
                {CONTACT.body}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-9 space-y-5">
                {CONTACT.phones.map((p) => (
                  <li key={p} className="flex items-center gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                      <Icon name="phone" className="h-5 w-5" />
                    </span>
                    <a
                      href={`tel:${p.replace(/\s/g, "")}`}
                      className="text-base font-semibold text-navy-900 transition-colors hover:text-azure-600"
                    >
                      {p}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-base font-semibold text-navy-900 transition-colors hover:text-azure-600"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <address className="not-italic text-sm leading-relaxed text-ink-600">
                    {CONTACT.address}
                  </address>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-mist-200 bg-mist-50 p-7 shadow-card sm:p-9">
              <h3 className="text-xl font-bold text-navy-900">{CONTACT.form.heading}</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
