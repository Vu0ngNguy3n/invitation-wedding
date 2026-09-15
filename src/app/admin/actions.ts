"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_LOGIN_PATH,
  ADMIN_RSVP_PATH,
  ADMIN_SESSION_COOKIE,
} from "@/lib/admin/constants";
import {
  createSessionToken,
  isAdminAuthConfigured,
  passwordsMatch,
  sessionCookieOptions,
} from "@/lib/admin/session";
import {
  clientRateLimitKeyFromHeaders,
  consumePostRateLimit,
} from "@/lib/http/rate-limit";

export type AdminLoginState = {
  error: string;
} | null;

export async function loginAdmin(
  _previous: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const headerList = await headers();
  const rateLimitKey = clientRateLimitKeyFromHeaders(headerList);

  if (!rateLimitKey || !consumePostRateLimit(`admin-login:${rateLimitKey}`)) {
    return { error: "Bạn thử hơi nhiều lần. Vui lòng đợi một lát rồi thử lại." };
  }

  if (!isAdminAuthConfigured()) {
    console.error("admin login is not configured");
    return { error: "Không thể đăng nhập lúc này." };
  }

  const password = String(formData.get("password") ?? "");
  if (!(await passwordsMatch(password))) {
    return { error: "Mật khẩu không đúng." };
  }

  const token = await createSessionToken();
  if (!token) {
    console.error("admin session could not be created");
    return { error: "Không thể đăng nhập lúc này." };
  }

  const jar = await cookies();
  const options = sessionCookieOptions();
  jar.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: options.httpOnly,
    sameSite: options.sameSite,
    secure: options.secure,
    path: options.path,
    maxAge: options.maxAge,
  });

  redirect(ADMIN_RSVP_PATH);
}

export async function logoutAdmin(): Promise<void> {
  const jar = await cookies();
  const options = sessionCookieOptions();
  jar.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: options.httpOnly,
    sameSite: options.sameSite,
    secure: options.secure,
    path: options.path,
    maxAge: 0,
  });

  redirect(ADMIN_LOGIN_PATH);
}
