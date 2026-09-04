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
        "foil-border relative bg-surface px-5 py-6 text-paper-cream shadow-paper sm:px-7 sm:py-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
