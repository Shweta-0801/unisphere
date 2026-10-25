import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, SUPPORTED_LANGUAGES } from "../utils/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("unisphere_lang");
      return translations[saved] ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("unisphere_lang", lang);
      document.documentElement.setAttribute("lang", lang);
    } catch (e) {
      console.warn("Unable to save language preference", e);
    }
  }, [lang]);

  // Nested dot-notation helper: t("nav.attendance", "Attendance Hub")
  const t = (path, fallback = "") => {
    const keys = path.split(".");
    let current = translations[lang];

    for (const key of keys) {
      if (!current || typeof current !== "object") {
        // Fallback to English if translation is missing
        let fallbackVal = translations["en"];
        for (const fbKey of keys) {
          if (!fallbackVal) break;
          fallbackVal = fallbackVal[fbKey];
        }
        return fallbackVal || fallback || path;
      }
      current = current[key];
    }
    return current || fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage: setLang,
        t,
        languages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "en",
      setLanguage: () => {},
      t: (path, fallback = "") => fallback || path,
      languages: SUPPORTED_LANGUAGES
    };
  }
  return context;
}