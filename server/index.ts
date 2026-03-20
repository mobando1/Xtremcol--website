import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist/public");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { port: PORT, host: "0.0.0.0", allowedHosts: true },
  });
  await vite.listen();
  vite.printUrls();
  process.exit(0);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
