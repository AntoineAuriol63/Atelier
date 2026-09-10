import type { Database, Inline, Node } from "@atelier/model";
import { newId } from "@atelier/model";

const firstOf = (db: Database, types: string[], not?: string) => db.fields.find((f) => types.includes(f.type) && f.name !== not)?.name;

/** Carte par défaut d'une vue, construite d'après la base : sa première image, son titre, son premier texte court. */
export function defaultCard(db: Database | undefined, locale: string): Node {
  const image = db ? firstOf(db, ["image"]) : undefined;
  const text = db ? firstOf(db, ["text", "richtext"], db.titleField) : undefined;
  const title: Inline[] = db ? [{ t: "bind", binding: { source: "item", path: db.titleField } }] : [{ t: "text", v: "Titre" }];
  const children: Node[] = [];
  if (image) children.push({ id: newId(), type: "image", props: { alt: { [locale]: "" }, fit: "cover", ratio: "4 / 5" }, bindings: { asset: { source: "item", path: image }, alt: { source: "item", path: db!.titleField } }, style: { base: { borderRadius: { token: "radius.md" }, overflow: "hidden" } } });
  children.push({ id: newId(), type: "text", props: { tag: "h3", content: { [locale]: title } } });
  if (text) children.push({ id: newId(), type: "text", props: { tag: "p", content: { [locale]: [{ t: "text", v: text }] } }, bindings: { content: { source: "item", path: text } }, style: { shared: ["st_muted"] } });
  return { id: newId(), type: "item", name: "Carte", props: {}, style: { base: { display: "flex", flexDirection: "column", gap: { token: "space.3" } } }, children };
}

/** Quand la base d'une vue change : chaque liaison qui vise un champ absent est reportée sur un champ de même sorte, sinon retirée. */
export function rebindCard(item: Node, db: Database, locale: string): Node {
  const has = (name: string) => db.fields.some((f) => f.name === name);
  const fix = (n: Node): Node => {
    let next: Node = n;
    if (n.bindings) {
      const b = { ...n.bindings };
      for (const [key, binding] of Object.entries(b)) {
        if (binding.source !== "item" || binding.path.startsWith("$") || has(binding.path)) continue;
        const repl = key === "asset" ? firstOf(db, ["image"]) : key === "alt" ? db.titleField : key === "href" ? firstOf(db, ["link"]) : firstOf(db, ["text", "richtext", "number", "date", "select"]);
        if (repl) b[key] = { ...binding, path: repl }; else delete b[key];
      }
      next = { ...next, bindings: Object.keys(b).length ? b : undefined };
    }
    const list = (n.props.content as Record<string, Inline[]> | undefined)?.[locale];
    if (list?.some((seg) => seg.t === "bind")) {
      next = { ...next, props: { ...next.props, content: { ...(n.props.content as Record<string, Inline[]>), [locale]: list.map((seg) => (seg.t === "bind" && seg.binding.source === "item" && !seg.binding.path.startsWith("$") && !has(seg.binding.path) ? { ...seg, binding: { ...seg.binding, path: db.titleField } } : seg)) } } };
    }
    return n.children ? { ...next, children: n.children.map(fix) } : next;
  };
  return fix(item);
}
