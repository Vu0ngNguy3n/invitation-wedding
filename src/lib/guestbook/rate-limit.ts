const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 5;

const hitsByKey = new Map<string, number[]>();

export function consumePostRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hitsByKey.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);

  if (recent.length >= MAX_POSTS) {
    hitsByKey.set(key, recent);
    return false;
  }

  recent.push(now);
  hitsByKey.set(key, recent);
  return true;
}

export function clientRateLimitKey(request: Request): string | null {
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ip = vercelForwarded || forwarded || realIp;

  if (ip) {
    return ip;
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return "dev";
}
