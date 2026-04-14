import { PesonaKlasikTemplate } from "./pesona-klasik/Template";
import { NegeriMimpiTemplate } from "./negeri-mimpi/Template";
import { KotakHatiTemplate } from "./kotak-hati/Template";
import { SeriRimbaTemplate } from "./seri-rimba/Template";
import { StandardBaseTemplate } from "./standard-engine/Template";

import { ASSETS as PESONA_KLASIK_ASSETS } from "./pesona-klasik/assets";
import { ASSETS as NEGERI_MIMPI_ASSETS } from "./negeri-mimpi/assets";
import { ASSETS as KOTAK_HATI_ASSETS } from "./kotak-hati/assets";
import { ASSETS as SERI_RIMBA_ASSETS } from "./seri-rimba/assets";

import type { TemplateConfig } from "./_shared/types";

// ─── Template Configurations ──────────────────────────────────────────────────
export const PESONA_KLASIK_CONFIG: TemplateConfig = {
  id: "pesona-klasik",
  displayName: "Pesona Klasik",
  tier: "premium",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#09090b",
  showGate: true,
  showMusic: true,
};

export const NEGERI_MIMPI_CONFIG: TemplateConfig = {
  id: "negeri-mimpi",
  displayName: "Negeri Mimpi",
  tier: "premium",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#09090b",
  showGate: true,
  showMusic: true,
};

export const KOTAK_HATI_CONFIG: TemplateConfig = {
  id: "kotak-hati",
  displayName: "Kotak Hati",
  tier: "premium",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#09090b",
  showGate: true,
  showMusic: true,
};

export const SERI_RIMBA_CONFIG: TemplateConfig = {
  id: "seri-rimba",
  displayName: "Seri Rimba",
  tier: "premium",
  defaultData: {} as any,
  defaultPlaylist: [],
  bodyBg: "#09090b",
  showGate: true,
  showMusic: true,
};

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

// ─── Registry Mapping ────────────────────────────────────────────────────────
// We map slugs to their raw components and configurations.
// The wrapping with TemplateShell is now handled by the Page component
// to ensure perfect Server-to-Client serialization.
export const TEMPLATE_MAP: Record<
  string,
  { component: any; config: TemplateConfig; assets: string[] }
> = {
  "pesona-klasik": {
    component: PesonaKlasikTemplate,
    config: PESONA_KLASIK_CONFIG,
    assets: Object.values(PESONA_KLASIK_ASSETS),
  },
  "negeri-mimpi": {
    component: NegeriMimpiTemplate,
    config: NEGERI_MIMPI_CONFIG,
    assets: Object.values(NEGERI_MIMPI_ASSETS),
  },
  "kotak-hati": {
    component: KotakHatiTemplate,
    config: KOTAK_HATI_CONFIG,
    assets: Object.values(KOTAK_HATI_ASSETS),
  },
  "seri-rimba": {
    component: SeriRimbaTemplate,
    config: SERI_RIMBA_CONFIG,
    assets: Object.values(SERI_RIMBA_ASSETS),
  },
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
