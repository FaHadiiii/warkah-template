"use client";

import * as React from "react";
import { useRef, useCallback, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTemplateContext } from "../_shared/components/TemplateShell";
import type { StandardDesignConfig } from "../_shared/types";
import { StandardBottomNav } from "./components/BottomNav";
import { DecorationLayer } from "./decorations";
import { Watermark } from "@/components/ui/watermark";
import { getFontFamily, getGoogleFontsUrl } from "../_shared/constants/fonts";

// Internal Components
import {
  FallingBubbles,
  FloatingPetals,
} from "./components/BackgroundEffects";

// Sections
import { SectionHero } from "./sections/SectionHero";
import { SectionCouple } from "./sections/SectionCouple";
import { SectionEvent } from "./sections/SectionEvent";
import { SectionCountdown } from "./sections/SectionCountdown";
import { SectionClosing } from "./sections/SectionClosing";
import { SectionWishes } from "./sections/SectionWishes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Prevent the browser from trying to restore past scroll positions
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}


const SIZE_MAP: Record<string, number> = {
  small: 0.85,
  normal: 1,
  large: 1.15,
};

export function StandardBaseTemplate({ invitation }: { invitation: any }) {
  const { onAction, registerOpenAnimation } = useTemplateContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const designConfig = (invitation?.designConfig || {}) as StandardDesignConfig;
  const sections = designConfig.sections || {};
  const designTheme = designConfig.theme || {};

  // ─── Animation Registry ───────────────────────────────────────────────────

  const animateFn = useCallback(
    (refs: any, onComplete: () => void, onGateOpen: () => void) => {
      const tl = gsap.timeline({ 
        onComplete: () => {
          onComplete();
          // Force a layout refresh after the entrance to ensure pinning is accurate
          ScrollTrigger.refresh();
        } 
      });
      const style = designConfig.gateStyle || "vertical";
      const type = designConfig.gateType || "split";

      // 1. Button exit (Simple fade and scale)
      tl.to(refs.buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.inOut",
      });

      // 2. Gate Opening
      if (type === "image") {
        if (style === "slide-up") {
          tl.to(
            refs.gateTopRef.current,
            {
              y: "-100vh",
              duration: 1.2,
              ease: "expo.inOut",
              onStart: onGateOpen,
            },
            "-=0.1",
          );
        } else {
          // Default for image is fade
          tl.to(
            refs.gateTopRef.current,
            {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onStart: onGateOpen,
            },
            "-=0.2",
          );
        }
      } else {
        // Type is 'split'
        if (style === "fade") {
          tl.to(
            [refs.gateTopRef.current, refs.gateBottomRef.current],
            {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onStart: onGateOpen,
            },
            "-=0.2",
          );
        } else if (style === "slide-up") {
          tl.to(
            [refs.gateTopRef.current, refs.gateBottomRef.current],
            {
              y: "-100vh",
              duration: 1.2,
              ease: "expo.inOut",
              onStart: onGateOpen,
            },
            "-=0.1",
          );
        } else if (style === "horizontal") {
          tl.to(
            refs.gateTopRef.current,
            { x: "-100vw", duration: 1.2, ease: "expo.inOut" },
            "-=0.1",
          ).to(
            refs.gateBottomRef.current,
            {
              x: "100vw",
              duration: 1.2,
              ease: "expo.inOut",
              onStart: onGateOpen,
            },
            "<",
          );
        } else {
          // Vertical split (default for split type)
          tl.to(
            refs.gateTopRef.current,
            { y: "-100vh", duration: 1.2, ease: "expo.inOut" },
            "-=0.1",
          ).to(
            refs.gateBottomRef.current,
            {
              y: "100vh",
              duration: 1.2,
              ease: "expo.inOut",
              onStart: onGateOpen,
            },
            "<",
          );
        }
      }

      // 3. Hero Entrance
      tl.from(
        "#hero > *",
        {
          y: 100,
          scale: 0.9,
          filter: "blur(4px)",
          opacity: 0,
          stagger: 0.15,
          duration: 1.5,
          ease: "back.out(1.4)",
        },
        "-=0.6",
      );
    },
    [designConfig.gateStyle],
  );

  const registerFn = useMemo(() => () => animateFn, [animateFn]);
  useEffect(() => {
    registerOpenAnimation(registerFn);
    
    // Force reset scroll on mount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      const scroller = document.querySelector(".preview-content");
      if (scroller) scroller.scrollTop = 0;
    }
  }, [registerOpenAnimation, registerFn]);

  // ─── Theme Configuration ───────────────────────────────────────────────

  const textScale =
    typeof designTheme.textSize === "number"
      ? designTheme.textSize
      : SIZE_MAP[designTheme.textSize || "normal"] || 1;

  const primaryFontKey =
    designTheme.primaryFontFamily || designTheme.fontFamily || "serif";
  const secondaryFontKey =
    designTheme.secondaryFontFamily || designTheme.fontFamily || "sans";

  // ─── Section Orchestration ───────────────────────────────────────────────
  const defaultOrder = [
    "hero",
    "couple",
    "event",
    "countdown",
    "wishes",
    "closing",
  ];
  const currentOrder = designConfig.sectionsOrder || defaultOrder;
  const renderOrder = currentOrder.filter((id) =>
    defaultOrder.includes(id as any),
  );

  const sidePaddingPx =
    typeof designTheme.contentWidth === "number"
      ? designTheme.contentWidth
      : 24;

  const sectionComponents: Record<string, React.ReactNode> = {
    hero: (
      <SectionHero
        key="hero"
        invitation={invitation}
        config={sections.hero}
        decorationPack={designConfig.decorationPack}
        theme={designConfig.theme}
      />
    ),
    couple: (
      <SectionCouple
        key="couple"
        invitation={invitation}
        config={sections.couple}
        designTheme={designTheme}
      />
    ),
    event: (
      <SectionEvent
        key="event"
        invitation={invitation}
        config={sections.event}
        designTheme={designTheme}
      />
    ),
    countdown: (
      <SectionCountdown
        key="countdown"
        invitation={invitation}
        config={sections.countdown}
      />
    ),
    wishes: (
      <SectionWishes
        key="wishes"
        invitation={invitation}
        config={sections.wishes}
      />
    ),
    closing: (
      <SectionClosing
        key="closing"
        config={sections.closing}
        designTheme={designTheme}
      />
    ),
  };

  return (
    <div
      ref={containerRef}
      className="StandardTemplate w-full sm:max-w-md sm:mx-auto min-h-screen relative overflow-hidden sm:border-x sm:border-zinc-100/10 sm:shadow-2xl shadow-zinc-900/10"
      style={
        {
          backgroundColor: designTheme.primaryColor || "#FFFFFF",
          "--primary": designTheme.primaryColor || "#FFFFFF",
          "--side-padding": `${sidePaddingPx}px`,
          color: designTheme.fontColor || "#18181b",
          "--text-scale": textScale,
          "--font-primary": getFontFamily(primaryFontKey),
          "--font-secondary": getFontFamily(secondaryFontKey),
          "--secondary": designTheme.secondaryColor || "#18181b",
          "--secondary-alpha": (designTheme.secondaryColor || "#18181b") + "1a",
        } as React.CSSProperties
      }
    >
      <style>{`
        /* Dynamic Font Loading: Managed by Shared Font Registry */
        @import url('https://fonts.googleapis.com/css2?${getGoogleFontsUrl([primaryFontKey, secondaryFontKey])}');
        
        .StandardTemplate { font-family: var(--font-secondary); font-size: calc(0.875rem * var(--text-scale)); }
        .StandardTemplate h1, .StandardTemplate h2, .StandardTemplate h3, 
        .StandardTemplate h4, .StandardTemplate h5, .StandardTemplate h6 { 
          font-family: var(--font-primary) !important; 
          color: var(--secondary);
        }
        .StandardTemplate * { font-family: inherit; }
        
        .StandardTemplate .text-2xs  { font-size: calc(0.625rem * var(--text-scale)) !important; }
        .StandardTemplate .text-xs   { font-size: calc(0.75rem * var(--text-scale)) !important; }
        .StandardTemplate .text-sm   { font-size: calc(0.875rem * var(--text-scale)) !important; }
        .StandardTemplate .text-base { font-size: calc(1rem * var(--text-scale)) !important; }
        .StandardTemplate .text-md   { font-size: calc(1rem * var(--text-scale)) !important; }
        .StandardTemplate .text-lg   { font-size: calc(1.125rem * var(--text-scale)) !important; }
        .StandardTemplate .text-xl   { font-size: calc(1.25rem * var(--text-scale)) !important; }
        .StandardTemplate .text-2xl  { font-size: calc(1.5rem * var(--text-scale)) !important; }
        .StandardTemplate .text-3xl  { font-size: calc(1.875rem * var(--text-scale)) !important; }
        .StandardTemplate .text-4xl  { font-size: calc(2.25rem * var(--text-scale)) !important; }
        .StandardTemplate .text-5xl  { font-size: calc(3rem * var(--text-scale)) !important; }
        .StandardTemplate .text-6xl  { font-size: calc(3.75rem * var(--text-scale)) !important; }
        .StandardTemplate .text-7xl  { font-size: calc(4.5rem * var(--text-scale)) !important; }

      `}</style>

      {/* Background Layer */}
      {designTheme.backgroundEffect === "bubbles" && (
        <FallingBubbles color={designTheme.secondaryColor || "#18181b"} />
      )}
      {designTheme.backgroundEffect === "petals" && (
        <FloatingPetals color={designTheme.secondaryColor || "#18181b"} />
      )}
      {/* Global Background Decoration (Watercolor stays static across the whole page) */}
      <DecorationLayer
        pack={designConfig.decorationPack}
        theme={designConfig.theme}
        mode="background"
      />

      {/* Global Scrolling Decorations (Middle and Closing elements) */}
      <DecorationLayer
        pack={designConfig.decorationPack}
        theme={designConfig.theme}
        mode="page-static"
      />


      {/* Dynamic Content Sections */}
      {renderOrder.includes("hero") && sectionComponents["hero"]}

      <div className="next-sections-wrapper relative z-10 flex flex-col w-full min-h-screen">
        {renderOrder.map(
          (sectionId) => sectionId !== "hero" && sectionComponents[sectionId],
        )}

        {/* Footer Branding (Always Visible) */}
        <div className="pt-8 flex justify-center pb-32 mt-auto">
          <Watermark className="opacity-100 scale-105" />
        </div>
      </div>

      {/* Navigation */}
      <StandardBottomNav
        onLocationClick={
          sections.location?.visible !== false
            ? () => onAction("location")
            : undefined
        }
        onGiftClick={
          invitation.digitalGiftEnabled &&
          sections.digitalGift?.visible !== false
            ? () => onAction("gift")
            : undefined
        }
        onWishesClick={
          sections.guestbook?.visible !== false
            ? () => onAction("wishes")
            : undefined
        }
        onContactsClick={() => onAction("contacts")}
      />
    </div>
  );
}
