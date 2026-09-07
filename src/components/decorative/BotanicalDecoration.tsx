import { Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type BotanicalDecorationProps = {
  children: ReactNode;
  className?: string;
  density?: "frame" | "cover";
};

export function BotanicalDecoration({
  children,
  className,
  density = "frame",
}: BotanicalDecorationProps) {
  const leafClassName =
    density === "cover"
      ? "size-5 sm:size-6 lg:size-7"
      : "size-3.5 sm:size-4";

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-accent-gold/45"
      >
        <Leaf
          className={cn("absolute top-0 left-0 -rotate-12", leafClassName)}
          strokeWidth={1.15}
        />
        <Leaf
          className={cn(
            "absolute top-0 right-0 rotate-12 scale-x-[-1]",
            leafClassName,
          )}
          strokeWidth={1.15}
        />
        <Leaf
          className={cn(
            "absolute bottom-0 left-0 rotate-180 scale-x-[-1]",
            leafClassName,
          )}
          strokeWidth={1.15}
        />
        <Leaf
          className={cn("absolute right-0 bottom-0 rotate-180", leafClassName)}
          strokeWidth={1.15}
        />
      </div>
      {children}
    </div>
  );
}
