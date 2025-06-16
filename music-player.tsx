"use client"

import { MusicProvider } from "./components/music-context"
import { MusicPlayerBar } from "./components/music-player-bar"
import { HeroSection } from "./components/hero-section"
import { MasonryGrid } from "./components/masonry-grid"

// Updated tracks data - now all tracks are just photos with embedded Spotify music
const tracks = [
  {
    id: "1",
    title: "Death & Co",
    artist: "Ricoh GRIIIx",
    coverUrl: "public/photos/R0000409.JPG",
    spotifyUrl: "https://open.spotify.com/track/0uPkCpuoERqrkBL06Art50?si=6a8bba8e21f442bb",
    height: 400,
  },
  {
    id: "2",
    title: "42nd Street",
    artist: "Coastal Sounds",
    coverUrl: "public/photos/R0000432.JPG",
    audioUrl: "https://open.spotify.com/track/3huSUfmhUr4entz2S0G31O?si=cbd56cce3e804a1d",
    height: 300,
  },
  {
    id: "3",
    title: "City Lights",
    artist: "Urban Vibes",
    coverUrl: "/placeholder.svg?height=500&width=300",
    spotifyUrl: "https://open.spotify.com/track/1301WleyT98MSxVHPZCA6M",
    height: 500,
  },
  {
    id: "4",
    title: "Forest Path",
    artist: "Nature Sounds",
    coverUrl: "/placeholder.svg?height=350&width=300",
    spotifyUrl: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3",
    height: 350,
  },
  {
    id: "5",
    title: "Electric Storm",
    artist: "Thunder Bay",
    coverUrl: "/placeholder.svg?height=450&width=300",
    spotifyUrl: "https://open.spotify.com/track/2takcwOaAZWiXQijPHIx7B",
    height: 450,
  },
  {
    id: "6",
    title: "Golden Hour",
    artist: "Sunset Collective",
    coverUrl: "/placeholder.svg?height=320&width=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    height: 320,
  },
  {
    id: "7",
    title: "Neon Nights",
    artist: "Synthwave Co.",
    coverUrl: "/placeholder.svg?height=380&width=300",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    height: 380,
  },
  {
    id: "8",
    title: "Mountain Echo",
    artist: "Alpine Sounds",
    coverUrl: "/placeholder.svg?height=420&width=300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    height: 420,
  },
  {
    id: "9",
    title: "Digital Rain",
    artist: "Cyber Dreams",
    coverUrl: "/placeholder.svg?height=360&width=300",
    spotifyUrl: "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh",
    height: 360,
  },
]

export default function MusicPlayer() {
  return (
    <MusicProvider>
      <div className="min-h-screen bg-black">
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
