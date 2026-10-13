import { motion, useReducedMotion } from "framer-motion";

/**
 * StudioBackdrop — the hero's background.
 *
 * Matched to the reference: a warm dusty pastel studio (peach → mauve →
 * dusty rose) with one soft key light, three slowly drifting blooms, film
 * grain and a corner vignette. No blue, no white — so the headline and the
 * glass object are the only cool things on screen.
 *
 * `soft` gives the same family at lower contrast for subpage heroes.
 */
export function StudioBackdrop({
  className = "",
  soft = false,
}: {
  className?: string;
  soft?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className={`${soft ? "studio-stage-soft" : "studio-stage"} ${className}`}>
      {/* drifting blooms — the light is alive, but barely */}
      <motion.div
        className="studio-bloom"
        style={{
          left: "-8%",
          top: "-18%",
          height: "34rem",
          width: "34rem",
          background:
            "radial-gradient(circle, rgba(246,233,226,0.95) 0%, rgba(246,233,226,0) 68%)",
        }}
        animate={reduce ? undefined : { x: [0, 34, -22, 0], y: [0, 22, -14, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="studio-bloom"
        style={{
          right: "2%",
          top: "8%",
          height: "30rem",
          width: "30rem",
          background: "radial-gradient(circle, rgba(159,105,197,0.3) 0%, rgba(159,105,197,0) 68%)",
        }}
        animate={reduce ? undefined : { x: [0, -26, 18, 0], y: [0, -18, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="studio-bloom"
        style={{
          left: "18%",
          bottom: "-16%",
          height: "28rem",
          width: "28rem",
          background: "radial-gradient(circle, rgba(204,182,184,0.55) 0%, rgba(204,182,184,0) 70%)",
        }}
        animate={reduce ? undefined : { x: [0, 22, -18, 0], y: [0, -14, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <div className="studio-grain" />
      <div className="studio-vignette" />
    </div>
  );
}
