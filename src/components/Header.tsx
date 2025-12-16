'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <FloorVisionLogo />
        </Link>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <a 
            href="tel:+1234567890" 
            className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>(123) 456-7890</span>
          </a>
        </div>
      </div>
    </motion.header>
  )
}

function FloorVisionLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Icon */}
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dark blue shape */}
        <path 
          d="M10 15 L10 85 L40 85 L40 50 L25 35 L25 15 Z" 
          fill="#1e3a5f"
        />
        {/* Orange shape */}
        <path 
          d="M25 15 L25 35 L40 50 L40 15 Z" 
          fill="#d4863c"
        />
      </svg>
      
      {/* Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-0">
          <span className="text-xl font-bold tracking-tight" style={{ color: '#1e3a5f' }}>
            FLOOR
          </span>
        </div>
        <span className="text-xl font-bold tracking-tight" style={{ color: '#d4863c' }}>
          VISION
        </span>
      </div>
    </div>
  )
}

// Export for use elsewhere
export { FloorVisionLogo }

