import { CONTACT, FOOTER, NAV, SERVICES } from "../data/content";
import { Icon } from "./Icon";
import { Link } from "./Link";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="HRCM Logo" className="h-12 w-12 object-contain" />
              <span className="text-xl font-bold tracking-tight">HRCM</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">
              {FOOTER.tagline}
            </p>
            <a
              href={FOOTER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-azure-400 hover:text-azure-300"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-azure-300">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-azure-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-azure-300">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 transition-colors hover:text-azure-300"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-azure-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {CONTACT.phones.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-azure-300">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-azure-300">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" />
                <span className="leading-relaxed">{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">{FOOTER.copyright}</p>
          <ul className="flex items-center gap-1 text-xs">
            {FOOTER.legal.map((l, i) => (
              <li key={l.label} className="flex items-center">
                {i > 0 && <span className="mx-2 text-white/25">/</span>}
                <Link href={l.href} className="text-white/60 transition-colors hover:text-azure-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
