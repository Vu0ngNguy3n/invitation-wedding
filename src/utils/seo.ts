import type { WeddingData } from "@/types/wedding";
import { filledText } from "@/utils/text";

export { filledText };

const DOCUMENT_TITLE_FALLBACK = "Thiệp cưới";

export function coupleDisplayName(data: WeddingData): string | undefined {
  const bride = filledText(data.couple.bride.name);
  const groom = filledText(data.couple.groom.name);

  if (bride && groom) {
    return `${bride} & ${groom}`;
  }

  return bride ?? groom;
}

export function invitationDocumentTitle(data: WeddingData): string {
  return (
    filledText(data.seo.title) ??
    coupleDisplayName(data) ??
    filledText(data.wedding.title) ??
    DOCUMENT_TITLE_FALLBACK
  );
}

export function invitationDescription(data: WeddingData): string | undefined {
  return (
    filledText(data.seo.description) ??
    filledText(data.wedding.phrase) ??
    filledText(data.copy.saveTheDate.description)
  );
}

export function invitationOgTitle(data: WeddingData): string {
  return filledText(data.seo.ogTitle) ?? invitationDocumentTitle(data);
}

export function invitationOgDescription(data: WeddingData): string | undefined {
  return filledText(data.seo.ogDescription) ?? invitationDescription(data);
}

export function parseAbsoluteUrl(value?: string): URL | undefined {
  const raw = filledText(value);
  if (!raw) {
    return undefined;
  }

  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
}

export function invitationCanonicalUrl(data: WeddingData): URL | undefined {
  return parseAbsoluteUrl(data.seo.canonicalUrl);
}

export function invitationLanguage(data: WeddingData): string {
  return filledText(data.seo.language) ?? "vi";
}

export function invitationLocale(data: WeddingData): string {
  return filledText(data.seo.locale) ?? "vi_VN";
}
