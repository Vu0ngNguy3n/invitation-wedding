"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type {
  RsvpFormStatus,
  RsvpGuestOfOption,
  RsvpUiLabels,
} from "@/components/rsvp/rsvpUi";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { fadeScale, invitationTransition } from "@/lib/motion";
import { createRsvpSubmission, RsvpRequestError } from "@/lib/rsvp/api";
import { validateRsvpWrite } from "@/lib/rsvp/validation";
import {
  RSVP_ATTENDEE_MAX,
  RSVP_ATTENDEE_MIN,
  RSVP_MESSAGE_MAX,
  RSVP_NAME_MAX,
  RSVP_NAME_MIN,
  type RsvpAttendance,
  type RsvpGuestOf,
} from "@/types/rsvp";
import { cn } from "@/utils/cn";

type RsvpFormProps = {
  labels: RsvpUiLabels;
  guestOfOptions: RsvpGuestOfOption[];
};

type FieldErrors = {
  guestName: string | null;
  message: string | null;
  attendance: string | null;
  attendeeCount: string | null;
  guestOf: string | null;
};

const emptyErrors: FieldErrors = {
  guestName: null,
  message: null,
  attendance: null,
  attendeeCount: null,
  guestOf: null,
};

const attendeeCountOptions = Array.from(
  { length: RSVP_ATTENDEE_MAX - RSVP_ATTENDEE_MIN + 1 },
  (_, index) => String(RSVP_ATTENDEE_MIN + index),
);

function characterCount(value: string): number {
  return [...value].length;
}

function firstErrorKey(errors: FieldErrors): keyof FieldErrors | null {
  const order: (keyof FieldErrors)[] = [
    "guestName",
    "message",
    "attendance",
    "attendeeCount",
    "guestOf",
  ];

  return order.find((key) => errors[key]) ?? null;
}

