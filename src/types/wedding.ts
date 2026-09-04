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
  /** ICS event length in hours. [NEEDS_DECISION] if ceremony length should differ. */
  calendarDurationHours: number;
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

export type WeddingTimelineIcon =
  | "church"
  | "camera"
  | "utensils"
  | "party"
  | "music"
  | "heart"
  | "rings";

export interface WeddingTimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  icon: WeddingTimelineIcon;
}

export interface WeddingTimeline {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  items: WeddingTimelineItem[];
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
  skipToContent: string;
  saveTheDate: {
    title: string;
    description: string;
    countdownDays: string;
    countdownHours: string;
    countdownMinutes: string;
    countdownSeconds: string;
    addToCalendarPrefix: string;
  };
  guestbook: {
    title: string;
    description: string;
    nameLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    nameRequired: string;
    nameTooLong: string;
    messageRequired: string;
    messageTooLong: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    errorMessage: string;
    rateLimitMessage: string;
    listLoading: string;
    listEmpty: string;
    listError: string;
    listRetry: string;
    listTitle: string;
  };
  gift: {
    title: string;
    description: string;
    bank: string;
    accountName: string;
    accountNumber: string;
    transferNote: string;
    copy: string;
    copied: string;
    copyFailed: string;
    brideRole: string;
    groomRole: string;
  };
  events: {
    mapsLabel: string;
    mapsNewTab: string;
    typeBride: string;
    typeGroom: string;
    typeCeremony: string;
    typeReception: string;
  };
  gallery: {
    close: string;
    previous: string;
    next: string;
    openLabeled: string;
    openIndexed: string;
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
  timeline: WeddingTimeline;
  gallery: GalleryImage[];
  gifts: WeddingGift[];
  navigation: NavigationItem[];
  seo: SeoConfig;
  copy: InvitationCopy;
}
