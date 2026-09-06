import { sampleSite, sampleEntries, type Site, type Entry } from "@atelier/model";
import { memoryData } from "@atelier/renderer";

/**
 * Source du site courant. v0 : le site d'exemple en mémoire.
 * Remplacé par la persistance (Supabase) et le journal d'opérations en v0 finale.
 */
export function getCurrentSite(): Site {
  return sampleSite;
}

export function getEntries(): Entry[] {
  return sampleEntries;
}

export function getData() {
  return memoryData(getEntries());
}
