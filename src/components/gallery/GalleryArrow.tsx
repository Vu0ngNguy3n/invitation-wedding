"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";

type GalleryArrowProps = {
  direction: "prev" | "next";
  label: string;
  variants: Variants;
  onActivate: () => void;
};

const chevronPoints = {
  prev: "13.2 3.6 4.8 22 13.2 40.4",
  next: "4.8 3.6 13.2 22 4.8 40.4",
} as const;

export function GalleryArrow({
  direction,
  label,
  variants,
  onActivate,
}: GalleryArrowProps) {
  const isPrev = direction === "prev";

  return (
    <div
      className={cn(
        "pointer-events-auto absolute top-1/2 -translate-y-1/2",
        isPrev ? "left-1 sm:left-1.5" : "right-1 sm:right-1.5",
      )}
    >
      <motion.div variants={variants}>
        <button
          type="button"
          onClick={onActivate}
          aria-label={label}
          className={cn(
            "flex size-11 items-center justify-center text-accent-gold opacity-65 transition-[opacity,translate] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:opacity-100",
            "[@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100",
            isPrev
              ? "motion-safe:[@media(hover:hover)_and_(pointer:fine)]:hover:translate-x-[-2px]"
              : "motion-safe:[@media(hover:hover)_and_(pointer:fine)]:hover:translate-x-[2px]",
          )}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 18 44"
            fill="none"
            className="h-[34px] w-[14px] drop-shadow-[0_1px_2px_rgb(24_57_47/0.24)] sm:h-[42px] sm:w-[18px]"
          >
            <polyline
              points={chevronPoints[direction]}
              stroke="currentColor"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
