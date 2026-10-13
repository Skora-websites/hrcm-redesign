import { useEffect, useRef } from "react";
import { gsap, shouldSkipAnimation } from "../lib/gsap";

/**
 * NavCanvas — the header's background.
 *
 * The header is the one surface that is always on screen, so it carries the
 * niche: a slow drift of claim tokens crossing the bar with depth, like a
 * queue of claims moving through a processor. Each token is drawn on canvas
 * at a z-depth, so the field reads with parallax and a hint of perspective
 * rather than as a flat pattern.
 *
 * GSAP owns the motion: `gsap.ticker` drives the frame loop and each token's
 * drift is a tween, so pausing/scaling stays in one place. Colour is the
 * brand palette taken from the logo (azure, aqua, and the two greens).
 */

type TokenKind = "claim" | "dot" | "check" | "rupee";

type Token = {
  x: number;
  y: number;
  z: number;
  vx: number;
  bob: number;
  size: number;
  color: string;
  kind: TokenKind;
  phase: number;
};

/** Brand palette sampled from the logo. */
const COLORS = ["#0071e3", "#2997ff", "#17c1bb", "#0fa3a0", "#76c40b", "#4fa81a"];

const KINDS: TokenKind[] = ["claim", "claim", "dot", "check", "rupee", "claim", "dot"];

/** How many tokens fit a 1280px header; scaled with width. */
function tokenCount(w: number): number {
  return Math.max(14, Math.min(30, Math.round(w / 52)));
}

export function NavCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let tokens: Token[] = [];
    let pointer = { x: 0.5, y: 0.5 };
    let target = { x: 0.5, y: 0.5 };
    let sweep = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function makeToken(kind?: TokenKind): Token {
      const z = rand(0.35, 1); // depth
      return {
        x: rand(-40, w + 40),
        y: rand(h * 0.12, h * 0.88),
        z,
        vx: rand(0.16, 0.62) * (0.45 + z), // nearer tokens move faster
        bob: rand(1.5, 5) * z,
        size: rand(7, 11) * z,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        kind: kind ?? KINDS[Math.floor(Math.random() * KINDS.length)],
        phase: rand(0, Math.PI * 2),
      };
    }

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const want = tokenCount(w);
      if (tokens.length > want) tokens = tokens.slice(0, want);
      while (tokens.length < want) tokens.push(makeToken());
    }

    /** Rounded rect helper. */
    function roundRect(x: number, y: number, rw: number, rh: number, r: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + rw, y, x + rw, y + rh, r);
      ctx.arcTo(x + rw, y + rh, x, y + rh, r);
      ctx.arcTo(x, y + rh, x, y, r);
      ctx.arcTo(x, y, x + rw, y, r);
      ctx.closePath();
    }

    function drawToken(t: Token, time: number) {
      if (!ctx) return;
      // pointer parallax: nearer tokens shift more (depth cue)
      const px = (pointer.x - 0.5) * 14 * t.z;
      const py = (pointer.y - 0.5) * 6 * t.z;
      const bobY = Math.sin(time * 0.0011 + t.phase) * t.bob;
      const x = t.x + px;
      const y = t.y + bobY + py;
      const s = t.size;
      // fade at the edges so tokens never hard-clip
      const edgeFade = Math.min(1, Math.min(x, w - x) / 26);
      const alpha = (0.16 + t.z * 0.4) * edgeFade;
      if (alpha <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = t.color;
      ctx.fillStyle = t.color;
      ctx.lineWidth = Math.max(1, s * 0.14);

      if (t.kind === "claim") {
        // a claim sheet: rounded rect, a status dot, a hairline
        const rw = s * 2.5;
        const rh = s * 1.7;
        roundRect(x - rw / 2, y - rh / 2, rw, rh, s * 0.42);
        ctx.globalAlpha = alpha * 0.55;
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x - rw / 2 + s * 0.42, y, s * 0.16, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x - rw / 2 + s * 0.85, y);
        ctx.lineTo(x + rw / 2 - s * 0.3, y);
        ctx.stroke();
      } else if (t.kind === "dot") {
        ctx.beginPath();
        ctx.arc(x, y, s * 0.42, 0, Math.PI * 2);
        ctx.fill();
      } else if (t.kind === "check") {
        ctx.lineWidth = Math.max(1.4, s * 0.26);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - s * 0.5, y);
        ctx.lineTo(x - s * 0.1, y + s * 0.42);
        ctx.lineTo(x + s * 0.6, y - s * 0.45);
        ctx.stroke();
      } else {
        // rupee glyph
        ctx.font = `600 ${Math.round(s * 1.5)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("₹", x, y + s * 0.1);
      }
      ctx.restore();
    }

    /** Soft light sweep crossing the bar — a "scan" of the queue. */
    function drawSweep(x: number) {
      if (!ctx) return;
      const g = ctx.createLinearGradient(x - 90, 0, x + 90, 0);
      g.addColorStop(0, "rgba(41,151,255,0)");
      g.addColorStop(0.5, "rgba(41,151,255,0.10)");
      g.addColorStop(1, "rgba(41,151,255,0)");
      ctx.save();
      ctx.fillStyle = g;
      ctx.fillRect(x - 90, 0, 180, h);
      ctx.restore();
    }

    function frame(time: number) {
      if (!ctx) return;
      // ease the parallax toward the pointer
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      if (sweep > -160 && sweep < w + 160) drawSweep(sweep);

      for (const t of tokens) {
        t.x += t.vx;
        if (t.x > w + 60) {
          Object.assign(t, makeToken(t.kind), { x: -60, y: rand(h * 0.12, h * 0.88) });
        }
        drawToken(t, time);
      }
    }

    /* ---------------- GSAP drives the loop ---------------- */

    if (shouldSkipAnimation()) {
      resize();
      frame(0);
      return () => ctx.clearRect(0, 0, w, h);
    }

    /** One ticker callback advances the sweep and paints a frame. */
    const loop = (time: number, delta: number) => {
      sweep += (delta / 1000) * 90; // ~90px/s
      if (sweep > w + 180) sweep = -200;
      frame(time);
    };
    gsap.ticker.add(loop);

    function onPointerMove(e: PointerEvent) {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      target.x = (e.clientX - r.left) / r.width;
      target.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    }
    function onPointerLeave() {
      target.x = 0.5;
      target.y = 0.5;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);

    resize();

    return () => {
      gsap.ticker.remove(loop);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, w, h);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
