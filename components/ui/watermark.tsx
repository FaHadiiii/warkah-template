"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WatermarkProps {
  className?: string;
}

export function Watermark({ className }: WatermarkProps) {
  return (
    <Link
      href="/"
      target="_blank"
      className={cn(
        "flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity text-zinc-500",
        className,
      )}
    >
      <span className="text-[11px] font-serif opacity-80 font-light">
        Created with
      </span>
      <div className="w-4 h-4 relative flex items-center justify-center">
        <Image
          src="/images/warkah-logo.png"
          alt="Warkah Logo"
          fill
          className="object-contain"
          sizes="16px"
        />
      </div>
      <span className="text-[11.5px] font-serif! font-normal opacity-100">
        Warkah
      </span>
    </Link>
  );
}
