"use client";

import { useEffect } from "react";

const scripts = [
  "/vendor-gsap.min.js",
  "/vendor-scrolltrigger.min.js",
  "/animations.js",
];

export function SiteAnimations() {
  useEffect(() => {
    let cancelled = false;
    const addedScripts: HTMLScriptElement[] = [];

    const loadScripts = async () => {
      for (const source of scripts) {
        if (cancelled) return;
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = source;
          script.async = false;
          script.addEventListener("load", () => resolve(), { once: true });
          script.addEventListener("error", () => reject(new Error(`Não foi possível carregar ${source}`)), { once: true });
          document.head.appendChild(script);
          addedScripts.push(script);
        });
      }
    };

    loadScripts().catch(() => {
      document.documentElement.classList.add("motion-fallback");
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    });

    return () => {
      cancelled = true;
      addedScripts.forEach((script) => script.remove());
    };
  }, []);

  return null;
}
