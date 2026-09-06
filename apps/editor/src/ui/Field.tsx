import type { ReactNode } from "react";
import { cx } from "./cx";

/** Ligne libellé + contrôle. Le libellé reste court et en langage courant. */
export function Field({ label, hint, children, className, inline = true }: { label: string; hint?: string; children: ReactNode; className?: string; inline?: boolean }) {
  return (
    <label className={cx(inline ? "grid grid-cols-[88px_1fr] items-center gap-2" : "flex flex-col gap-1", className)} title={hint}>
      <span className="text-xs text-muted truncate">{label}</span>
      <span className="min-w-0">{children}</span>
    </label>
  );
}

export function FieldGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex flex-col gap-1.5", className)}>{children}</div>;
}
