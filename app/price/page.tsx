"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles, ArrowLeft, Crown, Flame, Zap, Star, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import type { Locale, TranslationKeys } from "@/lib/translations"

/* ─── Currency config per locale ─── */
const CURRENCY_MAP: Record<Locale, { symbol: string; rate: number; after?: boolean }> = {
  en: { symbol: "$", rate: 1.08 },
  fr: { symbol: "€", rate: 1 },
  es: { symbol: "€", rate: 1 },
  de: { symbol: "€", rate: 1 },
  pt: { symbol: "€", rate: 1 },
  it: { symbol: "€", rate: 1 },
  nl: { symbol: "€", rate: 1 },
  ru: { symbol: "₽", rate: 100 },
  zh: { symbol: "¥", rate: 7.8 },
  ja: { symbol: "¥", rate: 165 },
  tr: { symbol: "₺", rate: 35 },
  ar: { symbol: "د.إ", rate: 3.97, after: true },
  ko: { symbol: "₩", rate: 1430 },
  pl: { symbol: "zł", rate: 4.3, after: true },
}

/* ─── Base EUR prices per period ─── */
const MONTHLY_EUR = 19.99
const WEEKLY_EUR = +(MONTHLY_EUR / 4).toFixed(2)
const LIFETIME_EUR = 40
const ADDON_EUR = 10

function convertPrice(eurPrice: number, locale: Locale): string {
  const { rate } = CURRENCY_MAP[locale]
  const converted = eurPrice * rate
  // For large currencies, round to whole number
  if (rate >= 100) return Math.round(converted).toLocaleString()
  return converted.toFixed(2)
}

function formatPrice(amount: string, locale: Locale): string {
  const { symbol, after } = CURRENCY_MAP[locale]
  return after ? `${amount} ${symbol}` : `${symbol}${amount}`
}

type PlanCard = {
  period: "week" | "month" | "lifetime"
  nameKey: keyof TranslationKeys
  periodKey: keyof TranslationKeys
  eurPrice: number
  features: (keyof TranslationKeys)[]
  popular?: boolean
  icon: typeof Zap
}

const plans: PlanCard[] = [
  {
    period: "week",
    nameKey: "pricing_tab_week",
    periodKey: "pricing_per_week",
    eurPrice: WEEKLY_EUR,
    features: ["pricing_basic_f1", "pricing_basic_f2", "pricing_basic_f3", "pricing_basic_f4"],
    icon: Zap,
  },
  {
    period: "month",
    nameKey: "pricing_tab_month",
    periodKey: "pricing_per_month",
    eurPrice: MONTHLY_EUR,
    features: [
      "pricing_standard_f1",
      "pricing_standard_f2",
      "pricing_standard_f3",
      "pricing_standard_f4",
      "pricing_standard_f5",
    ],
    popular: true,
    icon: Crown,
  },
  {
    period: "lifetime",
    nameKey: "pricing_tab_lifetime",
    periodKey: "pricing_per_lifetime",
    eurPrice: LIFETIME_EUR,
    features: [
      "pricing_pro_f1",
      "pricing_pro_f2",
      "pricing_pro_f3",
      "pricing_pro_f4",
      "pricing_pro_f5",
      "pricing_pro_f6",
    ],
    icon: Star,
  },
]

