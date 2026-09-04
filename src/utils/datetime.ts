export type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export type CalendarDay = {
  day: number;
  isWeddingDay: boolean;
};

export type CalendarMonth = {
  year: number;
  month: number;
  caption: string;
  weekdayLabels: string[];
  weeks: (CalendarDay | null)[][];
};

export type ResolvedWeddingInstant = {
  targetMs: number;
  year: number;
  month: number;
  day: number;
  timeZone: string;
};

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function zonedParts(date: Date, timeZone: string): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "0";

  return {
    year: Number(read("year")),
    month: Number(read("month")),
    day: Number(read("day")),
    hour: Number(read("hour")),
    minute: Number(read("minute")),
    second: Number(read("second")),
  };
}

function timeZoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = zonedParts(new Date(utcMs), timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return asUtc - utcMs;
}

function naiveIsoInTimeZoneToUtcMs(
  naiveIso: string,
  timeZone: string,
): number | null {
  const match = naiveIso.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/,
  );

  if (!match) {
    return null;
  }

  const utcGuess = Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4] ?? "0"),
    Number(match[5] ?? "0"),
    Number(match[6] ?? "0"),
  );
  const adjusted = utcGuess - timeZoneOffsetMs(utcGuess, timeZone);
  return utcGuess - timeZoneOffsetMs(adjusted, timeZone);
}

function parseMonthNumber(month: string): number | null {
  const numeric = Number(month.trim());
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= 12) {
    return numeric;
  }

  const matched = month.match(/(\d{1,2})/);
  if (!matched) {
    return null;
  }

  const parsed = Number(matched[1]);
  return parsed >= 1 && parsed <= 12 ? parsed : null;
}

export function parseWeddingTargetMs(iso: string, timeZone: string): number | null {
  const trimmed = iso.trim();
  if (!trimmed) {
    return null;
  }

  if (/Z|[+-]\d{2}:?\d{2}$/.test(trimmed)) {
    const ms = Date.parse(trimmed);
    return Number.isNaN(ms) ? null : ms;
  }

  return naiveIsoInTimeZoneToUtcMs(trimmed, timeZone);
}

export function resolveWeddingInstant(
  iso: string,
  timeZone: string,
  dateParts: { day: string; month: string; year: string },
): ResolvedWeddingInstant | null {
  const fromIso = parseWeddingTargetMs(iso, timeZone);
  if (fromIso !== null) {
    const parts = zonedParts(new Date(fromIso), timeZone);
    return {
      targetMs: fromIso,
      year: parts.year,
      month: parts.month,
      day: parts.day,
      timeZone,
    };
  }

  const year = Number(dateParts.year.trim());
  const day = Number(dateParts.day.trim());
  const month = parseMonthNumber(dateParts.month);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(day) ||
    month === null ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const targetMs = naiveIsoInTimeZoneToUtcMs(
    `${year}-${pad2(month)}-${pad2(day)}T00:00:00`,
    timeZone,
  );

  if (targetMs === null) {
    return null;
  }

  return { targetMs, year, month, day, timeZone };
}

export function getRemainingTime(targetMs: number, nowMs: number): RemainingTime {
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, expired: false };
}

export function mondayFirstWeekdayLabels(locale: string): string[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(2024, 0, 1 + index));
    return new Intl.DateTimeFormat(locale, {
      weekday: "short",
      timeZone: "UTC",
    }).format(date);
  });
}

function mondayIndex(targetMs: number, timeZone: string): number {
  const weekday = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    timeZone,
  }).format(new Date(targetMs));
  const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const index = order.indexOf(weekday);
  return index === -1 ? 0 : index;
}

