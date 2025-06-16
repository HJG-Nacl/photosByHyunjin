"use client"

import { MusicProvider } from "./components/music-context"
import { MusicPlayerBar } from "./components/music-player-bar"
import { TopNav } from "./components/top-nav"
import { HeroSection } from "./components/hero-section"
import { MasonryGrid } from "./components/masonry-grid"

// Updated tracks data - using MP3 files instead of Spotify
const tracks = [
  {
    id: "1",
    title: "Ambient Dreams",
    artist: "Your Artist",
    photoName: "42nd Street",
    coverUrl: "/photos/R0000432.JPG",
    audioUrl: "/audio/track1.mp3",
  },
  {
    id: "2",
    title: "",
    artist: "System Sound",
    photoName: "Death & Co",
    coverUrl: "/photos/R0000409.JPG",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "3",
    title: "Peaceful Moments",
    artist: "Your Artist",
    photoName: "W 23 St 5 Av",
    coverUrl: "/photos/R0000308.JPG",
    audioUrl: "/audio/track3.mp3",
  },
  {
    id: "4",
    title: "Urban Vibes",
    artist: "Your Artist",
    photoName: "Sweet Drinks",
    coverUrl: "/photos/R0000299.JPG",
    audioUrl: "/audio/track4.mp3",
  },
  {
    id: "5",
    title: "Nature Sounds",
    artist: "Your Artist",
    photoName: "Looks Vintage",
    coverUrl: "/photos/R0000221.JPG",
    audioUrl: "/audio/track5.mp3",
  },
  {
    id: "6",
    title: "Midnight Jazz",
    artist: "Your Artist",
    photoName: "Reflection On A Pond",
    coverUrl: "/photos/R0000071.JPG",
    audioUrl: "/audio/track6.mp3",
  },
  {
    id: "7",
    title: "Electronic Pulse",
    artist: "Your Artist",
    photoName: "오리 부부",
    coverUrl: "/photos/R0000058.JPG",
    audioUrl: "/audio/track7.mp3",
  },
  {
    id: "8",
    title: "Acoustic Harmony",
    artist: "Your Artist",
    photoName: "Bus 307",
    coverUrl: "/photos/45CF57EF-6CB9-40FB-B392-9D2A0BDF2A37_1_201_a.jpeg",
    audioUrl: "/audio/track8.mp3",
  },
  {
    id: "9",
    title: "Cinematic Score",
    artist: "Your Artist",
    photoName: "Target Bag",
    coverUrl: "/photos/0EF8CE2C-F468-4715-8600-1E7CA99AE3C6.jpeg",
    audioUrl: "/audio/track9.mp3",
  },
  {
    id: "10",
    title: "Cinematic Score",
    artist: "Your Artist",
    photoName: "Target Bag",
    coverUrl: "/photos/0EF8CE2C-F468-4715-8600-1E7CA99AE3C6.jpeg",
    audioUrl: "/audio/track9.mp3",
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
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">Photos_By_Hyunjin_</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              A carefully selected collection of musical pieces designed to inspire, focus, and transport you to
              different worlds. Each track tells its own story through sound.
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
