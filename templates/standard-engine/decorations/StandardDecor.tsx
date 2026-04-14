"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StandardDecorProps {
  pack: "soft-blue" | "soft-tropical" | "gold-pinky";
  mode?: "all" | "background" | "hero-zoom" | "page-static";
}

const PACK_ASSETS = {
  "soft-blue": {
    bg: "/templates/soft-blue/background.png",
    items: [
      { src: "/templates/soft-blue/flower.png", pos: "top-right", type: "flower" },
      { src: "/templates/soft-blue/leaf.png", pos: "bottom-left", type: "leaf" },
      { src: "/templates/soft-blue/butterfly.png", pos: "middle-right", type: "float" },
    ]
  },
  "soft-tropical": {
    bg: "/templates/soft-tropical/background.png",
    items: [
      { src: "/templates/soft-tropical/flower-1.png", pos: "top-left", type: "flower" },
      { src: "/templates/soft-tropical/leaf-1.png", pos: "top-right", type: "leaf" },
      { src: "/templates/soft-tropical/flower-2.png", pos: "bottom-right", type: "flower" },
      { src: "/templates/soft-tropical/butterfly.png", pos: "middle-left", type: "float" },
    ]
  },
  "gold-pinky": {
    bg: "/templates/gold-pinky/background.png",
    items: [
      { src: "/templates/gold-pinky/flower.png", pos: "top-right", type: "flower" },
      { src: "/templates/gold-pinky/gold-leaf-1.png", pos: "bottom-left", type: "leaf" },
      { src: "/templates/gold-pinky/gold-leaf-2.png", pos: "top-left", type: "leaf" },
      { src: "/templates/gold-pinky/splash.png", pos: "center", type: "bg-item" },
    ]
  }
};

export function StandardDecor({ pack, mode = "all" }: StandardDecorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const assets = PACK_ASSETS[pack];

  useGSAP(() => {
    // Shared animations for all packs
    gsap.to(".decor-flower", {
      rotation: "random(-5, 5)",
      x: "random(-10, 10)",
      duration: "random(4, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".decor-float", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      duration: "random(5, 8)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  if (!assets) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Layer */}
      {(mode === "all" || mode === "background") && (
        <div className="absolute inset-0 opacity-30 mix-blend-multiply">
          <Image src={assets.bg} alt="" fill className="object-cover" sizes="100vw" priority />
        </div>
      )}

      {/* Hero Zoom Items */}
      {(mode === "all" || mode === "hero-zoom") && (
        <div className="absolute inset-0">
          {assets.items.filter(i => i.pos.includes("top") || i.pos.includes("bottom")).map((item, idx) => (
             <div 
               key={idx}
               className={`absolute w-64 h-64 opacity-80 decor-item ${item.type === 'flower' ? 'decor-flower' : ''} ${
                 item.pos === 'top-right' ? '-top-10 -right-10' :
                 item.pos === 'top-left' ? '-top-10 -left-10' :
                 item.pos === 'bottom-right' ? '-bottom-10 -right-10' :
                 item.pos === 'bottom-left' ? '-bottom-10 -left-10' : ''
               }`}
             >
                <Image src={item.src} alt="" fill className="object-contain" sizes="50vw" />
             </div>
          ))}
        </div>
      )}

      {/* Floating Items */}
      {(mode === "all" || mode === "page-static") && (
        <div className="absolute inset-0">
           {assets.items.filter(i => i.pos.includes("middle") || i.pos === 'center').map((item, idx) => (
             <div 
               key={idx}
               className={`absolute w-32 h-32 opacity-40 decor-float ${
                 item.pos === 'middle-right' ? 'top-1/2 -right-10' :
                 item.pos === 'middle-left' ? 'top-1/3 -left-10' :
                 item.pos === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''
               }`}
             >
                <Image src={item.src} alt="" fill className="object-contain" sizes="30vw" />
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
