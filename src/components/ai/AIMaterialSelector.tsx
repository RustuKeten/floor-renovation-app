'use client'

import { motion } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFloorStore, MATERIALS, FloorMaterial } from '@/lib/store'
import { cn } from '@/lib/utils'

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

export function AIMaterialSelector() {
  const { selectedMaterial, setSelectedMaterial, setAIStep, uploadedPhoto } = useFloorStore()

  const handleContinue = () => {
    if (selectedMaterial) {
      setAIStep('ai-lead-capture')
    }
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setAIStep('ai-upload')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
                Step 2
              </span>
              <h1 className="text-3xl font-bold text-white">Choose Your New Floor</h1>
            </div>
          </div>
          <p className="text-zinc-400 max-w-xl">
            Select a flooring material and our AI will show you how your room would look with it installed.
          </p>
        </motion.div>

        {/* Photo Preview + Materials Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Photo Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6">
              <p className="text-sm text-zinc-400 mb-3">Your photo</p>
              <div className="rounded-xl overflow-hidden border border-zinc-800">
                {uploadedPhoto && (
                  <img
                    src={uploadedPhoto}
                    alt="Your room"
                    className="w-full aspect-[4/3] object-cover"
                  />
                )}
              </div>
              
              {selectedMaterial && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20"
                >
                  <p className="text-sm text-violet-300 mb-1">Selected material</p>
                  <p className="text-lg font-semibold text-white">{selectedMaterial.name}</p>
                  <p className="text-sm text-zinc-400">
                    ${(selectedMaterial.pricePerSqFt + selectedMaterial.laborPerSqFt).toFixed(2)}/sq ft installed
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Materials Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {MATERIALS.map((material, index) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  index={index}
                  isSelected={selectedMaterial?.id === material.id}
                  onSelect={() => setSelectedMaterial(material)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-end"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedMaterial}
            size="lg"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-8 disabled:opacity-50"
          >
            Continue
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
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
        'relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300',
        isSelected
          ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-[#0a0a0a]'
          : 'hover:scale-[1.02]'
      )}
    >
      {/* Material Preview */}
      <div
        className="h-24 relative"
        style={{ background: MATERIAL_PATTERNS[material.id] }}
      >
        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">{material.name}</h3>
            <p className="text-xs text-zinc-500 capitalize">{material.category}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-violet-400">
              ${(material.pricePerSqFt + material.laborPerSqFt).toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500">per sq ft</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


