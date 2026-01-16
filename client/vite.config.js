import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3003, // PM2 port
    allowedHosts: ["inventory.rajshingala.site", "localhost", "127.0.0.1"],
  },
});
