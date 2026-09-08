import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { cn } from "@/utils/cn";

type DecorativeDividerProps = {
  className?: string;
};

export function DecorativeDivider({ className }: DecorativeDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto w-full max-w-xs text-accent-gold/55", className)}
    >
      <BotanicalMark asset="divider" className="mx-auto h-6 w-full sm:h-7" />
    </div>
  );
}
