"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/types/wedding";
import { cn } from "@/utils/cn";

const GalleryLightbox = dynamic(
  () =>
    import("@/components/gallery/GalleryLightbox").then(
      (module) => module.GalleryLightbox,
    ),
);

type GalleryViewerContextValue = {
  openAt: (index: number, trigger: HTMLButtonElement) => void;
  isOpen: boolean;
};

const GalleryViewerContext = createContext<GalleryViewerContextValue | null>(
  null,
);

export function useGalleryViewerOpen(): boolean {
  return useContext(GalleryViewerContext)?.isOpen ?? false;
}

type GalleryViewerProps = {
  images: GalleryImage[];
  children: ReactNode;
  labels: {
    close: string;
    previous: string;
    next: string;
  };
};

export function GalleryViewer({ images, children, labels }: GalleryViewerProps) {
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

  const contextValue = useMemo<GalleryViewerContextValue>(
    () => ({ openAt, isOpen: index !== null }),
    [index, openAt],
  );

  return (
    <GalleryViewerContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {index !== null ? (
          <GalleryLightbox
            images={images}
            index={index}
            onClose={close}
            onPrev={showPrev}
            onNext={showNext}
            labels={labels}
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
  className?: string;
};

export function GalleryOpenButton({
  index,
  label,
  children,
  className,
}: GalleryOpenButtonProps) {
  const context = useContext(GalleryViewerContext);

  return (
    <button
      type="button"
      className={cn(
        "group foil-border block w-full overflow-hidden bg-kraft text-left",
        className,
      )}
      onClick={(event) => {
        context?.openAt(index, event.currentTarget);
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}
