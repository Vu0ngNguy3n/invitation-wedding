"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import type { OpeningState } from "@/components/opening/openingMotion";

type UseOpeningScrollLockOptions = {
  state: OpeningState;
};

export function useOpeningScrollLock({ state }: UseOpeningScrollLockOptions) {
  const lenis = useLenis();
  const locked = state !== "complete";

  useEffect(() => {
    if (!locked) {
      lenis?.start();
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyTouchAction: body.style.touchAction,
    };

    html.classList.add("overflow-hidden");
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    lenis?.stop();

    return () => {
      html.classList.remove("overflow-hidden");
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.touchAction = previous.bodyTouchAction;
      lenis?.start();
    };
  }, [locked, lenis]);
}
