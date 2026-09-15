import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin/constants";

const encoder = new TextEncoder();

function adminPassword(): string | null {
  const password = process.env.ADMIN_PASSWORD?.trim();
  return password && password.length > 0 ? password : null;
}

function sessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 16 ? secret : null;
}

export function isAdminAuthConfigured(): boolean {
  return adminPassword() !== null && sessionSecret() !== null;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function timingSafeEqualBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }

  return diff === 0;
}

function timingSafeEqualText(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  return timingSafeEqualBytes(leftBytes, rightBytes);
}

async function sha256Bytes(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return new Uint8Array(digest);
}

async function hmacSha256(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function passwordsMatch(input: string): Promise<boolean> {
  const expected = adminPassword();
  if (!expected) {
    return false;
  }

  const [inputHash, expectedHash] = await Promise.all([
    sha256Bytes(input),
    sha256Bytes(expected),
  ]);

  return timingSafeEqualBytes(inputHash, expectedHash);
}

export async function createSessionToken(): Promise<string | null> {
  const secret = sessionSecret();
  if (!secret) {
    return null;
  }

  const expiry = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `v1.${expiry}`;
  const signature = await hmacSha256(secret, payload);
  return `${payload}.${signature}`;
}

export async function isValidSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = sessionSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    return false;
  }

  const expiryValue = Number(parts[1]);
  if (!Number.isFinite(expiryValue) || expiryValue <= Date.now()) {
    return false;
  }

  const payload = `v1.${parts[1]}`;
  const expected = await hmacSha256(secret, payload);
  return timingSafeEqualText(parts[2], expected);
}

export function sessionCookieOptions() {
  return {
    name: ADMIN_SESSION_COOKIE,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  };
}
