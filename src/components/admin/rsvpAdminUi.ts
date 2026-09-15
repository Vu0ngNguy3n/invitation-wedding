import type { RsvpGuestOf } from "@/types/rsvp";
import type { RsvpSummary } from "@/lib/rsvp/summary";

export type RsvpAdminLabels = {
  title: string;
  subtitle: string;
  logout: string;
  searchLabel: string;
  searchPlaceholder: string;
  attendanceLabel: string;
  attendanceAll: string;
  attendanceAttending: string;
  attendanceDeclined: string;
  guestOfLabel: string;
  guestOfAll: string;
  guestOfBride: string;
  guestOfGroom: string;
  guestOfBoth: string;
  exportCsv: string;
  showing: string;
  empty: string;
  emptyHint: string;
  emptyFiltered: string;
  error: string;
  retry: string;
  guest: string;
  status: string;
  guests: string;
  side: string;
  message: string;
  submitted: string;
  viewMessage: string;
  noMessage: string;
  attending: string;
  declined: string;
  summaryTotal: string;
  summaryAttending: string;
  summaryDeclined: string;
  summaryAttendees: string;
  summaryBride: string;
  summaryGroom: string;
  summaryBoth: string;
  summaryMessages: string;
};

export const rsvpAdminLabels: RsvpAdminLabels = {
  title: "Quản lý RSVP",
  subtitle: "Danh sách xác nhận tham dự",
  logout: "Đăng xuất",
  searchLabel: "Tìm theo tên khách",
  searchPlaceholder: "Nhập tên khách mời",
  attendanceLabel: "Trạng thái",
  attendanceAll: "Tất cả",
  attendanceAttending: "Tham dự",
  attendanceDeclined: "Không tham dự",
  guestOfLabel: "Phía khách",
  guestOfAll: "Tất cả",
  guestOfBride: "Nhà gái",
  guestOfGroom: "Nhà trai",
  guestOfBoth: "Cả hai",
  exportCsv: "Xuất CSV",
  showing: "Đang hiện",
  empty: "Chưa có phản hồi RSVP.",
  emptyHint: "Các xác nhận mới sẽ xuất hiện tại đây.",
  emptyFiltered: "Không tìm thấy phản hồi phù hợp.",
  error: "Không tải được danh sách RSVP lúc này.",
  retry: "Tải lại",
  guest: "Khách",
  status: "Trạng thái",
  guests: "Số khách",
  side: "Phía",
  message: "Lời nhắn",
  submitted: "Gửi lúc",
  viewMessage: "Xem lời nhắn",
  noMessage: "Không có lời nhắn",
  attending: "Tham dự",
  declined: "Không tham dự",
  summaryTotal: "Tổng phản hồi",
  summaryAttending: "Tham dự",
  summaryDeclined: "Không tham dự",
  summaryAttendees: "Tổng số khách",
  summaryBride: "Nhà gái",
  summaryGroom: "Nhà trai",
  summaryBoth: "Cả hai",
  summaryMessages: "Có lời nhắn",
};

export function attendanceText(
  attendance: "attending" | "declined",
  labels: RsvpAdminLabels,
): string {
  return attendance === "attending" ? labels.attending : labels.declined;
}

export function guestOfText(
  guestOf: RsvpGuestOf,
  labels: RsvpAdminLabels,
): string {
  if (guestOf === "bride") {
    return labels.guestOfBride;
  }

  if (guestOf === "groom") {
    return labels.guestOfGroom;
  }

  return labels.guestOfBoth;
}

export function summaryItems(
  summary: RsvpSummary,
  labels: RsvpAdminLabels,
): { label: string; value: number }[] {
  return [
    { label: labels.summaryTotal, value: summary.totalResponses },
    { label: labels.summaryAttending, value: summary.attendingResponses },
    { label: labels.summaryDeclined, value: summary.declinedResponses },
    { label: labels.summaryAttendees, value: summary.totalAttendees },
    { label: labels.summaryBride, value: summary.brideSideResponses },
    { label: labels.summaryGroom, value: summary.groomSideResponses },
    { label: labels.summaryBoth, value: summary.bothSideResponses },
    { label: labels.summaryMessages, value: summary.withMessage },
  ];
}
