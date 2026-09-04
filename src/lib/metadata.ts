import type { Metadata, Viewport } from "next";
import { weddingData } from "@/config/weddingData";
import { existingPublicAsset } from "@/utils/publicAsset";
import {
  filledText,
  invitationCanonicalUrl,
  invitationDescription,
  invitationDocumentTitle,
  invitationLocale,
  invitationOgDescription,
  invitationOgTitle,
} from "@/utils/seo";

export const invitationViewport: Viewport = {
  themeColor: "#1B3B34",
  width: "device-width",
  initialScale: 1,
};

function firstExistingIcon(
  candidates: Array<string | undefined>,
): string | undefined {
  for (const candidate of candidates) {
    const url = filledText(candidate);
    if (url) {
      const existing = existingPublicAsset(url);
      if (existing) {
        return existing;
      }
    }
  }

  return undefined;
}

export function buildInvitationMetadata(): Metadata {
  const title = invitationDocumentTitle(weddingData);
  const description = invitationDescription(weddingData);
  const ogTitle = invitationOgTitle(weddingData);
  const ogDescription = invitationOgDescription(weddingData);
  const canonical = invitationCanonicalUrl(weddingData);
  const ogImage = existingPublicAsset(weddingData.seo.ogImage);
  const keywords = weddingData.seo.keywords
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0);
  const favicon = firstExistingIcon([
    weddingData.seo.favicon,
    "/favicon.ico",
    "/icon.png",
    "/icon.svg",
    "/icons/favicon.ico",
    "/icons/icon.png",
  ]);
  const appleIcon = firstExistingIcon([
    weddingData.seo.appleIcon,
    "/apple-touch-icon.png",
    "/icons/apple-touch-icon.png",
  ]);
  const allowIndex = Boolean(canonical);

  return {
    metadataBase: canonical ? new URL(canonical.origin) : undefined,
    title,
    description,
    applicationName: title,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: canonical ? { canonical: canonical.href } : undefined,
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    robots: {
      index: allowIndex,
      follow: allowIndex,
    },
    openGraph: {
      type: "website",
      locale: invitationLocale(weddingData),
      siteName: title,
      title: ogTitle,
      description: ogDescription,
      url: canonical?.href,
      images: ogImage ? [{ url: ogImage, alt: ogTitle }] : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    appleWebApp: {
      title,
    },
    icons:
      favicon || appleIcon
        ? {
            ...(favicon ? { icon: favicon } : {}),
            ...(appleIcon ? { apple: appleIcon } : {}),
          }
        : undefined,
  };
}
