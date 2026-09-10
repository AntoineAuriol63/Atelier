"use client";

import type { Site, Theme } from "@atelier/model";
import { tokenOptions } from "@/lib/css-value";
import { cx } from "../cx";

const GROUPS: (keyof Theme["tokens"])[] = ["color", "space", "width", "radius", "shadow", "fontSize", "lineHeight", "font"];

/** Petit sélecteur ◇ des valeurs du thème : insère `{groupe.nom}` dans un champ libre. Un groupe, ou tous. */
export function TokenSelect({ site, group, onPick, className }: { site: Site; group?: keyof Theme["tokens"]; onPick: (token: string) => void; className?: string }) {
  const groups = group ? [group] : GROUPS;
  const lists = groups.map((g) => ({ g, tokens: tokenOptions(site, g) })).filter((x) => x.tokens.length);
  if (!lists.length) return null;
  return (
    <select aria-label="Valeurs du thème" value="" onChange={(e) => { if (e.target.value) onPick(`{${e.target.value}}`); }} title="Insérer une valeur du thème" className={cx("h-7 w-6 shrink-0 bg-transparent text-dim appearance-none text-center text-[11px] hover:text-accent cursor-pointer rounded-sm border border-transparent hover:border-line-strong", className)}>
      <option value="">◇</option>
      {lists.map(({ g, tokens }) => <optgroup key={g} label={g}>{tokens.map((t) => <option key={t.token} value={t.token}>{t.label} · {t.value}</option>)}</optgroup>)}
    </select>
  );
}
