"use client"

import { ChevronDown, Camera, Film, Eye, EyeOff } from "lucide-react"
import { ProgressiveImage } from "./progressive-image"
import { useMusic } from "./music-context"
import { useState } from "react"

export function HeroSection() {
  const { currentTrack, lastClickedTrackId } = useMusic()
  const [showMetadata, setShowMetadata] = useState(true)

  const scrollToContent = () => {
    // If there's a last clicked track, scroll to that specific photo
    if (lastClickedTrackId) {
      const element = document.getElementById(`track-${lastClickedTrackId}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        return
      }
    }

    // Fallback to content section if no specific track
    const element = document.getElementById("content")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleMetadata = () => {
    setShowMetadata(!showMetadata)
  }

  // Default photo settings with placeholder image
  const defaultPhoto = {
    coverUrl: "/placeholder.svg?height=1200&width=800",
    photoName: "6ST 1ST AVE",
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "REGGIE's COLOR NEGATIVE",
    focalLength: "40mm",
    equivalentFocalLength: "70mm",
    aperture: "f/2.8",
    shutterSpeed: "1/100",
    iso: "ISO 6400",
    exposure: "-0.3ev",
    mode: "STREET/NYC",
    date: "15 NOV 2024 11:47 AM",
  }

  // Use current track photo if playing, otherwise use default
  const heroImage = currentTrack?.coverUrl || defaultPhoto.coverUrl
  const photoName = currentTrack?.photoName || defaultPhoto.photoName
  const photographer = currentTrack?.photographer || defaultPhoto.photographer
  const camera = currentTrack?.camera || defaultPhoto.camera
  const film = currentTrack?.film || defaultPhoto.film
  const focalLength = currentTrack?.focalLength || defaultPhoto.focalLength
  const equivalentFocalLength = currentTrack?.equivalentFocalLength || defaultPhoto.equivalentFocalLength
  const aperture = currentTrack?.aperture || defaultPhoto.aperture
  const shutterSpeed = currentTrack?.shutterSpeed || defaultPhoto.shutterSpeed
  const iso = currentTrack?.iso || defaultPhoto.iso
  const exposure = currentTrack?.exposure || defaultPhoto.exposure
  const mode = currentTrack?.mode || defaultPhoto.mode
  const date = currentTrack?.date || defaultPhoto.date

  return (
    <div className="relative h-screen flex flex-col md:flex-row overflow-hidden mt-8">
      {/* Photo Section - Full width on mobile, 3/4 on desktop */}
      <div className="w-full md:w-3/4 relative flex-1">
        <ProgressiveImage
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 75vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Camera Display - Bottom overlay on mobile, right side on desktop */}
      <div
        className={`absolute bottom-0 left-0 right-0 md:relative md:w-1/4 bg-black/90 md:bg-black flex flex-col justify-center px-6 py-4 md:py-16 font-mono backdrop-blur-sm md:backdrop-blur-none transition-transform duration-300 ${
          showMetadata ? "translate-y-0" : "translate-y-full md:translate-y-0"
        }`}
      >
        {/* Title with Toggle Button */}
        <div className="mb-2 md:mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xs font-bold tracking-wider text-white mb-0.5 uppercase">{photoName}</h1>
              <p className="text-xs tracking-wider text-white mb-0.5 italic font-light">{photographer}</p>
            </div>
            {/* Mobile Toggle Button - Inline with title */}
            <button
              onClick={toggleMetadata}
              className="md:hidden p-1 hover:bg-gray-800/50 rounded transition-colors duration-300"
              aria-label="Toggle metadata"
            >
              {showMetadata ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Camera Info */}
        <div className="space-y-1 mb-2 md:mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Camera className="w-4 h-4" />
            <span className="text-xs tracking-wider font-medium">{camera}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Film className="w-4 h-4" />
            <span className="text-[12px] tracking-wider font-light italic">{film}</span>
          </div>
        </div>

        {/* Technical Details - Compact on mobile */}
        <div className="grid grid-cols-2 md:block space-y-0 md:space-y-0.5 mb-2 md:mb-4 gap-x-4 md:gap-x-0">
          <div className="text-gray-400">
            <span className="text-sm font-bold">{focalLength}</span>
            <span className="text-gray-400 text-xs ml-2 font-extralight">({equivalentFocalLength})</span>
          </div>
          <div className="text-gray-400 text-xs font-medium">{aperture}</div>
          <div className="text-gray-400 text-xs font-medium">{shutterSpeed}</div>
          <div className="text-gray-400 text-xs font-semibold">{iso}</div>
          <div className="text-gray-400 text-xs font-light italic">{exposure}</div>
        </div>

        {/* Mode and Date - Single row on mobile */}
        <div className="flex flex-col md:block space-y-1 md:space-y-2">
          <span className="bg-gray-800 px-2 py-1 text-[10px] text-gray-400 tracking-wider inline-block w-fit font-bold uppercase">
            {mode}
          </span>
          <div className="text-gray-400 text-xs tracking-wider font-extralight">{date}</div>
        </div>
      </div>

      {/* Floating Eye Button - Only visible when metadata is hidden on mobile */}
      {!showMetadata && (
        <button
          onClick={toggleMetadata}
          className="md:hidden absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all duration-300 z-40"
          aria-label="Show metadata"
        >
          <Eye className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Scroll Indicator - Positioned above music bar when present */}
      <button
        onClick={scrollToContent}
        className={`absolute left-1/2 md:left-[37.5%] transform -translate-x-1/2 text-white/70 hover:text-white transition-all duration-300 z-50 ${
          currentTrack ? "bottom-20" : "bottom-8"
        }`}
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </button>
    </div>
  )
}
