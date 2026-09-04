import type { WeddingData } from "@/types/wedding";

export type {
  Couple,
  GalleryImage,
  GiftPerson,
  InvitationCopy,
  NavigationItem,
  ParentNames,
  PersonProfile,
  SeoConfig,
  WeddingCover,
  WeddingData,
  WeddingDate,
  WeddingDetails,
  WeddingEvent,
  WeddingEventType,
  WeddingGift,
  WeddingVenue,
} from "@/types/wedding";

/**
 * Single source of truth for static wedding content.
 * UI components must import from `@/config/weddingData` only.
 * Guestbook wishes are persisted in Supabase and must not live here.
 */
export const weddingData: WeddingData = {
  couple: {
    bride: {
      name: "",
      fullName: "",
      photo: "/images/couple/bride.webp",
      parents: {
        father: "",
        mother: "",
      },
      description: "",
      quote: "",
    },
    groom: {
      name: "",
      fullName: "",
      photo: "/images/couple/groom.webp",
      parents: {
        father: "",
        mother: "",
      },
      description: "",
      quote: "",
    },
  },

  wedding: {
    title: "",
    phrase: "",
    timezone: "Asia/Ho_Chi_Minh",
    date: {
      iso: "",
      display: "",
      day: "",
      month: "",
      year: "",
    },
    venue: {
      name: "",
      address: "",
      mapsUrl: "",
    },
    cover: {
      desktopImage: "/images/hero/hero-desktop.webp",
      mobileImage: "/images/hero/hero-mobile.webp",
    },
  },

  events: [],
  gallery: [],
  gifts: [],

  navigation: [
    { id: "home", label: "Trang chủ", href: "#home" },
    { id: "story", label: "Câu chuyện", href: "#story" },
    { id: "save-the-date", label: "Ngày cưới", href: "#save-the-date" },
    { id: "events", label: "Sự kiện", href: "#events" },
    { id: "gallery", label: "Album", href: "#gallery" },
    { id: "guestbook", label: "Lời chúc", href: "#guestbook" },
    { id: "gift", label: "Mừng cưới", href: "#gift" },
  ],

  seo: {
    title: "",
    description: "",
    keywords: [],
    ogImage: "/images/og-image.webp",
    ogTitle: "",
    ogDescription: "",
    canonicalUrl: "",
    language: "vi",
    locale: "vi_VN",
    favicon: "",
    appleIcon: "",
  },

  copy: {
    saveTheDate: {
      title: "",
      description: "",
    },
    guestbook: {
      title: "Lời chúc",
      description: "Mời bạn viết vài lời chân thành vào sổ cưới của chúng mình.",
      namePlaceholder: "Họ và tên của bạn",
      messagePlaceholder: "Viết lời chúc phúc...",
      submitLabel: "Gửi lời chúc",
      successMessage: "Lời chúc đã được ghi vào sổ. Cảm ơn bạn.",
      errorMessage: "Chưa gửi được lời chúc. Vui lòng thử lại sau.",
    },
    gift: {
      title: "Mừng cưới",
      description:
        "Nếu muốn gửi một món quà nhỏ, xin chuyển khoản theo thông tin dưới đây.",
    },
    thankYou: {
      title: "Thank You",
      message:
        "Cảm ơn bạn đã hiện diện và gửi những lời chúc tốt đẹp đến chúng mình.",
      image: "",
      imageAlt: "",
    },
  },
};
