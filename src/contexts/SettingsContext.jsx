"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState("system");
  const [locale, setLocale] = useState("pt");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    const savedLocale = localStorage.getItem("locale") || "pt";
    
    setTheme(savedTheme);
    setLocale(savedLocale);
  }, []);

  // Apply theme to document (sincronizar com o script inline)
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    
    // Garantir que o tema seja preservado ao trocar idioma
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, '') || '/';
      // Forçar salvamento do tema antes da navegação
      localStorage.setItem("theme", theme);
      window.location.href = `/${newLocale}${currentPath}`;
    }
  };

  return (
    <SettingsContext.Provider value={{
      theme,
      locale,
      changeTheme,
      changeLocale
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
} 