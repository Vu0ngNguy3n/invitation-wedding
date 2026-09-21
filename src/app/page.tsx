import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { CoupleSection } from "@/components/couple/CoupleSection";
import { DressCodeSection } from "@/components/dress-code/DressCodeSection";
import { EventsSection } from "@/components/events/EventsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { GuestbookSection } from "@/components/guestbook/GuestbookSection";
import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { HeroSection } from "@/components/hero/HeroSection";
import { InvitationNav } from "@/components/layout/InvitationNav";
import { OpeningExperience } from "@/components/opening/OpeningExperience";
import { RsvpSection } from "@/components/rsvp/RsvpSection";
import { SaveTheDateSection } from "@/components/save-the-date/SaveTheDateSection";
import { ThankYouSection } from "@/components/thank-you/ThankYouSection";
import { TimelineSection } from "@/components/timeline/TimelineSection";

export default function Home() {
  return (
    <OpeningExperience>
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
          <HeroBackdrop />
          <InvitationNav className="px-8 pt-7 sm:px-12 sm:pt-8 lg:px-16 lg:pt-9" />
          <HeroSection />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-6 translate-y-[calc(100%-1px)] text-ivory sm:h-8"
          >
            <BotanicalMark asset="edge" className="h-full w-full" />
          </div>
        </header>
        <CoupleSection />
        <SaveTheDateSection />
        <EventsSection />
        <TimelineSection />
        <GallerySection />
        <DressCodeSection />
        <RsvpSection />
        <GuestbookSection />
        <ThankYouSection />
      </main>
    </OpeningExperience>
  );
}
