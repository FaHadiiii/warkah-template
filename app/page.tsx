"use client";

import React, { useState } from "react";
import { TemplateShell } from "@/templates/_shared/components/TemplateShell";
import { StandardBaseTemplate } from "@/templates/standard-engine/Template";
import { TEMPLATE_MAP } from "@/templates/registry";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_INVITATION = {
  id: "mock-123",
  title: "Walimatul Urus",
  groomNickname: "Ahmad",
  brideNickname: "Sarah",
  groom: {
    name: "Ahmad Bin Abdullah",
    parentsName: "Abdullah & Aminah",
    role: "groom",
  },
  bride: {
    name: "Sarah Binti Yusof",
    parentsName: "Yusof & Zainab",
    role: "bride",
  },
  event: {
    label: "Majlis Kesyukuran",
    venue: "Dewan Merdeka",
    address: "No 1, Jalan Merah, Kuala Lumpur",
    date: "2026-12-25T12:00:00",
    mapsUrl: "https://maps.google.com",
  },
  language: "ms",
  // Default design config that gets overridden by the selected template's default
  designConfig: {
    theme: {
      primaryColor: "#FFF9F9",
      secondaryColor: "#E8A0A0",
      fontFamily: "serif",
      textSize: "normal",
    },
    sectionsOrder: ["hero", "couple", "event", "countdown", "wishes", "closing"],
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      countdown: { visible: true },
      wishes: { visible: true },
      closing: { visible: true },
    },
  },
};

export default function PreviewPage() {
  const [activeSlug, setActiveSlug] = useState("pastel-rose");
  const templateEntry = TEMPLATE_MAP[activeSlug];

  if (!templateEntry) return <div>Template not found</div>;

  // Merge the mock invitation with the template's default design config
  const invitation = {
    ...MOCK_INVITATION,
    designConfig: {
      ...MOCK_INVITATION.designConfig,
      ...templateEntry.config.defaultDesignConfig,
    },
  };

  return (
    <main className="h-screen overflow-hidden bg-zinc-100">
      {/* Template Chooser (Hidden in production-like feel, but useful for dev) */}
      <div className="fixed top-4 left-4 z-[200] flex flex-col gap-2">
        {Object.keys(TEMPLATE_MAP).map((slug) => (
          <button
            key={slug}
            onClick={() => setActiveSlug(slug)}
            className={`whitespace-nowrap px-4 py-2 text-[10px] text-left uppercase tracking-widest rounded-r-full border shadow-sm transition-all ${
              activeSlug === slug
                ? "bg-zinc-900 text-white border-zinc-900 translate-x-1"
                : "bg-white/80 backdrop-blur-md text-zinc-500 border-zinc-200 hover:border-zinc-400"
            }`}
          >
            {slug.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="preview-content h-screen overflow-y-auto" key={activeSlug}>
        <TemplateShell invitation={invitation} key={activeSlug}>
          <StandardBaseTemplate invitation={invitation} />
        </TemplateShell>
      </div>
    </main>
  );
}
