"use client"

import { useMusic } from "./music-context"
import { Button } from "@/components/ui/button"
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

        {/* Track Name - Made wider and more prominent */}
        <div className="min-w-0 flex-shrink-0 w-48">
          <p className="font-medium text-sm text-white truncate">{currentTrack.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar - Takes up most space */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs text-gray-300 w-8 text-right flex-shrink-0">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-px bg-gray-600 relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = (e.clientX - rect.left) / rect.width
              seekTo(percent * duration)
            }}
          >
            <div
              className="h-px bg-white absolute top-0 left-0"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div
              className="w-2 h-2 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs text-gray-300 w-8 flex-shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 className="w-3 h-3 text-gray-300" />
          <div
            className="w-16 h-px bg-gray-600 relative cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = (e.clientX - rect.left) / rect.width
              setVolume(percent)
            }}
          >
            <div className="h-px bg-white absolute top-0 left-0" style={{ width: `${volume * 100}%` }} />
            <div
              className="w-2 h-2 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: `${volume * 100}%` }}
            />
          </div>
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
