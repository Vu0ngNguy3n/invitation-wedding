import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GuestbookWriteInput } from "@/lib/guestbook/validation";
import type { GuestbookWish } from "@/types/guestbook";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseWishRow(value: unknown): GuestbookWish | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, message, created_at: createdAt } = value;

  if (
    typeof id !== "string" ||
    id.length === 0 ||
    typeof name !== "string" ||
    typeof message !== "string" ||
    typeof createdAt !== "string"
  ) {
    return null;
  }

  const parsed = Date.parse(createdAt);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return {
    id,
    name,
    message,
    createdAt: new Date(parsed).toISOString(),
  };
}

function requireWishRow(value: unknown): GuestbookWish {
  const wish = parseWishRow(value);
  if (!wish) {
    throw new Error("GUESTBOOK_ROW_INVALID");
  }
  return wish;
}

export async function listApprovedWishes(): Promise<GuestbookWish[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("guestbook_wishes")
    .select("id, name, message, created_at")
    .eq("is_approved", true)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    throw new Error("GUESTBOOK_LIST_FAILED");
  }

  return (data ?? []).flatMap((row) => {
    const wish = parseWishRow(row);
    return wish ? [wish] : [];
  });
}

export async function insertWish(
  input: GuestbookWriteInput,
): Promise<GuestbookWish> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("guestbook_wishes")
    .insert({
      name: input.name,
      message: input.message,
    })
    .select("id, name, message, created_at")
    .single();

  if (error || !data) {
    throw new Error("GUESTBOOK_INSERT_FAILED");
  }

  return requireWishRow(data);
}
