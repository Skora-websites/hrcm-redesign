import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, PORTAL_URL } from "../data/content";
import { Link } from "./Link";
import { ScrollProgress } from "./ui";

/** Current pathname normalized the same way the router does (for active state). */
function currentPath(): string {
  let p = window.location.pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  p = p.replace(/\.html$/, "");
  if (p.startsWith("/services/")) return "/services";
  return p === "" ? "/" : p;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(currentPath());
  const [scrolled, setScrolled] = useState(false);

  // The bar starts transparent so it merges into the hero, and only
  // gains its frosted glass once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onNav = () => setPath(currentPath());
    window.addEventListener("popstate", onNav);
    return () => window.removeEventListener("popstate", onNav);
  }, []);

  // Lock body scroll while the drawer is open; Escape closes it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href.replace(/\.html$/, "");

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "glass-bar" : "glass-bar-clear"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-azure-300/50 to-transparent" />
        <div className="mx-auto flex h-[4.75rem] max-w-[102rem] items-center justify-between gap-6 px-8 sm:px-12">
          <Link href="/" className="flex shrink-0 items-center" aria-label="HRCM home">
            <img src="/logo.png" alt="HRCM" className="h-14 w-14 sm:h-16 sm:w-16 lg:h-[4.25rem] lg:w-[4.25rem] object-contain transition-transform duration-300 hover:scale-105" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300 ${
                    active ? "font-semibold text-azure-700" : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/70 bg-white/80 shadow-[var(--glass-shadow)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Link
              href={PORTAL_URL}
              className="rounded-full px-3 py-1.5 text-[0.82rem] font-medium text-ink-600 transition-colors hover:text-azure-700"
            >
              Explore Portal
            </Link>
            <Link
              href="/get-in-touch.html"
              className="press rounded-full bg-gradient-to-b from-azure-500 to-azure-600 px-4.5 py-2 text-[0.82rem] font-semibold text-white shadow-brand ring-1 ring-inset ring-white/20 transition-transform hover:from-azure-600 hover:to-azure-700"
            >
              Request a Demo
            </Link>
          </div>

          <button
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-white/60 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {/* Reading progress */}
        <ScrollProgress className="absolute inset-x-0 bottom-0" />
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink-900/25 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-80 max-w-[86vw] flex-col overflow-y-auto bg-white/85 p-6 shadow-[var(--skeuo-shadow-lift)] backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <img src="/logo.png" alt="HRCM Logo" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-cloud-100"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`block border-b border-mist-200 py-3.5 text-[1.05rem] tracking-[-0.01em] ${
                        isActive(item.href) ? "font-semibold text-azure-700" : "text-ink-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="mt-7 space-y-3"
              >
                <Link
                  href="/get-in-touch.html"
                  onClick={() => setOpen(false)}
                  className="press block rounded-full bg-gradient-to-b from-azure-500 to-azure-600 px-5 py-3 text-center text-[0.95rem] font-semibold text-white shadow-brand"
                >
                  Request a Demo
                </Link>
                <Link
                  href={PORTAL_URL}
                  onClick={() => setOpen(false)}
                  className="press block rounded-full border border-ink-900/12 bg-white/70 px-5 py-3 text-center text-[0.95rem] font-medium text-ink-900 backdrop-blur-md"
                >
                  Explore Portal
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
