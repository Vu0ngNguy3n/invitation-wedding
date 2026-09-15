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
      <ul className="mx-auto flex w-full max-w-lg items-start justify-center">
        {units.map((unit, index) => (
          <li
            key={unit.key}
            className="flex min-w-0 items-start"
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="font-display mt-[0.15em] px-0.5 text-xl leading-none text-accent-gold/45 sm:px-2 sm:text-3xl"
              >
                :
              </span>
            ) : null}
            <div className="flex min-w-0 flex-col items-center px-1 sm:px-3">
              <span className="font-display text-[1.7rem] tabular-nums tracking-wide sm:text-3xl lg:text-[2.85rem]">
                {unit.value}
              </span>
              <span className="type-overline mt-2 text-center text-accent-gold">
                {unit.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
