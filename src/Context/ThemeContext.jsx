import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

// ─────────────────────────────────────────────────────────────────────────────
// CIRCULAR REVEAL ANIMATION
// Edit duration/easing here only — applies globally everywhere
// ─────────────────────────────────────────────────────────────────────────────
const TRANSITION_CSS = `
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  ::view-transition-new(root) {
    clip-path: circle(0px at var(--vt-x, 50%) var(--vt-y, 50%));
    animation: nexus-theme-reveal 0.38s ease-out forwards;
  }

  ::view-transition-old(root) {
    z-index: -1;
  }

  @keyframes nexus-theme-reveal {
    to {
      clip-path: circle(var(--vt-r, 150vmax) at var(--vt-x, 50%) var(--vt-y, 50%));
    }
  }
`;

function injectTransitionStyles() {
  if (document.getElementById("nexus-theme-transition-styles")) return;
  const style = document.createElement("style");
  style.id = "nexus-theme-transition-styles";
  style.textContent = TRANSITION_CSS;
  document.head.appendChild(style);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "dark";
  });

  // Inject animation CSS once on mount
  useEffect(() => {
    injectTransitionStyles();
  }, []);

  // Apply theme class to html + body (Tailwind dark mode)
  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ── toggleTheme — accepts click event for circle origin ──────────────────
  const toggleTheme = (e) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    const x = e?.clientX ?? Math.round(window.innerWidth / 2);
    const y = e?.clientY ?? Math.round(window.innerHeight / 2);
    const r = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      ),
    );

    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => setTheme(newTheme));
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);