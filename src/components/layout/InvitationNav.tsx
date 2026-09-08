import { weddingData } from "@/config/weddingData";
import { cn } from "@/utils/cn";
import { isInvitationAnchorAvailable } from "@/utils/sectionVisibility";

type InvitationNavProps = {
  className?: string;
};

export function InvitationNav({ className }: InvitationNavProps) {
  const items = weddingData.navigation.filter((item) =>
    isInvitationAnchorAvailable(item.id),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Mục lục"
      className={cn("relative z-20 px-4 pt-5 pb-2 sm:px-8 sm:pt-7 sm:pb-3", className)}
    >
      <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-0 sm:max-w-none sm:gap-x-6">
        {items.map((item) => (
          <li key={item.id} className="max-w-full">
            <a
              href={item.href}
              className="type-overline invitation-action inline-flex min-h-11 max-w-full items-center px-1 text-center text-accent-gold/80 hover:text-accent-gold hover:opacity-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
