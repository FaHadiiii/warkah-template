"use client";

import * as React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



export function FallingBubbles({ color }: { color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const bubbles = gsap.utils.toArray(".bubble");

      const updateBounds = () => {
        if (!containerRef.current) return { w: 0, h: 0 };
        return {
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        };
      };

      const { w, h } = updateBounds();

      bubbles.forEach((bubble: any) => {
        // Initial setup - scatter them initially so the screen isn't empty
        const initialY = gsap.utils.random(-20, h);
        gsap.set(bubble, {
          x: gsap.utils.random(0, w),
          y: initialY,
          opacity: 0,
          scale: gsap.utils.random(0.5, 1.5),
        });

        const fall = (b: any, isInitial = false) => {
          const { h: currentH, w: currentW } = updateBounds();
          const startY = -20;
          const endY = currentH + 100;

          const currentY = gsap.getProperty(b, "y") as number;
          const remainingDist = endY - currentY;
          const totalDist = endY - startY;

          const baseDuration = gsap.utils.random(40, 80);
          const duration = isInitial
            ? (remainingDist / totalDist) * baseDuration
            : baseDuration;

          // Add a bit of horizontal drift
          gsap.to(b, {
            x: `+=${gsap.utils.random(-150, 150)}`,
            duration: duration,
            ease: "sine.inOut",
          });

          gsap.to(b, {
            y: endY,
            opacity: gsap.utils.random(0.02, 0.08),
            duration: duration,
            ease: "none",
            onComplete: () => {
              gsap.set(b, { y: -20, x: gsap.utils.random(0, currentW) });
              fall(b);
            },
          });
        };

        fall(bubble, true);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {[...Array(45)].map((_, i) => (
        <div
          key={i}
          className="bubble absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export function FloatingPetals({ color }: { color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const petals = gsap.utils.toArray(".petal");

      const updateBounds = () => {
        if (!containerRef.current) return { w: 0, h: 0 };
        return {
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        };
      };

      const { w, h } = updateBounds();

      petals.forEach((petal: any) => {
        // Initial setup
        const initialY = gsap.utils.random(-100, h);
        gsap.set(petal, {
          x: gsap.utils.random(0, w),
          y: initialY,
          opacity: 0,
          rotation: gsap.utils.random(0, 360),
          scale: gsap.utils.random(0.3, 0.8),
        });

        const fall = (p: any, isInitial = false) => {
          const { h: currentH, w: currentW } = updateBounds();
          const startY = -50;
          const endY = currentH + 100;

          const currentY = gsap.getProperty(p, "y") as number;
          const remainingDist = endY - currentY;
          const totalDist = endY - startY;

          const baseDuration = gsap.utils.random(30, 60);
          const duration = isInitial
            ? (remainingDist / totalDist) * baseDuration
            : baseDuration;

          // Enhanced side-to-side sway with rotation
          gsap.to(p, {
            x: `+=${gsap.utils.random(-250, 250)}`,
            duration: duration,
            ease: "sine.inOut",
          });

          // Falling and rotating
          gsap.to(p, {
            y: endY,
            rotation: `+=${gsap.utils.random(360, 720)}`,
            opacity: gsap.utils.random(0.1, 0.3),
            duration: duration,
            ease: "none",
            onComplete: () => {
              gsap.set(p, { y: -50, x: gsap.utils.random(0, currentW) });
              fall(p);
            },
          });
        };

        fall(petal, true);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {[...Array(35)].map((_, i) => (
        <div
          key={i}
          className="petal absolute select-none"
          style={{ width: "20px", height: "24px" }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundColor: color,
              borderRadius: "50% 0 50% 50%",
              opacity: 0.3,
              boxShadow: `0 0 10px ${color}33`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
