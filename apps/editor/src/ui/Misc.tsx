import type { ReactNode } from "react";
import { cx } from "./cx";

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-flex items-center h-4 px-1 rounded-xs bg-raised text-2xs text-muted font-sans border border-line-strong">{children}</kbd>;
}

export function Badge({ tone = "neutral", children, title }: { tone?: "neutral" | "success" | "warning" | "danger" | "accent"; children: ReactNode; title?: string }) {
  const cls = { neutral: "bg-surface text-muted", success: "bg-success-soft text-success", warning: "bg-warning-soft text-warning", danger: "bg-danger-soft text-danger", accent: "bg-accent-soft text-accent" }[tone];
  return <span title={title} className={cx("inline-flex items-center h-5 px-1.5 rounded-xs text-2xs font-medium whitespace-nowrap", cls)}>{children}</span>;
}

export function Separator({ vertical }: { vertical?: boolean }) {
  return <div role="separator" className={vertical ? "w-px self-stretch bg-line mx-1" : "h-px w-full bg-line my-1"} />;
}

export function Toolbar({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex items-center gap-1", className)}>{children}</div>;
}

/** Message d'aide discret dans un panneau. */
export function Hint({ children }: { children: ReactNode }) {
  return <p className="text-xs text-dim leading-snug">{children}</p>;
}
