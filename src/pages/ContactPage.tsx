import { CONTACT, PAGE_HEROES } from "../data/content";
import { PageHero } from "../components/PageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Reveal } from "../components/ui";
import { Contact } from "../components/sections/Contact";

export function ContactPage() {
  return (
    <main>
      <PageHero
        data={PAGE_HEROES.contact}
        eyebrow="Get in touch"
        crumbs="Demo request · Revenue audit"
      />
      <div className="mx-auto max-w-[102rem] px-5 pt-6 sm:px-8">
        <Breadcrumbs items={[{ label: "Get In Touch" }]} />
      </div>

      {/* Reuse the homepage contact block (form + contact tiles) */}
      <Contact />

      {/* Direct details strip for quick access */}
      <section className="relative pb-20 sm:pb-28">
        <div className="mx-auto max-w-[102rem] px-8 sm:px-12">
          <Reveal y={14}>
            <div className="glass flex flex-col items-center justify-center gap-3 rounded-[var(--r-card)] px-6 py-6 text-center">
              <p className="text-[0.78rem] font-semibold tracking-[-0.005em] text-ink-500">
                Prefer to reach us directly?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {CONTACT.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="tabular text-[1.05rem] font-semibold text-ink-900 transition-colors hover:text-azure-700"
                  >
                    {p}
                  </a>
                ))}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[1.05rem] font-semibold text-ink-900 transition-colors hover:text-azure-700"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
