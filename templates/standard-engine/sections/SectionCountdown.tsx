"use client";

import * as React from "react";
import { SectionWrapper } from "../components/SectionWrapper";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import type { SectionConfig } from "../../_shared/types";
import { useTemplateContext } from "../../_shared/components/TemplateShell";

interface SectionCountdownProps {
  invitation: any;
  config?: SectionConfig;
}

function CountdownTimer({
  targetDate,
  labels,
}: {
  targetDate: string;
  labels: any;
}) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculate = () => {
      if (!targetDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { label: labels.days, value: timeLeft.days },
        { label: labels.hours, value: timeLeft.hours },
        { label: labels.minutes, value: timeLeft.minutes },
        { label: labels.seconds, value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="flex justify-center text-xl mb-1 tabular-nums font-serif leading-none h-8 overflow-hidden">
            <SlidingNumber value={item.value} padStart={2} />
          </div>
          <span className="text-2xs uppercase tracking-widest opacity-40">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function SectionCountdown({
  invitation,
  config,
}: SectionCountdownProps) {
  const { dict } = useTemplateContext();
  const countdownDict = dict.countdown;

  return (
    <SectionWrapper
      id="countdown"
      config={config}
      className="pt-12 pb-24 min-h-0"
    >
      <div className="text-center w-full space-y-12">
        <div className="space-y-3">
          <h2 className="text-2xl italic tracking-tight">
            {countdownDict.title}
          </h2>
          <p className="text-xs opacity-40 font-light flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-gradient-to-l from-[currentColor] to-transparent opacity-20" />
            {countdownDict.subtitle}
            <span className="w-16 h-[1px] bg-gradient-to-r from-[currentColor] to-transparent opacity-20" />
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <CountdownTimer
            targetDate={invitation.eventDate}
            labels={countdownDict}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
