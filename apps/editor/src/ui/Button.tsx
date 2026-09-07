"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "./cx";
import { Tooltip } from "./Tooltip";

type Variant = "default" | "primary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANT: Record<Variant, string> = {
  default: "bg-surface text-ink border border-line-strong hover:bg-hover",
  primary: "bg-accent text-accent-ink border border-accent hover:brightness-110 font-medium",
  ghost: "text-muted hover:bg-hover hover:text-ink border border-transparent",
  danger: "text-danger hover:bg-danger-soft border border-transparent",
};
const SIZE: Record<Size, string> = { sm: "h-6 px-2 text-xs gap-1", md: "h-7 px-2.5 text-sm gap-1.5" };

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; icon?: LucideIcon; children?: ReactNode; active?: boolean };

export function Button({ variant = "default", size = "md", icon: Icon, active, className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx("inline-flex items-center justify-center rounded-sm whitespace-nowrap select-none transition-colors disabled:opacity-40 disabled:pointer-events-none", VARIANT[variant], SIZE[size], active && "bg-accent-soft text-ink border-transparent", className)}
      {...rest}
    >
      {Icon ? <Icon size={size === "sm" ? 13 : 14} strokeWidth={1.75} aria-hidden /> : null}
      {children}
    </button>
  );
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon: LucideIcon; active?: boolean; size?: Size; tone?: "default" | "danger" };

/** Bouton à icône seule : le libellé est obligatoire (infobulle et lecteur d'écran). */
export function IconButton({ label, icon: Icon, active, size = "md", tone = "default", className, ...rest }: IconButtonProps) {
  return (
    <Tooltip text={label}>
      <button
        type="button"
        aria-label={label}
        className={cx("inline-flex items-center justify-center rounded-sm transition-colors disabled:opacity-40 disabled:pointer-events-none", size === "sm" ? "h-6 w-6" : "h-7 w-7", active ? "bg-accent-soft text-ink" : tone === "danger" ? "text-muted hover:bg-danger-soft hover:text-danger" : "text-muted hover:bg-hover hover:text-ink", className)}
        {...rest}
      >
        <Icon size={size === "sm" ? 13 : 15} strokeWidth={1.75} aria-hidden />
      </button>
    </Tooltip>
  );
}
