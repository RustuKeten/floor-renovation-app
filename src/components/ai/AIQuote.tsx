'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, DollarSign, Layers, Wrench, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useFloorStore } from '@/lib/store'

export function AIQuote() {
  const { 
    selectedMaterial, 
    aiRoomDetails, 
    getAISubtotal,
    getAITax,
    getAITotal,
    setAIStep 
  } = useFloorStore()

  const subtotal = getAISubtotal()
  const tax = getAITax()
  const total = getAITotal()
  const sqft = aiRoomDetails?.estimatedSqFt || 0

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setAIStep('ai-details')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
                Estimated Cost
              </span>
              <h1 className="text-3xl font-bold text-white">Your Quote</h1>
            </div>
          </div>
          <p className="text-zinc-400">
            Based on AI analysis of your {aiRoomDetails?.roomType?.toLowerCase() || 'room'} ({sqft} sq ft)
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Selected Material</p>
                  <p className="text-xl font-semibold text-white">{selectedMaterial?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Area</p>
                  <p className="text-xl font-semibold text-white">{sqft} sq ft</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 space-y-4">
              {/* Materials */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Materials</p>
                    <p className="text-sm text-zinc-500">
                      {sqft} sq ft × ${selectedMaterial?.pricePerSqFt.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">
                  ${subtotal.materials.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Labor */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Installation Labor</p>
                    <p className="text-sm text-zinc-500">
                      {sqft} sq ft × ${selectedMaterial?.laborPerSqFt.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-white">
                  ${subtotal.labor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Subtotal */}
              <div className="flex items-center justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>
                  ${(subtotal.materials + subtotal.labor).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between text-zinc-400">
                <span>Tax (8%)</span>
                <span>
                  ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <Separator className="bg-zinc-800" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-white">Estimated Total</span>
                </div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="p-4 bg-zinc-800/50 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 text-center">
                * This is an AI-generated estimate. Final price may vary based on actual measurements and site conditions.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Price Range Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
        >
          <p className="text-sm text-zinc-400 text-center">
            💡 Want an exact price? Schedule a free in-person measurement with our experts.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={() => setAIStep('ai-appointment')}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold"
          >
            Get Exact Measurement
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


