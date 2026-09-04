"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types/wedding";
import { invitationMotion, invitationTransition } from "@/utils/motion";

type GalleryLightboxLabels = {
  close: string;
  previous: string;
  next: string;
};

type GalleryLightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  labels: GalleryLightboxLabels;
};

export function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  labels,
}: GalleryLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const image = images[index];
  const total = images.length;
  const transition = invitationTransition(prefersReducedMotion, {
    duration: invitationMotion.lightboxDuration,
  });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("overflow-hidden");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (total > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }

      if (total > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = [
        ...dialogRef.current.querySelectorAll<HTMLElement>("button"),
      ];
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrev, total]);

  if (!image) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-vintage-green/88 p-3 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;

        if (start === null || end === undefined || total < 2) {
          return;
        }

        const delta = end - start;
        if (delta > 50) {
          onPrev();
        } else if (delta < -50) {
          onNext();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center justify-center pt-12"
        onClick={(event) => event.stopPropagation()}
      >
        <p id={titleId} className="sr-only">
          {image.alt || `Ảnh ${index + 1} / ${total}`}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="foil-border absolute top-0 right-0 z-10 flex size-11 items-center justify-center text-accent-gold transition-opacity hover:opacity-80"
          aria-label={labels.close}
        >
          <X aria-hidden="true" className="size-5" strokeWidth={1.25} />
        </button>

        {total > 1 ? (
          <button
            type="button"
            onClick={onPrev}
            className="foil-border absolute top-1/2 left-0 z-10 flex size-11 -translate-y-1/2 items-center justify-center text-accent-gold transition-opacity hover:opacity-80"
            aria-label={labels.previous}
          >
            <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </button>
        ) : null}

        {total > 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="foil-border absolute top-1/2 right-0 z-10 flex size-11 -translate-y-1/2 items-center justify-center text-accent-gold transition-opacity hover:opacity-80"
            aria-label={labels.next}
          >
            <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.25} />
          </button>
        ) : null}

        <div className="flex max-h-[min(72svh,40rem)] w-full items-center justify-center px-12 sm:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={image.id}
              className="flex max-h-full w-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 86vw, 960px"
                className="max-h-[min(72svh,40rem)] w-auto max-w-full object-contain"
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="type-caption mt-4 max-w-lg px-4 text-center text-pretty text-muted sm:mt-5 sm:px-16" aria-live="polite">
          {image.alt
            ? `${image.alt} · ${index + 1} / ${total}`
            : `${index + 1} / ${total}`}
        </p>
      </div>
    </motion.div>
  );
}
