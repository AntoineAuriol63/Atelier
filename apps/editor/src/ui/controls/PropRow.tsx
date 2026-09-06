import type { ReactNode } from "react";
import type { StyleSource } from "@atelier/model";
import { SourceDot } from "./SourceDot";
import { cx } from "../cx";

/** Ligne d'un panneau de style : pastille d'origine, libellé, contrôle. */
export function PropRow({ label, source, sourceTitle, onReset, children, className, wide }: { label: string; source?: StyleSource; sourceTitle: string; onReset?: () => void; children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <div className={cx("grid items-center gap-1.5", wide ? "grid-cols-[12px_1fr]" : "grid-cols-[12px_72px_1fr]", className)}>
      <SourceDot source={source} title={sourceTitle} onReset={onReset} />
      {wide ? null : <span className="text-xs text-muted truncate" title={label}>{label}</span>}
      <div className="min-w-0 flex items-center gap-1">{wide ? <span className="text-xs text-muted w-[68px] shrink-0 truncate">{label}</span> : null}{children}</div>
    </div>
  );
}
