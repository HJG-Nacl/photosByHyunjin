"use client"

import { useMusic } from "./music-context"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import Image from "next/image"

interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  audioUrl: string
}

interface TrackCardProps {
  track: Track & { height?: number }
}

export function TrackCard({ track }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMusic()

  const isCurrentTrack = currentTrack?.id === track.id
  const isCurrentlyPlaying = isCurrentTrack && isPlaying

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlayPause()
    } else {
      playTrack(track)
    }
  }

  return (
    <div className="group relative cursor-pointer h-full" onClick={handlePlayClick}>
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <Image
          src={track.coverUrl || "/placeholder.svg"}
          alt={track.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-lg" size="sm">
            {isCurrentlyPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
        </div>

        {/* Track Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-semibold text-white text-sm truncate">{track.title}</h3>
          <p className="text-white/80 text-xs truncate">{track.artist}</p>
        </div>

        {/* Playing Indicator */}
        {isCurrentlyPlaying && (
          <div className="absolute top-3 right-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}
