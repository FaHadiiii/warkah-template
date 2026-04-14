import * as React from "react";
import { SectionWrapper } from "../components/SectionWrapper";
import { WishesStack } from "../components/WishesStack";
import type { SectionConfig } from "../../_shared/types";
import { useTemplateContext } from "../../_shared/components/TemplateShell";

interface SectionWishesProps {
  invitation: any;
  config?: SectionConfig;
}

export function SectionWishes({ invitation, config }: SectionWishesProps) {
  const { dict } = useTemplateContext();
  const wishDict = dict.wishes_section;

  return (
    <SectionWrapper id="wishes" config={config} className="py-24 bg-white">
      <div className="w-full max-w-sm mx-auto space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-2xl italic tracking-tight">{wishDict.title}</h2>
          <p className="text-xs opacity-40 font-light flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-gradient-to-l from-[currentColor] to-transparent opacity-20" />
            {wishDict.subtitle}
            <span className="w-16 h-[1px] bg-gradient-to-r from-[currentColor] to-transparent opacity-20" />
          </p>
        </div>

        <div className="pb-14 flex items-center justify-center">
          <WishesStack invitationId={invitation?.id} />
        </div>
      </div>
    </SectionWrapper>
  );
}
