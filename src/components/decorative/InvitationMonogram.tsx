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
    <p
      aria-hidden="true"
      className={cn(
        "font-display text-2xl tracking-[0.28em] text-accent-gold sm:text-3xl",
        framed && "relative z-[1]",
        !framed && className,
      )}
    >
      {brideInitial && groomInitial ? (
        <>
          <span>{brideInitial}</span>
          <span className="mx-2 font-script text-xl tracking-normal sm:text-2xl">
            &
          </span>
          <span>{groomInitial}</span>
        </>
      ) : (
        <span>{brideInitial ?? groomInitial}</span>
      )}
    </p>
  );

  if (!framed) {
    return letters;
  }

  return (
    <div
      className={cn(
        "relative flex size-28 items-center justify-center sm:size-36",
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
