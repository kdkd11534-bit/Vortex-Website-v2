"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Check, Shield, Lock, Unlock, Terminal, Zap } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "./language-provider"

const antiCheats = [
  { name: "ElectronAC", logo: "/img/electron.png", invert: false },
  { name: "Waveshield", logo: "/img/waveshield.png", invert: false },
  { name: "FiveGuard", logo: "/img/fiveguard.svg", invert: false },
  { name: "ReaperAC", logo: "/img/reaperac.png", invert: false },
]

const codeLines = [
  { text: "local vortex = require", highlight: "('vortex.core')", delay: 0 },
  { text: "vortex:init", highlight: "({ stealth = true })", delay: 0.15 },
  { text: "vortex:bypass", highlight: "('*')", delay: 0.3 },
]

export function AnimationSection() {
  const [phase, setPhase] = useState<"idle" | "injecting" | "bypassing" | "done">("idle")
  const [currentAc, setCurrentAc] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [cycle, setCycle] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()



  useEffect(() => {
    if (!hasStarted) return

    setPhase("idle")
    setCurrentAc(0)
    setProgressWidth(0)

    const timer1 = setTimeout(() => setPhase("injecting"), 500)
    const timer2 = setTimeout(() => {
      setPhase("bypassing")
      setProgressWidth(5)
    }, 2000)

    const acTimers = antiCheats.map((_, i) =>
      setTimeout(() => {
        setCurrentAc(i + 1)
        setProgressWidth(((i + 1) / antiCheats.length) * 100)
      }, 2600 + i * 1000)
    )

    const timerDone = setTimeout(
      () => setPhase("done"),
      2600 + antiCheats.length * 1000 + 500
    )

    const timerRestart = setTimeout(() => {
      setCycle((c) => c + 1)
    }, 2600 + antiCheats.length * 1000 + 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      acTimers.forEach(clearTimeout)
      clearTimeout(timerDone)
      clearTimeout(timerRestart)
    }
  }, [hasStarted, cycle])

  const isDone = phase === "done"

  return (
    <section ref={sectionRef} className="relative px-6 py-32 overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c3aed]/[0.03] blur-[180px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22c55e]/[0.04] blur-[180px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20"
          >
            <Terminal className="h-5 w-5 text-[#7c3aed]" />
          </motion.div>
          <h2 className="text-balance text-4xl font-bold tracking-tight text-[#f2f2f2] sm:text-5xl">
            {t.animation_title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-[#555]">
            {t.animation_subtitle}
          </p>
        </motion.div>

        {/* Main terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            if (!hasStarted) setHasStarted(true)
          }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Outer glow behind card */}
          <motion.div
            animate={{
              background: isDone
                ? "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)",
            }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute -inset-8 blur-2xl"
          />

          {/* Animated border wrapper */}
          <motion.div
            animate={{
              borderColor: isDone ? "rgba(34,197,94,0.2)" : "rgba(26,26,30,1)",
            }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl border"
          >
            {/* Top accent gradient */}
            <motion.div
              animate={{
                background: isDone
                  ? "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
              }}
              className="absolute inset-x-0 top-0 h-[1px]"
            />

            <div
              ref={cardRef}
              className="relative overflow-hidden rounded-2xl bg-[#08080a]"
            >

              {/* Scanlines */}
              <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.012]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)" }} />

              {/* Title bar — macOS style */}
              <div className="flex items-center justify-between border-b border-[#111114] bg-[#0a0a0c] px-5 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                  <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                  <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
                </div>
                <div className="flex items-center gap-2.5 rounded-md bg-[#111114] px-3 py-1">
                  <motion.div
                    animate={{
                      color: isDone ? "#22c55e" : phase === "idle" ? "#333" : "#7c3aed",
                    }}
                  >
                    <Zap className="h-3 w-3" />
                  </motion.div>
                  <span className="font-mono text-[11px] font-medium text-[#555]">vortex.lua</span>
                </div>
                <div className="w-14" />
              </div>

              <div className="px-6 py-8 sm:px-10 sm:py-10">

                {/* Code preview block */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-8 rounded-xl border border-[#111114] bg-[#0b0b0d] p-5"
                >
                  <div className="space-y-2 font-mono text-[12px] leading-relaxed">
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: line.delay + 0.3, duration: 0.4 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-4 select-none text-right text-[10px] text-[#2a2a2e]">{i + 1}</span>
                        <span className="text-[#555]">{line.text}<span className="text-[#7c3aed]/70">{line.highlight}</span></span>
                      </motion.div>
                    ))}
                    {/* Cursor blink */}
                    <div className="flex items-center gap-3">
                      <span className="w-4 select-none text-right text-[10px] text-[#2a2a2e]">4</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block h-3.5 w-[6px] bg-[#7c3aed]/50"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Terminal status panel */}
                <div className="mb-8">
                  <div className="mx-auto max-w-lg overflow-hidden rounded-xl border border-[#111114] bg-[#0b0b0d]">
                    {/* Status header */}
                    <div className="flex items-center justify-between border-b border-[#111114] px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            backgroundColor: isDone ? "#22c55e" : phase !== "idle" ? "#7c3aed" : "#222",
                            boxShadow: isDone
                              ? "0 0 10px rgba(34,197,94,0.5)"
                              : phase !== "idle"
                              ? "0 0 10px rgba(124,58,237,0.5)"
                              : "none",
                          }}
                          className="h-1.5 w-1.5 rounded-full"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#333]">
                          {phase === "idle" ? "ready" : phase === "injecting" ? "injecting" : phase === "bypassing" ? "bypassing" : "complete"}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#222]">
                        {currentAc}/{antiCheats.length}
                      </span>
                    </div>

                    {/* Status content */}
                    <div className="px-4 py-3.5">
                      <div className="font-mono text-xs">
                        {phase === "idle" && (
                          <span className="text-[#333]">
                            <span className="text-[#444]">~/vortex $</span> <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-[#555]">_</motion.span>
                          </span>
                        )}
                        {phase === "injecting" && (
                          <motion.span
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="text-[#a78bfa]"
                          >
                            {t.animation_injecting}
                          </motion.span>
                        )}
                        {phase === "bypassing" && (
                          <div className="flex items-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="inline-block text-[#7c3aed]"
                            >
                              ⟳
                            </motion.span>
                            <motion.span
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                              className="text-[#a78bfa]"
                            >
                              {t.animation_bypassing} {antiCheats[Math.min(currentAc, antiCheats.length - 1)].name.toLowerCase()}...
                            </motion.span>
                          </div>
                        )}
                        {phase === "done" && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 font-semibold text-[#22c55e]"
                          >
                            <Check className="h-3.5 w-3.5" /> {t.animation_done}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    {(phase === "bypassing" || phase === "done") && (
                      <div className="px-4 pb-3.5">
                        <div className="h-1 overflow-hidden rounded-full bg-[#111114]">
                          <motion.div
                            animate={{ width: `${progressWidth}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{
                              background: isDone
                                ? "linear-gradient(90deg, #22c55e, #4ade80)"
                                : "linear-gradient(90deg, #7c3aed, #a78bfa)",
                              boxShadow: isDone
                                ? "0 0 12px rgba(34,197,94,0.4)"
                                : "0 0 12px rgba(124,58,237,0.4)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Anti-cheat grid — relative wrapper for overlay */}
                <div className="relative">
                <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
                  {antiCheats.map((ac, i) => {
                    const bypassed = currentAc > i
                    const isActive = currentAc === i && phase === "bypassing"

                    return (
                      <motion.div
                        key={ac.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 * i }}
                        className="relative"
                      >
                        {/* Active card outer glow */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pointer-events-none absolute -inset-2 rounded-2xl bg-[#7c3aed]/[0.04] blur-xl"
                          />
                        )}
                        {bypassed && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="pointer-events-none absolute -inset-2 rounded-2xl bg-emerald-500/[0.03] blur-xl"
                          />
                        )}

                        <motion.div
                          animate={{
                            borderColor: bypassed
                              ? "rgba(34,197,94,0.15)"
                              : isActive
                              ? "rgba(124,58,237,0.25)"
                              : "rgba(17,17,20,1)",
                            backgroundColor: bypassed
                              ? "rgba(34,197,94,0.02)"
                              : isActive
                              ? "rgba(124,58,237,0.02)"
                              : "rgba(11,11,13,1)",
                          }}
                          transition={{ duration: 0.4 }}
                          className="relative flex items-center gap-3.5 overflow-hidden rounded-xl border p-4"
                        >
                          {/* Scan sweep when active */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#7c3aed]/[0.05] to-transparent"
                              />
                            )}
                          </AnimatePresence>

                          {/* Top accent on active/bypassed */}
                          <motion.div
                            animate={{
                              opacity: bypassed ? 1 : isActive ? 1 : 0,
                              background: bypassed
                                ? "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)"
                                : "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
                            }}
                            className="absolute inset-x-0 top-0 h-[1px]"
                          />

                          {/* Logo */}
                          <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#141416] bg-[#0e0e10]">
                            <motion.div
                              animate={{
                                opacity: bypassed ? 0.12 : isActive ? 1 : 0.3,
                                scale: isActive ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Image
                                src={ac.logo}
                                alt={ac.name}
                                width={24}
                                height={24}
                                style={{ width: 24, height: 24 }}
                                className="object-contain"
                                style={ac.name === "Waveshield" ? { filter: "brightness(0) invert(1)" } : undefined}
                              />
                            </motion.div>
                            {/* Checkmark overlay */}
                            <AnimatePresence>
                              {bypassed && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#22c55e]/15 backdrop-blur-[2px]"
                                >
                                  <Check className="h-4 w-4 text-[#22c55e] drop-shadow-[0_0_4px_rgba(34,197,94,0.5)]" strokeWidth={3} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-[#ccc]">{ac.name}</p>
                            <div className="mt-1 flex items-center gap-1.5">
                              <motion.div
                                animate={{
                                  backgroundColor: bypassed ? "#22c55e" : isActive ? "#7c3aed" : "#222",
                                  boxShadow: bypassed
                                    ? "0 0 6px rgba(34,197,94,0.6)"
                                    : isActive
                                    ? "0 0 6px rgba(124,58,237,0.6)"
                                    : "none",
                                }}
                                className="h-1 w-1 rounded-full"
                              />
                              <span className={`font-mono text-[10px] uppercase tracking-wider ${
                                bypassed ? "text-[#22c55e]/70" : isActive ? "text-[#a78bfa]" : "text-[#333]"
                              }`}>
                                {bypassed ? t.animation_bypassed : isActive ? t.animation_scanning : t.animation_queued}
                              </span>
                            </div>
                          </div>

                          {/* Status icon */}
                          <motion.div
                            animate={{
                              color: bypassed ? "#22c55e" : isActive ? "#7c3aed" : "#1a1a1e",
                            }}
                            className="flex-shrink-0"
                          >
                            {bypassed ? (
                              <Unlock className="h-3.5 w-3.5 drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
                            ) : (
                              <Lock className="h-3.5 w-3.5" />
                            )}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Success overlay — floats on top of the grid */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="absolute inset-0 z-30 flex items-center justify-center"
                    >
                      {/* Backdrop blur over grid */}
                      <div className="absolute inset-0 rounded-xl bg-[#08080a]/80 backdrop-blur-md" />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex flex-col items-center gap-3"
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                          className="relative"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22c55e]/10 ring-1 ring-[#22c55e]/20 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                            <Shield className="h-6 w-6 text-[#22c55e] drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                          </div>
                          {/* Pulse ring */}
                          <motion.div
                            initial={{ scale: 1, opacity: 0.4 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            className="absolute inset-0 rounded-2xl ring-1 ring-[#22c55e]/20"
                          />
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#22c55e]"
                        >
                          {t.animation_fully_undetected}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.65 }}
                          className="text-[13px] text-[#555]"
                        >
                          {t.animation_all_bypassed.replace("{count}", String(antiCheats.length))}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
