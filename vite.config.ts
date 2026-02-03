import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/p-gimzy/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
});
