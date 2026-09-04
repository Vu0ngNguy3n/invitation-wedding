"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import type {
  GuestbookFormStatus,
  GuestbookUiLabels,
} from "@/components/guestbook/guestbookUi";
import {
  createGuestbookWish,
  GuestbookRequestError,
} from "@/lib/guestbook/api";
import { validateGuestbookWrite } from "@/lib/guestbook/validation";
import {
  GUESTBOOK_MESSAGE_MAX,
  GUESTBOOK_MESSAGE_MIN,
  GUESTBOOK_NAME_MAX,
  GUESTBOOK_NAME_MIN,
  type GuestbookWish,
} from "@/types/guestbook";
import { PaperSurface } from "@/components/ui/PaperSurface";
import { cn } from "@/utils/cn";

type GuestbookFormProps = {
  labels: GuestbookUiLabels;
  onCreated?: (wish: GuestbookWish) => void;
};

function characterCount(value: string): number {
  return [...value].length;
}

export function GuestbookForm({ labels, onCreated }: GuestbookFormProps) {
  const router = useRouter();
  const nameId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const messageErrorId = useId();
  const nameCountId = useId();
  const messageCountId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const inFlightRef = useRef(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<GuestbookFormStatus>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const submitting = status === "submitting";
  const nameLength = characterCount(name);
  const messageLength = characterCount(message);

  function validateFields(): { name: string | null; message: string | null } {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const nameLength = characterCount(trimmedName);
    const messageLength = characterCount(trimmedMessage);

    let nextNameError: string | null = null;
    let nextMessageError: string | null = null;

    if (nameLength < GUESTBOOK_NAME_MIN) {
      nextNameError = labels.nameRequired;
    } else if (nameLength > GUESTBOOK_NAME_MAX) {
      nextNameError = labels.nameTooLong;
    }

    if (messageLength < GUESTBOOK_MESSAGE_MIN) {
      nextMessageError = labels.messageRequired;
    } else if (messageLength > GUESTBOOK_MESSAGE_MAX) {
      nextMessageError = labels.messageTooLong;
    }

    return { name: nextNameError, message: nextMessageError };
  }

  function clearFeedback() {
    if (status === "idle") {
      return;
    }

    setStatus("idle");
    setNameError(null);
    setMessageError(null);
    setFormMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inFlightRef.current || submitting) {
      return;
    }

    inFlightRef.current = true;

    const fieldErrors = validateFields();
    if (fieldErrors.name || fieldErrors.message) {
      inFlightRef.current = false;
      setStatus("validation");
      setNameError(fieldErrors.name);
      setMessageError(fieldErrors.message);
      setFormMessage(null);

      if (fieldErrors.name) {
        nameRef.current?.focus();
      } else {
        messageRef.current?.focus();
      }

      return;
    }

    const parsed = validateGuestbookWrite({ name, message });
    if (!parsed.ok) {
      inFlightRef.current = false;
      setStatus("validation");
      setFormMessage(labels.nameRequired);
      nameRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setNameError(null);
    setMessageError(null);
    setFormMessage(null);

    try {
      const wish = await createGuestbookWish(parsed.value);
      onCreated?.(wish);
      router.refresh();
      setName("");
      setMessage("");
      setStatus("success");
      setFormMessage(labels.successMessage);
    } catch (error) {
      if (error instanceof GuestbookRequestError && error.code === "VALIDATION_ERROR") {
        setStatus("validation");
        setFormMessage(labels.nameRequired);
      } else if (
        error instanceof GuestbookRequestError &&
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

  return (
    <PaperSurface as="div" className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={submitting}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className="type-overline text-accent-gold">
            {labels.nameLabel}
          </label>
          <input
            ref={nameRef}
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            inputMode="text"
            maxLength={GUESTBOOK_NAME_MAX}
            value={name}
            required
            aria-required="true"
            disabled={submitting}
            placeholder={labels.namePlaceholder || undefined}
            aria-invalid={nameError ? true : undefined}
            aria-describedby={
              nameError ? `${nameCountId} ${nameErrorId}` : nameCountId
            }
            onChange={(event) => {
              setName(event.target.value);
              clearFeedback();
            }}
            className={cn(
              "type-body min-h-11 w-full min-w-0 border-0 border-b bg-transparent px-0 py-2 text-base text-paper-cream placeholder:text-muted",
              nameError ? "border-error" : "border-accent-gold/40",
              submitting && "cursor-not-allowed opacity-60",
            )}
          />
          {nameError ? (
            <p id={nameErrorId} className="type-caption text-error">
              {nameError}
            </p>
          ) : null}
          <p id={nameCountId} className="type-caption text-muted">
            {nameLength}/{GUESTBOOK_NAME_MAX}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={messageId} className="type-overline text-accent-gold">
            {labels.messageLabel}
          </label>
          <textarea
            ref={messageRef}
            id={messageId}
            name="message"
            rows={6}
            maxLength={GUESTBOOK_MESSAGE_MAX}
            value={message}
            required
            aria-required="true"
            autoComplete="off"
            disabled={submitting}
            placeholder={labels.messagePlaceholder || undefined}
            aria-invalid={messageError ? true : undefined}
            aria-describedby={
              messageError ? `${messageCountId} ${messageErrorId}` : messageCountId
            }
            onChange={(event) => {
              setMessage(event.target.value);
              clearFeedback();
            }}
            className={cn(
              "type-body min-h-36 w-full min-w-0 resize-y bg-transparent px-3 py-3 text-base text-paper-cream placeholder:text-muted foil-border-dashed",
              messageError && "border-error",
              submitting && "cursor-not-allowed opacity-60",
            )}
          />
          {messageError ? (
            <p id={messageErrorId} className="type-caption text-error">
              {messageError}
            </p>
          ) : null}
          <p id={messageCountId} className="type-caption text-muted">
            {messageLength}/{GUESTBOOK_MESSAGE_MAX}
          </p>
        </div>

        <div
          className="min-h-6"
          aria-live="polite"
          role={status === "error" ? "alert" : "status"}
        >
          {formMessage ? (
            <p
              className={cn(
                "type-body",
                status === "success" && "text-success",
                (status === "error" || status === "validation") && "text-error",
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
            "foil-border inline-flex min-h-11 w-full max-w-full items-center justify-center gap-2 px-4 py-2.5 text-center text-accent-gold transition-opacity sm:w-auto sm:px-5",
            submitting ? "cursor-not-allowed opacity-60" : "hover:opacity-80",
          )}
        >
          <PenLine aria-hidden="true" className="size-4" strokeWidth={1.25} />
          <span className="type-overline">
            {submitting ? labels.submittingLabel : labels.submitLabel}
          </span>
        </button>
      </form>
    </PaperSurface>
  );
}
