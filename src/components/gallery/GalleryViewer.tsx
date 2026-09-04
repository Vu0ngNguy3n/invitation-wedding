"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/types/wedding";

const GalleryLightbox = dynamic(
  () =>
    import("@/components/gallery/GalleryLightbox").then(
      (module) => module.GalleryLightbox,
    ),
);

type GalleryViewerContextValue = {
  openAt: (index: number, trigger: HTMLButtonElement) => void;
};

const GalleryViewerContext = createContext<GalleryViewerContextValue | null>(
  null,
);

type GalleryViewerProps = {
  images: GalleryImage[];
  children: ReactNode;
};

export function GalleryViewer({ images, children }: GalleryViewerProps) {
  const [index, setIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openAt = useCallback((nextIndex: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setIndex(nextIndex);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    setIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }

      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setIndex((current) => {
      if (current === null || images.length === 0) {
        return current;
      }

      return (current + 1) % images.length;
    });
  }, [images.length]);

  return (
    <GalleryViewerContext.Provider value={{ openAt }}>
      {children}

      <AnimatePresence>
        {index !== null ? (
          <GalleryLightbox
            images={images}
            index={index}
            onClose={close}
            onPrev={showPrev}
            onNext={showNext}
          />
        ) : null}
      </AnimatePresence>
    </GalleryViewerContext.Provider>
  );
}

type GalleryOpenButtonProps = {
  index: number;
  label: string;
  children: ReactNode;
};

export function GalleryOpenButton({
  index,
  label,
  children,
}: GalleryOpenButtonProps) {
  const context = useContext(GalleryViewerContext);

  return (
    <button
      type="button"
      className="foil-border block w-full overflow-hidden bg-surface text-left transition-opacity hover:opacity-90"
      onClick={(event) => {
        context?.openAt(index, event.currentTarget);
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}
