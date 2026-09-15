import type { ReactNode } from "react";
import { requireAdminSession } from "@/lib/admin/guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminRsvpLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminSession();
  return children;
}
