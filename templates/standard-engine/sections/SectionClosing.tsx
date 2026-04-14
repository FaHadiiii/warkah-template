"use client";

import * as React from "react";
import { SectionWrapper } from "../components/SectionWrapper";
import { Watermark } from "@/components/ui/watermark";
import { DEFAULT_TEXTS } from "../../_shared/constants/texts";
import { useTemplateContext } from "../../_shared/components/TemplateShell";
import type { SectionConfig, StandardDesignConfig } from "../../_shared/types";

interface SectionClosingProps {
  config?: SectionConfig;
  designTheme: StandardDesignConfig["theme"];
}

export function SectionClosing({
  config,
  designTheme = {},
}: SectionClosingProps) {
  const { dict } = useTemplateContext();

  return (
    <SectionWrapper id="closing" config={config} className="pt-24">
      <h3 className="text-2xl italic mb-6">{dict.closing.title}</h3>
      <p className="text-sm opacity-60 max-w-sm mx-auto leading-relaxed">
        {designTheme.closingText || dict.closing.message}
      </p>
    </SectionWrapper>
  );
}
