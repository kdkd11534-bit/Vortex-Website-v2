"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Check, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

export default function LoginPage() {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-screen bg-[#0d0d0f]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1e]/60 backdrop-blur-2xl bg-[#0d0d0f]/70"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo_vortex.svg"
              alt="Vortex Logo"
              width={120}
              height={28}
              style={{ width: "auto", height: 28 }}
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg border border-[#2a2a2e] bg-[#161618] px-5 py-2 text-sm font-medium text-[#f2f2f2] transition-all duration-300 hover:border-[#7c3aed]/50 hover:bg-[#1a1a1e]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{t.hero_learn_more}</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.03] blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#7c3aed]/[0.02] blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid w-full max-w-[960px] grid-cols-1 overflow-hidden rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] lg:grid-cols-2"
        >
          {/* ─── Left side ─── */}
          <div className="flex flex-col justify-center p-10 lg:p-12">
            {/* Logo + brand */}
            <div className="mb-8 flex items-center gap-1">
              <Image
                src="/img/vortex.png"
                alt="Vortex"
                width={1536}
                height={1024}
                className="h-10 w-auto rounded-xl"
              />
              <span className="text-xl font-bold tracking-tight text-[#f2f2f2]">Vortex</span>
            </div>

            {/* Dashboard heading */}
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.login_dashboard}
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-[#777]">
              {t.login_dashboard_desc}
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[t.login_benefit_1, t.login_benefit_2, t.login_benefit_3].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20">
                    <Check className="h-3 w-3 text-[#7c3aed]" />
                  </div>
                  <span className="text-sm text-[#bbb]">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Divider ─── */}
          <div className="hidden lg:block lg:absolute lg:left-1/2 lg:top-8 lg:bottom-8 lg:w-px lg:bg-[#1e1e22]" />

          {/* ─── Right side ─── */}
          <div className="flex flex-col justify-center border-t border-[#1e1e22] p-10 lg:border-t-0 lg:border-l lg:border-[#1e1e22] lg:p-12">
            {/* Sign in title */}
            <h2 className="mb-2 text-lg font-bold text-[#f2f2f2]">
              {t.login_sign_in}
            </h2>
            <p className="mb-8 text-sm text-[#666]">
              {t.login_sign_in_desc}
            </p>

            {/* Discord button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a855f7] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:from-[#6d28d9] hover:to-[#9333ea] hover:shadow-lg hover:shadow-[#7c3aed]/25"
            >
              {/* Discord SVG icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
              </svg>
              {t.login_discord_btn}
            </motion.button>

            {/* Info box */}
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#7c3aed]/10 bg-[#7c3aed]/[0.04] px-5 py-4">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7c3aed]" />
              <p className="text-sm leading-relaxed text-[#888]">
                {t.login_no_account}{" "}
                <Link href="/price" className="font-medium text-[#7c3aed] hover:underline">
                  {t.login_purchase_link}
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px w-full bg-[#1e1e22]" />

            {/* Terms agreement */}
            <p className="text-center text-xs leading-relaxed text-[#555]">
              {t.login_agree}{" "}
              <Link href="/terms-of-service" className="text-[#777] hover:text-[#aaa] hover:underline">
                {t.nav_tos}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
