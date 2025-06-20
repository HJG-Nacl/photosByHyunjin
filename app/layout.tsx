import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./fonts.css"

export const metadata: Metadata = {
  title: "@photos_by_hyunjin",
  description:
    "A visual music experience that combines curated sounds with stunning photography. Each image tells a story through sound.",
  keywords: ["photography", "music", "visual", "art", "hyunjin"],
  authors: [{ name: "Hyunjin" }],
  openGraph: {
    title: "@photos_by_hyunjin",
    description: "A visual music experience that combines curated sounds with stunning photography.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "photosbyhyunjin",
    description: "A visual music experience that combines curated sounds with stunning photography.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-custom">{children}</body>
    </html>
  )
}
