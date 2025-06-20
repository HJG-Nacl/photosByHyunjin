import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

// Load IBM Plex Mono font with all weights and styles
const ibmPlexMono = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexMono-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IBMPlexMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  fallback: ["Monaco", "Menlo", "Ubuntu Mono", "monospace"],
  preload: true,
})

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
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/IBMPlexMono-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IBMPlexMono-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IBMPlexMono-Italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/IBMPlexMono-Light.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className={`${ibmPlexMono.className} font-mono antialiased`}>{children}</body>
    </html>
  )
}
