'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFloorStore, MATERIALS, FloorMaterial } from '@/lib/store'
import { cn } from '@/lib/utils'

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-orange-500/20 text-orange-300 rounded-full">
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
                  /* eslint-disable-next-line @next/next/no-img-element */
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
                  className="mt-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
                >
                  <p className="text-sm text-orange-300 mb-1">Selected material</p>
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
            className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-400 hover:to-blue-400 text-white px-8 disabled:opacity-50"
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
          ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-[#0a0a0a]'
          : 'hover:scale-[1.02]'
      )}
    >
      {/* Material Preview - Real Image */}
      <div className="h-28 relative">
        <Image
          src={material.image}
          alt={material.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Selected checkmark */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center"
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
            <p className="font-bold text-orange-400">
              ${(material.pricePerSqFt + material.laborPerSqFt).toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500">per sq ft</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
