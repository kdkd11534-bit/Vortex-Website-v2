"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "./language-provider"

const antiCheats = [
  { name: "ElectronAC", logo: "/img/electron.png", invert: false, delay: 0 },
  { name: "Waveshield", logo: "/img/waveshield.png", invert: false, delay: 0.1 },
  { name: "FiveGuard", logo: "/img/fiveguard.svg", invert: false, delay: 0.2 },
  { name: "ReaperAC", logo: "/img/reaperac.png", invert: false, delay: 0.3 },
]

export function AntiCheatSection() {
  const { t } = useLanguage()

  return (
    <section id="anti-cheat" className="relative px-6 py-32 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Central glow */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.03] blur-[200px]" />
        {/* Emerald accent glow */}
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.02] blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20"
          >
            <svg className="h-5 w-5 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </motion.div>
          <h2 className="mb-3 text-3xl font-bold text-[#f2f2f2] sm:text-4xl text-balance">
            {t.anticheat_title}
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#666]">
            {t.anticheat_subtitle}
          </p>
        </motion.div>

        {/* Animated status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-14 flex items-center justify-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-500/80">
            {t.anticheat_all_undetected}
          </span>
        </motion.div>

        {/* Anti-cheat cards grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {antiCheats.map((ac) => (
            <motion.div
              key={ac.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: ac.delay,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="ac-card-wrapper group"
            >
              <div className="ac-card-border" />
              <div className="ac-card-content">
                {/* Top line accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:via-[#7c3aed]/40" />

                {/* Logo container */}
                <div className="relative mx-auto mb-5">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#111114] ring-1 ring-[#1e1e22] transition-all duration-500 group-hover:ring-[#7c3aed]/25 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.1)]">
                    <Image
                      src={ac.logo}
                      alt={ac.name}
                      width={44}
                      height={44}
                      style={ac.name === "Waveshield" ? { filter: "brightness(0) invert(1)", width: "auto", height: 44 } : { width: "auto", height: 44 }}
                      className="object-contain opacity-30 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                    />
                  </div>
                  <div className="pointer-events-none absolute -inset-3 rounded-2xl bg-[#7c3aed]/0 blur-2xl transition-all duration-500 group-hover:bg-[#7c3aed]/[0.08]" />
                </div>

                {/* Name */}
                <h3 className="mb-3 text-center text-[13px] font-semibold text-[#555] transition-colors duration-500 group-hover:text-[#f2f2f2]">
                  {ac.name}
                </h3>

                {/* Status */}
                <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-500/0 bg-emerald-500/[0.04] px-3 py-1.5 transition-all duration-500 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/[0.08]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-0 transition-opacity duration-500 group-hover:animate-ping group-hover:opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500/30 transition-all duration-500 group-hover:bg-emerald-400" />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-500/30 transition-colors duration-500 group-hover:text-emerald-300">
                    {t.anticheat_bypassed}
                  </span>
                </div>

                {/* Bottom accent */}
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:via-[#7c3aed]/15" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom connector line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 flex flex-col items-center gap-4"
        >
        </motion.div>
      </div>
    </section>
  )
}
