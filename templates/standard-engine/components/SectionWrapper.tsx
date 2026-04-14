"use client";

import * as React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTemplateContext } from "../../_shared/components/TemplateShell";
import type { SectionConfig } from "../../_shared/types";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionWrapperProps {
  id?: string;
  config?: SectionConfig;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionWrapper({
  id,
  config,
  className,
  children,
  style,
}: SectionWrapperProps) {
  const { preview } = useTemplateContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = config?.visible !== false;

  useGSAP(
    () => {
      if (!containerRef.current || !isVisible) return;

      const targets = gsap.utils.toArray(containerRef.current.children);
      if (targets.length === 0) return;

      try {
        gsap.from(targets, {
          y: 100,
          scale: 0.9,
          filter: "blur(4px)",
          opacity: 0,
          duration: 1.5,
          stagger: {
            amount: 0.4,
            ease: "power2.out",
          },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom-=50",
            scroller: preview ? ".preview-content" : undefined,
            toggleActions: "play none none none",
          },
        });
      } catch (err) {
        if (!preview) console.warn("GSAP error in SectionWrapper:", err);
      }
    },
    { scope: containerRef, dependencies: [isVisible, preview] }
  );

  if (!isVisible) return null;

  return (
    <section
      id={id}
      ref={containerRef}
      suppressHydrationWarning
      className={cn(
        "min-h-[30vh] pt-20 pb-20 flex flex-col items-center justify-center text-center relative",
        className,
      )}
      style={{
        ...style,
        paddingLeft: "var(--side-padding)",
        paddingRight: "var(--side-padding)",
        color: config?.fontColor,
        fontFamily: config?.fontFamily,
      }}
    >
      {/* Background Layer */}
      {config?.backgroundImage && (
        <div
          className="absolute inset-0 z-[-1] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("${config.backgroundImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {children}
    </section>
  );
}
