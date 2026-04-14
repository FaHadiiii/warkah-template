"use client";

import { motion, AnimatePresence } from "motion/react";

export function SlidingNumber({ value, padStart }: { value: number; padStart?: number }) {
  const formattedValue = padStart ? String(value).padStart(padStart, "0") : String(value);

  return (
    <div className="flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        {formattedValue.split("").map((digit, i) => (
          <motion.span
            key={`${i}-${digit}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-block"
          >
            {digit}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
