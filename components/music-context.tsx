"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  audioUrl?: string
  spotifyUrl?: string
}

interface MusicContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  stopTrack: () => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current?.duration || 0)
      })
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("timeupdate", () => {})
        audioRef.current.removeEventListener("loadedmetadata", () => {})
        audioRef.current.removeEventListener("ended", () => {})
      }
    }
  }, [])

  const getSpotifyPreviewUrl = async (spotifyUrl: string): Promise<string | null> => {
    try {
      const response = await fetch("/api/spotify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotifyUrl }),
      })

      if (!response.ok) {
        console.error("Failed to fetch Spotify preview")
        return null
      }

      const data = await response.json()
      return data.previewUrl
    } catch (error) {
      console.error("Error getting Spotify preview:", error)
      return null
    }
  }

  const playTrack = async (track: Track) => {
    if (audioRef.current) {
      if (currentTrack?.id !== track.id) {
        let audioUrl = track.audioUrl

        // If it's a Spotify track, get the preview URL
        if (track.spotifyUrl && !track.audioUrl) {
          audioUrl = await getSpotifyPreviewUrl(track.spotifyUrl)
        }

        if (audioUrl) {
          audioRef.current.src = audioUrl
          setCurrentTrack(track)
        } else {
          console.error("No audio URL available for track:", track.title)
          return
        }
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setCurrentTrack(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        currentTime,
        duration,
        playTrack,
        togglePlayPause,
        setVolume,
        seekTo,
        stopTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
