"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useTemplateContext } from "../../_shared/components/TemplateShell";

const DUMMY_WISHES = [
  {
    id: "1",
    guestName: "Ahmad & Sarah",
    message: "Selamat pengantin baru! Semoga berbahagia hingga ke anak cucu.",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    guestName: "Faris",
    message: "Barakallah! Selamat menempuh alam rumah tangga.",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "3",
    guestName: "Cik Salmah",
    message: "Cantiknya template ni! Selamat bercinta selamanya.",
    submittedAt: new Date().toISOString(),
  },
];

export function WishesStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { dict, lang } = useTemplateContext() || {};
  const wishesDict = dict?.wishes_section;
  const wishes = DUMMY_WISHES;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wishes.length);
  };

  // Only show at most 3 cards in the stack, ensuring uniqueness
  const uniqueIndices = Array.from(
    new Set([
      currentIndex,
      (currentIndex + 1) % wishes.length,
      (currentIndex + 2) % wishes.length,
    ]),
  );

  const stack = uniqueIndices.map((idx) => wishes[idx]).filter(Boolean);

  return (
    <div className="relative w-full max-w-[280px] h-[320px] mx-auto flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {stack.reverse().map((wish, index) => {
          const isTop = index === stack.length - 1;
          const reverseIndex = stack.length - 1 - index;

          return (
            <motion.div
              key={wish.id}
              style={{
                zIndex: index,
                cursor: isTop ? "grab" : "default",
              }}
              initial={{ scale: 0.9, y: 30 * reverseIndex, opacity: 0 }}
              animate={{
                scale: 1 - 0.05 * reverseIndex,
                y: 15 * reverseIndex,
                opacity: 1,
              }}
              exit={{
                x: 300,
                opacity: 0,
                scale: 0.9,
                rotate: 20,
                transition: { duration: 0.4 },
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100 || info.offset.x < -100) {
                  handleNext();
                }
              }}
              whileDrag={{ cursor: "grabbing" }}
              className="absolute w-full"
            >
              <div className="p-6 h-[280px] flex flex-col justify-between border border-[var(--primary)]/80 bg-[var(--primary)]/40 backdrop-blur-sm rounded-3xl overflow-hidden relative group/card shadow-sm shadow-zinc-950/5">
                <div className="absolute -top-4 -right-2 opacity-[0.03] scale-150 rotate-12 pointer-events-none text-[var(--secondary)]">
                  <Quote size={80} fill="currentColor" />
                </div>

                <div className="flex-1 flex flex-col justify-center text-center px-2">
                  <p className="text-[13px] opacity-70 leading-relaxed font-serif italic mb-4 line-clamp-6">
                    "{wish.message}"
                  </p>
                </div>

                <div className="relative mt-4 pt-4 text-center">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[currentColor] to-transparent opacity-20" />
                  <p className="text-[11px] font-medium tracking-wide truncate">
                    {wish.guestName}
                  </p>
                  <p className="text-[9px] opacity-40 mt-2 uppercase tracking-tighter">
                    {new Date(wish.submittedAt).toLocaleDateString(
                      lang === "en" ? "en-GB" : "ms-MY",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Hint */}
      <div className="absolute bottom-[-40px] left-0 right-0 text-center">
        <p className="text-[10px] opacity-50 tracking-wider">
          {wishesDict?.hint}
        </p>
      </div>
    </div>
  );
}
