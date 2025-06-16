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
      console.log("Fetching Spotify preview for:", spotifyUrl)

      // Dynamic import of spotify-preview-finder
      const { getPreview } = await import("spotify-preview-finder")

      const result = await getPreview(spotifyUrl)

      console.log("Spotify preview result:", result)

      if (result && result.preview) {
        return result.preview
      } else {
        console.error("No preview URL found in result")
        return null
      }
    } catch (error) {
      console.error("Error getting Spotify preview:", error)
      return null
    }
  }

  const playTrack = async (track: Track) => {
    console.log("Attempting to play track:", track.title)

    if (audioRef.current) {
      if (currentTrack?.id !== track.id) {
        let audioUrl = track.audioUrl

        // If it's a Spotify track, get the preview URL
        if (track.spotifyUrl && !track.audioUrl) {
          console.log("Getting Spotify preview URL...")
          audioUrl = await getSpotifyPreviewUrl(track.spotifyUrl)

          if (!audioUrl) {
            console.error("No preview URL returned from Spotify")
            alert(
              `Sorry, "${track.title}" doesn't have a preview available. This could be because:\n\n1. The song doesn't have a 30-second preview on Spotify\n2. The Spotify URL is incorrect\n3. The track is region-restricted\n\nTry a different track or check the browser console for more details.`,
            )
            return
          }
        }

        if (audioUrl) {
          console.log("Setting audio source to:", audioUrl)
          audioRef.current.src = audioUrl
          setCurrentTrack(track)
        } else {
          console.error("No audio URL available for track:", track.title)
          alert(
            `No audio source available for "${track.title}". Please check:\n\n1. Spotify URL is correct\n2. Track has a preview available`,
          )
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
