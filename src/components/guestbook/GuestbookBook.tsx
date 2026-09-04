import { GuestbookForm } from "@/components/guestbook/GuestbookForm";
import { GuestbookWishList } from "@/components/guestbook/GuestbookWishList";
import type { GuestbookUiLabels } from "@/components/guestbook/guestbookUi";
import type { GuestbookWish } from "@/types/guestbook";

type GuestbookBookProps = {
  timeZone: string;
  labels: GuestbookUiLabels;
  initialWishes: GuestbookWish[];
  loadFailed: boolean;
};

export function GuestbookBook({
  timeZone,
  labels,
  initialWishes,
  loadFailed,
}: GuestbookBookProps) {
  return (
    <div className="mt-10 grid min-w-0 gap-10 sm:mt-14 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <GuestbookForm labels={labels} />
      </div>
      <div className="min-w-0 lg:border-l lg:border-accent-gold/20 lg:pl-10 xl:pl-16">
        <GuestbookWishList
          wishes={initialWishes}
          loadFailed={loadFailed}
          labels={labels}
          timeZone={timeZone}
        />
      </div>
    </div>
  );
}
