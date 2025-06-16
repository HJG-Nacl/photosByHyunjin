"use client"

import { TrackCard } from "./track-card"

interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  audioUrl?: string
  spotifyUrl?: string
  height?: number
}

interface MasonryGridProps {
  tracks: Track[]
}

export function MasonryGrid({ tracks }: MasonryGridProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {tracks.map((track) => (
        <div key={track.id} className="break-inside-avoid">
          <div style={{ height: track.height || 300 }}>
            <TrackCard track={track} />
          </div>
        </div>
      ))}
    </div>
  )
}
