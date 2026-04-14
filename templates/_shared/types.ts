/**
 * Core domain types shared across all templates.
 */

export interface CoupleInfo {
  name: string;
  /** Parent names, e.g. "Azrie & Kak Yah" */
  parentsName?: string;
  /** Role: 'groom' | 'bride' */
  role: "groom" | "bride";
}

export interface EventInfo {
  label: string;
  venue: string;
  address: string;
  date: string;
  mapsUrl?: string;
}

export interface Contact {
  name: string;
  relationship: string;
  phone: string;
}

/** Dynamic data injected into every template at render time. */
export interface InvitationData {
  groom: CoupleInfo;
  bride: CoupleInfo;
  event: EventInfo;
  contacts?: Contact[];
  /** The singular guest name shown in the greeting, e.g. from ?to= query param. */
  guestName?: string;
}

/** Standard props passed to every template implementation. */
export interface BaseTemplateProps {
  invitation: any;
  /**
   * Triggers the opening of a shared utility drawer.
   * Templates should call this instead of managing their own drawer state.
   */
  onAction?: (
    type: "wishes" | "gift" | "guestbook" | "location" | "contacts",
  ) => void;
  /**
   * Registers a callback for the gate opening animation.
   * The shell will call this when the 'Buka' button is clicked.
   */
  registerOpenAnimation: (
    animateFn: (refs: any, onComplete: () => void) => void,
  ) => void;
}

export interface Song {
  url: string;
  title: string;
}

export interface AudioPlayerControls {
  isPlaying: boolean;
  currentSongIndex: number;
  currentSong: Song;
  togglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export type TemplateTier = "standard" | "premium";

/** Static config that describes a template — used by the template registry. */
export interface TemplateConfig {
  /** Machine-readable slug, e.g. "pesona-klasik" */
  id: string;
  /** Human-readable display name */
  displayName: string;
  /** Tier of the template */
  tier?: TemplateTier;
  /** Default invitation data for previews / builder */
  defaultData: InvitationData;
  /** Default playlist */
  defaultPlaylist: Song[];
  /** Whether to show the opening gate ceremony (default: true) */
  showGate?: boolean;
  /** Whether to show music controls and play audio (default: true) */
  showMusic?: boolean;
  /** Position of the floating music player (default: 'bottom') */
  musicPosition?: "top" | "bottom";
  /** Custom background color for document.body when this template is active */
  bodyBg?: string;
  /** Overscroll behavior for document.body when this template is active */
  bodyOverscroll?: string;
  /** Default design configuration (for Standard tier) */
  defaultDesignConfig?: StandardDesignConfig;
}

/**
 * Modular configuration for standard/flexible templates.
 * Stored in JSONB 'design_config' column.
 */
export interface SectionConfig {
  label?: string;
  visible?: boolean;
  backgroundImage?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  [key: string]: any;
}

export interface StandardDesignConfig {
  stylePack?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    primaryFontFamily?: string;
    secondaryFontFamily?: string;
    textSize?: "small" | "normal" | "large" | number;
    openingText?: string;
    closingText?: string;
    fontColor?: string;
    backgroundEffect?: "none" | "petals" | "bubbles";
    showBismillah?: boolean;
    contentWidth?: number;
  };
  gateType?: "split" | "image";
  gateStyle?: "vertical" | "horizontal" | "fade" | "slide-up";
  gateImage?: string;
  gateColor?: string;
  sections?: {
    hero?: SectionConfig;
    couple?: SectionConfig;
    event?: SectionConfig;
    location?: SectionConfig;
    rsvp?: SectionConfig;
    guestbook?: SectionConfig;
    digitalGift?: SectionConfig;
    closing?: SectionConfig;
    countdown?: SectionConfig;
    contacts?: SectionConfig;
    [key: string]: SectionConfig | undefined;
  };
  sectionsOrder?: string[];
  decorationPack?: string;
  [key: string]: any;
}
