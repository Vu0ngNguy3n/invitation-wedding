import { CoupleSection } from "@/components/couple/CoupleSection";
import { EventsSection } from "@/components/events/EventsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GiftSection } from "@/components/gifts/GiftSection";
import { GuestbookSection } from "@/components/guestbook/GuestbookSection";
import { HeroSection } from "@/components/hero/HeroSection";
import { InvitationNav } from "@/components/layout/InvitationNav";
import { SaveTheDateSection } from "@/components/save-the-date/SaveTheDateSection";
import { ThankYouSection } from "@/components/thank-you/ThankYouSection";

export default function Home() {
  return (
    <>
      <InvitationNav />
      <main
        id="invitation"
        tabIndex={-1}
        className="flex min-w-0 flex-1 flex-col outline-none"
      >
        <HeroSection />
        <CoupleSection />
        <SaveTheDateSection />
        <EventsSection />
        <GallerySection /> 
        <GuestbookSection />
        <GiftSection />
        <ThankYouSection />
      </main>
    </>
  );
}
