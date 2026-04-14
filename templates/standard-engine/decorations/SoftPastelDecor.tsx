"use client";

/**
 * SOFT PASTEL DECORATION PACK
 *
 * NOTE TO DEVELOPERS:
 * Please maintain the descriptive position comments (e.g., "Top Left", "Bottom Right")
 * when editing this file. They serve as critical visual markers for adjusting
 * decorative elements without needing to reload the preview constantly.
 */

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTemplateContext } from "../../_shared/components/TemplateShell";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SoftPastelDecor({
  theme,
  mode = "all",
}: {
  theme?: any;
  mode?: "all" | "background" | "hero-zoom" | "page-static";
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { preview } = useTemplateContext();

  useGSAP(
    () => {
      // Subtle float and rotation for flowers
      // Gentle organic sway for flowers (Removed Y to prevent "bouncing" feel)
      gsap.to(".flower", {
        x: "random(-15, 15)",
        y: 0, // Explicitly lock Y
        rotation: "random(-6, 6)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
        stagger: {
          amount: 2,
          from: "random",
        },
      });

      // Gentle drift for lines
      gsap.to(".line", {
        opacity: 0.3,
        x: "random(-10, 10)",
        y: 0, // Explicitly lock Y
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        force3D: true,
        stagger: {
          each: 0.8,
          from: "random",
        },
      });

      // Entrance animation - starts scaled up and blurred, settles to 1
      gsap.from(".decor-item", {
        scale: 1.1,
        opacity: 0,
        filter: "blur(10px)",
        duration: 2.5,
        ease: "power2.out",
        stagger: 0.2,
      });
    },
    { scope: containerRef, dependencies: [preview] },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Background Watercolor - Base texture (Stays static) */}
      {(mode === "all" || mode === "background") && (
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <Image
            src="/templates/rose-lavendar/watercolor-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Hero Zoom Elements (These fly forward via GSAP in SectionHero) */}
      {(mode === "all" || mode === "hero-zoom") && (
        <div className="decor-items-layer absolute inset-0">
          {/* Flower 1 - Positioned at Top Right corner - Anchored to top-right for sway */}
          <div className="absolute -top-22 -right-26 w-82 h-82 decor-item flower opacity-80 origin-top-right">
            <Image
              src="/templates/rose-lavendar/flower-1.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 60vw, 40vw"
            />
          </div>
          {/* Flower 2 - Positioned at Bottom Left area of Hero - Anchored to bottom-left for sway */}
          <div className="absolute bottom-[4%] -left-28 w-82 h-82 decor-item flower opacity-80 origin-bottom-left">
            <Image
              src="/templates/rose-lavendar/flower-1.png"
              alt=""
              fill
              className="object-contain scale-x-[-1] -rotate-8"
              sizes="(max-width: 768px) 40vw, 30vw"
            />
          </div>
        </div>
      )}

      {/* Page Static Elements (These scroll normally with the page) */}
      {(mode === "all" || mode === "page-static") && (
        <>
          {/* Abstract Lines */}
          <div className="absolute top-[-.5%] -left-20 w-72 h-36 decor-item line opacity-25 rotate-24">
            <Image
              src="/templates/rose-lavendar/line-1.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 70vw, 40vw"
            />
          </div>
          <div className="absolute top-[35%] -right-36 w-80 h-40 decor-item line opacity-15 -rotate-12 origin-left">
            <Image
              src="/templates/rose-lavendar/line-2.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
          </div>
          <div className="absolute bottom-[25%] -left-20 w-80 h-40 decor-item line opacity-15 rotate-45 origin-right">
            <Image
              src="/templates/rose-lavendar/line-3.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
          </div>

          {/* Flowers */}
          <div className="absolute top-[45%] -left-20 w-48 h-48 decor-item flower opacity-30 origin-center">
            <Image
              src="/templates/rose-lavendar/flower-2.png"
              alt=""
              fill
              className="object-contain rotate-120"
              sizes="(max-width: 768px) 40vw, 30vw"
            />
          </div>
          <div className="absolute -bottom-14 -right-28 w-72 h-72 decor-item flower opacity-80 origin-bottom-right">
            <Image
              src="/templates/rose-lavendar/flower-1.png"
              alt=""
              fill
              className="object-contain rotate-160"
              sizes="(max-width: 768px) 70vw, 50vw"
            />
          </div>
        </>
      )}
    </div>
  );
}
