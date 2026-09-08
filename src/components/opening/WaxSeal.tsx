"use client";

import { motion, type Transition } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  openingEase,
  openingTiming,
  type OpeningState,
} from "@/components/opening/openingMotion";
import { useHasMounted } from "@/components/opening/useHasMounted";

type WaxSealProps = {
  state: OpeningState;
  label: string;
  initials?: string;
  reducedMotion: boolean;
  onOpen: () => void;
};

export function WaxSeal({
  state,
  label,
  initials,
  reducedMotion,
  onOpen,
}: WaxSealProps) {
  const mounted = useHasMounted();
  const interactive = state === "closed";
  const opening = mounted && state !== "closed";
  const transition: Transition = reducedMotion
    ? { duration: 0 }
    : { duration: openingTiming.press + openingTiming.seal, ease: openingEase };

  return (
    <div className="absolute top-[50%] left-1/2 z-[6] -translate-x-1/2 -translate-y-1/2">
      <motion.button
        type="button"
        aria-label={label}
        disabled={!interactive}
        onClick={onOpen}
        className={cn(
          "relative flex size-14 items-center justify-center sm:size-16",
          "touch-manipulation rounded-full",
          interactive
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none cursor-default",
          interactive && !reducedMotion && "[@media(hover:hover)]:hover:scale-[1.03]",
        )}
        initial={false}
        animate={
          opening
            ? { scale: 0.9, opacity: 0, y: 8, rotate: 2 }
            : undefined
        }
        transition={{
          ...transition,
          delay: opening ? openingTiming.press : 0,
        }}
        whileTap={interactive && !reducedMotion ? { scale: 0.97 } : undefined}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0",
            interactive && !reducedMotion && "seal-breathe",
          )}
        >
          <span className="absolute -inset-[3px] rounded-[46%_54%_48%_52%/52%_46%_54%_48%] bg-[color-mix(in_srgb,var(--gold-deep)_38%,var(--gold-foil))] opacity-80" />
          <span className="absolute inset-0 rounded-[48%_52%_46%_54%/50%_48%_52%_50%] bg-[radial-gradient(circle_at_32%_28%,color-mix(in_srgb,var(--paper-cream)_42%,var(--gold-foil)),var(--gold-foil)_46%,var(--gold-deep))] shadow-[0_3px_8px_rgb(24_57_47/0.16),inset_0_1px_2px_rgb(255_254_251/0.34),inset_0_-3px_5px_rgb(157_125_58/0.28)]" />
          <span className="absolute inset-[5px] rounded-[47%_53%_49%_51%/51%_47%_53%_49%] bg-[color-mix(in_srgb,var(--gold-deep)_18%,transparent)]" />
        </span>

        {initials ? (
          <span
            aria-hidden="true"
            className="relative z-[1] font-display text-[0.75rem] tracking-[0.18em] text-deep-forest uppercase [margin-inline-end:-0.18em] sm:text-[0.8rem]"
          >
            {initials}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="relative z-[1] size-4 rounded-[46%_54%_48%_52%/52%_46%_54%_48%] bg-[color-mix(in_srgb,var(--deep-forest)_18%,transparent)]"
          />
        )}
      </motion.button>
    </div>
  );
}
