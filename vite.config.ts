import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Mac Notes",
        short_name: "Notes",
        icons: [
          {
            src: "icon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
      },
    }),
  ],
});
