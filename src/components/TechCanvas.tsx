import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Animated "tech texture" backdrop for the hero: a drifting particle network
 * (nodes + connecting lines) rendered on a <canvas>. It reads as a living
 * data/fabric texture behind the hero copy without competing with it.
 *
 * - Pauses when the tab is hidden or the element leaves the viewport.
 * - Renders a single static frame when the user prefers reduced motion.
 * - Auto-throttles frame rate on small screens / high devicePixelRatio.
 */
export function TechCanvas({
  className = "",
  density = 0.00013,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(w * h * density);
      const count = Math.max(40, Math.min(target, 120));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const linkDist = Math.min(210, Math.max(130, w / 6));

      // Connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.5;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes — azure network with occasional green "live" nodes and a soft glow
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isLive = i % 6 === 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, isLive ? 2.8 : 2.1, 0, Math.PI * 2);
        ctx.fillStyle = isLive ? "rgba(16, 185, 129, 0.75)" : "rgba(2, 132, 199, 0.65)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = isLive ? "rgba(16, 185, 129, 0.5)" : "rgba(14, 165, 233, 0.45)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const step = () => {
      if (!running) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    draw();

    if (!reduced) {
      raf = requestAnimationFrame(step);
    }

    const onResize = () => {
      resize();
      if (reduced) draw();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className={`tech-canvas ${className}`} />;
}
