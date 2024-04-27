import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import auth from "auth-astro";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [auth(), react(), tailwind({
    applyBaseStyles: false,
    
  })], 
  vite: {
    optimizeDeps: { exclude: ["auth.config"] },
    ssr: {
      noExternal: ["@radix-ui/*"]
    }
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});