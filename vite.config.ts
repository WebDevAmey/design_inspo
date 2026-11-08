import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

// TanStack Start renders the routes on the server; Nitro packages the server for the host (Vercel is detected automatically).
export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tanstackStart(), nitro(), viteReact()],
});
