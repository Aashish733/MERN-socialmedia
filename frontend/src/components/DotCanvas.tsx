// src/components/DotCanvas.tsx
import { useEffect, useRef } from "react";

export default function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 12; // spacing like Stitch
    const RADIUS = 120; // smooth interaction radius

    function resize() {
    if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
    if (!canvas) return;

      const W = canvas.width;
      const H = canvas.height;
      const { x: mx, y: my } = mouse.current;

      // ---- Background (Stitch-like gradient) ----
    if (!ctx) return;

      const gradient = ctx.createRadialGradient(
        W * 0.2,
        H * 0.2,
        0,
        W * 0.5,
        H * 0.5,
        W,
      );

      gradient.addColorStop(0, "#F8FAFC");
      gradient.addColorStop(0.5, "#F1F5F9");
      gradient.addColorStop(1, "#E2E8F0");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // ---- Dots ----
      for (let r = 0; r <= H / GRID + 1; r++) {
        for (let c = 0; c <= W / GRID + 1; c++) {
          const x = c * GRID;
          const y = r * GRID;

          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          const t = Math.max(0, 1 - dist / RADIUS);

          // size grows near cursor
          const baseSize = 0.3;
          const size = baseSize + t * 0.8;

          // controlled opacity (no muddy look)
          const alpha = 0.8 + t * 0.1;

          // slightly darker + bluish when active
          const rCol = 120 - t * 40;
          const gCol = 120 - t * 40;
          const bCol = 130 + t * 20;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha})`;
          ctx.fill();

          // ---- Sharp highlight core (premium effect) ----
          if (t > 0.6) {
            ctx.beginPath();
            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${t * 0.9})`;
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
      }}
    />
  );
}
