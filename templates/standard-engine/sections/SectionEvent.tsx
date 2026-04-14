"use client";

import * as React from "react";
import { SectionWrapper } from "../components/SectionWrapper";
import type { SectionConfig, StandardDesignConfig } from "../../_shared/types";
import { useTemplateContext } from "../../_shared/components/TemplateShell";
import { DEFAULT_TEXTS } from "../../_shared/constants/texts";

interface SectionEventProps {
  invitation: any;
  config?: SectionConfig;
  designTheme?: StandardDesignConfig["theme"];
}

export function SectionEvent({
  invitation,
  config,
  designTheme = {},
}: SectionEventProps) {
  const { dict, lang } = useTemplateContext();
  const eventDict = dict.event;

  return (
    <SectionWrapper id="event" config={config}>
      <div className="space-y-12 w-full max-w-md">
        <div className="space-y-3" suppressHydrationWarning>
          <h2
            className="text-2xl italic tracking-tight"
            suppressHydrationWarning
          >
            {eventDict.title}
          </h2>
          <p className="text-xs opacity-40 font-light flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-gradient-to-l from-[currentColor] to-transparent opacity-20" />
            {eventDict.subtitle}
            <span className="w-16 h-[1px] bg-gradient-to-r from-[currentColor] to-transparent opacity-20" />
          </p>
        </div>

        <div className="relative py-10">
          {/* Top Divider */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary-alpha)] to-transparent" />
          {/* Bottom Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--secondary-alpha)] to-transparent" />

          <div className="grid grid-cols-3 gap-0">
            <div className="text-center">
              <span className="block text-xl">
                {invitation.eventDate
                  ? new Date(invitation.eventDate).getDate()
                  : "--"}
              </span>
              <span className="text-2xs opacity-40 uppercase">
                {eventDict.day}
              </span>
            </div>

            <div className="relative text-center">
              {/* Left Divider */}
              <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-[var(--secondary-alpha)] to-transparent" />
              {/* Right Divider */}
              <div className="absolute right-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-[var(--secondary-alpha)] to-transparent" />

              <span className="block text-xl font-serif">
                {invitation.eventDate
                  ? new Date(invitation.eventDate).toLocaleDateString(
                      lang === "en" ? "en-GB" : "ms-MY",
                      {
                        month: "short",
                      },
                    )
                  : "---"}
              </span>
              <span className="text-2xs opacity-40 uppercase">
                {eventDict.month}
              </span>
            </div>

            <div className="text-center">
              <span className="block text-xl">
                {invitation.eventDate
                  ? new Date(invitation.eventDate).getFullYear()
                  : "----"}
              </span>
              <span className="text-2xs opacity-40 uppercase">
                {eventDict.year}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-md mb-4">
            {invitation.eventTime || dict.placeholders.time}
          </p>
          <p className="opacity-70">
            {invitation.venueName || dict.placeholders.venue}
          </p>
          <p className="text-sm opacity-50 px-8 leading-relaxed">
            {invitation.address ||
              invitation.venueAddress ||
              dict.placeholders.address}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
