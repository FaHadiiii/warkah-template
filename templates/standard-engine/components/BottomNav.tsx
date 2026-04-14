"use client";

import * as React from "react";
import { MapPin, Gift, Music, MessageSquare, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTemplateContext } from "../../_shared/components/TemplateShell";
import { motion, AnimatePresence } from "framer-motion";

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  active?: boolean;
}

function NavButton({ icon: Icon, label, onClick, active }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all duration-300",
        active
          ? "text-zinc-950 scale-105 font-bold"
          : "text-zinc-400 hover:text-zinc-600",
      )}
    >
      <Icon className="w-5 h-5" strokeWidth={1.5} />
      <span className="text-[10px] font-normal">{label}</span>
    </button>
  );
}

function MusicIcon({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return <Music className="w-5 h-5" strokeWidth={1.5} />;

  return (
    <div className="flex items-end gap-[2px] h-4 w-4 mb-0.5 pointer-events-none">
      <style>{`
        @keyframes music-bar-grow {
          0%, 100% { height: 40%; }
          50% { height: 80%; }
        }
        .music-bar {
          background-color: currentColor;
          width: 2.5px;
          border-radius: 1px;
          animation: music-bar-grow 1s ease-in-out infinite;
        }
      `}</style>
      <div className="music-bar" style={{ animationDelay: "0ms" }} />
      <div className="music-bar" style={{ animationDelay: "200ms" }} />
      <div className="music-bar" style={{ animationDelay: "400ms" }} />
      <div className="music-bar" style={{ animationDelay: "600ms" }} />
    </div>
  );
}

export function StandardBottomNav({
  onLocationClick,
  onGiftClick,
  onWishesClick,
  onContactsClick,
}: {
  onLocationClick?: () => void;
  onGiftClick?: () => void;
  onWishesClick?: () => void;
  onContactsClick?: () => void;
}) {
  const { isOpened, audio, preview, onAction, dict } = useTemplateContext();
  const navDict = dict.nav;

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Custom expo-out like ease
          }}
          className={cn(
            "fixed bottom-0 inset-x-0 sm:max-w-md sm:mx-auto pb-safe-area",
            "z-[100] bg-white/80 backdrop-blur-md border-t border-zinc-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]",
          )}
        >
          <div className="flex items-center justify-around h-16 w-full px-2">
            {onLocationClick && (
              <NavButton
                icon={MapPin}
                label={navDict.location}
                onClick={onLocationClick}
              />
            )}
            {onGiftClick && (
              <NavButton icon={Gift} label={navDict.gift} onClick={onGiftClick} />
            )}
            {onWishesClick && (
              <NavButton
                icon={MessageSquare}
                label={navDict.wishes}
                onClick={onWishesClick}
              />
            )}
            {onContactsClick && (
              <NavButton
                icon={Phone}
                label={navDict.contacts}
                onClick={onContactsClick}
              />
            )}
            <NavButton
              icon={() => <MusicIcon isPlaying={audio.isPlaying} />}
              label={navDict.music}
              onClick={() => onAction("music")}
              active={audio.isPlaying}
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
