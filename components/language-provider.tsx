"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type Locale, type TranslationKeys, getTranslations, detectLocale, SUPPORTED_LOCALES, LOCALE_NAMES } from "@/lib/translations"

type LanguageContextType = {
  locale: Locale
  t: TranslationKeys
  setLocale: (locale: Locale) => void
  supportedLocales: typeof SUPPORTED_LOCALES
  localeNames: typeof LOCALE_NAMES
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check localStorage first for user preference
    const saved = localStorage.getItem("vortex-lang") as Locale | null
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      setLocaleState(saved)
    } else {
      // Auto-detect from browser
      const detected = detectLocale()
      setLocaleState(detected)
      localStorage.setItem("vortex-lang", detected)
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("vortex-lang", newLocale)
  }

  const t = getTranslations(locale)

  // Prevent flash of wrong language
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          locale: "en",
          t: getTranslations("en"),
          setLocale,
          supportedLocales: SUPPORTED_LOCALES,
          localeNames: LOCALE_NAMES,
        }}
      >
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t,
        setLocale,
        supportedLocales: SUPPORTED_LOCALES,
        localeNames: LOCALE_NAMES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
