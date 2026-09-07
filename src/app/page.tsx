import { CoupleSection } from "@/components/couple/CoupleSection";
import { EventsSection } from "@/components/events/EventsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GiftSection } from "@/components/gifts/GiftSection";
import { GuestbookSection } from "@/components/guestbook/GuestbookSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { InvitationNav } from "@/components/layout/InvitationNav";
import { SaveTheDateSection } from "@/components/save-the-date/SaveTheDateSection";
import { ThankYouSection } from "@/components/thank-you/ThankYouSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";

export default function Home() {
  return (
    <main
      id="invitation"
      tabIndex={-1}
      className="flex min-w-0 flex-1 flex-col outline-none"
    >
      <header
        id="home"
        aria-labelledby="home-heading"
        className="section-forest relative flex min-h-svh flex-col"
      >
        <InvitationNav />
        <HeroSection />
      </header>
      <CoupleSection />
      <SaveTheDateSection />
      <EventsSection />
      <TimelineSection />
      <GallerySection />
      <GuestbookSection />
      <GiftSection />
      <ThankYouSection />
    </main>
  );
}
