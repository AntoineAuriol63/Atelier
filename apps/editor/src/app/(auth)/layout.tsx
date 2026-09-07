import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "../globals.css";
import { PRODUCT_NAME } from "@/lib/product";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
export const metadata: Metadata = { title: `Connexion · ${PRODUCT_NAME}` };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`h-full ${plexSans.variable}`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
