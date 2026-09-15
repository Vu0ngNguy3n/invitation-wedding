import type { GuestbookWish } from "@/types/guestbook";

type GuestbookWishEntryProps = {
  wish: GuestbookWish;
  signedOn: string;
};

export function GuestbookWishEntry({ wish, signedOn }: GuestbookWishEntryProps) {
  return (
    <article>
      <h3 className="type-heading text-[1.35rem] break-words tracking-[0.04em] text-ink sm:text-[1.5rem]">
        {wish.name}
      </h3>
      <blockquote className="type-body mt-3 whitespace-pre-wrap break-words text-ink">
        {wish.message}
      </blockquote>
      {signedOn ? (
        <time
          className="type-caption mt-4 block text-muted"
          dateTime={wish.createdAt}
        >
          {signedOn}
        </time>
      ) : null}
    </article>
  );
}
