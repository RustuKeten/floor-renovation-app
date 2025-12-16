'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight, Sparkles, Droplets, PawPrint, Leaf, DollarSign, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFloorStore, MATERIALS, MATERIAL_CATEGORIES, FloorMaterial, MaterialBadge } from '@/lib/store'
import { cn } from '@/lib/utils'

// Badge display configuration
const BADGE_CONFIG: Record<MaterialBadge, { icon: React.ElementType; label: string; color: string }> = {
  'best-seller': { icon: Award, label: 'Best Seller', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  'water-resistant': { icon: Droplets, label: 'Water Resistant', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  'pet-friendly': { icon: PawPrint, label: 'Pet Friendly', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  'eco-friendly': { icon: Leaf, label: 'Eco-Friendly', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'budget-friendly': { icon: DollarSign, label: 'Great Value', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
}

export function AIMaterialSelector() {
  const { selectedMaterial, setSelectedMaterial, setAIStep, uploadedPhoto, resetAIFlow } = useFloorStore()
  const [activeCategory, setActiveCategory] = useState<string>('vinyl')

  // Filter materials by category
  const filteredMaterials = MATERIALS.filter(m => m.category === activeCategory)

  const handleContinue = () => {
    if (selectedMaterial) {
      setAIStep('ai-lead-capture')
    }
  }

  const handleBack = () => {
    resetAIFlow()
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Start over
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Choose Your Flooring</h1>
            </div>
          </div>
          <p className="text-zinc-400">
            Select a style and we&apos;ll show you how it looks in your room.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Photo Preview - Sticky on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 lg:order-1"
          >
            <div className="lg:sticky lg:top-6 space-y-4">
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <p className="text-xs text-zinc-500 px-3 py-2 border-b border-zinc-800">Your Room</p>
                {uploadedPhoto && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={uploadedPhoto}
                    alt="Your room"
                    className="w-full aspect-[4/3] object-cover"
                  />
                )}
              </div>
              
              {/* Selected Material Preview */}
              <AnimatePresence mode="wait">
                {selectedMaterial && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-zinc-900 border border-orange-500/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={selectedMaterial.image}
                          alt={selectedMaterial.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{selectedMaterial.name}</p>
                        <p className="text-sm text-zinc-400 capitalize">{selectedMaterial.category}</p>
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between pt-3 border-t border-zinc-800">
                      <span className="text-sm text-zinc-400">Estimated price</span>
                      <span className="text-lg font-bold text-orange-400">
                        ${(selectedMaterial.pricePerSqFt + selectedMaterial.laborPerSqFt).toFixed(2)}
                        <span className="text-sm font-normal text-zinc-500">/sq ft</span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue Button - Desktop */}
              <div className="hidden lg:block">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedMaterial}
                  size="lg"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  See It In Your Room
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Materials Selection */}
          <div className="lg:col-span-2 lg:order-2">
            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {MATERIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                      activeCategory === cat.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    )}
                  >
                    {cat.name}
                    {cat.label && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-white/20 rounded">
                        {cat.label}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Materials Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {filteredMaterials.map((material, index) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    index={index}
                    isSelected={selectedMaterial?.id === material.id}
                    onSelect={() => setSelectedMaterial(material)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Continue Button - Fixed at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-zinc-800"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedMaterial}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold disabled:opacity-50"
          >
            {selectedMaterial ? 'See It In Your Room' : 'Select a flooring style'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Spacer for mobile fixed button */}
        <div className="h-24 lg:hidden" />
      </div>
    </section>
  )
}

function MaterialCard({
  material,
  index,
  isSelected,
  onSelect,
}: {
  material: FloorMaterial
  index: number
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className={cn(
        'relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-200',
        isSelected
          ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-[#0a0a0a] scale-[1.02]'
          : 'hover:scale-[1.02] hover:ring-1 hover:ring-zinc-700'
      )}
    >
      {/* Material Image */}
      <div className="h-32 relative">
        <Image
          src={material.image}
          alt={material.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges */}
        {material.badges && material.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
            {material.badges.slice(0, 2).map((badge) => {
              const config = BADGE_CONFIG[badge]
              const Icon = config.icon
              return (
                <span
                  key={badge}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border',
                    config.color
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {config.label}
                </span>
              )
            })}
          </div>
        )}
        
        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-lg"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-xl">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-white truncate">{material.name}</h3>
            <p className="text-xs text-zinc-500 line-clamp-1">{material.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-orange-400">
              ${(material.pricePerSqFt + material.laborPerSqFt).toFixed(2)}
            </p>
            <p className="text-[10px] text-zinc-500">per sq ft</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
