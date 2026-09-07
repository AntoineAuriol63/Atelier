import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le badge de développement de Next (compteur d'erreurs) est masqué : les erreurs restent dans la console du navigateur.
  devIndicators: false,
};

export default nextConfig;
