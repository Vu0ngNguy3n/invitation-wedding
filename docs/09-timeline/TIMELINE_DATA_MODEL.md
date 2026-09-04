# Wedding Timeline — Data Model

## Nguyên tắc

`src/config/weddingData.ts` tiếp tục là **Single Source of Truth** cho static wedding content.

Không tạo `timelineData.ts`, JSON riêng hoặc mock data trong component.
Cursor phải đọc type hiện tại trước khi sửa.

## Type đề xuất

Trong file type hiện tại, ví dụ `src/types/wedding.ts`:

```ts
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
```

Mở rộng `WeddingData`:

```ts
timeline: WeddingTimeline;
```

Tên/type thực tế phải follow convention hiện tại của project.

## Mock Data đề xuất

```ts
timeline: {
  title: "Timeline",
  subtitle: "Cùng chúng mình tận hưởng từng khoảnh khắc trong ngày đặc biệt",
  backgroundImage: "/images/timeline/timeline-bg.webp",
  backgroundAlt: "Không gian tiệc cưới với hoa và thiệp cưới",
  items: [
    {
      id: "ceremony",
      time: "15:00",
      title: "Thánh lễ",
      description: "Thánh lễ hôn phối",
      icon: "church",
    },
    {
      id: "welcome",
      time: "17:00",
      title: "Đón tiếp khách mời",
      description: "Welcome guests",
      icon: "camera",
    },
    {
      id: "dinner",
      time: "18:00",
      title: "Chung vui khai tiệc",
      description: "Wedding dinner",
      icon: "utensils",
    },
    {
      id: "party",
      time: "19:00",
      title: "Mini game & khiêu vũ",
      description: "Mini game & dance party",
      icon: "party",
    },
  ],
},
```

## Navigation

Nếu navigation phù hợp, có thể thêm:

```ts
{ id: "timeline", label: "Timeline", href: "#timeline" }
```

Đặt sau `events`, trước `gallery`.

## Image Asset

```text
public/
└── images/
    └── timeline/
        └── timeline-bg.webp
```

Nếu chưa có ảnh thật, giữ path này để sau chỉ cần thay asset.
