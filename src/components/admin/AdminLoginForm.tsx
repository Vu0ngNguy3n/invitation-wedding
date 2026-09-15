"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/admin/actions";
import { cn } from "@/utils/cn";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState<AdminLoginState, FormData>(
    loginAdmin,
    null,
  );

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor="admin-password"
          className="font-display text-[0.95rem] text-deep-forest"
        >
          Mật khẩu quản lý
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-required="true"
          disabled={pending}
          aria-invalid={state?.error ? true : undefined}
          aria-describedby={state?.error ? "admin-login-error" : undefined}
          className="type-body stationery-field"
        />
      </div>

      <div
        id="admin-login-error"
        className="min-h-6"
        aria-live="polite"
        role={state?.error ? "alert" : "status"}
      >
        {state?.error ? (
          <p className="type-body text-error">{state.error}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "foil-border invitation-action inline-flex min-h-11 w-full items-center justify-center px-5 py-2.5 text-deep-forest hover:bg-vintage-green hover:text-ivory hover:opacity-100",
          pending &&
            "cursor-not-allowed opacity-60 hover:translate-y-0 hover:bg-transparent hover:text-deep-forest hover:opacity-60",
        )}
      >
        <span className="type-overline">
          {pending ? "Đang đăng nhập..." : "Đăng nhập"}
        </span>
      </button>
    </form>
  );
}
