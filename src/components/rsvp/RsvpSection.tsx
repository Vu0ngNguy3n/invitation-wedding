import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { InvitationMonogram } from "@/components/decorative/InvitationMonogram";
import { RsvpForm } from "@/components/rsvp/RsvpForm";
import type { RsvpGuestOfOption, RsvpUiLabels } from "@/components/rsvp/rsvpUi";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { RsvpGuestOf } from "@/types/rsvp";
import { filledText, givenInitial } from "@/utils/text";

function personName(profile: { name: string; fullName?: string }): string | undefined {
  return filledText(profile.name) ?? filledText(profile.fullName);
}

function withPersonName(label: string, name?: string): string {
  return name ? `${label} · ${name}` : label;
}

function rsvpLabels(): RsvpUiLabels {
  const copy = weddingData.copy.rsvp;

  return {
    nameLabel: copy.nameLabel,
    namePlaceholder: copy.namePlaceholder,
    nameRequired: copy.nameRequired,
    nameTooLong: copy.nameTooLong,
    messageLabel: copy.messageLabel,
    messagePlaceholder: copy.messagePlaceholder,
    messageTooLong: copy.messageTooLong,
    attendanceLabel: copy.attendanceLabel,
    attendancePlaceholder: copy.attendancePlaceholder,
    attendanceRequired: copy.attendanceRequired,
    attendanceAttending: copy.attendanceAttending,
    attendanceDeclined: copy.attendanceDeclined,
    attendeeCountLabel: copy.attendeeCountLabel,
    attendeeCountPlaceholder: copy.attendeeCountPlaceholder,
    attendeeCountRequired: copy.attendeeCountRequired,
    guestOfLabel: copy.guestOfLabel,
    guestOfPlaceholder: copy.guestOfPlaceholder,
    guestOfRequired: copy.guestOfRequired,
    submitLabel: copy.submitLabel,
    submittingLabel: copy.submittingLabel,
    successAttending: copy.successAttending,
    successDeclined: copy.successDeclined,
    errorMessage: copy.errorMessage,
    rateLimitMessage: copy.rateLimitMessage,
    privacyNote: copy.privacyNote,
  };
}

function guestOfOptions(
  brideName?: string,
  groomName?: string,
): RsvpGuestOfOption[] {
  const copy = weddingData.copy.rsvp;
  const options: { value: RsvpGuestOf; label: string }[] = [
    { value: "bride", label: withPersonName(copy.guestOfBride, brideName) },
    { value: "groom", label: withPersonName(copy.guestOfGroom, groomName) },
    { value: "both", label: copy.guestOfBoth },
  ];

  return options;
}

export function RsvpSection() {
  const copy = weddingData.copy.rsvp;
  const title =
    filledText(copy.title) ??
    weddingData.navigation.find((item) => item.id === "rsvp")?.label;
  const accent = filledText(copy.accent);
  const introVi = filledText(copy.introVi);
  const introEn = filledText(copy.introEn);
  const brideName = personName(weddingData.couple.bride);
  const groomName = personName(weddingData.couple.groom);

  if (!title) {
    return null;
  }

  return (
    <SectionContainer
      id="rsvp"
      tone="ivory"
      labelledBy="rsvp-heading"
      containerClassName="max-w-2xl"
    >
      <MotionReveal variant="softReveal">
        <div className="invitation-stack gap-4 px-1">
          <InvitationMonogram
            brideInitial={givenInitial(brideName)}
            groomInitial={givenInitial(groomName)}
            framed
            className="mb-1 sm:mb-2"
          />

          <h2
            id="rsvp-heading"
            className="type-heading w-full text-center text-balance uppercase text-deep-forest"
          >
            {title}
          </h2>

          {accent ? (
            <p className="type-script text-accent-gold">{accent}</p>
          ) : null}

          <div className="mx-auto mt-2 w-full max-w-xs sm:mt-3">
            <DecorativeDivider />
          </div>
        </div>
      </MotionReveal>

      {introVi || introEn ? (
        <MotionReveal variant="fadeReveal" delay={0.06} className="mt-8 sm:mt-10">
          <div className="invitation-stack gap-4 px-1">
            {introVi ? (
              <p className="type-body max-w-[38rem] whitespace-pre-line text-pretty text-ink">
                {introVi}
              </p>
            ) : null}
            {introEn ? (
              <p className="type-body max-w-[38rem] whitespace-pre-line text-pretty text-muted">
                {introEn}
              </p>
            ) : null}
          </div>
        </MotionReveal>
      ) : null}

      <MotionReveal variant="softReveal" delay={0.12} className="mt-10 sm:mt-12">
        <RsvpForm
          labels={rsvpLabels()}
          guestOfOptions={guestOfOptions(brideName, groomName)}
        />
      </MotionReveal>
    </SectionContainer>
  );
}
