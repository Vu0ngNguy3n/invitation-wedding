export interface ParentNames {
  father?: string;
  mother?: string;
}

export interface PersonProfile {
  name: string;
  fullName?: string;
  photo: string;
  parents?: ParentNames;
  description?: string;
  quote?: string;
}

export interface Couple {
  bride: PersonProfile;
  groom: PersonProfile;
}

export interface WeddingDate {
  iso: string;
  display: string;
  day: string;
  month: string;
  year: string;
}

export interface WeddingVenue {
  name: string;
  address: string;
  mapsUrl: string;
}

export interface WeddingCover {
  desktopImage: string;
  mobileImage: string;
}

export interface WeddingDetails {
  title: string;
  phrase: string;
  timezone: string;
  date: WeddingDate;
  venue: WeddingVenue;
  cover: WeddingCover;
}

export type WeddingEventType =
  | "bride"
  | "groom"
  | "ceremony"
  | "reception";

export interface WeddingEvent {
  id: string;
  type: WeddingEventType;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description?: string;
  image?: string;
  mapsUrl?: string;
  dressCode?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

export type GiftPerson = "bride" | "groom";

export interface WeddingGift {
  id: string;
  person: GiftPerson;
  name?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  qrImage?: string;
  transferNote?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  /** Absolute site URL, e.g. https://example.com. Enables canonical, OG URLs, and sitemap. */
  canonicalUrl: string;
  language: string;
  locale: string;
  favicon: string;
  appleIcon: string;
}

export interface InvitationCopy {
  saveTheDate: {
    title: string;
    description: string;
  };
  guestbook: {
    title: string;
    description: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
  gift: {
    title: string;
    description: string;
  };
  thankYou: {
    title: string;
    message: string;
    image?: string;
    imageAlt?: string;
  };
}

export interface WeddingData {
  couple: Couple;
  wedding: WeddingDetails;
  events: WeddingEvent[];
  gallery: GalleryImage[];
  gifts: WeddingGift[];
  navigation: NavigationItem[];
  seo: SeoConfig;
  copy: InvitationCopy;
}
