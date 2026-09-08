"use client";

import { motion } from "framer-motion";
import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { Envelope } from "@/components/opening/Envelope";
import {
  openingTiming,
  type OpeningState,
} from "@/components/opening/openingMotion";
import { weddingData } from "@/config/weddingData";
import { invitationTransition } from "@/lib/motion";
import { cn } from "@/utils/cn";
import { filledText, filledTextOr, givenInitial } from "@/utils/text";

type InvitationOpeningProps = {
  state: OpeningState;
  reducedMotion: boolean;
  onOpen: () => void;
};

function dateLabel(display: string, day: string, month: string, year: string) {
  const explicit = filledText(display);
  if (explicit) {
    return explicit;
  }

  const parts = [day, month, year]
    .map(filledText)
    .filter((part) => part !== undefined);
  return parts.length > 0 ? parts.join(" · ") : undefined;
}

export function InvitationOpening({
  state,
  reducedMotion,
  onOpen,
}: InvitationOpeningProps) {
  const { couple, wedding, copy } = weddingData;
  const brideName = filledText(couple.bride.name);
  const groomName = filledText(couple.groom.name);
  const displayedDate = dateLabel(
    wedding.date.display,
    wedding.date.day,
    wedding.date.month,
    wedding.date.year,
  );
  const dateTime = filledText(wedding.date.iso);
  const hint = filledTextOr(copy.opening.hint, "Chạm để mở thiệp");
  const sealLabel = filledTextOr(copy.opening.sealLabel, "Mở thiệp cưới");
  const fadeDecor = state !== "closed";
  const exitTransition = invitationTransition(reducedMotion, {
    duration: openingTiming.overlayExit,
  });

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={sealLabel}
      data-lenis-prevent=""
      className={cn(
        "fixed inset-0 z-[10040] flex overflow-x-clip overflow-y-auto overscroll-none bg-ivory text-ink",
        state === "cardReveal" && "pointer-events-none",
      )}
      initial={false}
      exit={{ opacity: 0, y: -10 }}
      transition={exitTransition}
    >
      <span aria-hidden="true" className="paper-fiber absolute inset-0" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,color-mix(in_srgb,var(--kraft)_28%,transparent))]"
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 text-vintage-green transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          fadeDecor ? "opacity-[0.04]" : "opacity-[0.08]",
        )}
      >
        <BotanicalMark
          asset="corner"
          className="absolute top-6 left-5 h-16 w-16 sm:top-10 sm:left-10 sm:h-20 sm:w-20"
        />
        <BotanicalMark
          asset="corner"
          className="absolute top-6 right-5 h-16 w-16 scale-x-[-1] sm:top-10 sm:right-10 sm:h-20 sm:w-20"
        />
        <BotanicalMark
          asset="corner"
          className="absolute bottom-6 left-5 h-16 w-16 scale-y-[-1] sm:bottom-10 sm:left-10 sm:h-20 sm:w-20"
        />
        <BotanicalMark
          asset="corner"
          className="absolute right-5 bottom-6 h-16 w-16 scale-x-[-1] scale-y-[-1] sm:right-10 sm:bottom-10 sm:h-20 sm:w-20"
        />
      </div>

      <div className="relative z-[1] mx-auto flex min-h-dvh w-full min-w-0 max-w-6xl flex-col items-center justify-center gap-5 overflow-x-clip px-5 py-[max(1.25rem,env(safe-area-inset-top))] sm:gap-7 sm:px-10 lg:gap-9 lg:px-16 xl:gap-10 [@media(max-height:560px)]:gap-4">
        <DecorativeDivider className="max-w-[10rem] shrink-0 sm:max-w-xs [@media(max-height:500px)]:hidden" />

        {brideName || groomName ? (
          <div
            className={cn(
              "pointer-events-none relative flex w-full min-w-0 shrink-0 flex-col items-center pb-1 text-center transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pb-2",
              state === "closed" ? "z-10 opacity-100" : "opacity-0",
              state === "cardReveal" ? "z-0" : "z-10",
            )}
          >
            {brideName && groomName ? (
              <>
                <p className="type-opening-name max-w-full px-1 text-center text-ink">
                  {brideName}
                </p>
                <span
                  aria-hidden="true"
                  className="font-script mt-1 mb-1 block translate-y-[-0.08em] text-[clamp(1.4rem,4vw,2.2rem)] leading-none text-gold-deep lg:mt-2 lg:mb-2 lg:text-[clamp(1.75rem,2.4vw,2.75rem)]"
                >
                  &
                </span>
                <p className="type-opening-name max-w-full px-1 text-center text-ink">
                  {groomName}
                </p>
              </>
            ) : (
              <p className="type-opening-name max-w-full px-1 text-center text-ink">
                {brideName ?? groomName}
              </p>
            )}
          </div>
        ) : null}

        <Envelope
          state={state}
          reducedMotion={reducedMotion}
          brideName={brideName}
          groomName={groomName}
          brideInitial={givenInitial(brideName)}
          groomInitial={givenInitial(groomName)}
          displayedDate={displayedDate}
          dateTime={dateTime}
          sealLabel={sealLabel}
          onOpen={onOpen}
        />

        <div className="flex w-full shrink-0 flex-col items-center gap-3 text-center sm:gap-4 [@media(max-height:560px)]:gap-2">
          <p
            className="type-overline w-full text-center text-gold-deep/80"
            aria-hidden={state !== "closed"}
          >
            {state === "closed" ? hint : "\u00a0"}
          </p>

          {displayedDate ? (
            dateTime ? (
              <time
                dateTime={dateTime}
                className="type-overline block w-full text-center text-ink-muted"
              >
                {displayedDate}
              </time>
            ) : (
              <p className="type-overline w-full text-center text-ink-muted">
                {displayedDate}
              </p>
            )
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
