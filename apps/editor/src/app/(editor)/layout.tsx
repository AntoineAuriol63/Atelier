import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Atelier",
  description: "Créateur de sites designer-first, code-natif, sans verrou.",
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full antialiased bg-neutral-100 text-neutral-900">{children}</body>
    </html>
  );
}
