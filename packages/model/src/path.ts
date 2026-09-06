/** Chemins pointés : "props.alt.fr", "style.base.gap", "theme.tokens.color.primary". */

export function splitPath(path: string): string[] {
  if (!path) return [];
  return path.split(".");
}

export function getPath(obj: unknown, path: string | string[]): unknown {
  const parts = Array.isArray(path) ? path : splitPath(path);
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

/** Retourne une copie de `obj` avec la valeur posée au chemin (copie sur écriture le long du chemin). `undefined` supprime la clé. */
export function setPath<T>(obj: T, path: string | string[], value: unknown): T {
  const parts = Array.isArray(path) ? path : splitPath(path);
  if (parts.length === 0) return value as T;
  const [head, ...rest] = parts as [string, ...string[]];
  const isArray = Array.isArray(obj);
  const base: Record<string, unknown> = isArray ? ([...(obj as unknown[])] as unknown as Record<string, unknown>) : { ...((obj ?? {}) as Record<string, unknown>) };
  if (rest.length === 0) {
    if (value === undefined) delete base[head];
    else base[head] = value;
  } else {
    const child = base[head];
    const nextIsIndex = /^\d+$/.test(rest[0]!);
    base[head] = setPath(child ?? (nextIsIndex ? [] : {}), rest, value);
  }
  return base as T;
}
