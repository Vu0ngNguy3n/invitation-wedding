"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

type GuestbookWishScrollerProps = {
  enabled: boolean;
  label: string;
  children: ReactNode;
};

export function GuestbookWishScroller({
  enabled,
  label,
  children,
}: GuestbookWishScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(enabled);

  const updateOverflow = useCallback(() => {
    const node = scrollerRef.current;
    if (!node || !enabled) {
      setCanScrollMore(false);
      return;
    }

    const remaining = node.scrollHeight - node.scrollTop - node.clientHeight;
    setCanScrollMore(remaining > 8);
  }, [enabled]);

  useEffect(() => {
    updateOverflow();
    const node = scrollerRef.current;
    if (!node || !enabled) {
      return;
    }

    node.addEventListener("scroll", updateOverflow, { passive: true });
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(node);
    const inner = node.firstElementChild;
    if (inner) {
      observer.observe(inner);
    }

    return () => {
      node.removeEventListener("scroll", updateOverflow);
      observer.disconnect();
    };
  }, [enabled, updateOverflow, children]);

  if (!enabled) {
    return children;
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className={cn(
          "max-h-[min(70svh,42rem)] overflow-y-auto overscroll-y-contain pr-2 [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--accent-gold)_42%,transparent)_transparent] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-gold/50",
          canScrollMore && "guestbook-scroll-fade",
        )}
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="guestbook-scroll-more"
        data-can-scroll-more={canScrollMore ? "true" : "false"}
      />
    </div>
  );
}
