"use client";

import * as React from "react";
import { createContext, useContext, useRef, useState } from "react";
import type { Song, TemplateConfig, AudioPlayerControls } from "../types";
import { Language, dictionary } from "../dictionary";

// ─── Context ─────────────────────────────────────────────────────────────────
interface TemplateContextValue {
  isOpened: boolean;
  registerOpenAnimation: (
    animateFn: (
      refs: any,
      onComplete: () => void,
      onGateOpen: () => void,
    ) => void,
  ) => void;
  audio: AudioPlayerControls;
  refreshKey: number;
  onAction: (type: string) => void;
  lang: Language;
  dict: any;
  preview?: boolean;
}

const TemplateContext = createContext<TemplateContextValue | undefined>(
  undefined,
);

export function useTemplateContext() {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateShell provider",
    );
  }
  return context;
}

// ─── Component ───────────────────────────────────────────────────────────────
interface TemplateShellProps {
  invitation: any;
  lang?: Language;
  children: React.ReactNode;
}

export function TemplateShell({
  invitation,
  lang = (invitation?.language as Language) || "ms",
  children,
}: TemplateShellProps) {
  const dict = dictionary[lang];

  // ─── Mocks ──────────────────────────────────────────────────────────────────
  const audio: AudioPlayerControls = {
    isPlaying: false,
    currentSongIndex: 0,
    currentSong: { url: "", title: "" },
    togglePlay: () => {},
    onNext: () => {},
    onPrev: () => {},
  };

  const value = React.useMemo(
    () => ({
      isOpened: true,
      registerOpenAnimation: () => {},
      audio,
      refreshKey: 0,
      onAction: () => {}, // No actions in design sandbox
      lang: lang as Language,
      dict,
      preview: true,
    }),
    [lang, dict],
  );

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}
