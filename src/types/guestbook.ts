export const GUESTBOOK_NAME_MIN = 1;
export const GUESTBOOK_NAME_MAX = 80;
export const GUESTBOOK_MESSAGE_MIN = 1;
export const GUESTBOOK_MESSAGE_MAX = 1000;

export type GuestbookWish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type GuestbookListResponse = {
  data: GuestbookWish[];
};

export type GuestbookCreateResponse = {
  data: GuestbookWish;
};

export type GuestbookErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "SERVER_ERROR";

export type GuestbookErrorResponse = {
  error: {
    code: GuestbookErrorCode;
    message: string;
  };
};
