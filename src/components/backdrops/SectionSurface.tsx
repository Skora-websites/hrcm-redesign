/**
 * SectionSurface — the ground every section sits on.
 *
 * Each section gets a different light wash **and** a different texture, so
 * scrolling reads as a sequence of surfaces rather than one repeated blue
 * gradient. All eight stay light; the logo's greens (sprout / aqua) carry
 * the sections that are about process and money.
 */

export type SurfaceVariant =
  | "paper"
  | "aqua"
  | "sprout"
  | "cream"
  | "orchid"
  | "peach"
  | "sand";

/** Which texture sits on which wash — one texture per surface, for a reason. */
const TEXTURE: Record<SurfaceVariant, string> = {
  paper: "texture-ledger opacity-60", // claim-sheet rules under card sections
  aqua: "pattern-dots opacity-50", // quiet dot grid
  sprout: "texture-graph opacity-45", // graph paper — process/measurement
  cream: "texture-graph opacity-50", // graph paper — numbers
  orchid: "pattern-dots opacity-45",
  peach: "pattern-cross opacity-55", // clinical cross grid
  sand: "texture-ledger opacity-50", // ruled paper — people/ops
};

export function SectionSurface({
  variant = "paper",
  className = "",
}: {
  variant?: SurfaceVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`surface-base surface-${variant} ${className}`}
    >
      <div className={`absolute inset-0 ${TEXTURE[variant]}`} />
      {/* hairline at the top so sections read as separate sheets */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/[0.04] to-transparent" />
    </div>
  );
}
