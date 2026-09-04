import { CalendarPlus } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { DecorativeDivider } from "@/components/decorative/DecorativeDivider";
import { CountdownTimer } from "@/components/countdown/CountdownTimer";
import { WeddingCalendar } from "@/components/save-the-date/WeddingCalendar";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  buildCalendarFile,
  buildCalendarMonth,
  calendarFileHref,
  resolveWeddingInstant,
} from "@/utils/datetime";
import { filledText } from "@/utils/text";

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
      labelledBy={headingTitle ? "save-the-date-heading" : undefined}
    >
      <MotionReveal>
        {headingTitle ? (
          <SectionHeading
            title={headingTitle}
            description={title ? description : undefined}
            headingId="save-the-date-heading"
          />
        ) : null}

        {title ? (
          <div className="mx-auto mt-6 w-28 sm:mt-8 sm:w-36">
            <DecorativeDivider />
          </div>
        ) : null}

        {featuredDay || featuredMonth || featuredYear || displayDate ? (
          <div className="mt-10 flex flex-col items-center text-center sm:mt-12">
            {featuredDay ? (
              <p className="font-display text-6xl leading-none tracking-wide text-paper-cream sm:text-7xl lg:text-8xl">
                {featuredDay}
              </p>
            ) : null}
            {featuredMonth ? (
              <p className="type-heading mt-3 text-accent-gold">
                {featuredMonth}
              </p>
            ) : null}
            {featuredYear ? (
              <p className="type-overline mt-3 text-muted">{featuredYear}</p>
            ) : null}
            {displayDate && !featuredDay ? (
              <p className="type-heading text-paper-cream">{displayDate}</p>
            ) : null}
          </div>
        ) : null}

        {calendar ? (
          <div className="mt-10 sm:mt-14">
            <WeddingCalendar month={calendar} />
          </div>
        ) : null}

        {instant ? (
          <div className="mt-12 sm:mt-16">
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
              className="foil-border inline-flex min-h-11 max-w-full items-center justify-center gap-2 px-4 py-2 text-center text-accent-gold transition-opacity hover:opacity-80 sm:px-5"
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
      </MotionReveal>
    </SectionContainer>
  );
}