export default function PricingPage() {
  const { t, locale } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)

  const addonDisplay = formatPrice(convertPrice(ADDON_EUR, locale), locale)

  return (
    <main className="relative min-h-screen bg-[#0d0d0f]">
      {/* Coming Soon Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] text-center shadow-[0_0_80px_rgba(124,58,237,0.12)]"
            >
              {/* Top gradient accent */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

              <button
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2e] bg-[#111114] text-[#555] transition-all duration-200 hover:border-[#444] hover:text-[#fff]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="px-8 py-10">
              <div className="mx-auto mb-4 flex items-center justify-center">
                <div className="relative h-14 w-14">
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/25 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                    >
                      <Sparkles className="h-6 w-6 text-[#7c3aed] drop-shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
                    className="absolute inset-0 rounded-full ring-1 ring-[#7c3aed]/25"
                  />
                </div>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#f2f2f2]">{t.pricing_coming_soon}</h3>
              <p className="mb-6 text-sm leading-relaxed text-[#666]">{t.pricing_coming_soon_desc}</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowPopup(false)}
                className="w-full rounded-xl bg-[#7c3aed] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6d28d9] hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]"
              >
                {t.pricing_coming_soon_ok}
              </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#features"
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
            >
              {t.nav_features}
            </Link>
            <Link
              href="/#anti-cheat"
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
            >
              {t.nav_anticheats}
            </Link>
            <Link
              href="/price"
              className="text-sm text-[#f2f2f2] transition-colors duration-200"
            >
              {t.nav_pricing}
            </Link>
          </nav>
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
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.06] blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.03] blur-[120px]" />
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20"
          >
            <Sparkles className="h-5 w-5 text-[#7c3aed]" />
          </motion.div>
          <h1 className="shimmer-text mb-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t.pricing_title}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#666]">
            {t.pricing_subtitle}
          </p>
        </motion.div>

        {/* 3 Plan Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const price = formatPrice(convertPrice(plan.eurPrice, locale), locale)
            return (
              <motion.div
                key={plan.nameKey}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-1.5 rounded-full bg-[#7c3aed] px-4 py-1"
                    >
                      <Crown className="h-3 w-3 text-white" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                        {t.pricing_popular}
                      </span>
                    </motion.div>
                  </div>
                )}

                <div
                  className={`relative overflow-hidden rounded-2xl border p-[1px] ${
                    plan.popular
                      ? "border-[#7c3aed]/40 shadow-[0_0_60px_rgba(124,58,237,0.15)]"
                      : "border-[#1e1e22]"
                  }`}
                >
                  {/* Animated border for popular */}
                  {plan.popular && (
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute"
                        style={{
                          top: "-50%",
                          left: "-50%",
                          width: "200%",
                          height: "200%",
                          background:
                            "conic-gradient(from 0deg, transparent 0%, transparent 30%, #7c3aed 45%, #a78bfa 55%, transparent 70%, transparent 100%)",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className={`relative z-10 flex flex-col rounded-[calc(1rem-1px)] p-8 ${
                      plan.popular ? "bg-[#0c0c0e]" : "bg-[#0c0c0e]"
                    }`}
                  >
                    {/* Top glow on hover */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:via-[#7c3aed]/40" />

                    {/* Icon + Name */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20 transition-all duration-500 group-hover:ring-[#7c3aed]/40 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                        <Icon className="h-4.5 w-4.5 text-[#7c3aed]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#f2f2f2]">
                        {t[plan.nameKey]}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#f2f2f2]">
                        {price}
                      </span>
                      <span className="text-sm text-[#555]">{t[plan.periodKey]}</span>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 flex flex-1 flex-col gap-3">
                      {plan.features.map((fKey) => (
                        <li key={fKey} className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/10">
                            <Check className="h-3 w-3 text-[#7c3aed]" />
                          </div>
                          <span className="text-sm leading-relaxed text-[#888]">
                            {t[fKey]}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPopup(true)}
                      className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-[#7c3aed] text-white hover:bg-[#6d28d9] hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]"
                          : "border border-[#2a2a2e] bg-[#111114] text-[#ccc] hover:border-[#7c3aed]/40 hover:text-[#f2f2f2]"
                      }`}
                    >
                      {t.pricing_get_started}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add-on Premium Card — Beta Tester Pack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mx-auto mt-12 max-w-5xl"
        >
          {/* Outer glow on hover */}
          <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7c3aed]/0 via-[#f97316]/0 to-[#7c3aed]/0 opacity-0 blur-xl transition-all duration-700 group-hover:from-[#7c3aed]/20 group-hover:via-[#f97316]/15 group-hover:to-[#7c3aed]/20 group-hover:opacity-100" />

          {/* Animated gradient border */}
          <div className="relative overflow-hidden rounded-2xl p-[1px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "conic-gradient(from 0deg, transparent 0%, #7c3aed 15%, #a78bfa 25%, #f97316 38%, #fb923c 50%, #f97316 62%, #a78bfa 75%, #7c3aed 85%, transparent 100%)",
              }}
            />

            <div className="relative z-10 overflow-hidden rounded-[calc(1rem-1px)] bg-[#0a0a0c]">
              {/* Top accent line */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-60" />

              {/* Background decorations */}
              <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-[#f97316]/[0.05] via-[#7c3aed]/[0.03] to-transparent blur-[120px]" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#7c3aed]/[0.04] blur-[100px]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316]/[0.02] blur-[80px]" />

              {/* Grid pattern overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.015]"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative px-8 py-10 sm:px-12 sm:py-12">
                {/* Header section */}
                <div className="mb-10 flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 via-[#f97316]/10 to-[#7c3aed]/20 ring-1 ring-[#f97316]/25 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                  >
                    <Flame className="h-7 w-7 text-[#f97316]" />
                  </motion.div>

                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-[#f97316]/15 to-[#7c3aed]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f97316] ring-1 ring-[#f97316]/20">
                        <Flame className="h-2.5 w-2.5" />
                        {t.pricing_addon_badge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#7c3aed]/[0.08] px-3 py-1 ring-1 ring-[#7c3aed]/15">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#f97316] shadow-[0_0_6px_rgba(249,115,22,0.6)] animate-pulse" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c4b5fd]">+{addonDisplay}</span>
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-2xl font-bold tracking-tight text-[#f2f2f2] sm:text-3xl">
                      {t.pricing_addon_name}
                    </h3>
                    <p className="max-w-lg text-sm leading-relaxed text-[#555]">
                      {t.pricing_addon_desc}
                    </p>
                  </div>
                </div>

                {/* Features grid */}
                <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {([
                    "pricing_addon_f1",
                    "pricing_addon_f2",
                    "pricing_addon_f3",
                    "pricing_addon_f4",
                    "pricing_addon_f5",
                  ] as (keyof TranslationKeys)[]).map((fKey, i) => (
                    <motion.div
                      key={fKey}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.07, duration: 0.5 }}
                      className="flex items-center gap-3 rounded-xl border border-[#1a1a1e]/60 bg-[#0e0e11]/80 px-4 py-3.5 transition-all duration-300 hover:border-[#f97316]/20 hover:bg-[#111114]"
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#f97316]/15 to-[#7c3aed]/15 ring-1 ring-[#f97316]/15">
                        <Check className="h-3.5 w-3.5 text-[#f97316]" />
                      </div>
                      <span className="text-[13px] font-medium leading-snug text-[#aaa]">
                        {t[fKey]}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center md:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowPopup(true)}
                    className="group/btn relative overflow-hidden rounded-xl px-10 py-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(249,115,22,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.2),0_0_0_1px_rgba(249,115,22,0.5)]"
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#f97316] opacity-90 transition-opacity duration-300 group-hover/btn:opacity-100" />
                    {/* Shine sweep on hover */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                    <span className="relative z-10 flex items-center gap-2.5">
                      <Flame className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                      {t.pricing_addon_add}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade + footer */}
      <div className="relative z-10 border-t border-[#1a1a1e]/40 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Image
            src="/img/logo_vortex.svg"
            alt="Vortex Logo"
            width={100}
            height={24}
            style={{ width: "auto", height: 24 }}
            className="opacity-50 transition-opacity duration-300 hover:opacity-100"
          />
          <p className="text-xs text-[#444]">{t.footer_rights}</p>
          <Image
            src="/img/susanologo.png"
            alt="Susano Logo"
            width={28}
            height={28}
            style={{ width: 28, height: 28 }}
            className="rounded-full opacity-50 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </div>
    </main>
  )
}
