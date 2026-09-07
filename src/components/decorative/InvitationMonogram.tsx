import { cn } from "@/utils/cn";

type InvitationMonogramProps = {
  brideInitial?: string;
  groomInitial?: string;
  className?: string;
};

export function InvitationMonogram({
  brideInitial,
  groomInitial,
  className,
}: InvitationMonogramProps) {
  if (!brideInitial && !groomInitial) {
    return null;
  }

  return (
    <p
      aria-hidden="true"
      className={cn(
        "font-display text-2xl tracking-[0.28em] text-accent-gold sm:text-3xl",
        className,
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
}
