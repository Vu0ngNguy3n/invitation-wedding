"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryOpenButton } from "@/components/gallery/GalleryViewer";
import {
  albumArrowLeft,
  albumArrowRight,
  albumArrows,
  albumCaption,
  albumMainImage,
  albumStage,
  albumThumbnail,
  fadeReveal,
  invitationEase,
  invitationTransition,
  reducedStagger,
} from "@/lib/motion";
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

function navigationDirection(from: number, to: number, total: number): number {
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return forward <= backward ? 1 : -1;
}

export function GallerySlider({ images, labels }: GallerySliderProps) {
  const regionId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const stripRef = useRef<HTMLUListElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const total = images.length;
  const current = images[index];
  const photoTransition = invitationTransition(prefersReducedMotion, {
    duration: 0.42,
  });
  const captionTransition = invitationTransition(prefersReducedMotion, {
    duration: 0.3,
  });
  const stageVariants = reduceMotion ? reducedStagger : albumStage;
  const imageVariants = reduceMotion ? fadeReveal : albumMainImage;
  const captionVariants = reduceMotion ? fadeReveal : albumCaption;
  const arrowsVariants = reduceMotion ? reducedStagger : albumArrows;
  const arrowLeftVariants = reduceMotion ? fadeReveal : albumArrowLeft;
  const arrowRightVariants = reduceMotion ? fadeReveal : albumArrowRight;
  const thumbItemVariants = reduceMotion ? fadeReveal : albumThumbnail;
  const thumbStagger = reduceMotion
    ? 0
    : Math.min(0.05, 0.42 / Math.max(total - 1, 1));
  const thumbContainerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      shown: {
        transition: {
          staggerChildren: thumbStagger,
          delayChildren: 0.02,
        },
      },
    }),
    [thumbStagger],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) {
        return;
      }

      const wrapped = ((nextIndex % total) + total) % total;

      if (wrapped === index) {
        return;
      }

      setDirection(navigationDirection(index, wrapped, total));
      setIndex(wrapped);
    },
    [index, total],
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

    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const padding = 8;
    const isVisible =
      thumbRect.left >= stripRect.left + padding &&
      thumbRect.right <= stripRect.right - padding;

    if (isVisible) {
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
  const caption = current.alt
    ? `${current.alt} · ${index + 1} / ${total}`
    : `${index + 1} / ${total}`;

  return (
    <motion.div
      className="relative mx-auto mt-10 w-full min-w-0 max-w-3xl sm:mt-16 lg:max-w-4xl"
      variants={stageVariants}
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

      <motion.div
        variants={imageVariants}
        className="relative aspect-[3/4] w-full overflow-hidden bg-kraft sm:aspect-[4/5] lg:aspect-[3/4]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.01, x: direction * 10 }
            }
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }
            }
            transition={photoTransition}
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
                className="object-cover motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.015]"
              />
            </GalleryOpenButton>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {total > 1 ? (
        <motion.div
          variants={arrowsVariants}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]"
        >
          <div className="pointer-events-auto absolute top-1/2 left-2 -translate-y-1/2 sm:left-3">
            <motion.button
              type="button"
              variants={arrowLeftVariants}
              onClick={showPrev}
              whileHover={reduceMotion ? undefined : { x: -2, opacity: 1 }}
              whileFocus={reduceMotion ? undefined : { x: -2, opacity: 1 }}
              transition={{ duration: 0.24, ease: invitationEase }}
              className="foil-border flex size-11 items-center justify-center bg-ivory/90 text-vintage-green opacity-90 transition-[background-color] duration-300 hover:bg-ivory focus-visible:opacity-100"
              aria-label={labels.previous}
            >
              <ChevronLeft
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.25}
              />
            </motion.button>
          </div>
          <div className="pointer-events-auto absolute top-1/2 right-2 -translate-y-1/2 sm:right-3">
            <motion.button
              type="button"
              variants={arrowRightVariants}
              onClick={showNext}
              whileHover={reduceMotion ? undefined : { x: 2, opacity: 1 }}
              whileFocus={reduceMotion ? undefined : { x: 2, opacity: 1 }}
              transition={{ duration: 0.24, ease: invitationEase }}
              className="foil-border flex size-11 items-center justify-center bg-ivory/90 text-vintage-green opacity-90 transition-[background-color] duration-300 hover:bg-ivory focus-visible:opacity-100"
              aria-label={labels.next}
            >
              <ChevronRight
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.25}
              />
            </motion.button>
          </div>
        </motion.div>
      ) : null}

      <motion.div variants={captionVariants} className="relative mt-4 min-h-[1.65em]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.id}
            className="type-caption text-center text-pretty text-muted"
            aria-live="polite"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={captionTransition}
          >
            {caption}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {total > 1 ? (
        <motion.ul
          ref={stripRef}
          variants={reduceMotion ? reducedStagger : thumbContainerVariants}
          className="scrollbar-none mt-5 flex max-w-full gap-2 overflow-x-auto overscroll-x-contain px-1 touch-pan-x snap-x snap-proximity sm:mt-6 sm:gap-2.5"
        >
          {images.map((image, imageIndex) => {
            const selected = imageIndex === index;
            const selectLabel = filledText(image.alt)
              ? `${labels.selectLabeled}${image.alt}`
              : `${labels.selectIndexed}${imageIndex + 1}`;

            return (
              <motion.li
                key={image.id}
                variants={thumbItemVariants}
                className="shrink-0 snap-center"
              >
                <button
                  type="button"
                  ref={(node) => {
                    thumbRefs.current[imageIndex] = node;
                  }}
                  onClick={() => goTo(imageIndex)}
                  aria-label={selectLabel}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "relative block h-16 min-h-11 w-14 min-w-11 overflow-hidden bg-kraft transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-[4.5rem] sm:w-16",
                    selected
                      ? "foil-border scale-[1.02] opacity-100"
                      : "border border-transparent opacity-70 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.025] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-100",
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
              </motion.li>
            );
          })}
        </motion.ul>
      ) : null}
    </motion.div>
  );
}
