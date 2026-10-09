import { useReveal } from "../../hooks/useReveal";
import { SERVICES } from "../../data/content";
import { SectionHeading } from "../ui";
import { Link } from "../Link";

export function Services() {
  const listRef = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="left"
          label="SERVICES"
          title="Scope Of Services"
          intro="End-to-end revenue cycle support — from claim audit to final reconciliation."
        />

        {/* Editorial index list — hairline-separated rows, no cards */}
        <div ref={listRef} className="mt-14 border-t border-mist-200">
          {SERVICES.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className="group grid grid-cols-[3rem_1fr_auto] items-start gap-x-6 border-b border-mist-200 py-8 transition-colors duration-300 hover:bg-azure-50/60 md:grid-cols-[4rem_20rem_1fr_3rem] md:items-center md:gap-x-8"
            >
              <span className="pt-1 text-sm font-bold text-azure-500 md:pt-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="flex items-center gap-3 text-lg font-semibold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-azure-600 md:text-xl">
                  {s.title}
                  {s.needsValidation && (
                    <span
                      className="rounded-full bg-mist-100 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-ink-500"
                      title="Copy pending client validation"
                    >
                      Draft
                    </span>
                  )}
                </h3>
                <p className="col-span-2 mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 md:col-span-1 md:mt-0 md:col-start-3 md:row-start-1">
                  {s.text.length > 150 ? s.text.slice(0, 147).trimEnd() + "…" : s.text}
                </p>
              </div>

              <span
                aria-hidden
                className="col-start-3 row-start-1 flex h-11 w-11 items-center justify-center rounded-full border border-mist-200 text-azure-500 transition-all duration-300 group-hover:border-azure-500 group-hover:bg-azure-500 group-hover:text-white md:col-start-4"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
