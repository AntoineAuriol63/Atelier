import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** 25 septembre 2026 : les polices de l'éditeur vivent dans le dépôt (`next/font/local`) ; le build ne dépend plus de Google (un run de CI avait échoué faute de réseau). */
const src = join(__dirname, "..", "src");
const walk = (dir: string): string[] => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });

describe("polices de l'éditeur", () => {
  it("aucun fichier n'importe next/font/google", () => {
    const offenders = walk(src).filter((p) => /\.(ts|tsx)$/.test(p) && readFileSync(p, "utf8").includes("next/font/google"));
    expect(offenders).toEqual([]);
  });

  it("les fichiers de police référencés par les layouts existent, avec la licence à côté", () => {
    const fonts = join(src, "app", "fonts");
    expect(existsSync(join(fonts, "LICENSE-IBM-Plex.txt"))).toBe(true);
    for (const layout of ["(editor)", "(auth)"]) {
      const text = readFileSync(join(src, "app", layout, "layout.tsx"), "utf8");
      expect(text).toContain("next/font/local");
      const refs = [...text.matchAll(/path: "\.\.\/fonts\/([^"]+)"/g)].map((m) => m[1]!);
      expect(refs.length).toBeGreaterThan(0);
      for (const r of refs) expect({ [r]: existsSync(join(fonts, r)) }).toEqual({ [r]: true });
    }
  });
});
