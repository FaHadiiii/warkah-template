"use client";

/**
 * PASTEL ROSE DECORATION PACK
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

export function PastelRoseDecor({
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
      // 1. Organic Sway for Flowers (Referencing SoftPastel pattern)
      gsap.to(".flower", {
        x: "random(-15, 15)",
        y: 0,
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

      // 1b. Subtle Sway for specifically targeted flowers
      gsap.to(".flower-subtle", {
        x: "random(-5, 5)",
        y: 0,
        rotation: "random(-2, 2)",
        duration: "random(8, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });

      // 2. Fluttering Butterflies
      gsap.to(".butterfly", {
        x: "random(-30, 30)",
        y: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(4, 7)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
        stagger: {
          amount: 3,
          from: "random",
        },
      });

      // 3. Twinkling Stars
      gsap.to(".star", {
        opacity: "random(0.3, 0.7)",
        scale: "random(0.9, 1.1)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: {
          amount: 5,
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
        stagger: 0.15,
      });
    },
    { scope: containerRef, dependencies: [preview] },
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Background Watercolor - Base texture */}
      {(mode === "all" || mode === "background") && (
        <div className="absolute inset-0 opacity-90 mix-blend-multiply">
          <Image
            src="/templates/pastel-rose/watercolor-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Hero Zoom Elements */}
      {(mode === "all" || mode === "hero-zoom") && (
        <div className="decor-items-layer absolute inset-0">
          {/* Position: Top Right corner - anchored for sway */}
          <div className="absolute -top-10 -right-24 w-80 h-80 decor-item flower opacity-90 origin-top-right">
            <Image
              src="/templates/pastel-rose/flower-1.png"
              alt=""
              fill
              className="object-contain rotate-80"
              sizes="(max-width: 768px) 60vw, 40vw"
            />
          </div>

          {/* Position: Bottom Left area - anchored for sway */}
          <div className="absolute bottom-[4%] -left-22 w-80 h-80 decor-item flower opacity-80 origin-bottom-left">
            <Image
              src="/templates/pastel-rose/flower-1.png"
              alt=""
              fill
              className="object-contain scale-y-[-1]"
              sizes="(max-width: 768px) 50vw, 30vw"
            />
          </div>

          {/* Position: Top Left Butterfly */}
          <div className="absolute top-[12%] left-[5%] w-14 h-14 decor-item butterfly">
            <Image
              src="/templates/pastel-rose/butterfly.png"
              alt=""
              fill
              className="object-contain opacity-70"
              sizes="64px"
            />
          </div>
        </div>
      )}

      {/* Page Static Elements */}
      {(mode === "all" || mode === "page-static") && (
        <>
          {/* Stars Scattered */}
          <div className="absolute top-[20%] right-[10%] w-10 h-10 decor-item star opacity-40">
            <Image
              src="/templates/pastel-rose/stars.png"
              alt=""
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <div className="absolute top-[45%] left-[5%] w-12 h-12 decor-item star opacity-30">
            <Image
              src="/templates/pastel-rose/stars.png"
              alt=""
              fill
              className="object-contain rotate-12"
              sizes="32px"
            />
          </div>
          <div className="absolute bottom-[29%] right-[10%] w-12 h-12 decor-item star opacity-40">
            <Image
              src="/templates/pastel-rose/stars.png"
              alt=""
              fill
              className="object-contain -rotate-12"
              sizes="48px"
            />
          </div>

          {/* Position: Middle Butterfly Decoration (Swapped from Ring) */}
          <div className="absolute top-[35%] right-4 w-14 h-14 decor-item butterfly origin-right">
            <Image
              src="/templates/pastel-rose/butterfly.png"
              alt=""
              fill
              className="object-contain opacity-20"
              sizes="80px"
            />
          </div>

          {/* Position: Lower Right Butterfly */}
          <div className="absolute bottom-[20%] right-[25%] w-14 h-14 decor-item butterfly opacity-60 -rotate-12">
            <Image
              src="/templates/pastel-rose/butterfly.png"
              alt=""
              fill
              className="object-contain scale-x-[-1]"
              sizes="56px"
            />
          </div>

          {/* Position: Bottom Right Flower corner */}
          <div className="absolute -bottom-16 -right-24 w-72 h-72 decor-item flower-subtle opacity-90 origin-bottom-right">
            <Image
              src="/templates/pastel-rose/flower-1.png"
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
