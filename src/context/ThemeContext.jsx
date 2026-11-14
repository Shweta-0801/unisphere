import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // 1. Initialize from localStorage or fallback to system preference
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("unisphere_theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  // 2. Apply data-theme attribute on <html> element on state change
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("unisphere_theme", theme);
    } catch (err) {
      console.warn("Unable to save theme to localStorage", err);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light",
      setTheme: () => {},
      toggleTheme: () => {},
      isDark: false
    };
  }
  return context;
}