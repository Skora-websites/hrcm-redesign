import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "./Link";
import { gsap, REVEAL_EASE } from "../lib/gsap";

/* ------------------------------------------------------------------ */
/* Motion presets                                                     */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

/** True when the visitor asked for reduced motion — animations no-op. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * GSAP-driven scroll reveal for anything marked `[data-gsap-reveal]` inside
 * the returned container. Elements are reveal-ready by default and only
 * hidden when ScrollTrigger actually attaches, so a failure degrades to
 * visible content rather than a blank section.
 */
export function useGsapReveal<T extends HTMLElement>(selector = "[data-gsap-reveal]") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    const cleanups: Array<() => void> = [];
    for (const t of targets) {
      const r = t.getBoundingClientRect();
      // Only hide what is still below the fold; on-screen content shows now.
      if (r.top > window.innerHeight * 0.92) {
        gsap.set(t, { opacity: 0, y: 26 });
        const tl = gsap.to(t, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: REVEAL_EASE,
          paused: true,
          scrollTrigger: { trigger: t, start: "top 88%", once: true },
        });
        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      }
    }

    return () => {
      for (const c of cleanups) c();
    };
  }, [selector]);

  return ref;
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                   */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
  as?: "div" | "li" | "section" | "article" | "header";
}

/** Fade + rise when the block scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
  x = 0,
  scale = 1,
  as = "div",
}: RevealProps) {
  const reduce = prefersReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Stagger container — pair with <StaggerItem>. */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  as?: "div" | "ol" | "ul";
}) {
  const reduce = prefersReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay, delayChildren } },
      }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = prefersReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Kicker — a structural label with a rule, not a decorative pill       */
/* ------------------------------------------------------------------ */

export function Kicker({
  children,
  className = "",
  tone = "azure",
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "azure" | "aqua" | "orchid" | "signal" | "sprout" | "violet" | "ink";
  rule?: boolean;
}) {
  const tones = {
    azure: "text-azure-700",
    aqua: "text-aqua-700",
    orchid: "text-orchid-600",
    signal: "text-signal-600",
    sprout: "text-sprout-700",
    violet: "text-[#9f69c5]",
    ink: "text-ink-500",
  };
  return (
    <motion.span
      initial={prefersReducedMotion() ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: EASE }}
      className={`inline-flex items-center gap-3 text-[0.85rem] font-medium tracking-[-0.005em] ${tones[tone]} ${className}`}
    >
      {rule && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
      {children}
    </motion.span>
  );
}

/** @deprecated use Kicker — kept so older call sites still compile. */
export const Eyebrow = Kicker;

export function SectionHeading({
  title,
  intro,
  dark = false,
  align = "center",
  eyebrow,
  className,
}: {
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "center" | "left";
  eyebrow?: string;
  className?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls} ${className || ""}`}>
      {eyebrow && (
        <Kicker className="mb-4" tone={dark ? "aqua" : "azure"}>
          {eyebrow}
        </Kicker>
      )}
      <Reveal y={16}>
        <h2
          className={`text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.9rem] ${
            dark ? "text-white" : "text-ink-900"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.08} y={14}>
          <p
            className={`mt-4 text-lg leading-relaxed sm:text-xl ${
              dark ? "text-white/70" : "text-ink-600"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                            */
/* ------------------------------------------------------------------ */

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost-light" | "link" | "clay" | "glass";
  className?: string;
  arrow?: boolean;
  size?: "sm" | "md" | "lg";
  external?: boolean;
};

const buttonStyles = {
  primary: {
    base: "group inline-flex items-center justify-center gap-1.5 press font-medium rounded-full bg-gradient-to-b from-azure-500 to-azure-600 text-white shadow-brand hover:from-azure-600 hover:to-azure-700 ring-1 ring-inset ring-white/20",
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-2.5 text-[0.95rem]",
    lg: "px-8 py-3.5 text-[1.05rem]",
  },
  outline: {
    base: "group inline-flex items-center justify-center gap-1.5 press font-medium rounded-full border border-ink-900/12 bg-white/70 text-ink-900 backdrop-blur-md hover:border-azure-400/60 hover:bg-white hover:text-azure-700",
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-2.5 text-[0.95rem]",
    lg: "px-8 py-3.5 text-[1.05rem]",
  },
  "ghost-light": {
    base: "group inline-flex items-center justify-center gap-1.5 press font-medium rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-white/80 hover:bg-white/20",
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-2.5 text-[0.95rem]",
    lg: "px-8 py-3.5 text-[1.05rem]",
  },
  link: {
    base: "group inline-flex items-center gap-1.5 press font-medium text-azure-600 hover:text-azure-700",
    sm: "text-[0.85rem]",
    md: "text-[0.95rem]",
    lg: "text-[1.05rem]",
  },
  clay: {
    base: "group inline-flex items-center justify-center gap-1.5 font-medium clay-card text-ink-900",
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-8 py-4 text-[1.05rem]",
  },
  glass: {
    base: "group inline-flex items-center justify-center gap-1.5 press font-medium rounded-full glass-strong text-ink-900 hover:text-azure-700",
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-2.5 text-[0.95rem]",
    lg: "px-8 py-3.5 text-[1.05rem]",
  },
} as const;

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
  size = "md",
  external = false,
}: BtnProps) {
  const styles = buttonStyles[variant];
  return (
    <Link
      href={href}
      className={`${styles.base} ${styles[size]} ${className}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{children}</span>
      {variant === "link" || arrow ? (
        <motion.span
          className="inline-flex"
          whileHover={{ x: arrow ? 5 : 3 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden
        >
          {variant === "link" ? "›" : <ChevronRight className="h-4 w-4" />}
        </motion.span>
      ) : external ? (
        <ExternalLink className="h-4 w-4" aria-hidden />
      ) : null}
    </Link>
  );
}

/** Clay button with a tactile press. */
export function ClayButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  size = "md",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-[0.85rem]",
    md: "px-6 py-3 text-[0.95rem]",
    lg: "px-8 py-4 text-[1.05rem]",
  };
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-medium clay-card ${sizes[size]} ${className}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: EASE }}
      style={{ opacity: disabled ? 0.55 : 1 }}
    >
      {children}
    </motion.button>
  );
}

