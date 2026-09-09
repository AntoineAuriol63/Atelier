import { describe, it, expect } from "vitest";
import { atLeast, opAllowedForWriter } from "../src";

describe("rôles", () => {
  it("ordonne rédacteur < éditeur < propriétaire", () => {
    expect(atLeast("writer", "writer")).toBe(true);
    expect(atLeast("writer", "editor")).toBe(false);
    expect(atLeast("editor", "writer")).toBe(true);
    expect(atLeast("owner", "editor")).toBe(true);
    expect(atLeast(null, "writer")).toBe(false);
  });
  it("laisse le contenu au rédacteur, pas l'apparence ni le site", () => {
    expect(opAllowedForWriter({ op: "node.set", id: "a", path: "props.content.fr", value: [] })).toBe(true);
    expect(opAllowedForWriter({ op: "node.set", id: "a", path: "name", value: "x" })).toBe(true);
    expect(opAllowedForWriter({ op: "node.set", id: "a", path: "style.base.color", value: "red" })).toBe(false);
    expect(opAllowedForWriter({ op: "node.set", id: "a", path: "hidden.mobile", value: true })).toBe(false);
    expect(opAllowedForWriter({ op: "site.set", path: "theme.tokens.color.ink", value: "#000" })).toBe(false);
    expect(opAllowedForWriter({ op: "node.insert", parent: "p", index: 0, node: { id: "n", type: "text", props: { tag: "p" } } })).toBe(true);
    expect(opAllowedForWriter({ op: "batch", ops: [{ op: "node.remove", id: "a" }, { op: "site.set", path: "pages", value: [] }] })).toBe(false);
  });
});
