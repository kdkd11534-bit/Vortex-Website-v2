"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, ArrowRight, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "./language-provider"

export function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { t } = useLanguage()

  const handleSend = async () => {
    if (!email || !email.includes("@")) {
      setError(t.footer_invalid_email)
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setSent(true)
        setTimeout(() => {
          setIsOpen(false)
          setSent(false)
          setEmail("")
        }, 2500)
      } else {
        setError(t.footer_send_error)
      }
    } catch {
      setError(t.footer_network_error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative px-6 pb-12 pt-20">
      {/* Email Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
            <div className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] shadow-[0_0_80px_rgba(124,58,237,0.12)]">

              {/* Top gradient accent bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2e] bg-[#111114] text-[#555] transition-all duration-200 hover:border-[#444] hover:text-[#fff]"
              >
                <X className="h-4 w-4" />
              </button>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 px-8 py-14"
                >
                  {/* Success icon with animated ring */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10 ring-1 ring-[#22c55e]/20 shadow-[0_0_25px_rgba(34,197,94,0.15)]"
                    >
                      <motion.svg
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="h-7 w-7 text-[#22c55e] drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 rounded-full ring-1 ring-[#22c55e]/25"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.3 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.6, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 rounded-full ring-1 ring-[#22c55e]/15"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#f2f2f2]">{t.footer_youre_in}</p>
                    <p className="mt-1 text-sm text-[#666]">{t.footer_notify_launch}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="px-8 pb-8 pt-10">
                  {/* Header icon */}
                  <div className="mb-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Bell className="h-5 w-5 text-[#7c3aed] drop-shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
                        className="absolute inset-0 rounded-full ring-1 ring-[#7c3aed]/25"
                      />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[#f2f2f2]">{t.footer_get_notified}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#555]">
                      {t.footer_be_first}
                    </p>
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col gap-3">
                    <div className="group relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#444] transition-colors group-focus-within:text-[#7c3aed]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError("") }}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="your@email.com"
                        className="w-full rounded-xl border border-[#1e1e22] bg-[#111114] py-3.5 pl-11 pr-4 text-sm text-[#f2f2f2] placeholder-[#444] outline-none transition-all duration-300 focus:border-[#7c3aed]/50 focus:bg-[#131316] focus:shadow-[0_0_20px_rgba(124,58,237,0.08)]"
                      />
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400"
                      >{error}</motion.p>
                    )}

                    <motion.button
                      onClick={handleSend}
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.97 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c3aed] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6d28d9] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          <span>{t.footer_subscribe}</span>
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </motion.button>

                    <p className="mt-1 text-center text-[10px] text-[#333]">
                      {t.footer_no_spam}
                    </p>
                  </div>
                </div>
              )}
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="mx-auto mb-16 h-px max-w-4xl bg-gradient-to-r from-transparent via-[#2a2a2e] to-transparent" />

      <div className="mx-auto max-w-4xl">
        {/* CTA area */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-lg font-medium text-[#666]">
            {t.footer_stay_tuned}
          </p>
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(124,58,237,0.25)" }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/10 px-8 py-3.5 text-sm font-semibold text-[#f2f2f2] backdrop-blur-sm transition-all duration-300 hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/15"
          >
            {/* Shine sweep */}
            <span className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-all duration-500 group-hover:left-full" />
            <span className="relative flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#a78bfa]" />
              {t.footer_get_notified}
              <ArrowRight className="h-3.5 w-3.5 text-[#a78bfa] transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6">
          {/* Links row */}
          <div className="flex items-center gap-6">
            <Link
              href="/price"
              className="text-xs font-medium text-[#444] transition-colors duration-200 hover:text-[#aaa]"
            >
              {t.nav_pricing}
            </Link>
            <span className="h-3 w-px bg-[#222]" />
            <Link
              href="/privacy-policy"
              className="text-xs font-medium text-[#444] transition-colors duration-200 hover:text-[#aaa]"
            >
              {t.nav_privacy}
            </Link>
            <span className="h-3 w-px bg-[#222]" />
            <Link
              href="/terms-of-service"
              className="text-xs font-medium text-[#444] transition-colors duration-200 hover:text-[#aaa]"
            >
              {t.nav_tos}
            </Link>
          </div>
          {/* Logo / copyright / susano row */}
          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <Image
              src="/img/logo_vortex.svg"
              alt="Vortex Logo"
              width={100}
              height={24}
              style={{ width: "auto", height: 24 }}
              className="opacity-40 transition-opacity duration-300 hover:opacity-100"
            />
            <p className="text-[11px] text-[#333]">
              {t.footer_rights}
            </p>
            <Image
              src="/img/susanologo.png"
              alt="Susano Logo"
              width={28}
              height={28}
              style={{ width: 28, height: 28 }}
              className="rounded-full opacity-40 transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
