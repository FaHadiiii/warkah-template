import { useTemplateContext } from "../components/TemplateShell";
import { dictionary, Language, Dictionary } from "../dictionary";

export function useDictionary(): Dictionary {
  const context = useTemplateContext();
  // For now we get lang from context, defaulting to 'ms'
  const lang: Language = (context as any)?.lang || "ms";
  return dictionary[lang];
}
