import { cn } from "@/utils/cn";

type InvitationNamesSize = "opening" | "hero" | "closing";

type InvitationNamesProps = {
  brideName?: string;
  groomName?: string;
  size?: InvitationNamesSize;
  className?: string;
};

const nameClassName: Record<InvitationNamesSize, string> = {
  opening: "type-opening-name text-ink",
  hero: "type-hero-name text-paper-cream",
  closing: "type-heading text-paper-cream",
};

const ampersandClassName: Record<InvitationNamesSize, string> = {
  opening:
    "script-ampersand font-script mt-1 mb-1 text-[clamp(1.5rem,4.2vw,2.35rem)] leading-none text-gold-foil lg:mt-2 lg:mb-2 lg:text-[clamp(1.85rem,2.5vw,2.85rem)]",
  hero: "script-ampersand type-script mt-[0.11em] mb-[0.11em] text-[clamp(1.15rem,3vw,1.55rem)] leading-none text-accent-gold lg:text-[clamp(1.35rem,1.8vw,1.85rem)]",
  closing: "script-ampersand type-script my-1 leading-none text-accent-gold",
};

export function InvitationNames({
  brideName,
  groomName,
  size = "hero",
  className,
}: InvitationNamesProps) {
  if (!brideName && !groomName) {
    return null;
  }

  return (
    <span
      className={cn("invitation-stack", className)}
    >
      {brideName && groomName ? (
        <>
          <span className={cn(nameClassName[size], "block max-w-full px-1")}>
            {brideName}
          </span>
          <span aria-hidden="true" className={ampersandClassName[size]}>
            &
          </span>
          <span className={cn(nameClassName[size], "block max-w-full px-1")}>
            {groomName}
          </span>
        </>
      ) : (
        <span className={cn(nameClassName[size], "block max-w-full px-1")}>
          {brideName ?? groomName}
        </span>
      )}
    </span>
  );
}
