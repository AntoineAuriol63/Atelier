import { describe, it, expect } from "vitest";
import { matchRedirect, validRedirect } from "../src";

describe("redirections", () => {
  const site = { redirects: [{ from: "/ancien", to: "/nouveau", permanent: true }, { from: "/blog/*", to: "/actualites/*", permanent: false }, { from: "/ext", to: "https://exemple.fr/", permanent: true }] };
  it("exacte, avec ou sans barre finale", () => {
    expect(matchRedirect(site, "/ancien")).toEqual({ to: "/nouveau", permanent: true });
    expect(matchRedirect(site, "/ancien/")).toEqual({ to: "/nouveau", permanent: true });
    expect(matchRedirect(site, "/autre")).toBeUndefined();
  });
  it("préfixe avec reste capturé", () => {
    expect(matchRedirect(site, "/blog/mon-article")).toEqual({ to: "/actualites/mon-article", permanent: false });
    expect(matchRedirect(site, "/blog")).toEqual({ to: "/actualites/", permanent: false });
    expect(matchRedirect(site, "/blogue")).toBeUndefined();
  });
  it("adresse externe et validation", () => {
    expect(matchRedirect(site, "/ext")!.to).toBe("https://exemple.fr/");
    expect(validRedirect({ from: "ancien", to: "/x", permanent: true })).toMatch(/commence par/);
    expect(validRedirect({ from: "/a", to: "a", permanent: true })).toMatch(/destination/);
    expect(validRedirect({ from: "/a", to: "/a", permanent: true })).toMatch(/boucle/);
    expect(validRedirect({ from: "/a", to: "/b", permanent: true })).toBeUndefined();
  });
});
