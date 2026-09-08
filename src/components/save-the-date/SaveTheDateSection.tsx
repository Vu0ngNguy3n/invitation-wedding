import { CalendarPlus } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { BotanicalMark } from "@/components/decorative/BotanicalMark";
import { BotanicalDecoration } from "@/components/decorative/BotanicalDecoration";
import { CountdownTimer } from "@/components/countdown/CountdownTimer";
import { WeddingCalendar } from "@/components/save-the-date/WeddingCalendar";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { invitationActionClassName } from "@/components/ui/invitationAction";
import {
  buildCalendarFile,
  buildCalendarMonth,
  calendarFileHref,
  resolveWeddingInstant,
} from "@/utils/datetime";
import { filledText } from "@/utils/text";
import { cn } from "@/utils/cn";

function calendarTitle(): string {
  const bride = filledText(weddingData.couple.bride.name);
  const groom = filledText(weddingData.couple.groom.name);
  const weddingTitle = filledText(weddingData.wedding.title);
  const saveTitle = filledText(weddingData.copy.saveTheDate.title);

  if (bride && groom) {
    return `${bride} & ${groom}`;
  }

  return weddingTitle ?? saveTitle ?? bride ?? groom ?? "";
}

function calendarLocation(): string | undefined {
  const name = filledText(weddingData.wedding.venue.name);
  const address = filledText(weddingData.wedding.venue.address);

  if (name && address) {
    return `${name}, ${address}`;
  }

  return name ?? address;
}

export function SaveTheDateSection() {
  const { wedding, copy } = weddingData;
  const title = filledText(copy.saveTheDate.title);
  const description = filledText(copy.saveTheDate.description);
  const displayDate = filledText(wedding.date.display);
  const instant = resolveWeddingInstant(wedding.date.iso, wedding.timezone, {
    day: wedding.date.day,
    month: wedding.date.month,
    year: wedding.date.year,
  });
  const featuredDay =
    filledText(wedding.date.day) ?? (instant ? String(instant.day) : undefined);
  const featuredMonth =
    filledText(wedding.date.month) ??
    (instant
      ? new Intl.DateTimeFormat("vi-VN", {
          month: "long",
          timeZone: instant.timeZone,
        }).format(new Date(instant.targetMs))
      : undefined);
  const featuredYear =
    filledText(wedding.date.year) ??
    (instant ? String(instant.year) : undefined);
  const calendar = instant
    ? buildCalendarMonth(
        instant.year,
        instant.month,
        instant.day,
        instant.timeZone,
        "vi-VN",
      )
    : null;
  const eventTitle = calendarTitle();
  const calendarHref =
    instant && eventTitle
      ? calendarFileHref(
          buildCalendarFile({
            title: eventTitle,
            description: filledText(wedding.phrase) ?? description,
            location: calendarLocation(),
            targetMs: instant.targetMs,
            timeZone: instant.timeZone,
            durationMs:
              Number.isFinite(wedding.calendarDurationHours) &&
              wedding.calendarDurationHours > 0
                ? wedding.calendarDurationHours * 60 * 60 * 1000
                : undefined,
          }),
        )
      : null;

  const navLabel = weddingData.navigation.find(
    (item) => item.id === "save-the-date",
  )?.label;
  const headingTitle = title ?? description ?? navLabel;

  if (!title && !displayDate && !featuredDay && !calendar && !instant) {
    return null;
  }

  return (
    <SectionContainer
      id="save-the-date"
      tone="paper"
      labelledBy={headingTitle ? "save-the-date-heading" : undefined}
    >
      <MotionReveal variant="fadeReveal">
        {headingTitle ? (
          <SectionHeading
            title={headingTitle}
            description={title ? description : undefined}
            headingId="save-the-date-heading"
          />
        ) : null}

        {title ? (
          <div className="mx-auto mt-6 max-w-xs sm:mt-8">
            <DecorativeDivider />
          </div>
        ) : null}
      </MotionReveal>

      <MotionReveal variant="fadeScale" className="mx-auto mt-10 max-w-lg sm:mt-14">
        <PaperSurface className="px-4 py-8 sm:px-10 sm:py-12">
          <BotanicalDecoration className="flex flex-col items-center px-2 py-4 text-center sm:px-4 sm:py-6">
            {featuredDay || featuredMonth || featuredYear || displayDate ? (
              <div className="flex w-full flex-col items-center text-center">
                {featuredDay ? (
                  <div className="relative mx-auto flex size-36 items-center justify-center sm:size-44">
                    <BotanicalMark
                      asset="wreath"
                      className="absolute inset-0 h-full w-full text-botanical-green/35"
                    />
                    <p className="relative font-display text-6xl leading-none sm:text-7xl">
                      {featuredDay}
                    </p>
                  </div>
                ) : null}
                {featuredMonth ? (
                  <p className="type-heading mt-3 text-center text-accent-gold">
                    {featuredMonth}
                  </p>
                ) : null}
                {featuredYear ? (
                  <p className="type-overline mt-3 text-center text-muted">
                    {featuredYear}
                  </p>
                ) : null}
                {displayDate && !featuredDay ? (
                  <p className="type-heading text-center">{displayDate}</p>
                ) : null}
              </div>
            ) : null}

            {calendar ? (
              <div className="mt-8 w-full sm:mt-10">
                <WeddingCalendar month={calendar} />
              </div>
            ) : null}

            {instant ? (
              <div className="mt-10 w-full sm:mt-12">
                <CountdownTimer
                  targetMs={instant.targetMs}
                  labels={{
                    days: copy.saveTheDate.countdownDays,
                    hours: copy.saveTheDate.countdownHours,
                    minutes: copy.saveTheDate.countdownMinutes,
                    seconds: copy.saveTheDate.countdownSeconds,
                  }}
                />
              </div>
            ) : null}

            {calendarHref ? (
              <div className="mt-10 flex w-full justify-center sm:mt-12">
                <a
                  href={calendarHref}
                  download="save-the-date.ics"
                  className={cn(invitationActionClassName)}
                >
                  <CalendarPlus
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.25}
                  />
                  <span className="sr-only">
                    {copy.saveTheDate.addToCalendarPrefix}
                  </span>
                  <span className="type-overline">
                    {title ?? displayDate ?? eventTitle}
                  </span>
                </a>
              </div>
            ) : null}
          </BotanicalDecoration>
        </PaperSurface>
      </MotionReveal>
    </SectionContainer>
  );
}
