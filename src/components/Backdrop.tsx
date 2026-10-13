import type { ReactNode } from "react";

type Variant = "hero" | "band" | "soft";

/**
 * Section backdrop. Premium means restraint: one soft light source and one
 * texture per section, no competing colour blobs. The animated claim pipeline
 * is supplied separately by <ClaimFlow> where it belongs.
 *
 * `hero`  — soft wash from the top + faint graph-paper texture
 * `band`  — warmer wash for call-to-action bands
 * `soft`  — the quietest wash, for regular sections
 */
export function AuroraBackdrop({
  variant = "hero",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}) {
  const wash: Record<Variant, string> = {
    hero:
      "radial-gradient(90% 60% at 50% -8%, rgba(41,151,255,0.14) 0%, rgba(41,151,255,0) 62%), radial-gradient(60% 45% at 88% 8%, rgba(23,193,187,0.11) 0%, rgba(23,193,187,0) 60%), radial-gradient(70% 50% at 8% 96%, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0) 62%)",
    band:
      "radial-gradient(80% 90% at 50% 0%, rgba(41,151,255,0.16) 0%, rgba(41,151,255,0) 60%), radial-gradient(60% 60% at 85% 100%, rgba(23,193,187,0.13) 0%, rgba(23,193,187,0) 60%)",
    soft:
      "radial-gradient(55% 40% at 14% 6%, rgba(41,151,255,0.075) 0%, rgba(41,151,255,0) 60%), radial-gradient(50% 40% at 90% 14%, rgba(23,193,187,0.06) 0%, rgba(23,193,187,0) 62%)",
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0" style={{ backgroundImage: wash[variant] }} />

      {/* Texture: graph paper on hero, quiet dots elsewhere */}
      {variant === "hero" ? (
        <div className="absolute inset-0 texture-graph opacity-[0.05]" />
      ) : (
        <div className={`absolute inset-0 pattern-dots ${variant === "soft" ? "opacity-40" : "opacity-60"}`} />
      )}

      {variant === "band" && (
        <div className="absolute inset-0 pattern-cross opacity-50" />
      )}

      {/* Ground fade into the page */}
      {variant === "hero" && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cloud-100 via-cloud-100/60 to-transparent" />
      )}

      {/* Hairline top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

      {children}
    </div>
  );
}

/** Small floating decorative orbs for product panels. */
export function FloatingOrbs({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <span className="absolute left-[12%] top-[18%] h-2.5 w-2.5 rounded-full bg-azure-400/60" />
      <span className="absolute right-[18%] top-[34%] h-2 w-2 rounded-full bg-aqua-500/60" />
      <span className="absolute bottom-[16%] left-[38%] h-3 w-3 rounded-full bg-orchid-400/40" />
    </div>
  );
}
