Canonical data source: `src/config/weddingData.ts`.
Components must import wedding content from `@/config/weddingData` only.
The sample object below is illustrative; do not duplicate it as a second live data file.

1. UX/UI & Design System Specification
Concept: Vintage Elegant Botanical Invitation – Gold Foil & Cream on Deep Green Paper.
Vibe: Sang trọng, hoài cổ, cảm giác như tấm thiệp giấy thủ công dập kim chữ vàng trên nền giấy dán ép hoa khô màu xanh rêu đậm.
  - Bảng màu hệ thống (Color Palette):
    Role,               Color Name,             Hex Code,     Tailwind Token,     Usage
    Main BG,            Deep Vintage Green     ,#1B3B34      ,vintage-green    ,Nền toàn bộ trang web
    Card BG,            Dark Olive Green       ,#22443C      ,vintage-card     ,"Nền thiệp con, event card, modal"
    Text Primary,       Warm Ivory / Cream     ,#F5F0E6      ,paper-cream      ,"Tên cô dâu chú rể, tiêu đề chính"
    Text Secondary,     Muted Sage Mint        ,#A3C1AD      ,sage-light       ,"Lời giới thiệu, địa chỉ, ngày tháng"
    Accent / Border,    Foil Metallic Gold     ,#E0C068      ,accent-gold      ,"Viền thiệp, monogram, nút bấm, icon"

  - Typography:

    Heading / Monogram: Cormorant Garamond hoặc Playfair Display (Serif cổ điển, thanh lịch).

    Body Text: Lora hoặc Montserrat (Nét mảnh, tương phản cao trên nền tối).

    Script / Accent: Great Vibes hoặc Alex Brush (Chỉ dùng cho "Save the Date", "Thank You", chữ ký).

  - Visual Language:

    Texture: SVG Noise/Grain phủ toàn trang với opacity 3-5% tạo cảm giác nhám của giấy thủ công cao cấp.

    Border: Solid 1px hoặc Dashed màu accent-gold (#E0C068) giả lập hiệu ứng dập kim.

    Shadow: Soft glow nhẹ (shadow-[0_10px_30px_rgba(0,0,0,0.3)]) tạo chiều sâu giữa các lớp thiệp.

2. Technical Architecture & Folder Structure
  Framework: Next.js 14+ (App Router), TypeScript, Tailwind CSS.

  Animation: framer-motion (Fade, reveal, soft slide-up).

  Icons: lucide-react.

  Database: Supabase (Table: guestbook_wishes).

  Cấu trúc thư mục:
    /src
      /app
        /api/wishes        # API Route xử lý guestbook
        layout.tsx         # Setup font & Metadata
        page.tsx           # Trang chủ tổng hợp
      /components
        /ui                # Button, Modal, Card, Lightbox (Reusable)
        /wedding           # Hero, Couple, SaveTheDate, Events, Album, Guestbook, Gift, ThankYou
      /config
        weddingData.ts     # File dữ liệu duy nhất (Single Source of Truth)
      /lib
        supabase.ts        # Client Supabase
      /styles
        globals.css        # Background grain texture & custom scrollbar

  3. Data Model (src/config/weddingData.ts)
    TypeScript
    export const weddingData = {
      couple: {
        bride: {
          name: "Nguyễn Thu A",
          shortName: "Thu A",
          parents: "Ông Nguyễn Văn B & Bà Trần Thị C",
          intro: "Một cô gái yêu thiên nhiên, thích sự hoài cổ và luôn tin vào những điều kỳ diệu...",
          image: "/images/bride.jpg"
        },
        groom: {
          name: "Trần Văn D",
          shortName: "Văn D",
          parents: "Ông Trần Văn E & Bà Lê Thị F",
          intro: "Chàng trai điềm tĩnh, đam mê nhiếp ảnh và là chỗ dựa vững chắc...",
          image: "/images/groom.jpg"
        }
      },
      date: "2026-12-25T17:00:00+07:00",
      displayDate: {
        day: "25",
        month: "Tháng 12",
        year: "2026",
        dow: "Thứ Sáu"
      },
      events: [
        {
          id: "bride-event",
          type: "bride",
          title: "Lễ Vu Quy & Tiệc Cưới",
          time: "11:00",
          date: "25/12/2026",
          location: "Trung Tâm Hội Nghị X",
          address: "123 Đường Y, Quận Z, TP. Hồ Chí Minh",
          mapUrl: "https://maps.google.com"
        },
        {
          id: "groom-event",
          type: "groom",
          title: "Lễ Thành Hôn",
          time: "17:30",
          date: "25/12/2026",
          location: "Nhà Hàng Cưới W",
          address: "456 Đường V, Quận Z, TP. Hồ Chí Minh",
          mapUrl: "https://maps.google.com"
        }
      ],
      album: [
        { src: "/images/album-1.jpg", width: 800, height: 1200, alt: "Wedding 1" },
        { src: "/images/album-2.jpg", width: 1200, height: 800, alt: "Wedding 2" },
        { src: "/images/album-3.jpg", width: 800, height: 800, alt: "Wedding 3" }
      ],
      banking: {
        bride: {
          name: "NGUYEN THU A",
          bank: "Vietcombank",
          number: "123456789",
          qr: "/images/qr-bride.jpg"
        },
        groom: {
          name: "TRAN VAN D",
          bank: "Techcombank",
          number: "987654321",
          qr: "/images/qr-groom.jpg"
        }
      }
    };