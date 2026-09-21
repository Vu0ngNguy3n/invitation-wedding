"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { GalleryArrow } from "@/components/gallery/GalleryArrow";
import {
  GalleryOpenButton,
  useGalleryViewerOpen,
} from "@/components/gallery/GalleryViewer";
import { useGalleryAutoplay } from "@/components/gallery/useGalleryAutoplay";
import {
  albumArrowLeft,
  albumArrowRight,
  albumArrows,
  albumMainImage,
  albumStage,
  albumThumbnail,
  fadeReveal,
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

type PointerOrigin = {
  id: number;
  x: number;
  y: number;
};

const swipeThreshold = 48;

function navigationDirection(from: number, to: number, total: number): number {
  const forward = (to - from + total) % total;
  const backward = (from - to + total) % total;
  return forward <= backward ? 1 : -1;
}

export function GallerySlider({ images, labels }: GallerySliderProps) {
  const regionId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isGesturing, setIsGesturing] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const pointerOriginRef = useRef<PointerOrigin | null>(null);
  const swipedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const stageInView = useInView(stageRef, { amount: 0.25 });
  const viewerOpen = useGalleryViewerOpen();
  const total = images.length;
  const current = images[index];
  const photoTransition = invitationTransition(prefersReducedMotion, {
    duration: 0.5,
  });
  const stageVariants = reduceMotion ? reducedStagger : albumStage;
  const imageVariants = reduceMotion ? fadeReveal : albumMainImage;
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

  const { reset: resetAutoplay } = useGalleryAutoplay(
    {
      enabled: total > 1 && !reduceMotion,
      paused: isHovered || isGesturing || viewerOpen || !stageInView,
      slideKey: index,
      onAdvance: showNext,
    },
  );

  const selectPrev = useCallback(() => {
    showPrev();
    resetAutoplay();
  }, [resetAutoplay, showPrev]);

  const selectNext = useCallback(() => {
    showNext();
    resetAutoplay();
  }, [resetAutoplay, showNext]);

  const selectIndex = useCallback(
    (nextIndex: number) => {
      goTo(nextIndex);
      resetAutoplay();
    },
    [goTo, resetAutoplay],
  );

  const endGesture = useCallback(() => {
    pointerOriginRef.current = null;
    setIsGesturing(false);
  }, []);

  const handlePointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse") {
        setIsHovered(true);
      }
    },
    [],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      swipedRef.current = false;

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      pointerOriginRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      setIsGesturing(true);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const origin = pointerOriginRef.current;
      endGesture();

      if (!origin || origin.id !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - origin.x;
      const deltaY = event.clientY - origin.y;

      if (
        total > 1 &&
        Math.abs(deltaX) >= swipeThreshold &&
        Math.abs(deltaX) > Math.abs(deltaY)
      ) {
        swipedRef.current = true;

        if (deltaX < 0) {
          showNext();
        } else {
          showPrev();
        }
      }

      resetAutoplay();
    },
    [endGesture, resetAutoplay, showNext, showPrev, total],
  );

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);

    if (pointerOriginRef.current) {
      endGesture();
      resetAutoplay();
    }
  }, [endGesture, resetAutoplay]);

  const handlePointerCancel = useCallback(() => {
    endGesture();
    resetAutoplay();
  }, [endGesture, resetAutoplay]);

  // A completed swipe must not also open the lightbox.
  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (!swipedRef.current) {
        return;
      }

      swipedRef.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

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

  return (
    <motion.div
      className="relative mx-auto mt-8 w-full min-w-0 max-w-[min(42rem,calc(72svh*0.8))] sm:mt-12"
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
          selectPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          selectNext();
        }
      }}
    >
      <p id={regionId} className="sr-only">
        {labels.region}
      </p>

      <div
        ref={stageRef}
        className="relative w-full min-w-0 touch-pan-y"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        <motion.div
          variants={imageVariants}
          className="relative aspect-[3/4] w-full overflow-hidden bg-kraft sm:aspect-[4/5]"
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
                  draggable={false}
                  quality={85}
                  sizes="(max-width: 639px) 92vw, min(672px, 58vh)"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.015]"
                />
              </GalleryOpenButton>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {total > 1 ? (
          <motion.div
            variants={arrowsVariants}
            className="pointer-events-none absolute inset-0 z-10"
          >
            <GalleryArrow
              direction="prev"
              label={labels.previous}
              variants={arrowLeftVariants}
              onActivate={selectPrev}
            />
            <GalleryArrow
              direction="next"
              label={labels.next}
              variants={arrowRightVariants}
              onActivate={selectNext}
            />
          </motion.div>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {`${index + 1} / ${total}`}
      </p>

      {total > 1 ? (
        <motion.ul
          ref={stripRef}
          variants={reduceMotion ? reducedStagger : thumbContainerVariants}
          className="scrollbar-none mt-6 flex max-w-full gap-2 overflow-x-auto overscroll-x-contain px-1 touch-pan-x snap-x snap-proximity sm:mt-7 sm:gap-2.5"
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
                  onClick={() => selectIndex(imageIndex)}
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
