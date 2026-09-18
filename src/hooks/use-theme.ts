"use client";

import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark" | "system";
type EffectiveTheme = "light" | "dark";

const STORAGE_KEY = "afterbuy-theme";
const THEME_CHANGE_EVENT = "afterbuy-theme-change";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

// Keeps the switcher working in this tab if browser storage is unavailable.
let fallbackTheme: Theme = "system";

function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return fallbackTheme;
  }
}

function subscribeToThemeChange(notifyReact: () => void) {
  window.addEventListener("storage", notifyReact);
  window.addEventListener(THEME_CHANGE_EVENT, notifyReact);

  return () => {
    window.removeEventListener("storage", notifyReact);
    window.removeEventListener(THEME_CHANGE_EVENT, notifyReact);
  };
}

function readThemeOnServer(): Theme {
  return "system";
}

function systemIsDark(): boolean {
  return window.matchMedia(DARK_MODE_QUERY).matches;
}

function subscribeToSystemTheme(notifyReact: () => void) {
  const query = window.matchMedia(DARK_MODE_QUERY);
  query.addEventListener("change", notifyReact);

  return () => query.removeEventListener("change", notifyReact);
}

function readSystemThemeOnServer(): boolean {
  return false;
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    readTheme,
    readThemeOnServer,
  );

  const isSystemDark = useSyncExternalStore(
    subscribeToSystemTheme,
    systemIsDark,
    readSystemThemeOnServer,
  );

  const effectiveTheme: EffectiveTheme =
    theme === "system" ? (isSystemDark ? "dark" : "light") : theme;

  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  function chooseTheme(choice: Theme) {
    fallbackTheme = choice;

    try {
      if (choice === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, choice);
      }
    } catch {
      // Browser storage is unavailable; use the in-memory theme.
    }

    if (choice === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.dataset.theme = choice;
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return { theme, effectiveTheme, chooseTheme };
}
