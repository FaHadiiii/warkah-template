/**
 * Shared Font Registry for Warkah Templates
 * 
 * This is the Single Source of Truth for all fonts.
 * Adding a font here automatically updates both the Dashboard selection 
 * and the Template rendering engine.
 */

export interface FontOption {
  id: string;
  name: string;
  family: string;
  category: "serif" | "sans" | "script" | "mono";
  weights?: string; // Default to 400..900 if not specified
  label?: string; // Optional descriptive label
}

export const FONT_REGISTRY: FontOption[] = [
  { id: "serif", name: "Playfair Display", family: "Playfair Display", category: "serif", label: "Classic Serif" },
  { id: "cormorant", name: "Cormorant Garamond", family: "Cormorant Garamond", category: "serif", label: "Traditional" },
  { id: "bodoni", name: "Bodoni Moda", family: "Bodoni Moda", category: "serif", label: "Sophisticated" },
  { id: "cinzel", name: "Cinzel", family: "Cinzel", category: "serif", label: "Imperial" },
  { id: "prata", name: "Prata", family: "Prata", category: "serif", label: "Elegant" },
  { id: "spectral", name: "Spectral", family: "Spectral", category: "serif", label: "Sharp" },
  { id: "baskerville", name: "Libre Baskerville", family: "Libre Baskerville", category: "serif", label: "Traditional" },
  { id: "lora", name: "Lora", family: "Lora", category: "serif", label: "Balanced Serif" },
  
  { id: "greatvibes", name: "Great Vibes", family: "Great Vibes", category: "script", weights: "", label: "Signature" },
  { id: "alexbrush", name: "Alex Brush", family: "Alex Brush", category: "script", weights: "", label: "Classic Script" },
  { id: "parisienne", name: "Parisienne", family: "Parisienne", category: "script", weights: "", label: "French Style" },
  { id: "allura", name: "Allura", family: "Allura", category: "script", weights: "", label: "Calligraphy" },
  { id: "sacramento", name: "Sacramento", family: "Sacramento", category: "script", weights: "", label: "Handwritten" },
  { id: "tangerine", name: "Tangerine", family: "Tangerine", category: "script", weights: "", label: "Tall Script" },
  { id: "monsieur", name: "Monsieur La Doulaise", family: "Monsieur La Doulaise", category: "script", weights: "", label: "Ornate" },
  { id: "rochester", name: "Rochester", family: "Rochester", category: "script", weights: "", label: "Art Deco" },
  { id: "pinyon", name: "Pinyon Script", family: "Pinyon Script", category: "script", weights: "", label: "Dramatic" },
  { id: "dancing", name: "Dancing Script", family: "Dancing Script", category: "script", weights: "400..700", label: "Playful" },
  
  { id: "sans", name: "Inter", family: "Inter", category: "sans", label: "Modern Sans" },
  { id: "montserrat", name: "Montserrat", family: "Montserrat", category: "sans", label: "Clean" },
  { id: "outfit", name: "Outfit", family: "Outfit", category: "sans", label: "Minimalist" },
  { id: "italiana", name: "Italiana", family: "Italiana", category: "sans", weights: "", label: "Refined" },
  { id: "lexend", name: "Lexend", family: "Lexend", category: "sans", label: "Readable" },
  
  { id: "mono", name: "Monospace", family: "ui-monospace, SFMono-Regular, Monaco, 'Courier New', monospace", category: "mono", label: "Minimalist" },
];

/**
 * Returns the CSS font-family string for a given font ID
 */
export function getFontFamily(id: string): string {
  const font = FONT_REGISTRY.find(f => f.id === id);
  if (!font) return FONT_REGISTRY.find(f => f.id === "sans")?.family || "sans-serif";
  
  // If it's a generic mono or system stack, don't wrap in quotes
  if (id === "mono") return font.family;
  
  return `"${font.family}", ${font.category === "serif" ? "serif" : font.category === "script" ? "cursive" : "sans-serif"}`;
}

/**
 * Generates the Google Fonts URL parameter for selected font IDs
 */
export function getGoogleFontsUrl(ids: string[]): string {
  const uniqueIds = Array.from(new Set(ids));
  const families = uniqueIds
    .map(id => {
      const font = FONT_REGISTRY.find(f => f.id === id);
      if (!font || id === "mono") return null;

      const name = font.family.replace(/\s+/g, "+");
      const weights = font.weights !== undefined ? font.weights : "ital,wght@0,400..900;1,400..900";
      
      return `family=${name}${weights ? ":" + weights : ""}`;
    })
    .filter(Boolean);

  if (families.length === 0) return "";
  return families.join("&") + "&display=swap";
}
