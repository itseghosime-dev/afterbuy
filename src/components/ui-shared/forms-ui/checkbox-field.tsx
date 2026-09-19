import { Check } from "lucide-react";

import { ReactNode, useId, type ComponentPropsWithoutRef } from "react";

interface CheckboxFieldProps extends Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "className" | "children"
> {
  label: ReactNode;
  description?: string;
  error?: string;
  containerClassName?: string;
}

export default function CheckboxField({
  label,
  description,
  error,
  id,
  required,
  disabled,
  containerClassName,
  "aria-describedby": providedDescription,
  "aria-invalid": providedInvalid,
  ...inputProps
}: CheckboxFieldProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;

  const message = error ?? description;

  const messageId = message ? `${fieldId}-description` : undefined;

  const describedBy =
    [providedDescription, messageId].filter(Boolean).join(" ") || undefined;

  const ariaInvalid = error ? true : providedInvalid;

  const containerClasses = ["space-y-1.5", containerClassName]
    .filter(Boolean)
    .join(" ");

  const labelClasses = [
    "flex min-h-11 items-start gap-3",
    disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
  ]
    .filter(Boolean)
    .join(" ");

  const checkboxClasses = [
    "mt-1 flex size-4.5 shrink-0 items-center justify-center",
    "rounded border bg-surface",
    "transition-[background-color,border-color,box-shadow]",
    "duration-200",
    "peer-checked:border-primary peer-checked:bg-primary",
    "peer-focus-visible:shadow-[0_0_0_3px_rgba(15,118,110,0.2)]",
    "peer-checked:[&>svg]:opacity-100",
    "motion-reduce:transition-none",
    error ? "border-destructive" : "border-border-subtle",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <label htmlFor={fieldId} className={labelClasses}>
        <input
          {...inputProps}
          id={fieldId}
          type="checkbox"
          required={required}
          disabled={disabled}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy}
          className="peer sr-only"
        />

        <span aria-hidden="true" className={checkboxClasses}>
          <Check
            size={11}
            strokeWidth={3}
            className="text-white opacity-0 transition-opacity duration-200"
          />
        </span>

        <span className="min-w-0 pt-0">
          <span className="block text-sm font-regular text-foreground">
            {label}

            {required && (
              <span aria-hidden="true" className="ml-1 text-destructive">
                *
              </span>
            )}
          </span>
        </span>
      </label>

      {message && (
        <p
          id={messageId}
          role={error ? "alert" : undefined}
          className={[
            "ml-8 text-xs",
            error ? "text-destructive-text" : "text-text-muted",
          ].join(" ")}
        >
          {message}
        </p>
      )}
    </div>
  );
}
