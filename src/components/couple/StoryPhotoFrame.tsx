"use client";

import Image from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useSyncExternalStore } from "react";
import { invitationEase } from "@/lib/motion";
import { cn } from "@/utils/cn";

const FINE_POINTER_HOVER = "(hover: hover) and (pointer: fine)";

function subscribeToFinePointerHover(onStoreChange: () => void) {
  const media = window.matchMedia(FINE_POINTER_HOVER);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getFinePointerHoverSnapshot() {
  return window.matchMedia(FINE_POINTER_HOVER).matches;
}

function getFinePointerHoverServerSnapshot() {
  return false;
}

type StoryPhotoFrameProps = {
  photo?: string;
  alt: string;
  restRotateClassName: string;
};

export function StoryPhotoFrame({
  photo,
  alt,
  restRotateClassName,
}: StoryPhotoFrameProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();
  const isPlaying = useRef(false);
  const hasFinePointerHover = useSyncExternalStore(
    subscribeToFinePointerHover,
    getFinePointerHoverSnapshot,
    getFinePointerHoverServerSnapshot,
  );

  const playWobble = useCallback(
    async (intent: "hover" | "tap") => {
      if (isPlaying.current) {
        return;
      }

      isPlaying.current = true;

      try {
        if (prefersReducedMotion === true) {
          await controls.start({
            scale: [1, 1.005, 1],
            transition: { duration: 0.45, ease: invitationEase },
          });
          await controls.start({
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            y: 0,
            transition: { duration: 0 },
          });
          return;
        }

        const isTap = intent === "tap";

        await controls.start({
          rotate: isTap
            ? [0, 0.95, -0.85, 0.5, -0.28, 0]
            : [0, 0.8, -0.7, 0.4, -0.25, 0],
          x: isTap ? [0, 0.8, -0.7, 0.4, -0.2, 0] : [0, 0.5, -0.4, 0.25, -0.1, 0],
          y: 0,
          scale: [1, 1.008, 1.004, 1.006, 1.002, 1],
          transition: {
            duration: isTap ? 1.15 : 1.05,
            ease: invitationEase,
            times: [0, 0.16, 0.36, 0.55, 0.76, 1],
          },
        });
        await controls.start({
          rotate: 0,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0 },
        });
      } finally {
        isPlaying.current = false;
      }
    },
    [controls, prefersReducedMotion],
  );

  return (
    <div className={cn("origin-center", restRotateClassName)}>
      <motion.figure
        animate={controls}
        initial={{ rotate: 0, x: 0, y: 0, scale: 1, opacity: 1 }}
        tabIndex={-1}
        onHoverStart={() => {
          if (hasFinePointerHover) {
            void playWobble("hover");
          }
        }}
        onTap={(event) => {
          const pointerType = "pointerType" in event ? event.pointerType : undefined;
          if (!hasFinePointerHover || pointerType === "touch") {
            void playWobble("tap");
          }
        }}
        className="foil-border relative mx-auto w-full origin-center touch-pan-y bg-soft-white p-3 shadow-paper sm:p-3.5"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-kraft">
          {photo ? (
            <Image
              src={photo}
              alt={alt}
              fill
              sizes="(max-width: 1023px) 92vw, 48vw"
              className="object-cover object-center"
              draggable={false}
            />
          ) : null}
        </div>
      </motion.figure>
    </div>
  );
}
