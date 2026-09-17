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
        "monogram-text font-display text-2xl text-accent-gold sm:text-3xl",
        framed && "z-[1] col-start-1 row-start-1",
        !framed && className,
      )}
    >
      {brideInitial && groomInitial ? (
        <>
          <span className="monogram-letter">{brideInitial}</span>
          <span className="monogram-amp font-script mx-[0.33em] text-[0.8em]">
            &
          </span>
          <span className="monogram-letter">{groomInitial}</span>
        </>
      ) : (
        <span className="monogram-letter">{brideInitial ?? groomInitial}</span>
      )}
    </span>
  );

  if (!framed) {
    return letters;
  }

  return (
    <div className={cn("mx-auto grid size-24 place-items-center sm:size-32", className)}>
      <BotanicalMark
        asset="wreath"
        className="col-start-1 row-start-1 h-full w-full text-accent-gold/40"
      />
      {letters}
    </div>
  );
}
