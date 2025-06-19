"use client"

import type React from "react"

import { useMusic } from "./music-context"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, X } from "lucide-react"
import { useState, useRef } from "react"

export function MusicPlayerBar() {
  const { currentTrack, isPlaying, volume, currentTime, duration, togglePlayPause, setVolume, seekTo, stopTrack } =
    useMusic()

  const [isDraggingProgress, setIsDraggingProgress] = useState(false)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)

  if (!currentTrack) return null

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressInteraction = (e: React.MouseEvent | MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      seekTo(percent * duration)
    }
  }

  const handleVolumeInteraction = (e: React.MouseEvent | MouseEvent) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect()
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      setVolume(percent)
    }
  }

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    setIsDraggingProgress(true)
    handleProgressInteraction(e)

    const handleMouseMove = (e: MouseEvent) => {
      handleProgressInteraction(e)
    }

    const handleMouseUp = () => {
      setIsDraggingProgress(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleVolumeMouseDown = (e: React.MouseEvent) => {
    setIsDraggingVolume(true)
    handleVolumeInteraction(e)

    const handleMouseMove = (e: MouseEvent) => {
      handleVolumeInteraction(e)
    }

    const handleMouseUp = () => {
      setIsDraggingVolume(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
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
        <div className="min-w-0 flex-shrink-0 w-48">
          <p className="font-medium text-sm text-white truncate">{currentTrack.title}</p>
          <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar - Draggable */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs text-gray-300 w-8 text-right flex-shrink-0">{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            className="flex-1 h-3 flex items-center cursor-pointer group"
            onMouseDown={handleProgressMouseDown}
          >
            <div className="w-full h-0.5 bg-gray-600 relative group-hover:h-1 transition-all duration-200">
              <div
                className="h-full bg-white absolute top-0 left-0 transition-all duration-200"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
              <div
                className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-gray-300 w-8 flex-shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Volume Control - Draggable */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 className="w-3 h-3 text-gray-300" />
          <div
            ref={volumeRef}
            className="w-16 h-3 flex items-center cursor-pointer group"
            onMouseDown={handleVolumeMouseDown}
          >
            <div className="w-full h-0.5 bg-gray-600 relative group-hover:h-1 transition-all duration-200">
              <div
                className="h-full bg-white absolute top-0 left-0 transition-all duration-200"
                style={{ width: `${volume * 100}%` }}
              />
              <div
                className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ left: `${volume * 100}%` }}
              />
            </div>
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
