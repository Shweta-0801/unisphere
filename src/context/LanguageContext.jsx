import { createContext, useContext, useState, useEffect } from "react";
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

  // Nested dot-notation helper with parameter interpolation
  // Usage: t("attendance.coursesSafe", "{safe} of {total} Courses Safe", { safe: 4, total: 5 })
  const t = (path, fallback = "", params = {}) => {
    let actualFallback = fallback;
    let actualParams = params;

    if (typeof fallback === "object" && fallback !== null) {
      actualParams = fallback;
      actualFallback = "";
    }

    const keys = (path || "").split(".");
    let current = translations[lang];

    for (const key of keys) {
      if (!current || typeof current !== "object") {
        current = undefined;
        break;
      }
      current = current[key];
    }

    // Fallback cascade: Current language -> English dictionary -> fallback string -> key
    if (current === undefined || current === null) {
      let fallbackVal = translations["en"];
      for (const fbKey of keys) {
        if (!fallbackVal || typeof fallbackVal !== "object") {
          fallbackVal = undefined;
          break;
        }
        fallbackVal = fallbackVal[fbKey];
      }
      current = fallbackVal;
    }

    let result = (typeof current === "string" ? current : actualFallback) || path;

    // Parameter interpolation: replace {key} with params[key]
    if (actualParams && typeof actualParams === "object") {
      Object.keys(actualParams).forEach((paramKey) => {
        result = String(result).replace(
          new RegExp(`\\{${paramKey}\\}`, "g"),
          actualParams[paramKey] !== undefined ? actualParams[paramKey] : ""
        );
      });
    }

    return result;
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