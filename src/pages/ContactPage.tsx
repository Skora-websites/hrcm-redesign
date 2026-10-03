import { CONTACT, PAGE_HEROES } from "../data/content";
import { Icon } from "../components/Icon";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ContactForm } from "../components/ContactForm";
import { Reveal } from "../components/ui";

export function ContactPage() {
  return (
    <main>
      <PageHero data={PAGE_HEROES.contact} />
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Get In Touch" }]} />
      </div>

      <section className="bg-mist-50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-base leading-relaxed text-ink-600 sm:text-lg">{CONTACT.body}</p>
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
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-mist-200 bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-xl font-bold text-navy-900">{CONTACT.form.heading}</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
