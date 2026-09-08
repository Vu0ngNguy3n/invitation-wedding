"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";
import type { LenisOptions } from "lenis";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const nativeScrollOptions: LenisOptions = {
  autoRaf: true,
  lerp: 1,
  smoothWheel: false,
  syncTouch: false,
  anchors: false,
  respectReducedMotion: true,
};

const editorialScrollOptions: LenisOptions = {
  autoRaf: true,
        lerp: 0.08,
        duration: 1.2,
  smoothWheel: true,
  syncTouch: false,
  anchors: true,
  respectReducedMotion: true,
};

function subscribeToScrollPreference(onStoreChange: () => void) {
  const coarse = window.matchMedia("(pointer: coarse)");
  const narrow = window.matchMedia("(max-width: 767px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  coarse.addEventListener("change", onStoreChange);
  narrow.addEventListener("change", onStoreChange);
  reduced.addEventListener("change", onStoreChange);

  return () => {
    coarse.removeEventListener("change", onStoreChange);
    narrow.removeEventListener("change", onStoreChange);
    reduced.removeEventListener("change", onStoreChange);
  };
}

function getScrollPreferenceSnapshot() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  if (window.matchMedia("(pointer: coarse)").matches) {
    return false;
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    return false;
  }

  return true;
}

function getScrollPreferenceServerSnapshot() {
  return false;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const enableEditorialScroll = useSyncExternalStore(
    subscribeToScrollPreference,
    getScrollPreferenceSnapshot,
    getScrollPreferenceServerSnapshot,
  );

  return (
    <ReactLenis
      root
      options={
        enableEditorialScroll ? editorialScrollOptions : nativeScrollOptions
      }
    >
      {children}
    </ReactLenis>
  );
}
