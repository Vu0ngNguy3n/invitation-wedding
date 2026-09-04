import { weddingData } from "@/config/weddingData";
import { isInvitationAnchorAvailable } from "@/utils/sectionVisibility";

export function InvitationNav() {
  const items = weddingData.navigation.filter((item) =>
    isInvitationAnchorAvailable(item.id),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Mục lục" className="relative z-10 pb-4 sm:pb-6">
      <ul className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:max-w-none sm:gap-x-6 sm:gap-y-2">
        {items.map((item) => (
          <li key={item.id} className="max-w-full">
            <a
              href={item.href}
              className="type-overline inline-flex min-h-11 max-w-full items-center px-1 text-center text-accent-gold/80 transition-opacity hover:text-accent-gold hover:opacity-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
