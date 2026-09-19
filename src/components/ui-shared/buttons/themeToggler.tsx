"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggler() {
  const transitioning = useRef(false);
  const { effectiveTheme, chooseTheme } = useTheme();

  const nextTheme = effectiveTheme === "dark" ? "light" : "dark";

  async function handleClick() {
    if (transitioning.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reduceMotion) {
      chooseTheme(nextTheme);
      return;
    }

    transitioning.current = true;
    document.documentElement.classList.add("theme-revealing");

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => chooseTheme(nextTheme));
      });

      await transition.finished;
    } finally {
      document.documentElement.classList.remove("theme-revealing");
      transitioning.current = false;
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} mode`}
      className="flex size-11 items-center justify-center rounded-full"
    >
      {effectiveTheme === "dark" ? (
        <Sun aria-hidden="true" size={20} />
      ) : (
        <Moon aria-hidden="true" size={20} />
      )}
    </button>
  );
}