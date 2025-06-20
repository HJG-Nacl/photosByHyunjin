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
  const [imageError, setImageError] = useState(false)

  // Reset states when src changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [src])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    if (onLoad) onLoad(event)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true) // Stop loading state
  }

  // Use placeholder.svg for demo since we can't use large files
  const imageSrc = imageError ? "/placeholder.svg?height=600&width=400" : src || "/placeholder.svg?height=600&width=400"

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Loading indicator - only shows spinner, no background flash */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Main Image - always present but opacity controlled */}
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-700 ease-out ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        priority={priority}
        sizes={sizes}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
        quality={85}
      />
    </div>
  )
}
