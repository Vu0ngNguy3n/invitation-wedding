import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Lora } from "next/font/google";
import { InvitationShell } from "@/components/layout/InvitationShell";
import { weddingData } from "@/config/weddingData";
import {
  buildInvitationMetadata,
  invitationViewport,
} from "@/lib/metadata";
import { invitationLanguage } from "@/utils/seo";
import { filledTextOr } from "@/utils/text";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const bodyFont = Lora({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  variable: "--font-lora",
  display: "swap",
});

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = buildInvitationMetadata();
export const viewport: Viewport = invitationViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={invitationLanguage(weddingData)}
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-vintage-green font-body text-paper-cream">
        <a
          href="#invitation"
          className="sr-only foil-border bg-vintage-green px-4 py-3 type-overline text-paper-cream focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[10050] focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center"
        >
          {filledTextOr(weddingData.copy.skipToContent, "Tới nội dung thiệp")}
        </a>
        <InvitationShell>{children}</InvitationShell>
      </body>
    </html>
  );
}
