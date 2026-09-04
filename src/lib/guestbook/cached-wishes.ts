import { unstable_cache } from "next/cache";
import { GUESTBOOK_CACHE_TAG } from "@/lib/guestbook/constants";
import { listApprovedWishes } from "@/lib/guestbook/wishes";

export { GUESTBOOK_CACHE_TAG };

export const listApprovedWishesCached = unstable_cache(
  async () => listApprovedWishes(),
  ["guestbook-wishes-list"],
  {
    revalidate: 30,
    tags: [GUESTBOOK_CACHE_TAG],
  },
);
