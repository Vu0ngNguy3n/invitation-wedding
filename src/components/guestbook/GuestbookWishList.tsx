import { GuestbookRetryButton } from "@/components/guestbook/GuestbookRetryButton";
import { GuestbookWishEntry } from "@/components/guestbook/GuestbookWishEntry";
import type { GuestbookUiLabels } from "@/components/guestbook/guestbookUi";
import type { GuestbookWish } from "@/types/guestbook";

type GuestbookWishListProps = {
  wishes: GuestbookWish[];
  loadFailed: boolean;
  labels: GuestbookUiLabels;
  timeZone: string;
};

function formatSignedOn(iso: string, timeZone: string): string {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
}

export function GuestbookWishList({
  wishes,
  loadFailed,
  labels,
  timeZone,
}: GuestbookWishListProps) {
  if (loadFailed && wishes.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4" role="alert">
        <p className="type-body text-error">{labels.listError}</p>
        <GuestbookRetryButton label={labels.listRetry} />
      </div>
    );
  }

  if (wishes.length === 0) {
    return (
      <p className="type-body text-muted" role="status">
        {labels.listEmpty}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {loadFailed ? (
        <p className="type-caption mb-6 text-error" role="alert">
          {labels.listError}
        </p>
      ) : null}
      <ul className="flex flex-col" aria-label={labels.listTitle}>
        {wishes.map((wish) => (
          <li
            key={wish.id}
            className="border-t border-accent-gold/20 py-8 first:border-t-0 first:pt-0"
          >
            <GuestbookWishEntry
              wish={wish}
              signedOn={formatSignedOn(wish.createdAt, timeZone)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
