import { StandardBaseTemplate } from "./standard-engine/Template";

import type { TemplateConfig } from "./_shared/types";

// ─── Template Configurations ──────────────────────────────────────────────────
export const SOFT_PASTEL_CONFIG: TemplateConfig = {
  id: "rose-lavendar",
  displayName: "Rose Lavendar",
  tier: "standard",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#FFF5F5",
  showGate: true,
  showMusic: true,
  defaultDesignConfig: {
    theme: {
      primaryColor: "#FFF9F9",
      secondaryColor: "#cf9f9f",
      fontFamily: "sans-serif",
    },
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      location: { visible: true },
      rsvp: { visible: true },
      guestbook: { visible: true },
      closing: { visible: true },
    },
    decorationPack: "rose-lavendar",
  },
};

export const PASTEL_ROSE_CONFIG: TemplateConfig = {
  id: "pastel-rose",
  displayName: "Pastel Rose",
  tier: "standard",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#FFF5F5",
  showGate: true,
  showMusic: true,
  defaultDesignConfig: {
    theme: {
      primaryColor: "#FFF9F9",
      secondaryColor: "#E8A0A0",
      fontFamily: "sans-serif",
    },
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      location: { visible: true },
      rsvp: { visible: true },
      guestbook: { visible: true },
      closing: { visible: true },
    },
    decorationPack: "pastel-rose",
  },
};

export const SOFT_BLUE_CONFIG: TemplateConfig = {
  id: "soft-blue",
  displayName: "Soft Blue",
  tier: "standard",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#F0F7FF",
  showGate: true,
  showMusic: true,
  defaultDesignConfig: {
    theme: {
      primaryColor: "#F0F7FF",
      secondaryColor: "#7AA2E3",
      fontFamily: "sans-serif",
    },
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      location: { visible: true },
      rsvp: { visible: true },
      guestbook: { visible: true },
      closing: { visible: true },
    },
    decorationPack: "soft-blue",
  },
};

export const SOFT_TROPICAL_CONFIG: TemplateConfig = {
  id: "soft-tropical",
  displayName: "Soft Tropical",
  tier: "standard",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#F7FFF0",
  showGate: true,
  showMusic: true,
  defaultDesignConfig: {
    theme: {
      primaryColor: "#F7FFF0",
      secondaryColor: "#8EB486",
      fontFamily: "sans-serif",
    },
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      location: { visible: true },
      rsvp: { visible: true },
      guestbook: { visible: true },
      closing: { visible: true },
    },
    decorationPack: "soft-tropical",
  },
};

export const GOLD_PINKY_CONFIG: TemplateConfig = {
  id: "gold-pinky",
  displayName: "Gold Pinky",
  tier: "standard",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#FFF0F5",
  showGate: true,
  showMusic: true,
  defaultDesignConfig: {
    theme: {
      primaryColor: "#FFF0F5",
      secondaryColor: "#D4AF37",
      fontFamily: "serif",
    },
    sections: {
      hero: { visible: true },
      couple: { visible: true },
      event: { visible: true },
      location: { visible: true },
      rsvp: { visible: true },
      guestbook: { visible: true },
      closing: { visible: true },
    },
    decorationPack: "gold-pinky",
  },
};

// ─── Registry Mapping ────────────────────────────────────────────────────────
// We map slugs to their raw components and configurations.
// The wrapping with TemplateShell is now handled by the Page component
// to ensure perfect Server-to-Client serialization.
export const TEMPLATE_MAP: Record<
  string,
  { component: any; config: TemplateConfig; assets: string[] }
> = {
  "rose-lavendar": {
    component: StandardBaseTemplate,
    config: SOFT_PASTEL_CONFIG,
    assets: [
      "/templates/rose-lavendar/flower-1.png",
      "/templates/rose-lavendar/flower-2.png",
      "/templates/rose-lavendar/line-1.png",
      "/templates/rose-lavendar/line-2.png",
      "/templates/rose-lavendar/line-3.png",
      "/templates/rose-lavendar/watercolor-bg.png",
    ],
  },
  "pastel-rose": {
    component: StandardBaseTemplate,
    config: PASTEL_ROSE_CONFIG,
    assets: [
      "/templates/pastel-rose/butterfly.png",
      "/templates/pastel-rose/flower-1.png",
      "/templates/pastel-rose/stars.png",
      "/templates/pastel-rose/watercolor-bg.png",
    ],
  },
  "soft-blue": {
    component: StandardBaseTemplate,
    config: SOFT_BLUE_CONFIG,
    assets: [
      "/templates/soft-blue/background.png",
      "/templates/soft-blue/butterfly.png",
      "/templates/soft-blue/flower.png",
      "/templates/soft-blue/leaf.png",
    ],
  },
  "soft-tropical": {
    component: StandardBaseTemplate,
    config: SOFT_TROPICAL_CONFIG,
    assets: [
      "/templates/soft-tropical/background.png",
      "/templates/soft-tropical/butterfly.png",
      "/templates/soft-tropical/flower-1.png",
      "/templates/soft-tropical/flower-2.png",
      "/templates/soft-tropical/leaf-1.png",
      "/templates/soft-tropical/leaf-2.png",
    ],
  },
  "gold-pinky": {
    component: StandardBaseTemplate,
    config: GOLD_PINKY_CONFIG,
    assets: [
      "/templates/gold-pinky/background.png",
      "/templates/gold-pinky/flower.png",
      "/templates/gold-pinky/gold-leaf-1.png",
      "/templates/gold-pinky/gold-leaf-2.png",
      "/templates/gold-pinky/splash.png",
    ],
  },
};



// ─── Fallback Component ──────────────────────────────────────────────────────
export const BasicTemplate = ({ invitation }: { invitation?: any }) => (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-8 text-zinc-100">
    <div className="max-w-md w-full border border-zinc-800 rounded-3xl p-8 text-center space-y-4">
      <h1 className="text-xl font-bold text-zinc-100">
        {invitation?.title || "Jemputan Digital"}
      </h1>
      <p className="text-sm text-zinc-500">
        Template:{" "}
        <span className="font-mono text-zinc-100 bg-zinc-900 px-2 py-1 rounded">
          {invitation?.template?.slug || "N/A"}
        </span>
      </p>
      <p className="text-xs text-zinc-400">Design sedang dalam pembinaan.</p>
    </div>
  </div>
);

/**
 * Returns the template entry (component and config) for a given slug.
 */
export function getTemplateEntry(slug: string) {
  return TEMPLATE_MAP[slug];
}
