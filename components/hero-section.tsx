"use client"

import { ChevronDown, Camera, Film } from "lucide-react"
import Image from "next/image"
import { useMusic } from "./music-context"

export function HeroSection() {
  const { currentTrack } = useMusic()

  const scrollToContent = () => {
    const element = document.getElementById("content")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // Default photo settings
  const defaultPhoto = {
    coverUrl: "/photos/R0000372.JPG",
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
  const trackTitle = currentTrack?.title || ""
  const trackArtist = currentTrack?.artist || ""

  return (
    <div className="relative h-screen flex overflow-hidden mt-8">
      {/* Left Side - Photo (3/4 of screen) */}
      <div className="w-3/4 relative">
        <Image
          src={heroImage || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover transition-all duration-500"
          priority
        />
      </div>

      {/* Right Side - Camera Display Style */}
      <div className="w-1/4 bg-black flex flex-col justify-center px-6 py-16 font-mono">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xs font-bold tracking-wider text-white mb-0.5">{photoName}</h1>
          <p className="text-xs tracking-wider text-white mb-0.5">{photographer}</p>
        </div>

        {/* Camera Info */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Camera className="w-4 h-4" />
            <span className="text-xs tracking-wider">{camera}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Film className="w-4 h-4" />
            <span className="text-[12px] tracking-wider">{film}</span>
          </div>
        </div>

        {/* Music Info - Only show if there's a current track */}
        {currentTrack && trackTitle && (
          <div className="space-y-1 mb-4 border-t border-gray-800 pt-4">
            <div className="text-gray-400">
              <span className="text-xs font-bold tracking-wider">NOW PLAYING</span>
            </div>
            <div className="text-white text-xs tracking-wider">{trackTitle}</div>
            <div className="text-gray-400 text-xs tracking-wider">{trackArtist}</div>
          </div>
        )}

        {/* Technical Details */}
        <div className="space-y-0.5 mb-4">
          <div className="text-gray-400">
            <span className="text-sm font-bold">{focalLength}</span>
            <span className="text-gray-400 text-xs ml-2">{equivalentFocalLength}</span>
          </div>
          <div className="text-gray-400 text-xs">{aperture}</div>
          <div className="text-gray-400 text-xs">{shutterSpeed}</div>
          <div className="text-gray-400 text-xs">{iso}</div>
          <div className="text-gray-400 text-xs">{exposure}</div>
        </div>

        {/* Mode */}
        <div className="mb-4">
          <span className="bg-gray-800 px-2 py-1 text-[10px] text-gray-400 tracking-wider">{mode}</span>
        </div>

        {/* Date */}
        <div className="text-gray-400 text-xs tracking-wider mb-4">{date}</div>
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
