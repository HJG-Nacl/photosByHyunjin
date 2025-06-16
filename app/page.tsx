import type { Metadata } from "next"
import MusicPlayer from "../music-player"

export const metadata: Metadata = {
  title: "@photosbyhyunjin",
  description:
    "Discover a unique blend of photography and music. Each image tells its story through carefully curated sounds.",
}

export default function Page() {
  return <MusicPlayer />
}
