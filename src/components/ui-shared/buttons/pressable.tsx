import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

interface BasePressableProps {
  icon?: LucideIcon;
  label: string;
  size?: "sm" | "md";
  iconPosition?: "start" | "end";
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  className?: string;
  iconClassName?: string;
}

type NativeButtonProps = ComponentPropsWithoutRef<"button">;
type NextLinkProps = ComponentPropsWithoutRef<typeof Link>;

type ButtonPressableProps = BasePressableProps &
  Omit<NativeButtonProps, "children" | "className"> & {
    pressableType?: "button";
    href?: never;
  };

type LinkPressableProps = BasePressableProps &
  Omit<NextLinkProps, "children" | "className"> & {
    pressableType: "link";
  };

type PressableProps = ButtonPressableProps | LinkPressableProps;

const variantClasses = {
  default: "bg-primary text-white hover:bg-primary-hover",
  outline:
    "border border-border-subtle bg-transparent text-foreground hover:bg-surface",
  ghost: "bg-transparent text-foreground hover:bg-surface",
  secondary: "bg-surface text-foreground hover:bg-canvas",
  destructive: "bg-red-700 text-white hover:bg-red-800",
} as const;

const sizeClasses = {
  sm: "min-h-9 px-4 text-xs",
  md: "min-h-11 px-6 text-base",
} as const;

interface CreateClassesOptions {
  size?: "sm" | "md";
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  iconPosition?: "start" | "end";
  className?: string;
}

function createClasses({
  size = "md",
  variant = "default",
  iconPosition = "start",
  className,
}: CreateClassesOptions) {
  return [
    "inline-flex min-w-fit items-center justify-center gap-2 rounded-lg whitespace-nowrap transition-colors duration-300  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 font-heading font-semibold",
    sizeClasses[size],
    variantClasses[variant],
    iconPosition === "end" && "flex-row-reverse",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Pressable(props: PressableProps) {
  if (props.pressableType === "link") {
    const {
      pressableType,
      icon: Icon,
      label,
      iconPosition,
      variant,
      size,
      className,
      iconClassName,
      ...linkProps
    } = props;
    void pressableType;

    const classes = createClasses({
      size,
      variant,
      iconPosition,
      className,
    });

    return (
      <Link {...linkProps} className={classes}>
        {Icon && (
          <Icon
            aria-hidden="true"
            size={18}
            className={["shrink-0", iconClassName].filter(Boolean).join(" ")}
          />
        )}
        <span>{label}</span>
      </Link>
    );
  }

  const {
    pressableType,
    icon: Icon,
    label,
    iconPosition,
    variant,
    size,
    className,
    iconClassName,
    ...buttonProps
  } = props;
  void pressableType;

  const classes = createClasses({
    size,
    variant,
    iconPosition,
    className,
  });

  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? "button"}
      className={classes}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          size={18}
          className={["shrink-0", iconClassName].filter(Boolean).join(" ")}
        />
      )}
      <span>{label}</span>
    </button>
  );
}
