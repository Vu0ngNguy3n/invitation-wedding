export type GuestbookUiLabels = {
  nameLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  nameRequired: string;
  nameTooLong: string;
  messageRequired: string;
  messageTooLong: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  rateLimitMessage: string;
  listLoading: string;
  listEmpty: string;
  listError: string;
  listRetry: string;
  listTitle: string;
};

export type GuestbookFormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "validation"
  | "error";
