import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un second serveur de développement (par exemple en mode fichier, ATELIER_STORE=file) a besoin de son propre dossier de travail.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // Le badge de développement de Next (compteur d'erreurs) est masqué : les erreurs restent dans la console du navigateur.
  devIndicators: false,
};

export default nextConfig;
