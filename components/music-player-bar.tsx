"use client"

import { useMusic } from "./music-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, X } from "lucide-react"

export function MusicPlayerBar() {
  const { currentTrack, isPlaying, volume, currentTime, duration, togglePlayPause, setVolume, seekTo, stopTrack } =
    useMusic()

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-gray-800/30 py-2 px-4 z-50">
      <div className="flex items-center gap-3 w-full">
        {/* Play Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlayPause}
          className="w-6 h-6 p-0 hover:bg-gray-800/50 flex-shrink-0"
        >
          {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
        </Button>

        {/* Track Name */}
        <div className="min-w-0 flex-shrink-0 w-40">
          <p className="font-medium text-xs text-white truncate">{currentTrack.title}</p>
        </div>

        {/* Progress Bar - Takes up most space */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs text-gray-300 w-8 text-right flex-shrink-0">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={([value]) => seekTo(value)}
            className="flex-1 h-1 [&_[role=slider]]:w-2 [&_[role=slider]]:h-2 [&_[role=slider]]:bg-white [&_[role=slider]]:border-gray-600 [&_.bg-primary]:bg-gray-300"
          />
          <span className="text-xs text-gray-300 w-8 flex-shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 className="w-3 h-3 text-gray-300" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={([value]) => setVolume(value)}
            className="w-16 h-1 [&_[role=slider]]:w-2 [&_[role=slider]]:h-2 [&_[role=slider]]:bg-white [&_[role=slider]]:border-gray-600 [&_.bg-primary]:bg-gray-300"
          />
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={stopTrack}
          className="w-6 h-6 p-0 hover:bg-gray-800/50 flex-shrink-0"
        >
          <X className="w-3 h-3 text-gray-300" />
        </Button>
      </div>
    </div>
  )
}
