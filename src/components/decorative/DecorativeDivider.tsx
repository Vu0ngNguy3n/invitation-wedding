import { Leaf } from "lucide-react";
import { cn } from "@/utils/cn";

type DecorativeDividerProps = {
  className?: string;
};

export function DecorativeDivider({ className }: DecorativeDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-3 text-accent-gold", className)}
    >
      <span className="h-px flex-1 bg-accent-gold/40" />
      <Leaf
        aria-hidden="true"
        className="size-3 shrink-0 rotate-45"
        strokeWidth={1.25}
      />
      <span className="h-px flex-1 bg-accent-gold/40" />
    </div>
  );
}
