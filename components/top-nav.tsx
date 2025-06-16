"use client"

import { ChevronUp } from "lucide-react"

export function TopNav() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-black py-2 px-6 z-50">
      <div className="flex items-center justify-between">
        {/* Instagram Handle - Links to the site itself */}
        <a href="/" className="text-white/80 hover:text-white transition-colors duration-300">
          <span className="text-xs font-light tracking-wide">@photosbyhyunjin</span>
        </a>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="text-white/80 hover:text-white transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
