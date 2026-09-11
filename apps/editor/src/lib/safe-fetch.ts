import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const REDIRECTS = new Set([301, 302, 303, 307, 308]);

/** Adresses qui ne doivent jamais être atteintes par une URL fournie par un document Atelier. */
export function privateAddress(address: string): boolean {
  const ip = address.toLowerCase().split("%")[0]!;
  if (ip === "::" || ip === "::1") return true;
  if (ip.startsWith("fc") || ip.startsWith("fd") || /^fe[89ab]/.test(ip)) return true;
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(ip);
  if (mapped) return privateAddress(mapped[1]!);
  if (isIP(ip) !== 4) return false;
  const [a, b] = ip.split(".").map(Number);
  return a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 0 || b === 168)) ||
    (a === 198 && (b === 18 || b === 19));
}

async function assertPublicDestination(url: URL): Promise<void> {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Protocole externe refusé");
  if (url.username || url.password) throw new Error("Identifiants dans une URL externe refusés");
  if (url.port && !((url.protocol === "http:" && url.port === "80") || (url.protocol === "https:" && url.port === "443"))) {
    throw new Error("Port externe refusé");
  }
  const addresses = isIP(url.hostname) ? [{ address: url.hostname }] : await lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => privateAddress(address))) throw new Error("Destination réseau privée refusée");
}

/** Télécharge une ressource publique avec contrôle des destinations, redirections et octets lus. */
export async function fetchPublicBytes(raw: string, maxBytes: number, timeoutMs = 15_000): Promise<Uint8Array> {
  let url = new URL(raw);
  for (let redirect = 0; redirect <= 4; redirect++) {
    await assertPublicDestination(url);
    const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(timeoutMs) });
    if (REDIRECTS.has(res.status)) {
      const location = res.headers.get("location");
      if (!location || redirect === 4) throw new Error("Trop de redirections externes");
      url = new URL(location, url);
      continue;
    }
    if (!res.ok || !res.body) throw new Error(`Téléchargement externe refusé (${res.status})`);
    const declared = Number(res.headers.get("content-length"));
    if (Number.isFinite(declared) && declared > maxBytes) {
      await res.body.cancel();
      throw new Error("Ressource externe trop volumineuse");
    }
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new Error("Ressource externe trop volumineuse");
      }
      chunks.push(value);
    }
    const out = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { out.set(chunk, offset); offset += chunk.byteLength; }
    return out;
  }
  throw new Error("Téléchargement externe impossible");
}
