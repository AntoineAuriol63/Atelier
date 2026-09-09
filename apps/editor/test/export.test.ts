import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { sampleSite, sampleEntries } from "@atelier/model";
import { crc32, zip } from "../src/lib/zip";
import { buildExport } from "../src/lib/export-site";

describe("zip", () => {
  it("calcule le CRC-32 de référence", () => {
    expect(crc32(new TextEncoder().encode("123456789")).toString(16)).toBe("cbf43926");
  });
  it("produit une archive que unzip accepte", () => {
    const buf = zip([{ path: "index.html", data: "<h1>Bonjour</h1>" }, { path: "assets/a.bin", data: new Uint8Array([0, 1, 2, 255]) }]);
    const dir = mkdtempSync(path.join(tmpdir(), "atelier-zip-"));
    const f = path.join(dir, "t.zip");
    writeFileSync(f, buf);
    const out = execFileSync("unzip", ["-l", f]).toString();
    expect(out).toContain("index.html");
    expect(out).toContain("assets/a.bin");
    expect(() => execFileSync("unzip", ["-tq", f])).not.toThrow();
  });
});

describe("export statique", () => {
  it("rend une page par adresse, la feuille de style aux classes lisibles et les données", async () => {
    const r = await buildExport({ site: sampleSite, entries: sampleEntries, version: 3, publishedAt: "2026-09-09T10:00:00.000Z" });
    const paths = r.files.map((f) => f.path);
    expect(paths).toContain("index.html");
    expect(paths).toContain("galeries/index.html");
    expect(paths).toContain("projets/lea-et-tom/index.html");
    expect(paths).toContain("styles.css");
    expect(paths).toContain("data/projets.json");
    expect(paths).toContain("README.md");
    const home = r.files.find((f) => f.path === "index.html")!.data as string;
    expect(home).toContain("<!doctype html>");
    expect(home).toContain('class="section heros"');
    expect(home).not.toContain("data-node");
    expect(home).toContain('<link rel="stylesheet" href="/styles.css">');
    const css = r.files.find((f) => f.path === "styles.css")!.data as string;
    expect(css).toContain(".heros{");
    expect(css).not.toMatch(/\.n-[a-z]/);
  }, 60000);
});
