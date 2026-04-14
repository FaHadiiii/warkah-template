"use client";

import * as React from "react";
import { SectionWrapper } from "../components/SectionWrapper";
import { DEFAULT_TEXTS } from "../../_shared/constants/texts";
import type { SectionConfig, StandardDesignConfig } from "../../_shared/types";
import { cn } from "@/lib/utils";
import { useTemplateContext } from "../../_shared/components/TemplateShell";

interface SectionCoupleProps {
  invitation: any;
  config?: SectionConfig;
  designTheme: StandardDesignConfig["theme"];
}

export function SectionCouple({
  invitation,
  config,
  designTheme = {},
}: SectionCoupleProps) {
  const { dict } = useTemplateContext();

  return (
    <SectionWrapper config={config}>
      <div className="max-w-xl space-y-8" suppressHydrationWarning>
        <div
          className={cn(
            "flex justify-center mb-10",
            designTheme.showBismillah === false && "hidden",
          )}
          suppressHydrationWarning
        >
          <div
            className="w-48 h-12 bg-[var(--secondary)]"
            style={{
              maskImage: "url(/images/bismillah_black.svg)",
              WebkitMaskImage: "url(/images/bismillah_black.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </div>
        <div className="space-y-6 mb-12" suppressHydrationWarning>
          <p
            className="opacity-70 max-w-sm mx-auto leading-relaxed text-sm"
            suppressHydrationWarning
          >
            {designTheme.openingText || dict.invitation.opening}
          </p>
          <p
            className="opacity-70 max-w-sm mx-auto leading-relaxed text-sm"
            suppressHydrationWarning
          >
            {dict.invitation.message}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl">
            {invitation.groomName || dict.placeholders.full_name}
          </h2>
          <div className="text-sm opacity-80 leading-relaxed">
            <p className="mb-2 opacity-60">{dict.profile.son_of}</p>
            <p>{invitation.groomFatherName || dict.placeholders.father_name}</p>
            <p>{invitation.groomMotherName || dict.placeholders.mother_name}</p>
          </div>
        </div>
        <div
          className="text-2xl opacity-30 italic"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          &
        </div>
        <div className="space-y-4">
          <h2 className="text-xl">
            {invitation.brideName || dict.placeholders.full_name}
          </h2>
          <div className="text-sm opacity-80 leading-relaxed">
            <p className="mb-2 opacity-60">{dict.profile.daughter_of}</p>
            <p>{invitation.brideFatherName || dict.placeholders.father_name}</p>
            <p>{invitation.brideMotherName || dict.placeholders.mother_name}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
