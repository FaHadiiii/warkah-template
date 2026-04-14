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

import { DecorationLayer } from "../decorations";

interface SectionHeroProps {
  invitation: any;
  config?: SectionConfig;
  decorationPack?: string;
  theme?: any;
}

export function SectionHero({
  invitation,
  config,
  decorationPack,
  theme,
}: SectionHeroProps) {
  const { dict, lang, preview } = useTemplateContext();
  const containerRef = useRef<HTMLElement>(null);
  const isVisible = config?.visible !== false;

  useGSAP(
    () => {
      if (!isVisible || !containerRef.current) return;

      // DEFENSE: If in preview mode, wait until the scroller exists in the DOM
      if (preview && !document.querySelector(".preview-content")) return;

      // Synchronized scrubbing timeline with pinning merged in
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%", // REDUCED: Much shorter scroll needed now
          scrub: 0.8, // Slightly tighter scrub for snappier response
          pin: true,
          pinSpacing: false,
          scroller: preview ? ".preview-content" : undefined,
          invalidateOnRefresh: true,
        },
      });

      // 1. Text fades out & shrinks backwards
      tl.to(
        ".hero-text",
        {
          opacity: 0,
          scale: 0.6,
          duration: 1,
          y: -60,
          ease: "none", // Linear fade feels more natural for scrubbing
        },
        0,
      );

      // 2. Decorations fly forward (scale up) and fade
      tl.fromTo(
        ".decor-items-layer",
        { scale: 1, opacity: 1 },
        { scale: 2.5, opacity: 0, duration: 1, ease: "power2.in" },
        0,
      );

      // 3. Portal zoom effect for the next sections
      tl.fromTo(
        ".next-sections-wrapper",
        {
          scale: 0.8,
          opacity: 0,
          filter: "blur(6px)",
          y: "15vh",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          y: "0vh",
          duration: 1.2,
          ease: "power1.out",
        },
        0.05,
      );
    },
    { dependencies: [isVisible, preview] },
  );

  if (!isVisible) return null;

  return (
    <section
      ref={containerRef}
      id="hero"
      suppressHydrationWarning
      className={cn(
        "py-0 flex flex-col items-center justify-center text-center relative z-0",
      )}
      style={{
        minHeight: "100svh",
        paddingLeft: "var(--side-padding)",
        paddingRight: "var(--side-padding)",
        color: config?.fontColor,
        fontFamily: config?.fontFamily,
      }}
    >
      {/* 
          Decoration Layer moved INSIDE the Hero.
          Wrapped in hero-decor-wrapper to prevent GSAP loop conflicts.
      */}
      <div className="hero-decor-wrapper absolute inset-0 pointer-events-none z-0">
        <DecorationLayer pack={decorationPack} theme={theme} mode="hero-zoom" />
      </div>

      {/* Optional Background Layer if configured */}
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

      {/* Content wrapper for scaling */}
      <div className="hero-text w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <span
          className="text-sm tracking-[0.15em] opacity-60 mb-8 block"
          suppressHydrationWarning
        >
          {invitation.title || dict.placeholders.title}
        </span>
        <h1 className="text-4xl sm:text-6xl mb-12 leading-tight text-center">
          {invitation.groomNickname ||
            invitation.groomName ||
            dict.placeholders.name}{" "}
          <br />
          <span className="text-2xl opacity-40">&</span> <br />
          {invitation.brideNickname ||
            invitation.brideName ||
            dict.placeholders.name}
        </h1>
        <p className="text-sm tracking-[0.15em] opacity-70 mb-10">
          {invitation.eventDate
            ? new Date(invitation.eventDate).toLocaleDateString(
                lang === "en" ? "en-GB" : "ms-MY",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )
            : dict.placeholders.date}
        </p>
      </div>
    </section>
  );
}
