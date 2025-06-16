"use client"

import { MusicProvider } from "./components/music-context"
import { MusicPlayerBar } from "./components/music-player-bar"
import { TopNav } from "./components/top-nav"
import { HeroSection } from "./components/hero-section"
import { MasonryGrid } from "./components/masonry-grid"

// Updated tracks data - removed fixed heights, let images determine their own size
const tracks = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    coverUrl: "/photos/R0000432.JPG",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
  },
  {
    id: "2",
    title: "Test Audio",
    artist: "System Sound",
    coverUrl: "/placeholder.svg?height=600&width=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    coverUrl: "/placeholder.svg?height=350&width=300",
    spotifyUrl: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3",
  },
  {
    id: "4",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    coverUrl: "/placeholder.svg?height=500&width=400",
    spotifyUrl: "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY",
  },
  {
    id: "5",
    title: "Levitating",
    artist: "Dua Lipa",
    coverUrl: "/placeholder.svg?height=300&width=300",
    spotifyUrl: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9",
  },
  {
    id: "6",
    title: "Another Test",
    artist: "Direct Audio",
    coverUrl: "/placeholder.svg?height=450&width=350",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "7",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    coverUrl: "/placeholder.svg?height=380&width=300",
    spotifyUrl: "https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG",
  },
  {
    id: "8",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    coverUrl: "/placeholder.svg?height=420&width=300",
    spotifyUrl: "https://open.spotify.com/track/5PjdY0CKGZdEuoNab3yDmX",
  },
  {
    id: "9",
    title: "Heat Waves",
    artist: "Glass Animals",
    coverUrl: "/placeholder.svg?height=360&width=300",
    spotifyUrl: "https://open.spotify.com/track/02MWAaffLxlfxAUY7c5dvx",
  },
]

export default function MusicPlayer() {
  return (
    <MusicProvider>
      <div className="min-h-screen bg-black">
        {/* Top Navigation */}
        <TopNav />

        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <div id="content" className="bg-black">
          {/* Title Section */}
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Curated Sounds</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              A carefully selected collection of ambient sounds and musical pieces designed to inspire, focus, and
              transport you to different worlds. Each track tells its own story through sound.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <MasonryGrid tracks={tracks} />
          </div>
        </div>

        <MusicPlayerBar />
      </div>
    </MusicProvider>
  )
}
