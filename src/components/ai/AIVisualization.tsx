'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { ArrowRight, Sparkles, Maximize2, Info, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFloorStore } from '@/lib/store'

// Material overlays (CSS filters/gradients to simulate floor change)
const MATERIAL_OVERLAYS: Record<string, { gradient: string; blend: string }> = {
  'oak-hardwood': { 
    gradient: 'linear-gradient(135deg, rgba(212,165,116,0.6) 0%, rgba(196,154,108,0.5) 50%, rgba(166,124,82,0.6) 100%)',
    blend: 'multiply'
  },
  'walnut-hardwood': { 
    gradient: 'linear-gradient(135deg, rgba(93,64,55,0.7) 0%, rgba(62,39,35,0.6) 50%, rgba(93,64,55,0.7) 100%)',
    blend: 'multiply'
  },
  'maple-hardwood': { 
    gradient: 'linear-gradient(135deg, rgba(245,222,179,0.5) 0%, rgba(210,180,140,0.4) 50%, rgba(245,222,179,0.5) 100%)',
    blend: 'multiply'
  },
  'premium-laminate': { 
    gradient: 'linear-gradient(135deg, rgba(161,136,127,0.5) 0%, rgba(121,85,72,0.5) 50%, rgba(161,136,127,0.5) 100%)',
    blend: 'multiply'
  },
  'porcelain-tile': { 
    gradient: 'linear-gradient(135deg, rgba(236,239,241,0.4) 0%, rgba(176,190,197,0.5) 50%, rgba(236,239,241,0.4) 100%)',
    blend: 'overlay'
  },
  'ceramic-tile': { 
    gradient: 'linear-gradient(135deg, rgba(255,248,225,0.4) 0%, rgba(255,224,130,0.5) 50%, rgba(255,248,225,0.4) 100%)',
    blend: 'overlay'
  },
  'plush-carpet': { 
    gradient: 'linear-gradient(135deg, rgba(121,134,203,0.5) 0%, rgba(63,81,181,0.5) 50%, rgba(121,134,203,0.5) 100%)',
    blend: 'multiply'
  },
  'luxury-vinyl': { 
    gradient: 'linear-gradient(135deg, rgba(188,170,164,0.5) 0%, rgba(121,85,72,0.5) 50%, rgba(188,170,164,0.5) 100%)',
    blend: 'multiply'
  },
}

export function AIVisualization() {
  const { 
    uploadedPhoto, 
    selectedMaterial, 
    aiRoomDetails,
    setAIStep 
  } = useFloorStore()
  
  const hasConfettiFired = useRef(false)

  useEffect(() => {
    if (!hasConfettiFired.current) {
      hasConfettiFired.current = true
      
      // Fire confetti
      const colors = ['#8b5cf6', '#d946ef', '#a855f7', '#c084fc']
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      })
    }
  }, [])

  const overlay = selectedMaterial ? MATERIAL_OVERLAYS[selectedMaterial.id] : null

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Your Room, Transformed!
          </h1>
          <p className="text-zinc-400">
            Here&apos;s how your space would look with {selectedMaterial?.name}
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Before */}
          <div className="relative rounded-2xl overflow-hidden">
            <Badge className="absolute top-4 left-4 z-10 bg-black/50 text-white backdrop-blur-sm border-none">
              Before
            </Badge>
            {uploadedPhoto && (
              <img
                src={uploadedPhoto}
                alt="Before"
                className="w-full aspect-[4/3] object-cover"
              />
            )}
          </div>

          {/* After */}
          <div className="relative rounded-2xl overflow-hidden">
            <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none">
              <Sparkles className="w-3 h-3 mr-1" />
              After
            </Badge>
            {uploadedPhoto && (
              <div className="relative">
                <img
                  src={uploadedPhoto}
                  alt="After"
                  className="w-full aspect-[4/3] object-cover"
                />
                {/* Floor overlay effect */}
                {overlay && (
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: overlay.gradient,
                      mixBlendMode: overlay.blend as 'multiply' | 'overlay',
                    }}
                  />
                )}
                {/* Floor texture pattern */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 20px,
                      rgba(0,0,0,0.1) 20px,
                      rgba(0,0,0,0.1) 22px
                    )`,
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* AI Analysis Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Maximize2 className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-zinc-400">Estimated Size</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {aiRoomDetails?.estimatedSqFt || 0} sq ft
            </p>
            <p className="text-xs text-zinc-500">
              {aiRoomDetails?.estimatedLength}&apos; × {aiRoomDetails?.estimatedWidth}&apos;
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-zinc-400">Detected Room</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {aiRoomDetails?.roomType || 'Room'}
            </p>
            <p className="text-xs text-zinc-500">
              Current: {aiRoomDetails?.currentFloorType}
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-zinc-400">New Floor</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {selectedMaterial?.name}
            </p>
            <p className="text-xs text-zinc-500 capitalize">
              {selectedMaterial?.category}
            </p>
          </div>
        </motion.div>

        {/* Note about estimates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-8"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-violet-200">
                <strong>AI-Generated Estimate:</strong> This visualization and measurements are 
                estimates based on image analysis. For accurate pricing, we recommend a professional 
                in-person measurement.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => setAIStep('ai-details')}
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-8"
          >
            Continue to Details
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

