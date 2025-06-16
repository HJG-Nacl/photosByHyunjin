import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { spotifyUrl } = await request.json()

    // Extract track ID from Spotify URL
    const trackId = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/)?.[1]
    if (!trackId) {
      return NextResponse.json({ error: "Invalid Spotify URL" }, { status: 400 })
    }

    // Get access token using client credentials
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to get Spotify access token" }, { status: 500 })
    }

    // Get track data
    const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const trackData = await trackResponse.json()

    if (!trackResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 })
    }

    return NextResponse.json({
      previewUrl: trackData.preview_url,
      trackName: trackData.name,
      artistName: trackData.artists[0]?.name,
    })
  } catch (error) {
    console.error("Spotify API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
