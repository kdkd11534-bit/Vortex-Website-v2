"use client"

import { motion } from "framer-motion"
import { Code2, Shield, Zap } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { TranslationKeys } from "@/lib/translations"

const features = [
  {
    icon: Code2,
    titleKey: "feature_lua_title" as keyof TranslationKeys,
    descKey: "feature_lua_desc" as keyof TranslationKeys,
  },
  {
    icon: Shield,
    titleKey: "feature_undetected_title" as keyof TranslationKeys,
    descKey: "feature_undetected_desc" as keyof TranslationKeys,
  },
  {
    icon: Zap,
    titleKey: "feature_injection_title" as keyof TranslationKeys,
    descKey: "feature_injection_desc" as keyof TranslationKeys,
  },
]

export function Features() {
  const { t } = useLanguage()
  return (
    <section id="features" className="relative px-6 py-28 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.03] blur-[150px]" />
      </div>

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20"
        >
          <Zap className="h-5 w-5 text-[#7c3aed]" />
        </motion.div>
        <h2 className="mb-3 text-3xl font-bold text-[#f2f2f2] sm:text-4xl text-balance">
          {t.features_title}
        </h2>
        <p className="mx-auto max-w-md text-base leading-relaxed text-[#555]">
          {t.features_subtitle}
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="feature-card-wrapper group"
            >
              <div className="feature-card-border" />
              <div className="feature-card-content">
                {/* Top gradient line on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:via-[#7c3aed]/40" />

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111114] ring-1 ring-[#1e1e22] transition-all duration-500 group-hover:ring-[#7c3aed]/30 group-hover:shadow-[0_0_25px_rgba(124,58,237,0.12)]">
                    <Icon className="h-5 w-5 text-[#7c3aed] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[#7c3aed]/0 blur-2xl transition-all duration-500 group-hover:bg-[#7c3aed]/[0.06]" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-[#f2f2f2]">
                  {t[feature.titleKey]}
                </h3>
                <p className="text-sm leading-relaxed text-[#555] transition-colors duration-500 group-hover:text-[#777]">
                  {t[feature.descKey]}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#7c3aed]/20 to-transparent" />
                  <span className="text-[10px] uppercase tracking-widest text-[#7c3aed]/50">{t.feature_active}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
