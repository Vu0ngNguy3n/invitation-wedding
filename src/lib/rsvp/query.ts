import {
  RSVP_ATTENDANCE_VALUES,
  RSVP_GUEST_OF_VALUES,
  type RsvpAttendance,
  type RsvpGuestOf,
  type RsvpSubmission,
} from "@/types/rsvp";

export type RsvpAttendanceFilter = "all" | RsvpAttendance;
export type RsvpGuestOfFilter = "all" | RsvpGuestOf;

export type RsvpListFilter = {
  query: string;
  attendance: RsvpAttendanceFilter;
  guestOf: RsvpGuestOfFilter;
};

export const defaultRsvpListFilter: RsvpListFilter = {
  query: "",
  attendance: "all",
  guestOf: "all",
};

function isAttendanceFilter(value: string): value is RsvpAttendanceFilter {
  return value === "all" || (RSVP_ATTENDANCE_VALUES as readonly string[]).includes(value);
}

function isGuestOfFilter(value: string): value is RsvpGuestOfFilter {
  return value === "all" || (RSVP_GUEST_OF_VALUES as readonly string[]).includes(value);
}

export function attendanceFilterFromValue(value: string): RsvpAttendanceFilter {
  return isAttendanceFilter(value) ? value : "all";
}

export function guestOfFilterFromValue(value: string): RsvpGuestOfFilter {
  return isGuestOfFilter(value) ? value : "all";
}

export function parseRsvpListFilter(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
): RsvpListFilter {
  const read = (key: string): string => {
    if (searchParams instanceof URLSearchParams) {
      return searchParams.get(key) ?? "";
    }

    const value = searchParams[key];
    if (Array.isArray(value)) {
      return value[0] ?? "";
    }

    return value ?? "";
  };

  const query = read("q").trim();
  const attendanceRaw = read("attendance").trim();
  const guestOfRaw = read("guestOf").trim();

  return {
    query,
    attendance: isAttendanceFilter(attendanceRaw) ? attendanceRaw : "all",
    guestOf: isGuestOfFilter(guestOfRaw) ? guestOfRaw : "all",
  };
}

export function filterRsvpSubmissions(
  submissions: RsvpSubmission[],
  filter: RsvpListFilter,
): RsvpSubmission[] {
  const query = filter.query.trim().toLocaleLowerCase("vi");

  return submissions.filter((submission) => {
    if (
      query.length > 0 &&
      !submission.guestName.toLocaleLowerCase("vi").includes(query)
    ) {
      return false;
    }

    if (filter.attendance !== "all" && submission.attendance !== filter.attendance) {
      return false;
    }

    if (filter.guestOf !== "all" && submission.guestOf !== filter.guestOf) {
      return false;
    }

    return true;
  });
}

export function rsvpExportSearch(filter: RsvpListFilter): string {
  const params = new URLSearchParams();

  if (filter.query.trim()) {
    params.set("q", filter.query.trim());
  }

  if (filter.attendance !== "all") {
    params.set("attendance", filter.attendance);
  }

  if (filter.guestOf !== "all") {
    params.set("guestOf", filter.guestOf);
  }

  const encoded = params.toString();
  return encoded.length > 0 ? `?${encoded}` : "";
}