function Field({
  label,
  labelId,
  error,
  errorId,
  hintId,
  hint,
  children,
}: {
  label: string;
  labelId: string;
  error: string | null;
  errorId: string;
  hintId?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={labelId}
        className="font-display text-pretty text-[0.95rem] leading-snug text-deep-forest sm:text-base"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="type-caption text-error">
          {error}
        </p>
      ) : null}
      {hint ? (
        <p id={hintId} className="type-caption text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SelectChevron() {
  return (
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-accent-gold"
      strokeWidth={1.5}
    />
  );
}

export function RsvpForm({ labels, guestOfOptions }: RsvpFormProps) {
  const guestNameId = useId();
  const messageId = useId();
  const attendanceId = useId();
  const attendeeCountId = useId();
  const guestOfId = useId();
  const guestNameErrorId = useId();
  const messageErrorId = useId();
  const attendanceErrorId = useId();
  const attendeeCountErrorId = useId();
  const guestOfErrorId = useId();
  const guestNameCountId = useId();
  const messageCountId = useId();
  const formStatusId = useId();

  const guestNameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const attendanceRef = useRef<HTMLSelectElement>(null);
  const attendeeCountRef = useRef<HTMLSelectElement>(null);
  const guestOfRef = useRef<HTMLSelectElement>(null);
  const inFlightRef = useRef(false);

  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<"" | RsvpAttendance>("");
  const [attendeeCount, setAttendeeCount] = useState("");
  const [guestOf, setGuestOf] = useState<"" | RsvpGuestOf>("");
  const [status, setStatus] = useState<RsvpFormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [confirmedAttendance, setConfirmedAttendance] =
    useState<RsvpAttendance | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const submitting = status === "submitting";
  const attending = attendance === "attending";
  const guestNameLength = characterCount(guestName);
  const messageLength = characterCount(message);

  function validateFields(): FieldErrors {
    const trimmedName = guestName.trim();
    const trimmedMessage = message.trim();
    const nameLength = characterCount(trimmedName);
    const messageChars = characterCount(trimmedMessage);

    const nextErrors: FieldErrors = { ...emptyErrors };

    if (nameLength < RSVP_NAME_MIN) {
      nextErrors.guestName = labels.nameRequired;
    } else if (nameLength > RSVP_NAME_MAX) {
      nextErrors.guestName = labels.nameTooLong;
    }

    if (messageChars > RSVP_MESSAGE_MAX) {
      nextErrors.message = labels.messageTooLong;
    }

    if (attendance !== "attending" && attendance !== "declined") {
      nextErrors.attendance = labels.attendanceRequired;
    }

    if (attendance === "attending") {
      const count = Number(attendeeCount);
      if (
        !Number.isInteger(count) ||
        count < RSVP_ATTENDEE_MIN ||
        count > RSVP_ATTENDEE_MAX
      ) {
        nextErrors.attendeeCount = labels.attendeeCountRequired;
      }
    }

    if (guestOf !== "bride" && guestOf !== "groom" && guestOf !== "both") {
      nextErrors.guestOf = labels.guestOfRequired;
    }

    return nextErrors;
  }

  function focusField(key: keyof FieldErrors) {
    const refs = {
      guestName: guestNameRef,
      message: messageRef,
      attendance: attendanceRef,
      attendeeCount: attendeeCountRef,
      guestOf: guestOfRef,
    } as const;

    refs[key].current?.focus();
  }

  function clearFeedback() {
    if (status === "idle") {
      return;
    }

    setStatus("idle");
    setErrors(emptyErrors);
    setFormMessage(null);
  }

  function describedBy(errorId: string, error: string | null, extraId?: string) {
    const parts = [extraId, error ? errorId : undefined].filter(
      (value): value is string => Boolean(value),
    );
    return parts.length > 0 ? parts.join(" ") : undefined;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inFlightRef.current || submitting) {
      return;
    }

    inFlightRef.current = true;

    const fieldErrors = validateFields();
    const errorKey = firstErrorKey(fieldErrors);
    if (errorKey) {
      inFlightRef.current = false;
      setStatus("validating");
      setErrors(fieldErrors);
      setFormMessage(null);
      focusField(errorKey);
      return;
    }

    const parsed = validateRsvpWrite({
      guestName,
      attendance,
      attendeeCount: attendance === "declined" ? 0 : Number(attendeeCount),
      guestOf,
      message,
    });

    if (!parsed.ok) {
      inFlightRef.current = false;
      setStatus("validating");
      setFormMessage(labels.errorMessage);
      guestNameRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setErrors(emptyErrors);
    setFormMessage(null);

    try {
      await createRsvpSubmission(parsed.value);
      setConfirmedAttendance(parsed.value.attendance);
      setStatus("success");
    } catch (error) {
      if (error instanceof RsvpRequestError && error.code === "VALIDATION_ERROR") {
        setStatus("validating");
        setFormMessage(labels.errorMessage);
      } else if (
        error instanceof RsvpRequestError &&
        error.code === "RATE_LIMITED"
      ) {
        setStatus("error");
        setFormMessage(labels.rateLimitMessage);
      } else {
        setStatus("error");
        setFormMessage(labels.errorMessage);
      }
    } finally {
      inFlightRef.current = false;
    }
  }

  const fieldClassName = (invalid: boolean) =>
    cn(
      "type-body stationery-field",
      invalid && "border-error",
      submitting && "cursor-not-allowed opacity-60",
    );

  const selectClassName = (invalid: boolean) =>
    cn(
      fieldClassName(invalid),
      "appearance-none pr-11 text-left leading-snug",
    );

  if (status === "success" && confirmedAttendance) {
    const confirmation =
      confirmedAttendance === "attending"
        ? labels.successAttending
        : labels.successDeclined;

    return (
      <PaperSurface as="div" className="min-w-0 px-5 py-10 sm:px-10 sm:py-14">
        <motion.div
          id={formStatusId}
          role="status"
          aria-live="polite"
          className="invitation-stack gap-5 px-1"
          variants={fadeScale}
          initial="hidden"
          animate="shown"
          transition={invitationTransition(prefersReducedMotion, {
            duration: 0.85,
          })}
        >
          <p className="type-body max-w-md whitespace-pre-line text-pretty text-deep-forest">
            {confirmation}
          </p>
        </motion.div>
      </PaperSurface>
    );
  }

  return (
    <PaperSurface as="div" className="min-w-0 px-5 py-9 sm:px-10 sm:py-12">
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={submitting}
        aria-describedby={formMessage ? formStatusId : undefined}
        className="flex flex-col gap-6 sm:gap-7"
      >
        <Field
          label={labels.nameLabel}
          labelId={guestNameId}
          error={errors.guestName}
          errorId={guestNameErrorId}
          hintId={guestNameCountId}
          hint={`${guestNameLength}/${RSVP_NAME_MAX}`}
        >
          <input
            ref={guestNameRef}
            id={guestNameId}
            name="guestName"
            type="text"
            autoComplete="name"
            inputMode="text"
            maxLength={RSVP_NAME_MAX}
            value={guestName}
            required
            aria-required="true"
            disabled={submitting}
            placeholder={labels.namePlaceholder || undefined}
            aria-invalid={errors.guestName ? true : undefined}
            aria-describedby={describedBy(
              guestNameErrorId,
              errors.guestName,
              guestNameCountId,
            )}
            onChange={(event) => {
              setGuestName(event.target.value);
              clearFeedback();
            }}
            className={fieldClassName(Boolean(errors.guestName))}
          />
        </Field>

        <Field
          label={labels.messageLabel}
          labelId={messageId}
          error={errors.message}
          errorId={messageErrorId}
          hintId={messageCountId}
          hint={`${messageLength}/${RSVP_MESSAGE_MAX}`}
        >
          <textarea
            ref={messageRef}
            id={messageId}
            name="message"
            rows={5}
            maxLength={RSVP_MESSAGE_MAX}
            value={message}
            autoComplete="off"
            disabled={submitting}
            placeholder={labels.messagePlaceholder || undefined}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy(
              messageErrorId,
              errors.message,
              messageCountId,
            )}
            onChange={(event) => {
              setMessage(event.target.value);
              clearFeedback();
            }}
            className={cn(
              fieldClassName(Boolean(errors.message)),
              "min-h-32 resize-y rounded-lg",
            )}
          />
        </Field>

        <Field
          label={labels.attendanceLabel}
          labelId={attendanceId}
          error={errors.attendance}
          errorId={attendanceErrorId}
        >
          <div className="relative">
            <select
              ref={attendanceRef}
              id={attendanceId}
              name="attendance"
              value={attendance}
              required
              aria-required="true"
              disabled={submitting}
              aria-invalid={errors.attendance ? true : undefined}
              aria-describedby={
                errors.attendance ? attendanceErrorId : undefined
              }
              onChange={(event) => {
                const next = event.target.value;
                setAttendance(
                  next === "attending" || next === "declined" ? next : "",
                );
                if (next !== "attending") {
                  setAttendeeCount("");
                }
                clearFeedback();
              }}
              className={selectClassName(Boolean(errors.attendance))}
            >
              <option value="" disabled>
                {labels.attendancePlaceholder}
              </option>
              <option value="attending">{labels.attendanceAttending}</option>
              <option value="declined">{labels.attendanceDeclined}</option>
            </select>
            <SelectChevron />
          </div>
        </Field>

        {attending ? (
          <Field
            label={labels.attendeeCountLabel}
            labelId={attendeeCountId}
            error={errors.attendeeCount}
            errorId={attendeeCountErrorId}
          >
            <div className="relative">
              <select
                ref={attendeeCountRef}
                id={attendeeCountId}
                name="attendeeCount"
                value={attendeeCount}
                required
                aria-required="true"
                disabled={submitting}
                aria-invalid={errors.attendeeCount ? true : undefined}
                aria-describedby={
                  errors.attendeeCount ? attendeeCountErrorId : undefined
                }
                onChange={(event) => {
                  setAttendeeCount(event.target.value);
                  clearFeedback();
                }}
                className={selectClassName(Boolean(errors.attendeeCount))}
              >
                <option value="" disabled>
                  {labels.attendeeCountPlaceholder}
                </option>
                {attendeeCountOptions.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </Field>
        ) : null}

        <Field
          label={labels.guestOfLabel}
          labelId={guestOfId}
          error={errors.guestOf}
          errorId={guestOfErrorId}
        >
          <div className="relative">
            <select
              ref={guestOfRef}
              id={guestOfId}
              name="guestOf"
              value={guestOf}
              required
              aria-required="true"
              disabled={submitting}
              aria-invalid={errors.guestOf ? true : undefined}
              aria-describedby={errors.guestOf ? guestOfErrorId : undefined}
              onChange={(event) => {
                const next = event.target.value;
                setGuestOf(
                  next === "bride" || next === "groom" || next === "both"
                    ? next
                    : "",
                );
                clearFeedback();
              }}
              className={selectClassName(Boolean(errors.guestOf))}
            >
              <option value="" disabled>
                {labels.guestOfPlaceholder}
              </option>
              {guestOfOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </Field>

        <div
          id={formStatusId}
          className="min-h-6"
          aria-live="polite"
          role={status === "error" ? "alert" : "status"}
        >
          {formMessage ? (
            <p
              className={cn(
                "type-body",
                (status === "error" || status === "validating") && "text-error",
              )}
            >
              {formMessage}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={cn(
            "foil-border invitation-action inline-flex min-h-11 w-full max-w-full items-center justify-center px-4 py-2.5 text-center text-deep-forest hover:bg-vintage-green hover:text-ivory hover:opacity-100 sm:w-auto sm:self-center sm:px-8",
            submitting &&
              "cursor-not-allowed opacity-60 hover:translate-y-0 hover:bg-transparent hover:text-deep-forest hover:opacity-60",
          )}
        >
          <span className="type-overline">
            {submitting ? labels.submittingLabel : labels.submitLabel}
          </span>
        </button>

        {labels.privacyNote ? (
          <p className="type-caption max-w-md self-center text-center text-pretty text-muted">
            {labels.privacyNote}
          </p>
        ) : null}
      </form>
    </PaperSurface>
  );
}
