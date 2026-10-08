import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const WebSocketClient = require("next/dist/compiled/ws");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PAGE_URL = process.argv[2] || process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const OUTPUT_SLUG = process.argv[3] || "bethania";
const OUTPUT_DIR = resolve(process.cwd(), "portfolio-export");
const CSS_WIDTH = 1440;
const SCALE = 2;
const DEBUG_PORT = 9333;
const ENABLE_WEBGL = process.argv[4] === "webgl";
const CAPTURE_MODE = process.argv[5] === "viewport" ? "viewport" : "full";
const CAPTURE_Y = Math.max(0, Number(process.argv[6] || 0));

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

async function waitForJson(url, attempts = 80) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      lastError = error;
    }
    await delay(125);
  }
  throw lastError || new Error(`Browser endpoint unavailable: ${url}`);
}

function connectCdp(webSocketUrl) {
  const socket = new WebSocketClient(webSocketUrl);
  let nextId = 1;
  const pending = new Map();

  const opened = new Promise((resolveOpen, rejectOpen) => {
    socket.once("open", resolveOpen);
    socket.once("error", rejectOpen);
  });

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: resolveCommand, reject: rejectCommand } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectCommand(new Error(message.error.message));
    else resolveCommand(message.result);
  });

  return {
  async send(method, params = {}) {
      await opened;
      const id = nextId;
      nextId += 1;
      const result = new Promise((resolveCommand, rejectCommand) => {
        pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
      });
      socket.send(JSON.stringify({ id, method, params }));
      return Promise.race([
        result,
        delay(30_000).then(() => { throw new Error(`CDP timeout: ${method}`); }),
      ]);
    },
    close() {
      socket.close();
    },
  };
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const profileDirectory = await mkdtemp(join(tmpdir(), "bethania-portfolio-edge-"));
  const browserFlags = [
    "--headless",
    "--no-sandbox",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profileDirectory}`,
    "about:blank",
  ];
  browserFlags.splice(3, 0, ...(ENABLE_WEBGL
    ? ["--ignore-gpu-blocklist", "--enable-webgl"]
    : ["--disable-gpu"]));
  const browser = spawn(EDGE, browserFlags, { stdio: "ignore", windowsHide: true });

  let cdp;
  try {
    await waitForJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
    const target = await fetch(
      `http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(PAGE_URL)}`,
      { method: "PUT" },
    ).then((response) => response.json());

    cdp = connectCdp(target.webSocketDebuggerUrl);
    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: CSS_WIDTH,
      height: 900,
      deviceScaleFactor: SCALE,
      mobile: false,
    });
    await cdp.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    await cdp.send("Page.navigate", { url: PAGE_URL });

    await cdp.send("Runtime.evaluate", {
      awaitPromise: true,
      returnByValue: true,
      expression: `(async () => {
        while (document.readyState !== 'complete') {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        document.querySelectorAll('img').forEach((image) => { image.loading = 'eager'; });
        await Promise.all([...document.images].map((image) => image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener('load', resolve, { once: true });
              image.addEventListener('error', resolve, { once: true });
            })));
        if (document.fonts?.ready) await document.fonts.ready;
        await Promise.all([...document.querySelectorAll('video')].map((video) => video.readyState >= 2
          ? Promise.resolve()
          : new Promise((resolve) => {
              video.addEventListener('loadeddata', resolve, { once: true });
              video.addEventListener('error', resolve, { once: true });
              setTimeout(resolve, 2500);
            })));
        document.querySelectorAll('.preloader, [data-preloader]').forEach((loader) => loader.remove());
        document.querySelectorAll('.home-is-loading').forEach((element) => element.classList.remove('home-is-loading'));
        document.documentElement.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
        await new Promise((resolve) => setTimeout(resolve, 750));
        const pageHeight = document.documentElement.scrollHeight;
        if (${CAPTURE_MODE === "full"}) {
          for (let y = 0; y < pageHeight; y += Math.max(600, window.innerHeight * 0.8)) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 120));
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';
        window.scrollTo(0, ${CAPTURE_Y});
        document.querySelectorAll('nextjs-portal').forEach((portal) => portal.remove());
        await new Promise((resolve) => setTimeout(resolve, 500));
        const captureStyle = document.createElement('style');
        captureStyle.textContent = '.portfolio-force-visible{opacity:1!important;visibility:visible!important;transform:none!important}';
        document.head.appendChild(captureStyle);
        document.querySelectorAll('body *').forEach((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          if (
            Number.parseFloat(style.opacity) < 0.05 &&
            style.position !== 'fixed' &&
            element.getAttribute('aria-hidden') !== 'true' &&
            rect.width > 1 && rect.height > 1
          ) {
            element.classList.add('portfolio-force-visible');
            element.style.setProperty('opacity', '1', 'important');
            element.style.setProperty('visibility', 'visible', 'important');
            element.style.setProperty('transform', 'none', 'important');
          }
        });
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
          fonts: document.fonts ? [...document.fonts].map((font) => ({ family: font.family, weight: font.weight, status: font.status })) : [],
        };
      })()`,
    });

    const { cssContentSize } = await cdp.send("Page.getLayoutMetrics");
    const clip = {
      x: 0,
      y: CAPTURE_Y,
      width: CSS_WIDTH,
      height: CAPTURE_MODE === "viewport"
        ? Math.min(900, Math.max(1, Math.ceil(cssContentSize.height - CAPTURE_Y)))
        : Math.ceil(cssContentSize.height),
      scale: 1,
    };

    const png = await cdp.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: true,
      clip,
    });
    const webpScale = Math.min(1, 15_000 / (clip.height * SCALE));
    const webp = await cdp.send("Page.captureScreenshot", {
      format: "webp",
      quality: 96,
      fromSurface: true,
      captureBeyondViewport: true,
      clip: { ...clip, scale: webpScale },
    });

    const outputSuffix = CAPTURE_MODE === "viewport" ? "-cover" : "";
    const pngPath = join(OUTPUT_DIR, `${OUTPUT_SLUG}-portfolio${outputSuffix}-2x.png`);
    const webpPath = join(OUTPUT_DIR, `${OUTPUT_SLUG}-portfolio${outputSuffix}-2x.webp`);
    await writeFile(pngPath, Buffer.from(png.data, "base64"));
    await writeFile(webpPath, Buffer.from(webp.data, "base64"));

    console.log(JSON.stringify({
      pngPath,
      webpPath,
      slug: OUTPUT_SLUG,
      mode: CAPTURE_MODE,
      cssViewportWidth: CSS_WIDTH,
      cssPageHeight: clip.height,
      pixelWidth: Math.round(clip.width * SCALE),
      pixelHeight: Math.round(clip.height * SCALE),
      webpPixelWidth: Math.round(clip.width * SCALE * webpScale),
      webpPixelHeight: Math.round(clip.height * SCALE * webpScale),
    }, null, 2));
  } finally {
    try {
      if (cdp) await cdp.send("Browser.close");
    } catch {
      browser.kill();
    }
    cdp?.close();
    browser.kill();
    await delay(1000);
    await rm(profileDirectory, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 250,
    }).catch(() => {});
  }
}

await main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