/** Frosted glass button (link or button). */
export function GlassButton({
  children,
  onClick,
  className = "",
  href,
  variant = "default",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  variant?: "default" | "primary";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full glass-strong press transition-colors duration-300 px-6 py-2.5 text-[0.95rem]";
  const variantClass =
    variant === "primary"
      ? "text-azure-700 hover:border-azure-300"
      : "text-ink-900 hover:text-azure-700";
  const cls = `${base} ${variantClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cls}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                              */
/* ------------------------------------------------------------------ */

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "glass" | "clay" | "skeuo" | "bento";
  hover?: boolean;
  tint?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

const cardVariants = {
  glass: "glass rounded-[var(--r-card)]",
  clay: "clay-card",
  skeuo: "skeuo-card",
  bento: "bento-item",
};

/** Surface card in one of the four design languages. */
export function Card({
  variant = "glass",
  hover = true,
  tint,
  children,
  className = "",
  ...props
}: CardProps) {
  const reduce = prefersReducedMotion();
  return (
    <motion.div
      className={`${cardVariants[variant]} ${className}`}
      style={tint ? ({ "--clay-tint": tint } as CSSProperties) : undefined}
      whileHover={hover && !reduce ? { y: -5 } : undefined}
      transition={{ duration: 0.3, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Card that tilts toward the pointer (spring-smoothed). */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const reduce = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Bento grid                                                         */
/* ------------------------------------------------------------------ */

export function BentoGrid({
  children,
  className = "",
  cols = 4,
  gap = "gap-4",
}: {
  children: ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
  gap?: string;
}) {
  const colClass =
    cols === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : cols === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  return (
    <StaggerContainer
      className={`grid ${gap} ${colClass} ${className}`}
      staggerDelay={0.09}
    >
      {children}
    </StaggerContainer>
  );
}

/** One bento tile. `span` widens it on large screens. */
export function BentoItem({
  children,
  className = "",
  span = 1,
}: {
  children: ReactNode;
  className?: string;
  span?: 1 | 2;
}) {
  const spanClass = span === 2 ? "lg:col-span-2" : "";
  return (
    <StaggerItem className={`h-full ${spanClass} ${className}`}>
      {children}
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/* Icon tile (clay / glass)                                           */
/* ------------------------------------------------------------------ */

export function IconTile({
  children,
  size = "md",
  variant = "clay",
  tone: toneKey = "azure",
  className = "",
}: {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "clay" | "glass" | "skeuo" | "flat";
  tone?: "azure" | "aqua" | "orchid" | "signal" | "ink";
  className?: string;
}) {
  const sizes = { sm: "h-9 w-9", md: "h-12 w-12", lg: "h-14 w-14", xl: "h-16 w-16" };
  const iconSizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6", xl: "h-7 w-7" };
  const tones = {
    azure: { cls: "text-azure-600", tint: "var(--color-azure-50)" },
    aqua: { cls: "text-aqua-600", tint: "var(--color-aqua-50)" },
    orchid: { cls: "text-orchid-600", tint: "var(--color-orchid-50)" },
    signal: { cls: "text-signal-600", tint: "var(--color-signal-50)" },
    ink: { cls: "text-ink-700", tint: "var(--color-cloud-100)" },
  };
  const variants = {
    clay: "clay-card rounded-2xl",
    glass: "glass rounded-2xl",
    skeuo: "skeuo-card rounded-2xl",
    flat: "rounded-2xl bg-cloud-100",
  };
  const tone = tones[toneKey];
  return (
    <motion.span
      className={`inline-flex items-center justify-center ${sizes[size]} ${variants[variant]} ${tone.cls} ${className}`}
      style={variant === "clay" ? ({ "--clay-tint": tone.tint } as CSSProperties) : undefined}
      whileHover={prefersReducedMotion() ? undefined : { scale: 1.06, rotate: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
    >
      <span className={`inline-flex ${iconSizes[size]}`}>{children}</span>
    </motion.span>
  );
}

/* Back-compat alias */
export const IconWrapper = IconTile;

/* ------------------------------------------------------------------ */
/* Photo frame                                                        */
/* ------------------------------------------------------------------ */

export function ImageFrame({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  children,
  tilt = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  children?: ReactNode;
  tilt?: boolean;
}) {
  const reduce = prefersReducedMotion();
  const frame = (
    <motion.div
      className={`image-frame ${className}`}
      initial={reduce ? false : { opacity: 0, scale: 1.03, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        transition={{ duration: 0.7, ease: EASE }}
      />
      {children}
    </motion.div>
  );
  return tilt ? <TiltCard intensity={6}>{frame}</TiltCard> : frame;
}

/* ------------------------------------------------------------------ */
/* Metric + counter                                                   */
/* ------------------------------------------------------------------ */

/** Counts up to `value` when scrolled into view. */
export function CountUp({
  to,
  duration = 1400,
  className = "",
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(0);
  const reduce = prefersReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  const shown = decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

export function Metric({
  value,
  label,
  change,
  changeType = "positive",
  className = "",
}: {
  value: string;
  label: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="tabular text-[2.8rem] font-semibold leading-none tracking-[-0.025em] text-ink-900 sm:text-[3.3rem]">
        {value}
      </span>
      <span className="mt-2 text-[0.9rem] text-ink-600">{label}</span>
      {change && (
        <span
          className={`mt-1.5 text-[0.9rem] font-medium ${
            changeType === "positive"
              ? "text-signal-600"
              : changeType === "negative"
                ? "text-rose-600"
                : "text-ink-500"
          }`}
        >
          {change}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Badge, divider, container, grid                                   */
/* ------------------------------------------------------------------ */

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "glass" | "clay";
  className?: string;
}) {
  const variants = {
    default: "bg-cloud-200/80 text-ink-700",
    success: "bg-signal-100 text-signal-600",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-azure-100 text-azure-700",
    glass: "glass text-ink-900",
    clay: "clay-card text-ink-900",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`section-divider ${className}`} />;
}

export function Container({
  children,
  className = "",
  size = "max",
}: {
  children: ReactNode;
  className?: string;
  size?: "max" | "wide" | "narrow";
}) {
  const sizes = {
    max: "max-w-[102rem]",
    wide: "max-w-[120rem]",
    narrow: "max-w-4xl",
  };
  return <div className={`mx-auto px-8 sm:px-12 ${sizes[size]} ${className}`}>{children}</div>;
}

export function Grid({
  children,
  className = "",
  cols = { base: 1, sm: 2, lg: 3, xl: 4 },
  gap = "gap-6",
}: {
  children: ReactNode;
  className?: string;
  cols?: { base?: number; sm?: number; lg?: number; xl?: number };
  gap?: string;
}) {
  return (
    <div
      className={`grid ${gap} grid-cols-[repeat(${cols.base},1fr)] sm:grid-cols-[repeat(${cols.sm},1fr)] lg:grid-cols-[repeat(${cols.lg},1fr)] xl:grid-cols-[repeat(${cols.xl},1fr)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll progress bar                                                  */
/* ------------------------------------------------------------------ */

/** Thin brand progress bar pinned under the header. */
export function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <motion.div
      style={{ width }}
      className={`h-[2px] origin-left bg-gradient-to-r from-azure-500 via-aqua-500 to-orchid-500 ${className}`}
    />
  );
}

export { useReducedMotion };
