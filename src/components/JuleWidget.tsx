"use client";
import { useEffect } from "react";

export function JuleWidget() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.jule.ai/widget.js"]');
    if (existing) return;

    const s = document.createElement("script");
    s.src = "https://assets.jule.ai/widget.js";
    s.dataset.apiKey = "pk_workspace_djbihmp3mx6tye561rzgr";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return null;
}