export function buildCalendarMonth(
  year: number,
  month: number,
  weddingDay: number,
  timeZone: string,
  locale: string,
): CalendarMonth {
  const caption = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone,
  }).format(
    new Date(
      naiveIsoInTimeZoneToUtcMs(`${year}-${pad2(month)}-15T12:00:00`, timeZone) ??
        Date.UTC(year, month - 1, 15),
    ),
  );

  const firstMs =
    naiveIsoInTimeZoneToUtcMs(
      `${year}-${pad2(month)}-01T12:00:00`,
      timeZone,
    ) ?? Date.UTC(year, month - 1, 1, 12);

  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadingBlanks = mondayIndex(firstMs, timeZone);
  const cells: (CalendarDay | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      isWeddingDay: index + 1 === weddingDay,
    })),
  ];

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (CalendarDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return {
    year,
    month,
    caption,
    weekdayLabels: mondayFirstWeekdayLabels(locale),
    weeks,
  };
}

function icsEscape(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function icsStamp(ms: number): string {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`;
}

function icsLocalStamp(ms: number, timeZone: string): string {
  const parts = zonedParts(new Date(ms), timeZone);
  return `${parts.year}${pad2(parts.month)}${pad2(parts.day)}T${pad2(parts.hour)}${pad2(parts.minute)}${pad2(parts.second)}`;
}

export function buildCalendarFile(options: {
  title: string;
  description?: string;
  location?: string;
  targetMs: number;
  timeZone: string;
  durationMs?: number;
}): string {
  const durationMs = options.durationMs ?? 2 * 60 * 60 * 1000;
  const endMs = options.targetMs + durationMs;
  const stamp = icsStamp(Date.now());
  const uid = `wedding-${icsLocalStamp(options.targetMs, options.timeZone)}@invitation`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//invitation-wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${options.timeZone}:${icsLocalStamp(options.targetMs, options.timeZone)}`,
    `DTEND;TZID=${options.timeZone}:${icsLocalStamp(endMs, options.timeZone)}`,
    `SUMMARY:${icsEscape(options.title)}`,
  ];

  if (options.description) {
    lines.push(`DESCRIPTION:${icsEscape(options.description)}`);
  }

  if (options.location) {
    lines.push(`LOCATION:${icsEscape(options.location)}`);
  }

  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}

export function calendarFileHref(ics: string): string {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function padTimeUnit(value: number, minDigits = 2): string {
  return String(value).padStart(minDigits, "0");
}

export type FormattedEventWhen = {
  dateTime: string;
  timeLine?: string;
  dateLine?: string;
};

function titleCaseVi(value: string): string {
  return value
    .split(/\s+/)
    .map((word) => {
      if (!word) {
        return word;
      }

      return word.charAt(0).toLocaleUpperCase("vi-VN") + word.slice(1);
    })
    .join(" ");
}

export function formatEventWhen(
  date: string | undefined,
  time: string | undefined,
  timeZone: string,
): FormattedEventWhen | null {
  const dateValue = date?.trim();
  const timeValue = time?.trim();

  if (!dateValue && !timeValue) {
    return null;
  }

  const naiveIso = dateValue
    ? `${dateValue}T${timeValue ? `${timeValue}${timeValue.length === 5 ? ":00" : ""}` : "12:00:00"}`
    : undefined;
  const targetMs = naiveIso
    ? parseWeddingTargetMs(naiveIso, timeZone)
    : null;

  let weekday: string | undefined;
  let dateLine: string | undefined;

  if (targetMs !== null) {
    const parts = zonedParts(new Date(targetMs), timeZone);
    dateLine = `${pad2(parts.day)} · ${pad2(parts.month)} · ${parts.year}`;
    weekday = titleCaseVi(
      new Intl.DateTimeFormat("vi-VN", {
        weekday: "long",
        timeZone,
      }).format(new Date(targetMs)),
    );
  } else if (dateValue) {
    dateLine = dateValue;
  }

  const timeLine = [timeValue, weekday].filter(Boolean).join(" · ") || undefined;
  const dateTime = naiveIso ?? timeValue ?? dateValue ?? "";

  if (!timeLine && !dateLine) {
    return null;
  }

  return {
    dateTime,
    timeLine,
    dateLine,
  };
}
