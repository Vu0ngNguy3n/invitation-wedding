import type { ReactNode } from "react";
import { BotanicalMark } from "@/components/decorative/BotanicalMark";
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
  const markClassName =
    density === "cover"
      ? "h-14 w-14 sm:h-16 sm:w-16 lg:h-[4.25rem] lg:w-[4.25rem]"
      : "h-10 w-10 sm:h-11 sm:w-11";

  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-accent-gold/40"
      >
        <BotanicalMark
          asset="corner"
          className={cn("absolute top-0 left-0", markClassName)}
        />
        <BotanicalMark
          asset="corner"
          className={cn("absolute top-0 right-0 scale-x-[-1]", markClassName)}
        />
        <BotanicalMark
          asset="corner"
          className={cn(
            "absolute bottom-0 left-0 scale-y-[-1]",
            markClassName,
          )}
        />
        <BotanicalMark
          asset="corner"
          className={cn(
            "absolute right-0 bottom-0 scale-x-[-1] scale-y-[-1]",
            markClassName,
          )}
        />
      </div>
      {children}
    </div>
  );
}
