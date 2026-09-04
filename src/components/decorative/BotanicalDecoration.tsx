import { Leaf } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type BotanicalDecorationProps = {
  children: ReactNode;
  className?: string;
};

export function BotanicalDecoration({
  children,
  className,
}: BotanicalDecorationProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-accent-gold/40"
      >
        <Leaf
          className="absolute left-0 top-0 size-3.5 -rotate-12 sm:size-4"
          strokeWidth={1.25}
        />
        <Leaf
          className="absolute right-0 top-0 size-3.5 rotate-12 scale-x-[-1] sm:size-4"
          strokeWidth={1.25}
        />
        <Leaf
          className="absolute bottom-0 left-0 size-3.5 rotate-180 scale-x-[-1] sm:size-4"
          strokeWidth={1.25}
        />
        <Leaf
          className="absolute bottom-0 right-0 size-3.5 rotate-180 sm:size-4"
          strokeWidth={1.25}
        />
      </div>
      {children}
    </div>
  );
}
