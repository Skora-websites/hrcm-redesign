import type { ComponentType, CSSProperties, ReactNode } from "react";

/**
 * TexCard — a textural card.
 *
 * By default a card takes its look from its position, so different
 * sections get different surfaces. Pass `variant` to pin a whole
 * section to ONE design: every card in that section then matches,
 * while the section still reads as distinct from its neighbours.
 */

export type TexTexture = "a" | "b" | "c" | "d" | "e" | "f" | "g";

/** The accent set — six distinct, all on-brand. */
const ACCENTS = [
  { line: "#0071e3", soft: "rgba(0, 113, 227, 0.13)", shadow: "rgba(0, 113, 227, 0.4)" },   // azure
  { line: "#2e8b17", soft: "rgba(46, 139, 23, 0.15)", shadow: "rgba(46, 139, 23, 0.4)" },  // deep green
  { line: "#17c1bb", soft: "rgba(23, 193, 187, 0.13)", shadow: "rgba(23, 193, 187, 0.4)" },  // aqua
  { line: "#76c40b", soft: "rgba(118, 196, 11, 0.14)", shadow: "rgba(118, 196, 11, 0.4)" },   // sprout
  { line: "#8b5cf6", soft: "rgba(139, 92, 246, 0.13)", shadow: "rgba(139, 92, 246, 0.4)" },  // orchid
  { line: "#b45309", soft: "rgba(180, 83, 9, 0.12)", shadow: "rgba(180, 83, 9, 0.35)" },      // amber
];

const TEX: TexTexture[] = ["a", "b", "c", "d", "e", "f"];
export function TexCard({
  index = 0,
  variant,
  icon: Icon,
  title,
  children,
  className = "",
}: {
  index?: number;
  variant?: TexTexture;
  icon?: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  // A pinned variant makes every card in the section identical;
  // otherwise the card's position drives texture and accent.
  const tex = variant ?? TEX[index % TEX.length];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      className={`tex-card group h-full p-6 ${className}`}
      style={
        {
          "--card-accent": accent.soft,
          "--card-accent-solid": accent.line,
          "--card-accent-shadow": accent.shadow,
          "--tex-accent": accent.soft,
          "--tex-strong": accent.line,
          // near-invisible grey, for the understated whisper texture
          "--tex-quiet": "rgba(16, 24, 40, 0.035)",
        } as CSSProperties
      }
    >
      {/* textural background */}
      <div className={`tex-layer tex-${tex}`} />

      {/* furniture: chamfered notch, accent rail */}
      <span className="tex-notch" aria-hidden />
      <span className="tex-rail" aria-hidden />

      <div className="relative flex h-full flex-col">
        {Icon && (
          <span className="tex-sigil">
            <Icon className="h-[1.35rem] w-[1.35rem]" />
          </span>
        )}
        <h3 className="mt-4 text-[1.15rem] font-semibold tracking-[-0.015em] text-ink-900">
          {title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">{children}</p>
      </div>
    </div>
  );
}
