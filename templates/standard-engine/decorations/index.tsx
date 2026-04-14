"use client";

import React from "react";
import { SoftPastelDecor } from "./SoftPastelDecor";
import { PastelRoseDecor } from "./PastelRoseDecor";
import type { StandardDesignConfig } from "@/templates/_shared/types";

/**
 * Registry of available decoration packs for the Standard Tier engine.
 */
export const DECORATION_PACKS: Record<
  string,
  React.ComponentType<{ theme?: any; mode?: any }>
> = {
  "rose-lavendar": SoftPastelDecor,
  "pastel-rose": PastelRoseDecor,
};

interface DecorationLayerProps {
  pack?: string;
  theme?: StandardDesignConfig["theme"];
  mode?: "all" | "background" | "hero-zoom" | "page-static";
}

/**
 * DecorationLayer dynamically renders a background decoration pack
 * based on the provided 'pack' slug.
 */
export function DecorationLayer({ pack, theme, mode }: DecorationLayerProps) {
  if (!pack) return null;

  const Component = DECORATION_PACKS[pack];
  if (!Component) return null;

  return <Component theme={theme} mode={mode} />;
}
