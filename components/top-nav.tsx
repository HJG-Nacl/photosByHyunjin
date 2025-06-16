"use client"

export function TopNav() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black py-2 px-6 z-50">
      <div className="flex items-center justify-between">
        {/* Instagram Handle */}
        <a
          href="https://instagram.com/photosbyhyunjin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-colors duration-300"
        >
          <span className="text-xs font-light tracking-wide">@photosbyhyunjin</span>
        </a>

        {/* Optional: You can add more nav items here later */}
        <div className="flex items-center gap-4">{/* Space for future nav items */}</div>
      </div>
    </div>
  )
}
