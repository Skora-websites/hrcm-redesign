import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

/**
 * Multi-page static build. Each page becomes its own .html file so the site
 * can be dropped onto plain static hosting (same as hrcm.in today) with real
 * subpage URLs and zero server rewrites.
 */
const pages = [
  "index",
  "about",
  "services",
  "why-choose-us",
  "our-team",
  "software",
  "careers",
  "get-in-touch",
  "terms",
  "privacy",
  "404",
  "services/claims-processing-and-submission",
  "services/claims-audit-and-analysis",
  "services/query-management",
  "services/accounts-receivable-management",
  "services/revenue-reconciliation",
  "services/data-management",
  "services/medical-billing",
];

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: { port: 5180, strictPort: true },
  build: {
    outDir: "dist",
    assetsInlineLimit: 1024 * 1024,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((p) => [p.replace(/\//g, "-"), resolve(__dirname, `${p}.html`)]),
      ),
    },
  },
});
