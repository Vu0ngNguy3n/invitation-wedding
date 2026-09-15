import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE } from "@/lib/admin/constants";
import { isValidSessionToken } from "@/lib/admin/session";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (await isValidSessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = ADMIN_LOGIN_PATH;
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/rsvp", "/admin/rsvp/:path*"],
};
