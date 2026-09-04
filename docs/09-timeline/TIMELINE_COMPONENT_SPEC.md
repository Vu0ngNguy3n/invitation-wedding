# Wedding Timeline — Component Specification

## Component tree đề xuất

```text
WeddingTimeline
├── SectionHeading
└── TimelineList
    └── TimelineItem × N
```

Nếu animation cần Client Component:

```text
WeddingTimeline               // Server Component
└── AnimatedTimelineList      // Client Component
    └── TimelineItem
```

## Suggested files

```text
src/
├── components/
│   └── sections/
│       └── WeddingTimeline/
│           ├── WeddingTimeline.tsx
│           ├── AnimatedTimelineList.tsx
│           └── index.ts
└── config/
    └── weddingData.ts
```

Nếu project đang dùng convention khác, follow convention hiện tại.

## Icon mapping

```ts
import {
  Camera,
  Church,
  Heart,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";

const timelineIconMap = {
  church: Church,
  camera: Camera,
  utensils: UtensilsCrossed,
  party: PartyPopper,
} as const;
```

Không import Lucide trong `weddingData.ts`.

## Responsive strategy

Mobile:
- vertical timeline;
- line absolute;
- content offset khỏi line.

Desktop:
- grid theo số item;
- line horizontal;
- marker nằm trên line;
- labels center aligned.

Không dùng JS viewport detection nếu CSS/Tailwind giải quyết được.

## Background strategy

Ưu tiên `next/image` với `fill` trong một section `relative overflow-hidden`, sau đó overlay và content layer.
Không dùng inline background style.

## Motion strategy

Nếu cần animation, giữ client boundary nhỏ nhất có thể.
Không thêm `"use client"` vào toàn page.

## Semantics

```html
<section id="timeline">
  <h2>Timeline</h2>
  <ol>
    <li>...</li>
  </ol>
</section>
```
