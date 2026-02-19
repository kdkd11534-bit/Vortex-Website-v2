"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { Locale } from "@/lib/translations"

export function LanguageSelector() {
  const { locale, setLocale, supportedLocales, localeNames } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a2a2e] bg-[#161618] text-[#888] transition-all duration-300 hover:border-[#7c3aed]/50 hover:text-[#f2f2f2]"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-50 mt-2 max-h-[320px] w-44 overflow-y-auto rounded-xl border border-[#1e1e22] bg-[#0c0c0e] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="p-1.5">
              {supportedLocales.map((loc: Locale) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                    locale === loc
                      ? "bg-[#7c3aed]/10 text-[#a78bfa]"
                      : "text-[#888] hover:bg-[#111114] hover:text-[#f2f2f2]"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#555]">
                    {loc}
                  </span>
                  <span className="truncate">{localeNames[loc]}</span>
                  {locale === loc && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
