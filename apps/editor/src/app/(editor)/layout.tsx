import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { PRODUCT_NAME } from "@/lib/product";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

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
