import type { GuestbookWish } from "@/types/guestbook";

function foldForModeration(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replaceAll("đ", "d")
    .replaceAll("Đ", "d")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function diagnosticSignalCount(folded: string): number {
  let signals = 0;

  if (/\bqa\b/.test(folded)) {
    signals += 1;
  }

  if (/\btests?\b|\btesting\b/.test(folded)) {
    signals += 1;
  }

  if (/\bcache\b/.test(folded)) {
    signals += 1;
  }

  if (folded.includes("supabase")) {
    signals += 1;
  }

  if (folded.includes("guestbook")) {
    signals += 1;
  }

  if (/\bkiem tra\b/.test(folded)) {
    signals += 1;
  }

  if (folded.includes("he thong")) {
    signals += 1;
  }

  if (/\bket noi\b/.test(folded) && folded.includes("guestbook")) {
    signals += 1;
  }

  return signals;
}

/**
 * Hide diagnostic/QA guestbook rows from the public invitation without
 * matching production names or wish copy verbatim.
 */
export function isPublicGuestbookWish(wish: Pick<GuestbookWish, "name" | "message">): boolean {
  const name = foldForModeration(wish.name);
  const message = foldForModeration(wish.message);
  const combined = `${name} ${message}`.trim();
  const signals = diagnosticSignalCount(combined);
  const compactName = name.replace(/\s+/g, "");

  const compactMessage = message.replace(/\s+/g, "");

  if (compactName.length <= 2 && compactMessage.length <= 2) {
    return false;
  }

  if (signals >= 2) {
    return false;
  }

  if (signals >= 1 && compactName.length <= 3) {
    return false;
  }

  if (signals >= 1 && combined.length <= 28) {
    return false;
  }

  return true;
}
