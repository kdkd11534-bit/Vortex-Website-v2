import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { VideoSection } from "@/components/video-section"
import { AntiCheatSection } from "@/components/anti-cheat-section"
import { AnimationSection } from "@/components/animation-section"
import { Footer } from "@/components/footer"
import { TrollEasterEgg } from "@/components/troll-easter-egg"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0d0d0f]">
      <Header />
      <Hero />
      <Features />
      <VideoSection />
      <AntiCheatSection />
      <AnimationSection />
      <Footer />
      <TrollEasterEgg />
    </main>
  )
}
