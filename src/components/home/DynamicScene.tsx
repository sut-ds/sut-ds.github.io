"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";

import styles from "./DynamicScene.module.css";

export type SceneIntensity = "subtle" | "hero";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "teal" | "blue";
};

type DynamicSceneProps = {
  className?: string;
  intensity?: SceneIntensity;
};

function createNodes(width: number, height: number, count: number): Node[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    r: 1.1 + Math.random() * 1.8,
    pulse: Math.random() * Math.PI * 2,
  }));
}

function createOrbs(width: number, height: number, count: number): Orb[] {
  return Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.06,
    vy: (Math.random() - 0.5) * 0.05,
    r: Math.min(width, height) * (0.12 + Math.random() * 0.18),
    hue: index % 2 === 0 ? "teal" : "blue",
  }));
}

/**
 * Decorative canvas atmosphere. No third-party animation libraries.
 * aria-hidden + pointer-events none; null when reduced-motion or canvas fails.
 */
export function DynamicScene({
  className,
  intensity = "subtle",
}: DynamicSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [mobileTier, setMobileTier] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMedia = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setMotionAllowed(!motionMedia.matches);
      setMobileTier(mobileMedia.matches);
    };

    sync();
    motionMedia.addEventListener("change", sync);
    mobileMedia.addEventListener("change", sync);
    return () => {
      motionMedia.removeEventListener("change", sync);
      mobileMedia.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed || failed) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let context: CanvasRenderingContext2D | null = null;
    try {
      context = canvas.getContext("2d", { alpha: true });
    } catch {
      setFailed(true);
      return;
    }

    if (!context) {
      setFailed(true);
      return;
    }

    const ctx = context;
    let frame = 0;
    let nodes: Node[] = [];
    let orbs: Orb[] = [];
    let width = 0;
    let height = 0;
    let linkDistance = 140;
    let active = true;
    let tick = 0;

    const isHero = intensity === "hero";
    const nodeCount = mobileTier
      ? isHero
        ? 22
        : 14
      : isHero
        ? 48
        : 28;
    const orbCount = mobileTier ? (isHero ? 3 : 2) : isHero ? 4 : 3;
    const linkAlpha = isHero ? 0.34 : 0.16;
    const nodeAlpha = isHero ? 0.62 : 0.28;
    const orbAlpha = isHero ? 0.22 : 0.1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkDistance = mobileTier ? (isHero ? 120 : 100) : isHero ? 160 : 130;
      nodes = createNodes(width, height, nodeCount);
      orbs = createOrbs(width, height, orbCount);
    };

    const step = () => {
      if (!active) {
        return;
      }

      tick += 1;
      ctx.clearRect(0, 0, width, height);

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r || orb.x > width + orb.r) orb.vx *= -1;
        if (orb.y < -orb.r || orb.y > height + orb.r) orb.vy *= -1;

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.r,
        );
        if (orb.hue === "teal") {
          gradient.addColorStop(0, `rgba(43, 192, 188, ${orbAlpha})`);
          gradient.addColorStop(1, "rgba(43, 192, 188, 0)");
        } else {
          gradient.addColorStop(0, `rgba(78, 136, 196, ${orbAlpha * 1.1})`);
          gradient.addColorStop(1, "rgba(78, 136, 196, 0)");
        }
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isHero) {
        const gridAlpha = 0.045 + Math.sin(tick * 0.008) * 0.01;
        ctx.strokeStyle = `rgba(183, 207, 232, ${gridAlpha})`;
        ctx.lineWidth = 1;
        const stepSize = mobileTier ? 56 : 48;
        for (let x = 0; x < width; x += stepSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += stepSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.x = Math.min(width, Math.max(0, node.x));
        node.y = Math.min(height, Math.max(0, node.y));
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) {
            continue;
          }

          const alpha = (1 - dist / linkDistance) * linkAlpha;
          ctx.strokeStyle = `rgba(122, 167, 214, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const glow = 0.75 + Math.sin(node.pulse) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(43, 192, 188, ${nodeAlpha * glow})`;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (!active || document.hidden) {
        return;
      }
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(step);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [motionAllowed, mobileTier, failed, intensity]);

  if (!motionAllowed || failed) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cx(
        styles.canvas,
        intensity === "subtle" && styles.subtle,
        className,
      )}
      aria-hidden="true"
    />
  );
}
