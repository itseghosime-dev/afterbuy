import type { LucideIcon } from "lucide-react";
import { useId, type ComponentPropsWithRef } from "react";

export interface TextFieldProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "className" | "children"
> {
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  variant?: "default" | "soft";
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
}
 
export default function TextField(props: TextFieldProps) {
  const generatedId = useId();

  const {
    label,
    hint,
    error,
    id,
    icon: Icon,
    iconPosition = "end",
    variant = "default",
    containerClassName,
    inputClassName,
    iconClassName,

    "aria-describedby": providedDescription,
    "aria-invalid": providedInvalid,

    ...inputProps
  } = props;

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
    inputProps.disabled || inputProps.readOnly || variant === "soft"
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
    inputProps.disabled && "pointer-events-none cursor-not-allowed opacity-60",
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
    "pointer-events-none shrink-0",
    "transition-colors duration-200",
    isInvalid
      ? "text-destructive-text"
      : "text-input-icon group-focus-within:text-primary-focus",
    "motion-reduce:transition-none",
    iconPosition === "start" ? "order-first" : "order-last",
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

      <div className={controlClasses}>
        <input
          {...inputProps}
          id={fieldId}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          className={inputClasses}
        />

        {Icon && <Icon size={18} aria-hidden="true" className={iconClasses} />}
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
