"use client";

import { motion } from "framer-motion";
import { EnvelopeFlap } from "@/components/opening/EnvelopeFlap";
import { InvitationCard } from "@/components/opening/InvitationCard";
import { WaxSeal } from "@/components/opening/WaxSeal";
import {
  openingEase,
  openingTiming,
  type OpeningState,
} from "@/components/opening/openingMotion";
import { useHasMounted } from "@/components/opening/useHasMounted";
import { cn } from "@/utils/cn";

type EnvelopeProps = {
  state: OpeningState;
  reducedMotion: boolean;
  brideName?: string;
  groomName?: string;
  brideInitial?: string;
  groomInitial?: string;
  displayedDate?: string;
  dateTime?: string;
  sealLabel: string;
  onOpen: () => void;
};

export function Envelope({
  state,
  reducedMotion,
  brideName,
  groomName,
  brideInitial,
  groomInitial,
  displayedDate,
  dateTime,
  sealLabel,
  onOpen,
}: EnvelopeProps) {
  const revealed = state === "cardReveal";
  const mounted = useHasMounted();
  const sealInitials = [brideInitial, groomInitial]
    .filter((value): value is string => Boolean(value))
    .join("");

  return (
    <motion.div
      className={cn(
        "relative w-[min(88vw,22rem)] shrink-0 select-none sm:w-[min(68vw,28rem)] lg:w-[min(42vw,34rem)] xl:w-[min(34vw,36rem)]",
        "[@media(max-height:700px)]:w-[min(72vw,22rem)] [@media(max-height:560px)]:w-[min(64vw,18.5rem)]",
      )}
      initial={false}
      animate={mounted ? { y: revealed ? 10 : 0 } : undefined}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: openingTiming.forward, ease: openingEase }
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] -bottom-3 h-6 rounded-[100%] bg-deep-forest/10 blur-md"
      />

      <div
        className={cn(
          "relative aspect-[3/2] [perspective:1200px]",
          state === "cardReveal" ? "overflow-visible" : "overflow-hidden",
        )}
      >
        <div className="absolute inset-0 overflow-hidden bg-kraft shadow-paper">
          <span className="absolute inset-0 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--soft-white)_26%,transparent),transparent_40%,color-mix(in_srgb,var(--vintage-green)_8%,transparent))]" />
          <span className="paper-fiber absolute inset-0" />
        </div>

        <div
          className={cn(
            "absolute inset-x-[6.5%] -top-[48%] bottom-[8%] z-[2] overflow-hidden",
            state !== "cardReveal" && "[clip-path:inset(34.3%_0_0_0)]",
          )}
        >
          <motion.div
            className={cn(
              "absolute inset-x-[7%] bottom-[5%] mx-auto h-[76%] w-[86%]",
              !mounted && "translate-y-[38%] scale-[0.98] opacity-0",
            )}
            initial={false}
            animate={
              !mounted
                ? undefined
                : revealed
                  ? { y: "-22%", scale: 1.02, opacity: 1 }
                  : { y: "38%", scale: 0.98, opacity: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: openingTiming.card + openingTiming.forward,
                    ease: openingEase,
                  }
            }
          >
            <InvitationCard
              brideName={brideName}
              groomName={groomName}
              brideInitial={brideInitial}
              groomInitial={groomInitial}
              displayedDate={displayedDate}
              dateTime={dateTime}
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[3]">
          <span className="absolute inset-0 bg-[color-mix(in_srgb,var(--kraft)_90%,var(--vintage-green))] [clip-path:polygon(0_0,50%_54%,0_100%)]">
            <span className="paper-fiber absolute inset-0" />
          </span>
          <span className="absolute inset-0 bg-[color-mix(in_srgb,var(--kraft)_82%,var(--paper-cream))] [clip-path:polygon(100%_0,100%_100%,50%_54%)]">
            <span className="paper-fiber absolute inset-0" />
          </span>
          <span className="absolute inset-0 bg-[color-mix(in_srgb,var(--kraft)_92%,var(--gold-deep))] [clip-path:polygon(0_100%,50%_54%,100%_100%)] shadow-[inset_0_12px_18px_rgb(24_57_47/0.06)]">
            <span className="paper-fiber absolute inset-0" />
          </span>
          <span className="absolute inset-[12%] bg-[color-mix(in_srgb,var(--gold-foil)_14%,transparent)] [clip-path:polygon(0_100%,50%_54%,100%_100%)]" />
        </div>

        <EnvelopeFlap state={state} reducedMotion={reducedMotion} />

        <WaxSeal
          state={state}
          label={sealLabel}
          initials={sealInitials || undefined}
          reducedMotion={reducedMotion}
          onOpen={onOpen}
        />
      </div>
    </motion.div>
  );
}
