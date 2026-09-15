import type { Metadata } from "next";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quản lý RSVP",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="section-ivory flex min-h-full flex-1 flex-col text-ink">
      <a
        href="#admin-content"
        className="sr-only foil-border bg-deep-forest px-4 py-3 type-overline text-paper-cream focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[10050] focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center"
      >
        Tới nội dung quản lý
      </a>
      {children}
    </div>
  );
}
