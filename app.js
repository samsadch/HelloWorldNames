/**
 * app.js — NameDrop
 * Handles: light/dark theme toggle with localStorage persistence
 * Runs synchronously to prevent FOUC (Flash of Unstyled Content)
 */

(function () {
  const STORAGE_KEY = "namedrop-theme";
  const html = document.documentElement;
  const THEMES = { LIGHT: "light", DARK: "dark" };

  // ── Apply saved theme immediately (prevents FOUC) ──────────
  const saved = localStorage.getItem(STORAGE_KEY) || THEMES.LIGHT;
  html.setAttribute("data-theme", saved);

  // ── Wire up the toggle button after DOM is ready ───────────
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    if (!toggleBtn || !themeIcon) return;

    function applyTheme(theme) {
      html.setAttribute("data-theme", theme);
      localStorage.setItem(STORAGE_KEY, theme);
      themeIcon.textContent = theme === THEMES.DARK ? "🌙" : "☀️";
      toggleBtn.setAttribute(
        "aria-label",
        theme === THEMES.DARK ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    // Init icon from current theme
    applyTheme(html.getAttribute("data-theme") || THEMES.LIGHT);

    toggleBtn.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      applyTheme(current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
    });
  });
})();
