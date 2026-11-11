export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "ap.theme";
export const DEFAULT_THEME: Theme = "dark";

/** Background colors for the browser UI (`theme-color`), matching --canvas. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#020618", light: "#f8fafc" };

/**
 * Runs synchronously in <head> before first paint, so a saved light-theme
 * preference never flashes dark (see Next docs: "Preventing flash before hydration").
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t!=="light"&&t!=="dark")t=${JSON.stringify(
  DEFAULT_THEME,
)};var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;}catch(e){}})()`;
