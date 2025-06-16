"use client"

import { Instagram } from "lucide-react"

export function TopNav() {
  return (
    <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-b border-gray-800/30 py-3 px-6 z-50">
      <div className="flex items-center justify-between">
        {/* Instagram Handle */}
        <a
          href="https://instagram.com/hyungener_chang"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group"
        >
          <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-light tracking-wide">@hyungener_chang</span>
        </a>

        {/* Optional: You can add more nav items here later */}
        <div className="flex items-center gap-4">{/* Space for future nav items */}</div>
      </div>
    </div>
  )
}
