# Wedding Timeline — Feature Specification

## 1. Mục tiêu

Thêm section **Wedding Timeline** vào website thiệp cưới để khách mời hiểu nhanh lịch trình chính trong ngày cưới.

Section lấy cảm hứng từ ảnh tham khảo:
- tiêu đề lớn `TIMELINE`;
- ảnh cưới/detail làm background;
- overlay tối để tăng độ tương phản;
- một đường timeline;
- mỗi mốc gồm icon, giờ, tên hoạt động và mô tả ngắn;
- desktop trình bày ngang;
- mobile chuyển thành timeline dọc.

Không copy pixel-perfect ảnh tham khảo. Hãy giữ đúng Design System hiện tại của project.

## 2. Vị trí trong User Journey

Thứ tự khuyến nghị:
1. Hero / Opening
2. Bride & Groom
3. Save the Date / Countdown
4. Wedding Events
5. **Wedding Timeline**
6. Gallery
7. Guestbook
8. Wedding Gift
9. Thank You

`Wedding Events` cung cấp thông tin sự kiện/địa điểm.
`Wedding Timeline` tập trung vào **trình tự hoạt động trong ngày**, tránh lặp lại toàn bộ địa chỉ, bản đồ và thông tin venue.

## 3. Nội dung Timeline

| Time | Title | Description | Icon key |
|---|---|---|---|
| 15:00 | Thánh lễ | Thánh lễ hôn phối | church |
| 17:00 | Đón tiếp khách mời | Welcome guests | camera |
| 18:00 | Chung vui khai tiệc | Wedding dinner | utensils |
| 19:00 | Mini game & khiêu vũ | Mini game & dance party | party |

Toàn bộ content phải đến từ `@/config/weddingData`.
Không hardcode các mốc thời gian hoặc nội dung trong JSX.

## 4. Visual Direction

- Forest Green: `#1B3B34`
- Gold: `#E0C068`
- Warm Cream: `#F5F0E6`
- vintage, elegant, romantic, premium
- physical invitation aesthetic
- botanical/floral accents vừa phải

Khuyến nghị background: `/images/timeline/timeline-bg.webp`.

Cấu trúc layer:
1. background image;
2. dark green/black translucent overlay;
3. optional subtle gradient;
4. timeline content.

## 5. Desktop UX

- timeline nằm ngang;
- đường mảnh chạy xuyên milestone;
- marker hình tròn;
- icon gần marker;
- thời gian nổi bật;
- item phân bố đều;
- text không overlap;
- không dùng SaaS card.

## 6. Mobile UX

Mobile là ưu tiên.
Không ép 4 item vào một hàng ngang nhỏ.

Ở 375–430px:
- timeline chuyển dọc;
- line nằm bên trái hoặc center-left;
- milestone xếp dọc;
- time nổi bật;
- title/description cạnh marker;
- không horizontal scroll;
- không giảm font quá nhỏ để giữ layout ngang.

## 7. Icons

Chỉ dùng `lucide-react`.

Mapping gợi ý:
- `church` → `Church`
- `camera` → `Camera`
- `utensils` → `UtensilsCrossed`
- `party` → `PartyPopper`
- fallback → `Heart`

Không lưu React Component trong `weddingData.ts`; chỉ lưu string key.

## 8. Animation

Dùng Framer Motion nhẹ:
- heading fade-in;
- line reveal;
- milestone stagger;
- icon/time fade + translateY nhỏ.

Tránh bounce, zoom mạnh, spring quá nhiều.
Phải hỗ trợ `prefers-reduced-motion`.

## 9. Accessibility

- `<section id="timeline">`;
- heading rõ ràng;
- danh sách dùng `<ol>`;
- milestone dùng `<li>`;
- decorative icons `aria-hidden="true"`;
- không phụ thuộc icon để truyền đạt nội dung;
- contrast đủ trên background.

## 10. Technical Requirements

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- mobile-first
- no inline styles
- Server Component mặc định
- Client Component chỉ cho animation/interactivity cần thiết
- không thêm library mới chỉ để làm timeline

## 11. Edge Cases

- `items.length === 0` → không render section;
- 1 item → căn hợp lý;
- 2–3 item → phân bố đều;
- 5+ item → giữ readability;
- thiếu description → render time + title;
- icon key lạ → fallback icon;
- thiếu background image → dùng nền hiện tại của design system.

## 12. Acceptance Criteria

- Timeline đọc dữ liệu từ `@/config/weddingData`.
- Không hardcode content trong JSX.
- Desktop horizontal timeline.
- Mobile vertical timeline.
- Không overflow ở 375px.
- lucide-react.
- reduced motion.
- background đảm bảo readability.
- TypeScript pass.
- ESLint pass.
- không làm hỏng section hiện có.
