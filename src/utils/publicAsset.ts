import { existsSync } from "node:fs";
import path from "node:path";
import { filledText } from "@/utils/text";

export function publicAssetExists(urlPath: string): boolean {
  return existsSync(
    path.join(process.cwd(), "public", urlPath.replace(/^\//, "")),
  );
}

export function existingPublicAsset(
  urlPath: string | undefined,
): string | undefined {
  const url = filledText(urlPath);
  return url && publicAssetExists(url) ? url : undefined;
}
