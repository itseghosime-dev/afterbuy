"use client";
import { useId, useState, type ChangeEvent, type ReactNode } from "react";
import type { TextFieldProps } from "./text-field";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrength from "./password-strength";

interface PasswordFieldProps extends Omit<
  TextFieldProps,
  "type" | "icon" | "iconPosition" | "variant" | "value" | "defaultValue"
> {
  variant?: "default" | "strength";
  labelAction?: ReactNode;
  value?: string;
  defaultValue?: string;
}

export default function PasswordField(props: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const generatedId = useId();

  const {
    label,
    hint,
    error,
    id,
    variant = "default",
    containerClassName,
    inputClassName,
    iconClassName,
    labelAction,

    "aria-describedby": providedDescription,
    "aria-invalid": providedInvalid,

    ...inputProps
  } = props;

  const [internalPassword, setInternalPassword] = useState(() => {
    return typeof inputProps.defaultValue === "string"
      ? inputProps.defaultValue
      : "";
  });
  const isControlled = inputProps.value !== undefined;
  const currentPassword =
    typeof inputProps.value === "string" ? inputProps.value : internalPassword;

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    if (!isControlled) {
      setInternalPassword(event.currentTarget.value);
    }
    inputProps.onChange?.(event);
  }

  const fieldId = id ?? generatedId;
  const hasError = Boolean(error);
  const message = error || hint;
  const messageId = message ? `${fieldId}-description` : undefined;

  const describedBy =
    [providedDescription, messageId].filter(Boolean).join(" ") || undefined;
  const ariaInvalid = hasError ? true : providedInvalid;

  const isInvalid =
    ariaInvalid === true ||
    ariaInvalid === "true" ||
    ariaInvalid === "grammar" ||
    ariaInvalid === "spelling";

  const backgroundClass =
    inputProps.disabled || inputProps.readOnly || variant === "strength"
      ? "bg-soft-input"
      : "bg-surface";

  const containerClasses = ["space-y-2", containerClassName]
    .filter(Boolean)
    .join(" ");

  const controlClasses = [
    "group flex min-h-12 items-center gap-2 px-4 rounded-lg",
    backgroundClass,
    "transition-shadow duration-200 ease-out",
    isInvalid
      ? [
          "shadow-[0_10px_10px_-18px_rgba(220,38,38,0.55)]",
          "focus-within:shadow-[0_14px_10px_-19px_rgba(220,38,38,0.75)]",
        ].join(" ")
      : "focus-within:shadow-[0_14px_10px_-19px_rgba(15,118,110,0.7)]",
    inputProps.disabled && "cursor-not-allowed opacity-60",
    "motion-reduce:transform-none motion-reduce:transition-none",
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "min-h-11 min-w-0 flex-1",
    "border-0 bg-transparent py-2",
    "text-sm [@media(pointer:coarse)]:text-base",
    "font-normal text-foreground",
    "placeholder:text-text-muted caret-primary",
    "outline-none",
    "disabled:cursor-not-allowed",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [
    "shrink-0",
    "transition-colors duration-200",
    isInvalid
      ? "text-destructive-text"
      : "text-input-icon group-focus-within:text-primary-focus",
    "motion-reduce:transition-none",
    iconClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const messageClasses = [
    "text-xs",
    hasError ? "text-destructive-text" : "text-text-muted",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={fieldId}
          className={`block text-xs font-semibold ${
            variant === "default" ? "text-default-label" : "text-soft-label"
          }`}
        >
          {label}
          {inputProps.required && (
            <span aria-hidden="true" className="ml-1 text-red-600">
              *
            </span>
          )}
        </label>
        {labelAction}
      </div>

      <div className={controlClasses}>
        <input
          {...inputProps}
          id={fieldId}
          type={isVisible ? "text" : "password"}
          onChange={handlePasswordChange}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          className={inputClasses}
        />

        <button
          type="button"
          disabled={inputProps.disabled}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          className={[
            "inline-flex size-11 shrink-0 items-center justify-center rounded-md",
            iconClasses,
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
          ].join(" ")}
          onClick={() => setIsVisible((previous) => !previous)}
        >
          {isVisible ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
      {variant === "strength" && (
        <PasswordStrength password={currentPassword} />
      )}
      {message && (
        <p
          id={messageId}
          role={hasError ? "alert" : undefined}
          className={messageClasses}
        >
          {message}
        </p>
      )}
    </div>
  );
}
