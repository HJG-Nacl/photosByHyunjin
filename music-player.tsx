"use client"

import { MusicProvider } from "./components/music-context"
import { MusicPlayerBar } from "./components/music-player-bar"
import { TopNav } from "./components/top-nav"
import { HeroSection } from "./components/hero-section"
import { MasonryGrid } from "./components/masonry-grid"

// Updated tracks data with individual photo metadata
const tracks = [
  {
    id: "1",
    title: "Black Swan",
    artist: "Leellamarz, DON MALIK",
    photoName: "42nd Street",
    coverUrl: "/photos/R0000432.JPG",
    audioUrl: "/music/SpotiDownloader.com - Black Swan (Feat. Leellamarz, DON MALIK) - Gist.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Reggie's Color Negative",
    focalLength: "40mm",
    equivalentFocalLength: "70mm",
    aperture: "f/2.8",
    shutterSpeed: "1/100",
    iso: "ISO 6400",
    exposure: "-0.3ev",
    mode: "STREET/NYC",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "2",
    title: "whoops",
    artist: "- brb..",
    photoName: "Death & Co",
    coverUrl: "/photos/77CB7DBD-D121-4711-BD3B-C4D98AE958F6.jpeg",
    audioUrl: "/music/SpotiDownloader.com - whoops - brb..mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Reggie's Color Negative",
    focalLength: "28mm",
    equivalentFocalLength: "42mm",
    aperture: "f/1.8",
    shutterSpeed: "1/60",
    iso: "ISO 800",
    exposure: "+0.7ev",
    mode: "NIGHT/BAR",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "3",
    title: "Neverender",
    artist: "Justice",
    photoName: "W 23 St 5 Av",
    coverUrl: "/photos/R0000308.JPG",
    audioUrl: "/music/SpotiDownloader.com - Neverender - Justice.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Classic Chrome",
    focalLength: "35mm",
    equivalentFocalLength: "52mm",
    aperture: "f/2.0",
    shutterSpeed: "1/125",
    iso: "ISO 400",
    exposure: "0ev",
    mode: "STREET/DAY",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "4",
    title: "Juna",
    artist: "Clairo",
    photoName: "One Americano, Please",
    coverUrl: "/photos/R0000299.JPG",
    audioUrl: "public/music/SpotiDownloader.com - Juna - Clairo.mp33",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Analog Film",
    focalLength: "28mm",
    equivalentFocalLength: "42mm",
    aperture: "f/2.8",
    shutterSpeed: "1/250",
    iso: "ISO 1600",
    exposure: "-0.3ev",
    mode: "URBAN/BW",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "5",
    title: "Flying Rally",
    artist: "DTM",
    photoName: "Semi Sports",
    coverUrl: "/photos/R0000221.JPG",
    audioUrl: "/music/SpotiDownloader.com - Flying Rally - prod. DTM.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "KODAK Slide",
    focalLength: "40mm",
    equivalentFocalLength: "60mm",
    aperture: "f/4.0",
    shutterSpeed: "1/500",
    iso: "ISO 200",
    exposure: "+0.3ev",
    mode: "VINTAGE/COLOR",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "6",
    title: "Seasons",
    artist: "Wave to Earth",
    photoName: "Reflection",
    coverUrl: "/photos/R0000071.JPG",
    audioUrl: "/music/SpotiDownloader.com - seasons - wave to earth.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Analog Film",
    focalLength: "28mm",
    equivalentFocalLength: "42mm",
    aperture: "f/1.4",
    shutterSpeed: "1/30",
    iso: "ISO 3200",
    exposure: "-1.0ev",
    mode: "NIGHT/WATER",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "7",
    title: "Side by side",
    artist: "jisokuryClub",
    photoName: "오리 부부",
    coverUrl: "/photos/R0000058.JPG",
    audioUrl: "/music/SpotiDownloader.com - Side by side - jisokuryClub.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Analog Film",
    focalLength: "50mm",
    equivalentFocalLength: "75mm",
    aperture: "f/2.8",
    shutterSpeed: "1/200",
    iso: "ISO 400",
    exposure: "0ev",
    mode: "NATURE/WILDLIFE",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "8",
    title: "MARLBORO CLUB",
    artist: "PXRKX",
    photoName: "Bus 307",
    coverUrl: "/photos/45CF57EF-6CB9-40FB-B392-9D2A0BDF2A37_1_201_a.jpeg",
    audioUrl: "/music/SpotiDownloader.com - MARLBORO CLUB - PXRKX.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Kodak Chrome",
    focalLength: "24mm",
    equivalentFocalLength: "24mm",
    aperture: "f/1.8",
    shutterSpeed: "1/120",
    iso: "ISO 800",
    exposure: "0ev",
    mode: "MOBILE/STREET",
    date: "9 Jun 2025 11:47 AM",
  },
  {
    id: "9",
    title: "Homeless",
    artist: "Mr. Belt & Wezol",
    photoName: "Target Bag",
    coverUrl: "/photos/0EF8CE2C-F468-4715-8600-1E7CA99AE3C6.jpeg",
    audioUrl: "/music/SpotiDownloader.com - Homeless - Mr. Belt & Wezol.mp3",
    // Photo metadata
    photographer: "C/O HYUNJIN",
    camera: "RICOH GRIIIx",
    film: "Black and White Film",
    focalLength: "77mm",
    equivalentFocalLength: "77mm",
    aperture: "f/2.8",
    shutterSpeed: "1/60",
    iso: "ISO 1000",
    exposure: "+0.7ev",
    mode: "MOBILE/MACRO",
    date: "9 Jun 2025 11:47 AM",
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
