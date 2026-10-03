import { useEffect, useRef, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { Link } from "./Link";

/* ---------------- Reveal on scroll (IO + CSS classes) ---------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.92) {
      el.classList.add("will-reveal");
      if (delay) el.style.setProperty("--reveal-delay", `${Math.round(delay * 1000)}ms`);
      io.observe(el);
    }

    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ---------------- Section heading ---------------- */

export function SectionHeading({
  label,
  title,
  intro,
  dark = false,
  align = "center",
}: {
  label: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const ref = useReveal<HTMLDivElement>();

  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div ref={ref} className={`max-w-3xl ${alignCls}`}>
      <span
        className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase ${
          dark ? "text-azure-300" : "text-azure-600"
        }`}
      >
        <span className="h-px w-6 bg-current" aria-hidden />
        {label}
      </span>
      <h2
        className={`mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? "text-navy-100/80" : "text-ink-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ---------------- CTA button ---------------- */

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost-light";
  className?: string;
  arrow?: boolean;
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 px-7 py-3.5 text-[0.95rem]";
  const styles = {
    primary:
      "bg-azure-500 text-white shadow-[0_10px_30px_-10px_rgb(8_136_232/0.6)] hover:bg-azure-600 hover:shadow-[0_14px_34px_-10px_rgb(8_136_232/0.7)] hover:-translate-y-0.5",
    outline:
      "border-2 border-navy-900/15 text-navy-900 hover:border-azure-500 hover:text-azure-600 hover:-translate-y-0.5 bg-white/60",
    "ghost-light":
      "border-2 border-white/25 text-white hover:border-white/70 hover:-translate-y-0.5",
  } as const;
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </Link>
  );
}
