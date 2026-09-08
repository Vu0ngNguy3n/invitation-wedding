import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type PaperSurfaceProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "figure" | "aside";
};

export function PaperSurface({
  children,
  className,
  as: Component = "div",
}: PaperSurfaceProps) {
  return (
    <Component
      className={cn(
        "foil-border relative bg-paper-cream px-5 py-7 text-ink shadow-paper [--accent-gold:var(--gold-deep)] [--color-accent-gold:var(--gold-deep)] sm:px-8 sm:py-10",
        className,
      )}
    >
      {children}
    </Component>
  );
}
