import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { InvitationMonogram } from "@/components/decorative/InvitationMonogram";
import { cn } from "@/utils/cn";

type InvitationCardProps = {
  brideName?: string;
  groomName?: string;
  brideInitial?: string;
  groomInitial?: string;
  displayedDate?: string;
  dateTime?: string;
  className?: string;
};

export function InvitationCard({
  brideName,
  groomName,
  brideInitial,
  groomInitial,
  displayedDate,
  dateTime,
  className,
}: InvitationCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ivory px-5 py-6 text-center text-ink shadow-insert sm:px-6 sm:py-7",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--soft-white)_55%,transparent),transparent_46%,color-mix(in_srgb,var(--kraft)_28%,transparent))]"
      />
      <span aria-hidden="true" className="paper-fiber absolute inset-0" />
      <span
        aria-hidden="true"
        className="foil-border pointer-events-none absolute inset-[0.45rem]"
      />

      <div className="relative z-[1] flex w-full max-w-[16rem] flex-col items-center">
        {brideInitial || groomInitial ? (
          <InvitationMonogram
            brideInitial={brideInitial}
            groomInitial={groomInitial}
            className="mb-3 sm:mb-4"
          />
        ) : (
          <BotanicalMark
            asset="divider"
            className="mb-3 h-5 w-28 text-gold-deep/55 sm:mb-4"
          />
        )}

        {brideName && groomName ? (
          <p className="w-full max-w-full px-1 text-center text-balance">
            <span className="font-display block text-[1.45rem] leading-tight tracking-[0.08em] text-center [margin-inline-end:-0.08em] sm:text-[1.65rem]">
              {brideName}
            </span>
            <span
              aria-hidden="true"
              className="font-script mt-0.5 mb-0.5 block translate-y-[-0.08em] text-xl leading-none text-gold-deep"
            >
              &
            </span>
            <span className="font-display block text-[1.45rem] leading-tight tracking-[0.08em] text-center [margin-inline-end:-0.08em] sm:text-[1.65rem]">
              {groomName}
            </span>
          </p>
        ) : brideName || groomName ? (
          <p className="font-display max-w-full px-1 text-center text-balance text-[1.45rem] leading-tight tracking-[0.08em] [margin-inline-end:-0.08em] sm:text-[1.65rem]">
            {brideName ?? groomName}
          </p>
        ) : null}

        {displayedDate ? (
          dateTime ? (
            <time
              dateTime={dateTime}
              className="type-overline mt-4 block w-full text-center text-gold-deep sm:mt-5"
            >
              {displayedDate}
            </time>
          ) : (
            <p className="type-overline mt-4 w-full text-center text-gold-deep sm:mt-5">
              {displayedDate}
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
