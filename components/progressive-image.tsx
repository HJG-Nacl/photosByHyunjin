"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"

interface ProgressiveImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  style?: React.CSSProperties
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
}

export function ProgressiveImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  sizes,
  style,
  onLoad,
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [highResLoaded, setHighResLoaded] = useState(false)

  // Generate thumbnail URL (you can customize this logic)
  const getThumbnailUrl = (originalUrl: string) => {
    // For now, we'll use a smaller version or the same image with different quality
    // In production, you'd have actual thumbnail versions
    return originalUrl.replace(/\.(jpg|jpeg|png|webp)$/i, "_thumb.$1") || originalUrl
  }

  const thumbnailSrc = getThumbnailUrl(src)

  // Preload the high-res image
  useEffect(() => {
    if (imageLoaded) {
      const highResImage = new window.Image()
      highResImage.onload = () => {
        setHighResLoaded(true)
      }
      highResImage.src = src
    }
  }, [src, imageLoaded])

  const handleThumbnailLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    if (onLoad) onLoad(event)
  }

  return (
    <div className="relative w-full h-full">
      {/* Thumbnail Image - Loads first */}
      <Image
        src={thumbnailSrc || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-500 ${highResLoaded ? "opacity-0" : "opacity-100"}`}
        priority={priority}
        sizes={sizes}
        style={style}
        onLoad={handleThumbnailLoad}
        quality={30} // Low quality for fast loading
      />

      {/* High-res Image - Loads after thumbnail */}
      {imageLoaded && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill={fill}
          className={`${className} transition-opacity duration-500 ${highResLoaded ? "opacity-100" : "opacity-0"}`}
          sizes={sizes}
          style={style}
          quality={85} // High quality
        />
      )}

      {/* Loading indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
