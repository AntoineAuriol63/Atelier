import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un second serveur de développement (par exemple en mode fichier, ATELIER_STORE=file) a besoin de son propre dossier de travail.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // Le badge de développement de Next (compteur d'erreurs) est masqué : les erreurs restent dans la console du navigateur.
  devIndicators: false,
  // En-têtes de sécurité : l'éditeur et l'aperçu ne s'encadrent que depuis leur propre origine ; les sites publiés restent libres d'être intégrés.
  async headers() {
    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      { source: "/((?!s/).*)", headers: [...common, { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" }, { key: "X-Frame-Options", value: "SAMEORIGIN" }] },
      { source: "/s/:path*", headers: common },
    ];
  },
};

export default nextConfig;
