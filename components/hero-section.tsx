"use client"

import { ChevronDown, Camera, Film } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToContent = () => {
    const element = document.getElementById("content")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative h-screen flex overflow-hidden mt-8">
      {/* Left Side - Photo (3/4 of screen) */}
      <div className="w-3/4 relative">
        <Image
          src="/photos/R0000372.JPG"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Camera Display Style */}
      <div className="w-1/4 bg-black flex flex-col justify-center px-6 py-16 font-mono">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xs font-bold tracking-wider text-white mb-0.5">6ST 1ST AVE</h1>
          <p className="text-xs tracking-wider text-white mb-0.5">C/O HYUNJIN</p>
        </div>

        {/* Camera Info */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Camera className="w-4 h-4" />
            <span className="text-xs tracking-wider">RICOH GRIIIx</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Film className="w-4 h-4" />
            <span className="text-[12px] tracking-wider">REGGIE's COLOR NEGATIVE</span>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-0.5 mb-4">
          <div className="text-gray-400">
            <span className="text-sm font-bold">40mm</span>
            <span className="text-gray-400 text-xs ml-2">70mm</span>
          </div>
          <div className="text-gray-400 text-xs">f/2.8</div>
          <div className="text-gray-400 text-xs">1/100</div>
          <div className="text-gray-400 text-xs">ISO 6400</div>
          <div className="text-gray-400 text-xs">-0.3ev</div>
        </div>

        {/* Mode */}
        <div className="mb-4">
          <span className="bg-gray-800 px-2 py-1 text-[10px] text-gray-400 tracking-wider">STREET/NYC</span>
        </div>

        {/* Custom Date */}
        <div className="text-gray-400 text-xs tracking-wider mb-4">14 JUN 2025 9:47 PM</div>
      </div>

      {/* Scroll Indicator - Centered on the photo area */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-[37.5%] transform -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300 z-10"
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </div>
  )
}
