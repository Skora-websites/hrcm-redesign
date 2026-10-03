import { useReveal } from "../../hooks/useReveal";
import { SERVICES } from "../../data/content";
import { Icon } from "../Icon";
import { SectionHeading } from "../ui";
import { Link } from "../Link";

/** HRCM's own section artwork, mapped to services for visual identity. */
const SERVICE_IMAGES: Record<string, string> = {
  audit: "/images/about-1.png",
  processing: "/images/hero.jpg",
  receivable: "/images/about-2.png",
  reconciliation: "/images/hero.jpg",
  billing: "/images/about-1.png",
  query: "/images/about-2.png",
};

export function Services() {
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          label="SERVICES"
          title="Scope Of Services"
          intro="End-to-end revenue cycle support — from claim audit to final reconciliation."
        />
        <div ref={gridRef} className="stagger-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-azure-300 hover:shadow-lift"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={SERVICE_IMAGES[s.icon]}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent" />
                <div className="absolute bottom-3 left-5 inline-flex rounded-xl bg-white/95 p-2.5 text-azure-600 shadow-card transition-colors duration-300 group-hover:bg-azure-500 group-hover:text-white">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                {s.needsValidation && (
                  <span
                    className="absolute right-4 top-4 rounded-full bg-mist-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-500"
                    title="Copy pending client validation"
                  >
                    Draft
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-lg font-semibold leading-snug text-navy-900">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                  {s.text.length > 140 ? s.text.slice(0, 137).trimEnd() + "…" : s.text}
                </p>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-azure-600 transition-colors group-hover:text-azure-500">
                  Read more
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
