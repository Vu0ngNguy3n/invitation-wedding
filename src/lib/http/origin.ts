function hostnameFrom(value: string | undefined): string | undefined {
  const raw = value?.split(",")[0]?.trim();
  if (!raw) {
    return undefined;
  }

  try {
    const url = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`);
    const hostname = url.hostname.trim().toLowerCase();
    return hostname.length > 0 ? hostname : undefined;
  } catch {
    return undefined;
  }
}

export function isSameOriginPost(request: Request): boolean {
  const originHost = hostnameFrom(request.headers.get("origin") ?? undefined);
  if (!originHost) {
    return false;
  }

  return [
    hostnameFrom(request.headers.get("x-forwarded-host") ?? undefined),
    hostnameFrom(request.headers.get("host") ?? undefined),
    hostnameFrom(request.url),
  ].some((candidate) => candidate === originHost);
}
