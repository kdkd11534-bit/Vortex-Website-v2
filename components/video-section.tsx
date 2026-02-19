"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Play, X, Clock } from "lucide-react"
import { useLanguage } from "./language-provider"

export function VideoSection() {
  const [showPopup, setShowPopup] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  // Track scroll progress: 0 = section enters bottom, 1 = section fully visible
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  // Map scroll progress to 3D values
  const rotateX = useTransform(scrollYProgress, [0, 1], [40, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={sectionRef} id="preview" className="relative px-6 py-28">
      {/* Coming Soon Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] shadow-[0_0_80px_rgba(124,58,237,0.12)]">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2e] bg-[#111114] text-[#555] transition-all duration-200 hover:border-[#444] hover:text-[#fff]"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                    >
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, -20, 20, -10, 10, 0] }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      >
                        <Clock className="h-6 w-6 text-[#7c3aed] drop-shadow-[0_0_6px_rgba(124,58,237,0.5)]" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, repeatDelay: 2.5 }}
                      className="absolute inset-0 rounded-full ring-1 ring-[#7c3aed]/25"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f2f2f2]">{t.video_coming_soon}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#555]">
                      {t.video_coming_soon_desc}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setShowPopup(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 w-full rounded-xl bg-[#7c3aed] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6d28d9] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                  >
                    {t.video_got_it}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-4xl" style={{ perspective: "1200px" }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-[#f2f2f2] sm:text-4xl text-balance">
            {t.video_title}
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#666]">
            {t.video_subtitle}
          </p>
        </motion.div>

        {/* Video container with spinning border — 3D scroll-linked */}
        <motion.div
          style={{
            rotateX,
            y,
            scale,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-2xl p-[2px]"
        >
          {/* Overflow mask for the rotating gradient */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Rotating conic gradient */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute"
              style={{
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "conic-gradient(from 0deg, transparent 0%, transparent 10%, #7c3aed 20%, #a78bfa 30%, #c4b5fd 35%, transparent 45%, transparent 55%, #7c3aed 65%, #a78bfa 75%, #c4b5fd 80%, transparent 90%, transparent 100%)",
              }}
            />
          </div>

          {/* Inner content with dark background */}
          <div className="relative z-10 flex aspect-video items-center justify-center rounded-[calc(1rem-1px)] bg-[#0a0a0c]">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-[calc(1rem-1px)] bg-gradient-to-br from-[#7c3aed]/[0.04] via-transparent to-transparent pointer-events-none" />

            {/* Play button */}
            <motion.div
              onClick={() => setShowPopup(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 transition-all duration-300 hover:bg-[#7c3aed]/20 hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]"
            >
              <Play className="ml-1 h-8 w-8 text-[#a78bfa]" fill="#a78bfa" />
            </motion.div>

            {/* Corner accents */}
            <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[#7c3aed]/20 rounded-tl-lg" />
            <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-[#7c3aed]/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#7c3aed]/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#7c3aed]/20 rounded-br-lg" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
