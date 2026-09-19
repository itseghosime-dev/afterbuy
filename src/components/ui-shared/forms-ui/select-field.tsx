import { ChevronDown } from "lucide-react";

import {
  useId,
  type ComponentPropsWithRef,
} from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectFieldProps
  extends Omit<
    ComponentPropsWithRef<"select">,
    "children" | "className" | "size"
  > {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  variant?: "default" | "soft";
  containerClassName?: string;
  selectClassName?: string;
}

export default function SelectField({
  label,
  options,
  placeholder,
  hint,
  error,
  variant = "default",
  id,
  disabled,
  required,
  containerClassName,
  selectClassName,
  "aria-describedby": providedDescription,
  "aria-invalid": providedInvalid,
  ...selectProps
}: SelectFieldProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;

  const hasError = Boolean(error);

  const message = error ?? hint;

  const messageId = message
    ? `${fieldId}-description`
    : undefined;

  const describedBy =
    [providedDescription, messageId]
      .filter(Boolean)
      .join(" ") || undefined;

  const ariaInvalid = hasError
    ? true
    : providedInvalid;

  const containerClasses = [
    "space-y-2",
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const controlClasses = [
    "relative flex min-h-12 items-center rounded-lg",
    variant === "soft"
      ? "bg-soft-input"
      : "bg-surface",
    "transition-shadow duration-200 ease-out",
    hasError
      ? [
          "shadow-[0_10px_10px_-18px_rgba(220,38,38,0.55)]",
          "focus-within:shadow-[0_14px_10px_-19px_rgba(220,38,38,0.75)]",
        ].join(" ")
      : "focus-within:shadow-[0_14px_10px_-19px_rgba(15,118,110,0.7)]",
    disabled && "cursor-not-allowed opacity-60",
    "motion-reduce:transition-none",
  ]
    .filter(Boolean)
    .join(" ");

  const selectClasses = [
    "min-h-12 w-full appearance-none",
    "border-0 bg-transparent",
    "py-2 pl-4 pr-12",
    "text-sm text-foreground",
    "[@media(pointer:coarse)]:text-base",
    "outline-none",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    selectClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClasses = [
    "pointer-events-none absolute right-4",
    "size-4 text-input-icon",
    "transition-colors duration-200",
    hasError
      ? "text-destructive-text"
      : "group-focus-within:text-primary-focus",
    "motion-reduce:transition-none",
  ]
    .filter(Boolean)
    .join(" ");

  const messageClasses = [
    "text-xs",
    hasError
      ? "text-destructive-text"
      : "text-text-muted",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <label
        htmlFor={fieldId}
        className={[
          "block text-xs font-semibold",
          variant === "default"
            ? "text-default-label"
            : "text-soft-label",
        ].join(" ")}
      >
        {label}

        {required && (
          <span
            aria-hidden="true"
            className="ml-1 text-destructive"
          >
            *
          </span>
        )}
      </label>

      <div className={`group ${controlClasses}`}>
        <select
          {...selectProps}
          id={fieldId}
          disabled={disabled}
          required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className={iconClasses}
        />
      </div>

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