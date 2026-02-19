"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "./language-provider"
import { LanguageSelector } from "./language-selector"

export function Header() {
  const { t } = useLanguage()
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1e]/60 backdrop-blur-2xl bg-[#0d0d0f]/70"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Left - Vortex logo */}
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

        {/* Center - Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
          >
            {t.nav_features}
          </Link>
          <Link
            href="#anti-cheat"
            className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
          >
            {t.nav_anticheats}
          </Link>
          <Link
            href="#preview"
            className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
          >
            {t.nav_preview}
          </Link>
          <Link
            href="/price"
            className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
          >
            {t.nav_pricing}
          </Link>
        </nav>

        {/* Right - Exclusive badge + Login */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[11px] uppercase tracking-widest text-[#555]">
              {t.header_exclusive_for}
            </span>
            <Image
              src="/img/susanologo.png"
              alt="Susano"
              width={24}
              height={24}
              style={{ width: 24, height: 24 }}
              className="rounded-full"
            />
          </div>
          <LanguageSelector />
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-[#2a2a2e] bg-[#161618] px-5 py-2 text-sm font-medium text-[#f2f2f2] transition-all duration-300 hover:border-[#7c3aed]/50 hover:bg-[#1a1a1e]"
            >
              {t.header_login}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
