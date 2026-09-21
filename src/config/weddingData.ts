import type { WeddingData } from "@/types/wedding";
import { GUESTBOOK_MESSAGE_MAX, GUESTBOOK_NAME_MAX } from "@/types/guestbook";
import { RSVP_MESSAGE_MAX, RSVP_NAME_MAX } from "@/types/rsvp";

export type {
  Couple,
  DressCode,
  DressCodeColor,
  GalleryImage,
  InvitationCopy,
  InvitationMusic,
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
  WeddingTimeline,
  WeddingTimelineIcon,
  WeddingTimelineItem,
  WeddingVenue,
} from "@/types/wedding";

/**
 * Single source of truth for static wedding content.
 * UI components must import from `@/config/weddingData` only.
 * Guestbook wishes and RSVP submissions are persisted in Supabase
 * and must not live here.
 */
export const weddingData: WeddingData = {
  couple: {
    bride: {
      name: "Yến Vy",
      fullName: "Nguyễn Thị Yến Vy",
      photo: "/images/couple/bride.jpg",
      parents: {
        father: "Nguyễn Ngọc Sỹ",
        mother: "Nguyễn Thị Hồng",
      },
      description:
        "Dịu dàng, chân thành và luôn trân quý những điều giản dị. Với em, hạnh phúc là khi tìm thấy một người để cùng sẻ chia những ngày bình thường nhất.",
      quote: "Gặp anh, em biết mình đã về đúng nhà.",
    },
    groom: {
      name: "Nhật Song",
      fullName: "Nguyễn Lâm Nhật Song",
      photo: "/images/couple/groom.jpg",
      parents: {
        father: "Nguyễn Văn Thành",
        mother: "Ngô Thị Phần",
      },
      description:
        "Điềm đạm, chân thành và luôn tin rằng tình yêu đẹp nhất là sự đồng hành. Với anh, hạnh phúc là có một người để thương, để sẻ chia và cùng nhau đi qua những năm tháng phía trước.",
      quote: "Từ ngày có em, anh biết mình muốn trở về đâu.",
    },
  },

  wedding: {
    title: "Lễ Thành Hôn",
    phrase: "Chúng mình sẽ kết hôn",
    timezone: "Asia/Tokyo",
    date: {
      iso: "2026-10-31",
      display: "31.10.2026",
      day: "31",
      month: "10",
      year: "2026",
    },
    venue: {
      name: "ST. IGNATIUS CATHOLIC CHURCH",
      address: "東京都千代田区麹町６丁目５−1",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=ST.+IGNATIUS+CATHOLIC+CHURCH+東京都千代田区麹町６丁目５−1",
    },
    cover: {
      desktopImage: "/images/hero/hero-desktop.jpg",
      mobileImage: "/images/hero/hero-mobile.jpg",
    },
    calendarDurationHours: 2,
  },

  events: [
    {
      id: "event-bride",
      type: "bride",
      title: "Thánh lễ hôn phối",
      intro: "Hôn lễ được tổ chức vào lúc",
      date: "2026-10-31",
      time: "15:00",
      venueLabel: "Tại nhà thờ",
      venue: "ST. IGNATIUS CATHOLIC CHURCH",
      address: "東京都千代田区麹町６丁目５−1",
      mapsUrl: "https://maps.app.goo.gl/K9j7DqbS5ggnVbZG7",
    },
    {
      id: "event-groom",
      type: "groom",
      title: "Tiệc Mừng",
      date: "2026-10-31",
      time: "18:00",
      venueLabel: "Địa điểm",
      venue: "VIETNAM GARDEN",
      address: "東京都渋谷区千駄ケ谷５丁目２４−3 NTTドコモアネックスⅠ ２F",
      mapsUrl: "https://maps.app.goo.gl/qYJbCkvwrY6Enfc79",
    },
  ],

  timeline: {
    title: "Timeline",
    backgroundImage: "/images/timeline/timeline-bg.webp",
    backgroundAlt: "Không gian tiệc cưới với hoa và thiệp cưới",
    items: [
      {
        id: "ceremony",
        time: "15:00",
        title: "Thánh Lễ",
        icon: "church",
      },
      {
        id: "welcome",
        time: "17:00",
        title: "Đón khách",
        icon: "camera",
      },
      {
        id: "dinner",
        time: "18:00",
        title: "Khai tiệc",
        icon: "utensils",
      },
      {
        id: "party",
        time: "19:00",
        title: "Âm nhạc & Mini game",
        icon: "music",
      },
    ],
  },

  gallery: [
    {
      id: "gallery-01",
      src: "/images/gallery/gallery-01.jpg",
      alt: "Yến Vy và Nhật Song trong khoảnh khắc nhìn nhau dịu dàng",
      width: 1200,
      height: 1600,
    },
    {
      id: "gallery-02",
      src: "/images/gallery/gallery-02.jpg",
      alt: "Chân dung cô dâu Yến Vy trong ánh sáng buổi chiều",
      width: 1200,
      height: 1500,
    },
    {
      id: "gallery-03",
      src: "/images/gallery/gallery-03.jpg",
      alt: "Chú rể Nhật Song trong trang phục lễ cưới",
      width: 1200,
      height: 1500,
    },
    {
      id: "gallery-04",
      src: "/images/gallery/gallery-04.jpg",
      alt: "Hai bạn nắm tay nhau bước trên lối đi rợp hoa",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-05",
      src: "/images/gallery/gallery-05.jpg",
      alt: "Khoảnh khắc trao lời thề nguyện giữa Yến Vy và Nhật Song",
      width: 1400,
      height: 1600,
    },
    {
      id: "gallery-06",
      src: "/images/gallery/gallery-06.jpg",
      alt: "Chân dung đôi uyên ương bên hoa tươi và ánh nến",
      width: 1200,
      height: 1600,
    },
    {
      id: "gallery-07",
      src: "/images/gallery/gallery-07.jpg",
      alt: "Yến Vy cười trong vòng tay Nhật Song",
      width: 1600,
      height: 1100,
    },
    {
      id: "gallery-08",
      src: "/images/gallery/gallery-08.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-09",
      src: "/images/gallery/gallery-09.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-10",
      src: "/images/gallery/gallery-10.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-11",
      src: "/images/gallery/gallery-11.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-12",
      src: "/images/gallery/gallery-12.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-13",
      src: "/images/gallery/gallery-13.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-14",
      src: "/images/gallery/gallery-14.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-15",
      src: "/images/gallery/gallery-15.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-16",
      src: "/images/gallery/gallery-16.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-17",
      src: "/images/gallery/gallery-17.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-18",
      src: "/images/gallery/gallery-18.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
    {
      id: "gallery-19",
      src: "/images/gallery/gallery-19.jpg",
      alt: "Bức ảnh lưu niệm ngày Lễ Thành Hôn 31.10.2026",
      width: 1600,
      height: 1200,
    },
  ],

  dressCode: {
    title: "DRESS CODE",
    noteVi:
      "Gentlemen: Formal / Suit\nLadies: Beige / Pastel Pink / Pastel Blue",
    noteEn: "",
    paletteLabel: "Beige · Pastel Pink · Pastel Blue",
    colors: [
      { name: "Beige", value: "#E9D8C6" },
      { name: "Pastel Pink", value: "#F1CDD3" },
      { name: "Pastel Blue", value: "#CFE1E8" },
    ],
  },

  music: {
    src: "/audio/wedding.mp3",
    startAtSeconds: 77,
    label: "Click Music",
    playLabel: "Phát nhạc nền",
    pauseLabel: "Tạm dừng nhạc nền",
    discImage: "/images/music/disc.jpg",
  },

  navigation: [
    { id: "home", label: "Trang chủ", href: "#home" },
    { id: "story", label: "Câu chuyện", href: "#story" },
    { id: "save-the-date", label: "Ngày cưới", href: "#save-the-date" },
    { id: "events", label: "Sự kiện", href: "#events" },
    { id: "timeline", label: "Timeline", href: "#timeline" },
    { id: "gallery", label: "Album", href: "#gallery" },
    { id: "rsvp", label: "Xác nhận", href: "#rsvp" },
    { id: "guestbook", label: "Lời chúc", href: "#guestbook" },
  ],

  seo: {
    title: "Đám Cưới Yến Vy & Nhật Song | 31.10.2026",
    description:
      "Trân trọng kính mời bạn đến chung vui trong ngày cưới của Yến Vy và Nhật Song vào ngày 31 tháng 10 năm 2026.",
    keywords: [
      "Yến Vy",
      "Nhật Song",
      "đám cưới",
      "thiệp cưới",
      "wedding invitation",
      "31.10.2026",
    ],
    ogImage: "/images/og-image.jpg",
    ogTitle: "Yến Vy & Nhật Song",
    ogDescription: "Save the Date — 31.10.2026",
    canonicalUrl: "",
    language: "vi",
    locale: "vi_VN",
    favicon: "/favicon.ico",
    appleIcon: "/apple-touch-icon.png",
  },

  copy: {
    skipToContent: "Tới nội dung thiệp",
    opening: {
      hint: "Chạm để mở thiệp",
      sealLabel: "Mở thiệp cưới",
    },
    hero: {
      kicker: "We are\ngetting married",
    },
    story: {
      title: "Chúng mình sẽ kết hôn",
      brideRole: "The Bride",
      groomRole: "The Groom",
    },
    saveTheDate: {
      title: "Save The Date",
      description:
        "Ngày ấy đang dần đến gần!\nChúng mình mong được gặp lại những người thân thương, cùng nhau tạm gác những bộn bề ngoài kia để cùng chia sẻ niềm vui và viết tiếp câu chuyện của chúng mình",
      countdownDays: "Ngày",
      countdownHours: "Giờ",
      countdownMinutes: "Phút",
      countdownSeconds: "Giây",
      addToCalendarPrefix: "Tải lịch: ",
    },
    guestbook: {
      title: "Lời chúc",
      description:
        "Mời bạn viết vài lời chân thành vào sổ cưới của chúng mình.",
      nameLabel: "Họ và tên",
      messageLabel: "Lời chúc",
      namePlaceholder: "Họ và tên của bạn",
      messagePlaceholder: "Viết lời chúc phúc...",
      nameRequired: "Vui lòng nhập họ và tên.",
      nameTooLong: `Họ và tên tối đa ${GUESTBOOK_NAME_MAX} ký tự.`,
      messageRequired: "Vui lòng viết lời chúc.",
      messageTooLong: `Lời chúc tối đa ${GUESTBOOK_MESSAGE_MAX} ký tự.`,
      submitLabel: "Gửi lời chúc",
      submittingLabel: "Đang ghi vào sổ...",
      successMessage: "Lời chúc đã được ghi vào sổ. Cảm ơn bạn.",
      errorMessage: "Chưa gửi được lời chúc. Vui lòng thử lại sau.",
      rateLimitMessage: "Bạn gửi hơi nhanh. Vui lòng thử lại sau một lát.",
      listLoading: "Đang mở sổ lưu bút...",
      listEmpty: "Sổ còn đang trống. Hãy là người đầu tiên viết lời chúc.",
      listError: "Không mở được sổ lời chúc lúc này.",
      listRetry: "Thử mở lại",
      listTitle: "Những lời đã ghi",
    },
    rsvp: {
      title: "Xác nhận tham dự",
      accent: "",
      introVi:
        "Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất.\nTrân trọng!",
      introEn:
        "Please confirm your attendance so that we can prepare to welcome you.\nSincerely!",
      nameLabel: "Tên khách mời / Guest name",
      namePlaceholder: "Họ và tên của bạn",
      nameRequired: "Vui lòng nhập tên khách mời.",
      nameTooLong: `Tên khách mời tối đa ${RSVP_NAME_MAX} ký tự.`,
      messageLabel:
        "Lời nhắn đến cô dâu chú rể / Message to the bride and groom",
      messagePlaceholder: "Lời nhắn tùy chọn...",
      messageTooLong: `Lời nhắn tối đa ${RSVP_MESSAGE_MAX} ký tự.`,
      attendanceLabel: "Bạn sẽ tham dự chứ? / Will you join us?",
      attendancePlaceholder: "Chọn câu trả lời / Choose a reply",
      attendanceRequired: "Vui lòng chọn bạn sẽ tham dự hay không.",
      attendanceAttending: "Mình chắc chắn sẽ đến / Accept with pleasure",
      attendanceDeclined:
        "Xin lỗi, mình không thể tham dự / Decline with regret",
      attendeeCountLabel: "Số người tham dự / Number of attendees",
      attendeeCountPlaceholder: "Chọn số người / Choose a number",
      attendeeCountRequired: "Vui lòng chọn số người tham dự.",
      guestOfLabel:
        "Bạn là khách mời của ai? / Are you a guest of the bride or groom?",
      guestOfPlaceholder: "Chọn nhà cô dâu hoặc chú rể / Choose a side",
      guestOfRequired: "Vui lòng chọn bạn là khách của ai.",
      guestOfBride: "Khách nhà gái / Guest of the bride",
      guestOfGroom: "Khách nhà trai / Guest of the groom",
      guestOfBoth: "Khách của cả hai / Guest of both",
      submitLabel: "Send · Xác nhận",
      submittingLabel: "Đang gửi...",
      successAttending:
        "Cảm ơn bạn đã xác nhận.\nChúng mình rất mong được gặp bạn trong ngày đặc biệt này.",
      successDeclined:
        "Cảm ơn bạn đã phản hồi.\nChúng mình rất trân trọng tình cảm của bạn.",
      errorMessage: "Chưa gửi được xác nhận. Vui lòng thử lại sau.",
      rateLimitMessage: "Bạn gửi hơi nhanh. Vui lòng thử lại sau một lát.",
      privacyNote:
        "Phản hồi này giúp chúng mình chuẩn bị đón tiếp và không hiển thị công khai.",
    },
    events: {
      mapsLabel: "Xem bản đồ",
      mapsNewTab: " (mở tab mới)",
      typeBride: "Nhà gái",
      typeGroom: "Nhà trai",
      typeCeremony: "Lễ cưới",
      typeReception: "Tiệc cưới",
    },
    gallery: {
      region: "Album cưới",
      description:
        "Hạt giống niềm tin ngày ấy, qua bao mùa yêu thương, nay đã chín thành trái ngọt.\nHôn nhân - hành trình tươi đẹp nhất mà anh và em mong đợi.",
      close: "Đóng album",
      previous: "Ảnh trước",
      next: "Ảnh tiếp",
      openLabeled: "Xem ảnh lớn: ",
      openIndexed: "Xem ảnh lớn ",
      selectLabeled: "Chọn ảnh: ",
      selectIndexed: "Chọn ảnh ",
    },
    thankYou: {
      title: "Thank You",
      message:
        "Nhật Song, Yến Vy xin chân thành cảm ơn và hẹn gặp bạn trong ngày trọng đại.",
      image: "/images/thank-you/thank-you.jpg",
      imageAlt: "Yến Vy và Nhật Song trong ngày cưới",
    },
  },
};
