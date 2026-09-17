"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const galleryAutoplayDelay = 5000;

type GalleryAutoplayOptions = {
  /** Autoplay is only meaningful with several slides and without reduced motion. */
  enabled: boolean;
  /** Hover, gesture, lightbox or off-screen states hold the gallery still. */
  paused: boolean;
  /** Current slide; every change reschedules a full delay. */
  slideKey: number;
  onAdvance: () => void;
  delay?: number;
};

type GalleryAutoplay = {
  isActive: boolean;
  /** Restarts the countdown, also when the slide itself did not change. */
  reset: () => void;
};

export function useGalleryAutoplay({
  enabled,
  paused,
  slideKey,
  onAdvance,
  delay = galleryAutoplayDelay,
}: GalleryAutoplayOptions): GalleryAutoplay {
  const advanceRef = useRef(onAdvance);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  useEffect(() => {
    advanceRef.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    const syncVisibility = () => {
      setDocumentHidden(document.visibilityState === "hidden");
    };

    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  const isActive = enabled && !paused && !documentHidden;

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = window.setTimeout(() => {
      advanceRef.current();
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay, isActive, resetToken, slideKey]);

  const reset = useCallback(() => {
    setResetToken((token) => token + 1);
  }, []);

  return { isActive, reset };
}
