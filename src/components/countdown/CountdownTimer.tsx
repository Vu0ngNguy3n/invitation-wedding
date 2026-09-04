"use client";

import { useEffect, useState } from "react";
import { getRemainingTime, padTimeUnit } from "@/utils/datetime";

type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownTimerProps = {
  targetMs: number;
  labels: CountdownLabels;
};

export function CountdownTimer({ targetMs, labels }: CountdownTimerProps) {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    tick();
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  const remaining =
    nowMs === null ? null : getRemainingTime(targetMs, nowMs);
  const units = [
    {
      key: "days",
      label: labels.days,
      value: remaining ? padTimeUnit(remaining.days, remaining.days > 99 ? 3 : 2) : "—",
    },
    {
      key: "hours",
      label: labels.hours,
      value: remaining ? padTimeUnit(remaining.hours) : "—",
    },
    {
      key: "minutes",
      label: labels.minutes,
      value: remaining ? padTimeUnit(remaining.minutes) : "—",
    },
    {
      key: "seconds",
      label: labels.seconds,
      value: remaining ? padTimeUnit(remaining.seconds) : "—",
    },
  ];

  return (
    <div
      role="timer"
      aria-label={
        remaining
          ? `${remaining.days} ${labels.days}, ${remaining.hours} ${labels.hours}, ${remaining.minutes} ${labels.minutes}, ${remaining.seconds} ${labels.seconds}`
          : undefined
      }
      className={remaining?.expired ? "opacity-70" : undefined}
    >
      <ul className="mx-auto flex w-full max-w-sm items-end justify-between gap-1 px-1 sm:max-w-md sm:justify-center sm:gap-8 lg:max-w-lg lg:gap-10">
        {units.map((unit) => (
          <li key={unit.key} className="flex min-w-0 flex-1 flex-col items-center sm:flex-none">
            <span className="font-display text-3xl tabular-nums tracking-wide text-paper-cream sm:text-4xl lg:text-5xl">
              {unit.value}
            </span>
            <span className="type-overline mt-2 text-center text-accent-gold">
              {unit.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
