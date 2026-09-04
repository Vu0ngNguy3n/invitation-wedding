# Wedding Timeline — QA Checklist

## Data
- [ ] Timeline nằm trong `weddingData`.
- [ ] Không có duplicate timeline data.
- [ ] Không hardcode 15:00/17:00/18:00/19:00 trong JSX.
- [ ] Icon dùng string key.

## Mobile
- [ ] 375px không overflow.
- [ ] 390px đọc rõ.
- [ ] 430px đọc rõ.
- [ ] Timeline vertical.
- [ ] Background không làm text khó đọc.

## Desktop
- [ ] Horizontal timeline ở breakpoint hợp lý.
- [ ] 4 milestone phân bố đều.
- [ ] Text không overlap.
- [ ] Marker đúng alignment.
- [ ] Icon không lệch.

## Design
- [ ] Forest green / gold / warm cream nhất quán.
- [ ] Không SaaS card.
- [ ] Không heavy shadow.
- [ ] Không border radius quá lớn.

## Motion
- [ ] Subtle.
- [ ] Không bounce.
- [ ] Không layout shift.
- [ ] Reduced motion.

## Accessibility
- [ ] `<section id="timeline">`.
- [ ] Heading hợp lệ.
- [ ] `<ol>` + `<li>`.
- [ ] Decorative icons aria-hidden.
- [ ] Contrast đủ.

## Code quality
- [ ] TypeScript pass.
- [ ] ESLint pass.
- [ ] Không `any`.
- [ ] Không inline style.
- [ ] Không dependency thừa.
- [ ] Không biến page thành Client Component.
