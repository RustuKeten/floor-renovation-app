'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Layers, Star, Wrench, Droplets, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFloorStore, MATERIALS, FloorMaterial } from '@/lib/store'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all', name: 'All Materials', icon: Layers },
  { id: 'hardwood', name: 'Hardwood', icon: Layers },
  { id: 'laminate', name: 'Laminate', icon: Layers },
  { id: 'tile', name: 'Tile', icon: Layers },
  { id: 'carpet', name: 'Carpet', icon: Layers },
  { id: 'vinyl', name: 'Vinyl', icon: Droplets },
]

// Material pattern backgrounds
const MATERIAL_PATTERNS: Record<string, string> = {
  'oak-hardwood': 'linear-gradient(135deg, #D4A574 0%, #C49A6C 25%, #B8956A 50%, #A67C52 75%, #8B6914 100%)',
  'walnut-hardwood': 'linear-gradient(135deg, #5D4037 0%, #6D4C41 25%, #4E342E 50%, #3E2723 75%, #5D4037 100%)',
  'maple-hardwood': 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 25%, #D2B48C 50%, #C4A77D 75%, #F5DEB3 100%)',
  'premium-laminate': 'linear-gradient(135deg, #A1887F 0%, #8D6E63 25%, #795548 50%, #6D4C41 75%, #A1887F 100%)',
  'porcelain-tile': 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 25%, #B0BEC5 50%, #90A4AE 75%, #ECEFF1 100%)',
  'ceramic-tile': 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 25%, #FFE082 50%, #FFD54F 75%, #FFF8E1 100%)',
  'plush-carpet': 'linear-gradient(135deg, #7986CB 0%, #5C6BC0 25%, #3F51B5 50%, #3949AB 75%, #7986CB 100%)',
  'luxury-vinyl': 'linear-gradient(135deg, #BCAAA4 0%, #A1887F 25%, #8D6E63 50%, #795548 75%, #BCAAA4 100%)',
}

export function MaterialSelector() {
  const { selectedMaterial, setSelectedMaterial, getTotalSqFt, setStep } = useFloorStore()
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredMaterial, setHoveredMaterial] = useState<string | null>(null)

  const totalSqFt = getTotalSqFt()
  
  const filteredMaterials = activeCategory === 'all'
    ? MATERIALS
    : MATERIALS.filter((m) => m.category === activeCategory)

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => setStep('rooms')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-sm font-medium">Step 2 of 3</p>
              <h1 className="text-3xl font-bold text-white">Choose Your Material</h1>
            </div>
          </div>
          <p className="text-zinc-400 max-w-xl">
            Select the perfect flooring material for your {totalSqFt.toLocaleString()} sq ft space. 
            Prices include materials and professional installation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category.id
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              )}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Material Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((material, index) => (
              <MaterialCard
                key={material.id}
                material={material}
                index={index}
                isSelected={selectedMaterial?.id === material.id}
                isHovered={hoveredMaterial === material.id}
                totalSqFt={totalSqFt}
                onSelect={() => setSelectedMaterial(material)}
                onHover={() => setHoveredMaterial(material.id)}
                onLeave={() => setHoveredMaterial(null)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Selected Material Summary */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 p-6"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div
                    className="w-16 h-16 rounded-xl"
                    style={{ background: MATERIAL_PATTERNS[selectedMaterial.id] }}
                  />
                  <div>
                    <p className="text-sm text-zinc-400">Selected Material</p>
                    <p className="text-xl font-semibold text-white">{selectedMaterial.name}</p>
                    <p className="text-sm text-zinc-400">
                      ${(selectedMaterial.pricePerSqFt + selectedMaterial.laborPerSqFt).toFixed(2)}/sq ft installed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Estimated Total</p>
                    <p className="text-3xl font-bold text-amber-400">
                      ${((selectedMaterial.pricePerSqFt + selectedMaterial.laborPerSqFt) * totalSqFt).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <Button
                    onClick={() => setStep('addons')}
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-8"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for fixed bottom bar */}
        {selectedMaterial && <div className="h-32" />}
      </div>
    </section>
  )
}

function MaterialCard({
  material,
  index,
  isSelected,
  isHovered,
  totalSqFt,
  onSelect,
  onHover,
  onLeave,
}: {
  material: FloorMaterial
  index: number
  isSelected: boolean
  isHovered: boolean
  totalSqFt: number
  onSelect: () => void
  onHover: () => void
  onLeave: () => void
}) {
  const totalPrice = (material.pricePerSqFt + material.laborPerSqFt) * totalSqFt

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        'relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300',
        isSelected
          ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0a]'
          : 'hover:scale-[1.02]'
      )}
    >
      {/* Material Preview */}
      <div
        className="h-40 relative"
        style={{ background: MATERIAL_PATTERNS[material.id] }}
      >
        {/* Wood grain texture overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.1) 2px,
              rgba(0,0,0,0.1) 4px
            )`,
          }}
        />
        
        {/* Category badge */}
        <Badge className="absolute top-3 left-3 bg-black/50 text-white backdrop-blur-sm border-none capitalize">
          {material.category}
        </Badge>

        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-black" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-2xl">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-white text-lg">{material.name}</h3>
            {material.variant && (
              <p className="text-sm text-zinc-500">{material.variant}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-amber-400">
              ${(material.pricePerSqFt + material.laborPerSqFt).toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500">per sq ft</p>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{material.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-zinc-400">
              {material.durability}/5 Durability
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400 capitalize">
              {material.maintenance} maintenance
            </span>
          </div>
        </div>

        {/* Estimated total on hover */}
        <AnimatePresence>
          {(isHovered || isSelected) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Your estimate:</span>
                <span className="text-lg font-semibold text-white">
                  ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
                <Info className="w-3 h-3" />
                <span>For {totalSqFt.toLocaleString()} sq ft</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

