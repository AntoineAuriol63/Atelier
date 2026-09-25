import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { PRODUCT_NAME } from "@/lib/product";

// Les polices vivent dans le dépôt (sous-ensemble latin, licence OFL à côté) : le build ne dépend plus de Google (25 septembre 2026).
const plexSans = localFont({ src: [{ path: "../fonts/ibm-plex-sans-latin.woff2", weight: "400 600", style: "normal" }], variable: "--font-plex-sans", display: "swap" });
const plexMono = localFont({ src: [{ path: "../fonts/ibm-plex-mono-400-latin.woff2", weight: "400", style: "normal" }, { path: "../fonts/ibm-plex-mono-500-latin.woff2", weight: "500", style: "normal" }], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  title: PRODUCT_NAME,
  description: "Créateur de sites designer-first, code-natif, sans verrou.",
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`h-full ${plexSans.variable} ${plexMono.variable}`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
