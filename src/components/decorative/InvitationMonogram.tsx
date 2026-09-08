import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { cn } from "@/utils/cn";

type InvitationMonogramProps = {
  brideInitial?: string;
  groomInitial?: string;
  className?: string;
  framed?: boolean;
};

export function InvitationMonogram({
  brideInitial,
  groomInitial,
  className,
  framed = false,
}: InvitationMonogramProps) {
  if (!brideInitial && !groomInitial) {
    return null;
  }

  const letters = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center text-accent-gold",
        framed && "relative z-[1]",
        !framed && className,
      )}
    >
      {brideInitial && groomInitial ? (
        <>
          <span className="font-display text-2xl leading-none sm:text-3xl">
            {brideInitial}
          </span>
          <span className="font-script mx-1.5 translate-y-[-0.08em] text-xl leading-none sm:mx-2 sm:text-2xl">
            &
          </span>
          <span className="font-display text-2xl leading-none sm:text-3xl">
            {groomInitial}
          </span>
        </>
      ) : (
        <span className="font-display text-2xl leading-none sm:text-3xl">
          {brideInitial ?? groomInitial}
        </span>
      )}
    </span>
  );

  if (!framed) {
    return letters;
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex size-28 items-center justify-center sm:size-36",
        className,
      )}
    >
      <BotanicalMark
        asset="wreath"
        className="absolute inset-0 h-full w-full text-accent-gold/40"
      />
      {letters}
    </div>
  );
}
