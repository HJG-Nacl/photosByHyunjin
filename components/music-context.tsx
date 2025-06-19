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
  photoName?: string
}

interface MusicContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  lastClickedTrackId: string | null
  playTrack: (track: Track) => void
  togglePlayPause: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  stopTrack: () => void
  setLastClickedTrackId: (trackId: string) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lastClickedTrackId, setLastClickedTrackId] = useState<string | null>(null)
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

  const playTrack = async (track: Track) => {
    console.log("Attempting to play track:", track.title)

    if (audioRef.current) {
      if (currentTrack?.id !== track.id) {
        // Use direct audio URL (MP3 files)
        if (track.audioUrl) {
          console.log("Setting audio source to:", track.audioUrl)
          audioRef.current.src = track.audioUrl
          setCurrentTrack(track)
        } else {
          console.error("No audio URL available for track:", track.title)
          alert(`No audio file available for "${track.title}". Please add an audioUrl with an MP3 file.`)
          return
        }
      }

      try {
        await audioRef.current.play()
        setIsPlaying(true)
        console.log("Track started playing successfully")
      } catch (playError) {
        console.error("Error playing audio:", playError)
        alert(`Error playing "${track.title}". The audio file might be unavailable.`)
      }
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
        lastClickedTrackId,
        playTrack,
        togglePlayPause,
        setVolume,
        seekTo,
        stopTrack,
        setLastClickedTrackId,
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
