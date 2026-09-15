"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryOpenButton } from "@/components/gallery/GalleryViewer";
import { invitationTransition } from "@/lib/motion";
import type { GalleryImage } from "@/types/wedding";
import { cn } from "@/utils/cn";
import { filledText } from "@/utils/text";

type GallerySliderProps = {
  images: GalleryImage[];
  labels: {
    region: string;
    previous: string;
    next: string;
    openLabeled: string;
    openIndexed: string;
    selectLabeled: string;
    selectIndexed: string;
  };
};

export function GallerySlider({ images, labels }: GallerySliderProps) {
  const regionId = useId();
  const [index, setIndex] = useState(0);
  const stripRef = useRef<HTMLUListElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const total = images.length;
  const current = images[index];
  const transition = invitationTransition(prefersReducedMotion, {
    duration: 0.42,
  });

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) {
        return;
      }

      setIndex(((nextIndex % total) + total) % total);
    },
    [total],
  );

  const showPrev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const showNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  useEffect(() => {
    const thumb = thumbRefs.current[index];
    const strip = stripRef.current;
    if (!thumb || !strip) {
      return;
    }

    const left = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, left),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [index, prefersReducedMotion]);

  if (!current) {
    return null;
  }

  const openLabel = filledText(current.alt)
    ? `${labels.openLabeled}${current.alt}`
    : `${labels.openIndexed}${index + 1}`;

  return (
    <div
      className="mx-auto w-full min-w-0 max-w-3xl lg:max-w-4xl"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={regionId}
      onKeyDown={(event) => {
        if (total < 2) {
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <p id={regionId} className="sr-only">
        {labels.region}
      </p>

      <div className="relative">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-kraft sm:aspect-[4/5] lg:aspect-[3/4]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.995 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={transition}
            >
              <GalleryOpenButton
                index={index}
                label={openLabel}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 70vw, 720px"
                  className="object-cover"
                />
              </GalleryOpenButton>
            </motion.div>
          </AnimatePresence>
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrev}
              className="foil-border absolute top-1/2 left-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-ivory/90 text-vintage-green transition-opacity duration-300 hover:opacity-80 sm:left-3"
              aria-label={labels.previous}
            >
              <ChevronLeft
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.25}
              />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="foil-border absolute top-1/2 right-2 z-10 flex size-11 -translate-y-1/2 items-center justify-center bg-ivory/90 text-vintage-green transition-opacity duration-300 hover:opacity-80 sm:right-3"
              aria-label={labels.next}
            >
              <ChevronRight
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.25}
              />
            </button>
          </>
        ) : null}
      </div>

      <p className="type-caption mt-4 text-center text-pretty text-muted" aria-live="polite">
        {current.alt
          ? `${current.alt} · ${index + 1} / ${total}`
          : `${index + 1} / ${total}`}
      </p>

      {total > 1 ? (
        <ul
          ref={stripRef}
          className="-mx-1 mt-5 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 snap-x snap-mandatory [scrollbar-width:thin] sm:mt-6 sm:gap-2.5"
        >
          {images.map((image, imageIndex) => {
            const selected = imageIndex === index;
            const selectLabel = filledText(image.alt)
              ? `${labels.selectLabeled}${image.alt}`
              : `${labels.selectIndexed}${imageIndex + 1}`;

            return (
              <li key={image.id} className="shrink-0 snap-center">
                <button
                  type="button"
                  ref={(node) => {
                    thumbRefs.current[imageIndex] = node;
                  }}
                  onClick={() => goTo(imageIndex)}
                  aria-label={selectLabel}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "relative block h-16 min-h-11 w-12 min-w-11 overflow-hidden bg-kraft sm:h-[4.5rem] sm:w-[3.35rem]",
                    selected
                      ? "foil-border"
                      : "border border-transparent opacity-65",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="64px"
                    className="h-full w-full object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
