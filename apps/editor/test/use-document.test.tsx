// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { applyOps, findNode, sampleSite, type Site } from "@atelier/model";
import { useDocument } from "@/lib/use-document";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type Api = ReturnType<typeof useDocument>;
type Call = { url: string; method: string; body?: unknown };

/** Un serveur simulé : chaque appel reçoit la réponse suivante de la file ; les appels sont enregistrés. */
function fakeServer(responses: { status: number; body: unknown }[]) {
  const calls: Call[] = [];
  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    calls.push({ url, method: init?.method ?? "GET", body: init?.body ? JSON.parse(String(init.body)) : undefined });
    const next = responses.shift() ?? { status: 500, body: { error: "aucune réponse prévue" } };
    return new Response(JSON.stringify(next.body), { status: next.status, headers: { "content-type": "application/json" } });
  });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return { calls };
}

function Probe({ site, version, onApi }: { site: Site; version: number; onApi: (api: Api) => void }) {
  const api = useDocument(site, version);
  onApi(api);
  return null;
}

function mount(site: Site, version: number) {
  let api!: Api;
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root: Root = createRoot(host);
  act(() => { root.render(createElement(Probe, { site, version, onApi: (a) => { api = a; } })); });
  const settle = async () => { for (let i = 0; i < 6; i++) await act(async () => { await Promise.resolve(); }); };
  return { get api() { return api; }, settle, unmount: () => act(() => root.unmount()) };
}

describe("document en cours d'édition · conflit de version", () => {
  const realFetch = globalThis.fetch;
  beforeEach(() => { document.body.innerHTML = ""; });
  afterEach(() => { globalThis.fetch = realFetch; });

  it("un conflit sur d'autres éléments est résolu seul : les changements sont reposés et renvoyés", async () => {
    const remote = applyOps(sampleSite, [{ op: "node.set", id: "nav_2", path: "name", value: "Modifié ailleurs" }]).site;
    const server = fakeServer([
      { status: 409, body: { error: "Conflit de version", version: 5 } },
      { status: 200, body: { site: remote, version: 5, entries: [] } },
      { status: 200, body: { version: 6 } },
    ]);
    const m = mount(sampleSite, 4);
    act(() => { m.api.commit({ op: "node.set", id: "nav_1", path: "name", value: "Modifié ici" }); });
    await m.settle();
    expect(m.api.blocked).toBe(false);
    expect(m.api.status).toBe("saved");
    expect(m.api.version).toBe(6);
    expect(findNode(m.api.site, "nav_1")?.node.name).toBe("Modifié ici");
    expect(findNode(m.api.site, "nav_2")?.node.name).toBe("Modifié ailleurs");
    const posts = server.calls.filter((c) => c.method === "POST");
    expect(posts).toHaveLength(2);
    expect((posts[1]!.body as { baseVersion: number }).baseVersion).toBe(5);
    expect((posts[1]!.body as { ops: unknown[] }).ops).toHaveLength(1);
    // Après avoir reposé, l'annulation repart de zéro : elle porterait sur un document qui n'existe plus.
    expect(m.api.canUndo).toBe(false);
    m.unmount();
  });

  it("un conflit sur l'élément même reste un conflit : l'éditeur se fige et rien n'est perdu", async () => {
    const remote = applyOps(sampleSite, [{ op: "node.remove", id: "nav_1" }]).site;
    const server = fakeServer([
      { status: 409, body: { error: "Conflit de version", version: 5 } },
      { status: 200, body: { site: remote, version: 5, entries: [] } },
    ]);
    const m = mount(sampleSite, 4);
    act(() => { m.api.commit({ op: "node.set", id: "nav_1", path: "name", value: "Modifié ici" }); });
    await m.settle();
    expect(m.api.blocked).toBe(true);
    expect(m.api.status).toBe("conflict");
    expect(m.api.error).toMatch(/modifié ailleurs/i);
    expect(server.calls.filter((c) => c.method === "POST")).toHaveLength(1);
    expect(await m.api.copyPending()).toBe(1);
    m.unmount();
  });
});
