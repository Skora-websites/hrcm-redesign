import { useEffect, useState } from "react";
import { NAV, PORTAL_URL } from "../data/content";
import { Link } from "./Link";

/** Current pathname normalized the same way the router does (for active state). */
function currentPath(): string {
  let p = window.location.pathname;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  p = p.replace(/\.html$/, "");
  if (p.startsWith("/services/")) return "/services";
  return p === "" ? "/" : p;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(currentPath());
  // Render-then-transition so CSS handles the slide even without rAF ticks
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onNav = () => setPath(currentPath());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onNav);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onNav);
    };
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeDrawer = () => {
    setMounted(false);
    window.setTimeout(() => setOpen(false), 260);
  };

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href.replace(/\.html$/, "");

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-[0_1px_0_rgb(10_30_62/0.08),0_12px_32px_-16px_rgb(10_30_62/0.25)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="HRCM home">
          <img src="/logo.png" alt="HRCM Logo" className="h-11 w-11 object-contain" />
          <span className="text-lg font-bold tracking-tight text-navy-900 transition-colors">
            HRCM
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-[0.92rem] font-medium transition-colors hover:text-azure-500 ${
                isActive(item.href) ? "text-azure-600" : "text-ink-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={PORTAL_URL}
            className="rounded-full border-2 border-navy-900/15 px-5 py-2 text-[0.9rem] font-semibold text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-azure-500 hover:text-azure-600"
          >
            Explore Portal
          </Link>
          <Link
            href="/get-in-touch.html"
            className="rounded-full bg-azure-500 px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_10px_30px_-12px_rgb(8_136_232/0.7)] transition-all duration-300 hover:bg-azure-600"
          >
            Request a Demo
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-navy-900 transition-colors lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>

      {open && (
        <div
          className={`fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-250 lg:hidden ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeDrawer}
        >
          <div
            className={`absolute right-0 top-0 flex h-full w-72 max-w-[85vw] flex-col overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
              mounted ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <img src="/logo.png" alt="HRCM Logo" className="h-10 w-10 object-contain" />
              <button
                onClick={closeDrawer}
                aria-label="Close menu"
                className="rounded-lg p-2 text-navy-900 hover:bg-mist-100"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-base font-medium hover:bg-azure-50 hover:text-azure-600 ${
                    isActive(item.href) ? "bg-azure-50 text-azure-600" : "text-ink-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/get-in-touch.html"
              onClick={closeDrawer}
              className="mt-6 rounded-full bg-azure-500 px-5 py-3 text-center font-semibold text-white hover:bg-azure-600"
            >
              Request a Demo
            </Link>
            <Link
              href={PORTAL_URL}
              onClick={closeDrawer}
              className="mt-3 rounded-full border-2 border-navy-900/15 px-5 py-3 text-center font-semibold text-navy-900 hover:border-azure-500 hover:text-azure-600"
            >
              Explore Portal
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
