"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Shield, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

const LAST_UPDATED = "February 18, 2026"

export default function PrivacyPolicyPage() {
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
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#features"
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
            >
              {t.nav_features}
            </Link>
            <Link
              href="/price"
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
            >
              {t.nav_pricing}
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm text-[#f2f2f2] transition-colors duration-200"
            >
              {t.nav_privacy}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm text-[#888] transition-colors duration-200 hover:text-[#f2f2f2]"
            >
              {t.nav_tos}
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
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20"
          >
            <Shield className="h-5 w-5 text-[#7c3aed]" />
          </motion.div>
          <h1 className="shimmer-text mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t.privacy_title}
          </h1>
          <p className="text-sm text-[#555]">{t.privacy_updated}: {LAST_UPDATED}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-10"
        >
          {/* Intro */}
          <section className="rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] p-8">
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_intro}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#999]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#7c3aed]" />
                <span>{t.privacy_intro_visit}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#7c3aed]" />
                <span>{t.privacy_intro_engage}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[#999]">
              {t.privacy_intro_questions}
            </p>
          </section>

          {/* Summary of Key Points */}
          <section className="rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] p-8">
            <h2 className="mb-4 text-lg font-bold text-[#f2f2f2]">{t.privacy_summary_title}</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-[#999]">
              <li><strong className="text-[#ccc]">{t.privacy_summary_q1}</strong> {t.privacy_summary_a1}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q2}</strong> {t.privacy_summary_a2}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q3}</strong> {t.privacy_summary_a3}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q4}</strong> {t.privacy_summary_a4}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q5}</strong> {t.privacy_summary_a5}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q6}</strong> {t.privacy_summary_a6}</li>
              <li><strong className="text-[#ccc]">{t.privacy_summary_q7}</strong> {t.privacy_summary_a7}</li>
            </ul>
          </section>

          {/* Section 1 */}
          <Section number={1} title={t.privacy_s1_title}>
            <p className="mb-4 text-sm font-medium text-[#ccc]">{t.privacy_s1_personal}</p>
            <ul className="mb-4 space-y-2 text-sm text-[#999]">
              <BulletItem>{t.privacy_s1_b1}</BulletItem>
              <BulletItem>{t.privacy_s1_b2}</BulletItem>
              <BulletItem>{t.privacy_s1_b3}</BulletItem>
            </ul>
            <p className="text-sm text-[#999]">{t.privacy_s1_sensitive}</p>
            <p className="mt-3 text-sm text-[#999]">{t.privacy_s1_payment}</p>
          </Section>

          {/* Section 2 */}
          <Section number={2} title={t.privacy_s2_title}>
            <ul className="space-y-2 text-sm text-[#999]">
              <BulletItem>{t.privacy_s2_b1}</BulletItem>
              <BulletItem>{t.privacy_s2_b2}</BulletItem>
              <BulletItem>{t.privacy_s2_b3}</BulletItem>
              <BulletItem>{t.privacy_s2_b4}</BulletItem>
              <BulletItem>{t.privacy_s2_b5}</BulletItem>
              <BulletItem>{t.privacy_s2_b6}</BulletItem>
            </ul>
          </Section>

          {/* Section 3 */}
          <Section number={3} title={t.privacy_s3_title}>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>{t.privacy_s3_consent}</li>
              <li>{t.privacy_s3_legitimate}</li>
              <li>{t.privacy_s3_legal}</li>
            </ul>
          </Section>

          {/* Section 4 */}
          <Section number={4} title={t.privacy_s4_title}>
            <ul className="space-y-2 text-sm text-[#999]">
              <BulletItem>{t.privacy_s4_b1}</BulletItem>
              <BulletItem>{t.privacy_s4_b2}</BulletItem>
              <BulletItem>{t.privacy_s4_b3}</BulletItem>
            </ul>
          </Section>

          {/* Section 5 */}
          <Section number={5} title={t.privacy_s5_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s5_content}
            </p>
          </Section>

          {/* Section 6 */}
          <Section number={6} title={t.privacy_s6_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s6_content}
            </p>
          </Section>

          {/* Section 7 */}
          <Section number={7} title={t.privacy_s7_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s7_content}
            </p>
          </Section>

          {/* Section 8 */}
          <Section number={8} title={t.privacy_s8_title}>
            <p className="mb-4 text-sm leading-relaxed text-[#999]">
              {t.privacy_s8_intro}
            </p>
            <ul className="mb-4 space-y-2 text-sm text-[#999]">
              <BulletItem>{t.privacy_s8_b1}</BulletItem>
              <BulletItem>{t.privacy_s8_b2}</BulletItem>
              <BulletItem>{t.privacy_s8_b3}</BulletItem>
              <BulletItem>{t.privacy_s8_b4}</BulletItem>
            </ul>
            <p className="text-sm text-[#999]">
              {t.privacy_s8_contact}{" "}
              <a href="mailto:vortexsale@outlook.com" className="text-[#7c3aed] hover:underline">vortexsale@outlook.com</a>.
            </p>
          </Section>

          {/* Section 9 */}
          <Section number={9} title={t.privacy_s9_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s9_content}
            </p>
          </Section>

          {/* Section 10 */}
          <Section number={10} title={t.privacy_s10_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s10_content}
            </p>
          </Section>

          {/* Section 11 */}
          <Section number={11} title={t.privacy_s11_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s11_content}
            </p>
          </Section>

          {/* Section 12 */}
          <Section number={12} title={t.privacy_s12_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s12_content}
            </p>
          </Section>

          {/* Section 13 */}
          <Section number={13} title={t.privacy_s13_title}>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:vortexsale@outlook.com"
                className="flex items-center gap-3 rounded-xl border border-[#1e1e22] bg-[#111114] px-5 py-3.5 text-sm text-[#999] transition-all duration-300 hover:border-[#7c3aed]/30 hover:text-[#f2f2f2]"
              >
                <Mail className="h-4 w-4 text-[#7c3aed]" />
                vortexsale@outlook.com
              </a>
              <a
                href="https://discord.gg/RvgCN5BcWH"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-[#1e1e22] bg-[#111114] px-5 py-3.5 text-sm text-[#999] transition-all duration-300 hover:border-[#7c3aed]/30 hover:text-[#f2f2f2]"
              >
                <MessageCircle className="h-4 w-4 text-[#7c3aed]" />
                discord.gg/RvgCN5BcWH
              </a>
            </div>
          </Section>

          {/* Section 14 */}
          <Section number={14} title={t.privacy_s14_title}>
            <p className="text-sm leading-relaxed text-[#999]">
              {t.privacy_s14_content}
            </p>
          </Section>
        </motion.div>
      </div>

      {/* Footer */}
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

/* ─── Reusable components ─── */

function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] p-8">
      <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-[#f2f2f2]">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-xs font-bold text-[#7c3aed] ring-1 ring-[#7c3aed]/20">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#7c3aed]" />
      <span>{children}</span>
    </li>
  )
}
