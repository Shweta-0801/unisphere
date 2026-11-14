import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function LanguageSelector({ className = "", dropDirection = "down" }) {
  const { lang, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div
      className={`lang-selector-root ${dropDirection === "up" ? "drop-up" : "drop-down"} ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lang-selector-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        <Globe size={15} className="lang-globe-icon" />
        <span className="lang-code-text">{currentLang.code.toUpperCase()}</span>
        <ChevronDown size={13} className={`lang-chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="listbox">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`lang-dropdown-item ${item.code === lang ? "active" : ""}`}
              role="option"
              aria-selected={item.code === lang}
            >
              <span className="lang-flag">{item.flag}</span>
              <span className="lang-name">{item.name}</span>
              {item.code === lang && <Check size={14} className="lang-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}