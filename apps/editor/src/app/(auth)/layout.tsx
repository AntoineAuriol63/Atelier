import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { PRODUCT_NAME } from "@/lib/product";

const plexSans = localFont({ src: [{ path: "../fonts/ibm-plex-sans-latin.woff2", weight: "400 600", style: "normal" }], variable: "--font-plex-sans", display: "swap" });
export const metadata: Metadata = { title: `Connexion · ${PRODUCT_NAME}` };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`h-full ${plexSans.variable}`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
