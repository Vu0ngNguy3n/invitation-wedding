"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import type { NavigationItem } from "@/types/wedding";
import { cn } from "@/utils/cn";

type InvitationNavMenuProps = {
  items: NavigationItem[];
  brideInitial?: string;
  groomInitial?: string;
  className?: string;
};

const menuEase = [0.22, 1, 0.36, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: menuEase,
      delayChildren: 0.05,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.24, ease: menuEase },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.3, ease: menuEase } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: menuEase } },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.32, ease: menuEase } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: menuEase } },
};

const instantVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};

const itemClassName =
  "inline-flex min-h-11 max-w-full items-center justify-center px-1 text-center text-[0.625rem] font-medium tracking-[0.18em] text-accent-gold/55 uppercase transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-accent-gold hover:opacity-100 lg:tracking-[0.2em]";

export function InvitationNavMenu({
  items,
  brideInitial,
  groomInitial,
  className,
}: InvitationNavMenuProps) {
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;
  const lenis = useLenis();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // The drawer only exists below `md`, so it must not stay locked open when a
  // tablet rotates into the desktop navigation.
  useEffect(() => {
    if (!open) {
      return;
    }

    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlPaddingRight: html.style.paddingRight,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyTouchAction: body.style.touchAction,
    };

    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      html.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    lenis?.stop();

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.paddingRight = previous.htmlPaddingRight;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.touchAction = previous.bodyTouchAction;
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <nav
      aria-label="Mục lục"
      className={cn(
        "relative z-20 px-4 pt-3 pb-1 sm:px-8 sm:pt-5 sm:pb-2",
        className,
      )}
    >
      <div className="flex h-11 items-center justify-between md:hidden">
        {brideInitial || groomInitial ? (
          <a
            href="#home"
            onClick={close}
            className="monogram-text font-display h-11 text-[1.05rem] text-accent-gold/80"
          >
            <span className="monogram-letter">{brideInitial}</span>
            {brideInitial && groomInitial ? (
              <span className="monogram-amp font-script mx-[0.33em] text-[0.8em] text-accent-gold">
                &
              </span>
            ) : null}
            <span className="monogram-letter">{groomInitial}</span>
          </a>
        ) : (
          <span />
        )}

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center text-accent-gold/75 hover:text-accent-gold"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" className="grid size-5 place-items-center">
            <motion.span
              className="col-start-1 row-start-1 flex"
              initial={false}
              animate={{
                opacity: open ? 0 : 1,
                rotate: reduceMotion || !open ? 0 : 8,
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.27,
                ease: menuEase,
              }}
            >
              <Menu className="size-5" strokeWidth={1.25} />
            </motion.span>
            <motion.span
              className="col-start-1 row-start-1 flex"
              initial={false}
              animate={{
                opacity: open ? 1 : 0,
                rotate: reduceMotion || open ? 0 : -8,
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.27,
                ease: menuEase,
              }}
            >
              <X className="size-5" strokeWidth={1.25} />
            </motion.span>
          </span>
          <span className="sr-only">{open ? "Đóng mục lục" : "Mở mục lục"}</span>
        </button>
      </div>

      <div id={menuId} className="md:hidden">
        <AnimatePresence>
          {open ? (
            <>
              <motion.div
                aria-hidden="true"
                tabIndex={-1}
                onClick={close}
                className="fixed inset-0 bg-deep-forest/45"
                variants={reduceMotion ? instantVariants : backdropVariants}
                initial="hidden"
                animate="shown"
                exit="exit"
              />
              <motion.ul
                className="absolute inset-x-0 top-full z-10 flex flex-col items-stretch border-y border-accent-gold/18 bg-deep-forest px-4 pt-1 pb-2 shadow-[0_18px_38px_rgb(12_28_23/0.34)]"
                variants={reduceMotion ? instantVariants : panelVariants}
                initial="hidden"
                animate="shown"
                exit="exit"
              >
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    className="max-w-full border-b border-accent-gold/10 last:border-b-0"
                    variants={reduceMotion ? instantVariants : itemVariants}
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      className={cn(itemClassName, "w-full")}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          ) : null}
        </AnimatePresence>
      </div>

      <ul className="hidden md:mx-auto md:flex md:max-w-none md:flex-wrap md:items-center md:justify-center md:gap-x-5 md:gap-y-0">
        {items.map((item) => (
          <li key={item.id} className="max-w-full">
            <a href={item.href} className={itemClassName}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
