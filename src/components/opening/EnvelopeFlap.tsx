"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  openingEase,
  openingTiming,
  type OpeningState,
} from "@/components/opening/openingMotion";
import { useHasMounted } from "@/components/opening/useHasMounted";

type EnvelopeFlapProps = {
  state: OpeningState;
  reducedMotion: boolean;
};

export function EnvelopeFlap({ state, reducedMotion }: EnvelopeFlapProps) {
  const mounted = useHasMounted();
  const open = mounted && state !== "closed";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[54%] origin-top [perspective:1100px] [transform-style:preserve-3d]",
        state === "cardReveal" ? "z-[1]" : "z-[5]",
      )}
    >
      <motion.div
        className={cn(
          "absolute inset-0 origin-top [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-style:preserve-3d]",
          "bg-[color-mix(in_srgb,var(--kraft)_78%,var(--paper-cream))]",
        )}
        initial={false}
        animate={open ? { rotateX: -128 } : undefined}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: openingTiming.flap,
                delay: openingTiming.press + openingTiming.seal,
                ease: openingEase,
              }
        }
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--soft-white)_34%,transparent),transparent_38%,color-mix(in_srgb,var(--vintage-green)_7%,transparent))]"
        />
        <span aria-hidden="true" className="paper-fiber absolute inset-0" />
        <span
          aria-hidden="true"
          className="absolute inset-x-[18%] top-0 h-px bg-[color-mix(in_srgb,var(--gold-foil)_22%,transparent)]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 shadow-[inset_0_-10px_16px_rgb(24_57_47/0.05)]"
        />
      </motion.div>
    </div>
  );
}
