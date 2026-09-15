import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { isValidSessionToken } from "@/lib/admin/session";

export async function hasAdminSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}

export async function requireAdminSession(): Promise<void> {
  if (await hasAdminSession()) {
    return;
  }

  redirect(ADMIN_LOGIN_PATH);
}
