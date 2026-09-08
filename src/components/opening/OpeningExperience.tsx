"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { InvitationOpening } from "@/components/opening/InvitationOpening";
import {
  openingDurationMs,
  type OpeningState,
} from "@/components/opening/openingMotion";
import { useOpeningScrollLock } from "@/components/opening/useOpeningScrollLock";

type OpeningExperienceProps = {
  children: ReactNode;
};

export function OpeningExperience({ children }: OpeningExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [state, setState] = useState<OpeningState>("closed");
  const startedRef = useRef(false);
  const isLocked = state !== "complete";

  useOpeningScrollLock({ state });

  const completeOpening = useCallback(() => {
    startedRef.current = true;
    setState("complete");
  }, []);

  const handleOpen = useCallback(() => {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;

    if (prefersReducedMotion) {
      setState("complete");
      return;
    }

    setState("opening");
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (state !== "opening") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setState("cardReveal");
    }, openingDurationMs.opening);

    return () => window.clearTimeout(timeoutId);
  }, [state]);

  useEffect(() => {
    if (state !== "cardReveal") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setState("complete");
    }, openingDurationMs.cardReveal);

    return () => window.clearTimeout(timeoutId);
  }, [state]);

  useEffect(() => {
    if (state !== "complete") {
      return;
    }

    const invitation = document.getElementById("invitation");
    invitation?.focus({ preventScroll: true });
  }, [state]);

  useEffect(() => {
    const skipIfInvitationTarget = () => {
      const hash = window.location.hash;
      if (hash === "#invitation" || hash === "#home") {
        completeOpening();
      }
    };

    const onSkipClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const skipLink = target.closest('a[href="#invitation"]');
      if (skipLink) {
        completeOpening();
      }
    };

    skipIfInvitationTarget();
    window.addEventListener("hashchange", skipIfInvitationTarget);
    document.addEventListener("click", onSkipClick);

    return () => {
      window.removeEventListener("hashchange", skipIfInvitationTarget);
      document.removeEventListener("click", onSkipClick);
    };
  }, [completeOpening]);

  return (
    <>
      <AnimatePresence>
        {isLocked ? (
          <InvitationOpening
            key="invitation-opening"
            state={state}
            reducedMotion={Boolean(prefersReducedMotion)}
            onOpen={handleOpen}
          />
        ) : null}
      </AnimatePresence>
      <div
        className="flex min-h-full min-w-0 flex-1 flex-col"
        aria-hidden={isLocked || undefined}
        {...(isLocked ? { inert: true } : {})}
      >
        {children}
      </div>
    </>
  );
}
