"use client";

import { useEffect } from "react";

type ContentChanges = {
  images?: Record<string, { src?: string; alt?: string }>;
  text?: Record<string, string>;
};

export function ContentOverrides() {
  useEffect(() => {
    let active = true;

    fetch("/site-content.json", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((content: ContentChanges | null) => {
        if (!active || !content) return;
        Object.entries(content.images ?? {}).forEach(([selector, data]) => {
          try {
            const selected = document.querySelector(selector);
            const image = selected?.tagName === "IMG" ? selected : selected?.querySelector("img");
            if (!(image instanceof HTMLImageElement)) return;
            if (data.src) image.src = data.src;
            if (data.alt !== undefined) image.alt = data.alt;
          } catch {
            // Ignora seletores antigos que já não existam na página.
          }
        });
        Object.entries(content.text ?? {}).forEach(([selector, html]) => {
          try {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement) element.innerHTML = html;
          } catch {
            // Mantém as demais alterações mesmo se um seletor estiver inválido.
          }
        });
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return null;
}
