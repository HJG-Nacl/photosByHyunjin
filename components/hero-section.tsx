"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById("content")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative h-screen flex overflow-hidden">
      {/* Left Side - Photo (3/4 of screen) */}
      <div className="w-3/4 relative">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Black Section with Text (1/4 of screen) */}
      <div className="w-1/4 bg-black flex flex-col justify-center px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-white">SOUND</h1>
        <p className="text-sm md:text-base font-light leading-relaxed text-white/90">
          A visual music experience that combines curated sounds with stunning photography. Each image tells a story
          through sound.
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-3/8 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </div>
  )
}
