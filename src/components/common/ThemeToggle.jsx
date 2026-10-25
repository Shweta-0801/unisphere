import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`theme-toggle-btn ${className}`}
      title={isDark ? "Switch to Institutional Light Mode" : "Switch to Deep Obsidian Dark Mode"}
      aria-label="Toggle visual theme"
    >
      <div className={`theme-toggle-icon-wrap ${isDark ? "dark-active" : ""}`}>
        {isDark ? (
          <Sun size={17} className="theme-icon sun-icon" />
        ) : (
          <Moon size={17} className="theme-icon moon-icon" />
        )}
      </div>
      <span className="theme-toggle-label">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}