import { describe, it, expect } from "vitest";
import type { z } from "zod";
import * as schema from "../src/schema";
import type { Site, Entry } from "../src";

// Les types TypeScript et le schéma zod décrivent la même chose : ces affectations cassent le typecheck à la première divergence.
type SiteFromSchema = z.infer<typeof schema.site>;
type EntryFromSchema = z.infer<typeof schema.entry>;
const _siteA: Site = {} as SiteFromSchema;
const _siteB: SiteFromSchema = {} as Site;
const _entryA: Entry = {} as EntryFromSchema;
const _entryB: EntryFromSchema = {} as Entry;
void _siteA; void _siteB; void _entryA; void _entryB;

describe("accord types et schéma", () => {
  it("compile", () => { expect(true).toBe(true); });
});
