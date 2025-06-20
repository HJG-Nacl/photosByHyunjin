"use client"

import type React from "react"

import { useMusic } from "./music-context"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { ProgressiveImage } from "./progressive-image"
import { useState, useRef } from "react"

interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  audioUrl?: string
  spotifyUrl?: string
  width?: number
  height?: number
  photoName?: string
}

interface TrackCardProps {
  track: Track
}

export function TrackCard({ track }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setLastClickedTrackId } = useMusic()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const isCurrentTrack = currentTrack?.id === track.id
  const isCurrentlyPlaying = isCurrentTrack && isPlaying
  const hasAudio = Boolean(track.audioUrl)

  const handlePlayClick = () => {
    if (!hasAudio) return // Don't do anything if no audio

    // Store the track ID and scroll position when clicked
    setLastClickedTrackId(track.id)

    if (isCurrentTrack) {
      togglePlayPause()
    } else {
      playTrack(track)
    }
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })
    setImageLoaded(true)
  }

  // Calculate aspect ratio for responsive sizing
  const aspectRatio =
    imageDimensions.width && imageDimensions.height ? imageDimensions.width / imageDimensions.height : 1

  return (
    <div
      ref={cardRef}
      id={`track-${track.id}`}
      className={`group relative w-full ${hasAudio ? "cursor-pointer" : "cursor-default"}`}
      onClick={handlePlayClick}
    >
      <div
        className="relative w-full overflow-hidden rounded-lg bg-black border-0"
        style={{
          aspectRatio: imageLoaded ? aspectRatio : "1",
          minHeight: "200px",
          maxHeight: "600px",
        }}
      >
        <ProgressiveImage
          src={track.coverUrl || "/placeholder.svg"}
          alt={track.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 border-0 outline-0"
          onLoad={handleImageLoad}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ border: "none", outline: "none" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

        {/* Play Button - Only show if has audio */}
        {hasAudio && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="ghost" size="sm" className="p-2 hover:bg-white/20 bg-transparent rounded-full">
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4 text-white drop-shadow-lg" />
              ) : (
                <Play className="w-4 h-4 text-white drop-shadow-lg ml-0.5" />
              )}
            </Button>
          </div>
        )}

        {/* Photo Name - Bottom Left - Always shows photo name only */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-left">
            <h3 className="font-medium text-white text-sm leading-tight drop-shadow-lg">
              {track.photoName || track.title}
            </h3>
          </div>
        </div>

        {/* Playing Indicator - Only show if has audio and is playing */}
        {hasAudio && isCurrentlyPlaying && (
          <div className="absolute top-4 left-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
