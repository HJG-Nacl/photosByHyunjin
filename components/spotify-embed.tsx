"use client"

interface SpotifyEmbedProps {
  spotifyUrl: string
  onPlay: () => void
  isPlaying: boolean
  className?: string
}

export function SpotifyEmbed({ spotifyUrl, onPlay, isPlaying, className = "" }: SpotifyEmbedProps) {
  // Extract Spotify track ID from URL
  const getSpotifyTrackId = (url: string) => {
    const match = url.match(/track\/([a-zA-Z0-9]+)/)
    return match ? match[1] : null
  }

  const trackId = getSpotifyTrackId(spotifyUrl)

  if (!trackId) return null

  return (
    <div className={`relative group cursor-pointer ${className}`} onClick={onPlay}>
      {/* Spotify Embed */}
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-lg"
      />

      {/* Overlay for interaction */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />

      {/* Playing Indicator */}
      {isPlaying && (
        <div className="absolute top-3 right-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}
