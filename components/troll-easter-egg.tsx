"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ThumbsUp, Ghost } from "lucide-react"
import Image from "next/image"

export function TrollEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button — bottom right */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#1e1e22] bg-[#0c0c0e] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:border-[#7c3aed]/30 hover:shadow-[0_0_25px_rgba(124,58,237,0.15)]"
      >
        <Ghost className="h-3.5 w-3.5 text-[#555]" />
      </motion.button>

      {/* Popup */}
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
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#1e1e22] bg-[#0c0c0e] shadow-[0_0_80px_rgba(124,58,237,0.12)]">
                {/* Top gradient accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent"
                />

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2e] bg-[#111114] text-[#555] transition-all duration-200 hover:border-[#444] hover:text-[#fff]"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex flex-col items-center gap-5 px-6 py-8 sm:px-8">
                  {/* Animated image container — landscape ratio */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                    className="relative w-full"
                  >
                    <div className="relative aspect-[1170/749] w-full overflow-hidden rounded-xl border border-[#1e1e22] bg-[#111114] shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                      <Image
                        src="/img/Trooool.png"
                        alt="Troll"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0.5 }}
                      animate={{ scale: 1.05, opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-0 rounded-xl ring-1 ring-[#7c3aed]/20"
                    />
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <p className="text-xl font-bold text-[#f2f2f2]">Got you!</p>
                    <p className="mt-1.5 text-sm text-[#555]">You found the secret troll.</p>
                  </motion.div>

                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c3aed] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#6d28d9] hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    OK OK
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
