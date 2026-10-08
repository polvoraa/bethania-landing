import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const builds = [
  { port: 4101, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\Consultoria React\\meu-site\\build" },
  { port: 4102, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\nova2.0\\dist" },
  { port: 4103, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\novaclick\\out" },
  { port: 4104, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\polvora-dev\\dist" },
  { port: 4105, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\Qualita\\dist" },
  { port: 4106, root: "C:\\Users\\spolv\\OneDrive\\Área de Trabalho\\web\\South Side\\dist" },
];

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".glb": "model/gltf-binary",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".otf": "font/otf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

for (const build of builds) {
  const root = resolve(build.root);
  createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
    const requestedPath = resolve(root, normalize(`.${pathname}`));
    let filePath = requestedPath.startsWith(root) ? requestedPath : join(root, "index.html");

    try {
      const metadata = await stat(filePath);
      if (metadata.isDirectory()) filePath = join(filePath, "index.html");
      await stat(filePath);
    } catch {
      filePath = join(root, "index.html");
    }

    response.setHeader("Content-Type", contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");
    createReadStream(filePath)
      .on("error", () => {
        response.statusCode = 500;
        response.end("Unable to read build output.");
      })
      .pipe(response);
  }).listen(build.port, "127.0.0.1", () => {
    console.log(`Serving ${root} at http://127.0.0.1:${build.port}`);
  });
}
