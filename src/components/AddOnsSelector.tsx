'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Package, Trash2, Volume2, Sofa, PaintBucket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useFloorStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const ADDON_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  removal: Trash2,
  underlayment: Volume2,
  furniture: Sofa,
  baseboards: PaintBucket,
}

export function AddOnsSelector() {
  const { addOns, toggleAddOn, getTotalSqFt, selectedMaterial, getSubtotal, getTax, getTotal, setStep } = useFloorStore()
  
  const totalSqFt = getTotalSqFt()
  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => setStep('materials')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Materials
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-sm font-medium">Step 3 of 3</p>
              <h1 className="text-3xl font-bold text-white">Additional Services</h1>
            </div>
          </div>
          <p className="text-zinc-400 max-w-xl">
            Enhance your flooring project with our professional add-on services. 
            Select any that apply to your renovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add-ons Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-4">
              {addOns.map((addon, index) => {
                const Icon = ADDON_ICONS[addon.id] || Package
                const addonPrice = addon.priceType === 'flat' 
                  ? addon.price 
                  : addon.price * totalSqFt

                return (
                  <motion.div
                    key={addon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      onClick={() => toggleAddOn(addon.id)}
                      className={cn(
                        'relative p-5 cursor-pointer transition-all duration-300 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700',
                        addon.selected && 'border-amber-500 bg-amber-500/5'
                      )}
                    >
                      {/* Selected indicator */}
                      <div
                        className={cn(
                          'absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                          addon.selected
                            ? 'bg-amber-500 border-amber-500'
                            : 'border-zinc-600 bg-transparent'
                        )}
                      >
                        {addon.selected && <Check className="w-4 h-4 text-black" />}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                          addon.selected ? 'bg-amber-500/20' : 'bg-zinc-800'
                        )}>
                          <Icon className={cn(
                            'w-6 h-6 transition-colors',
                            addon.selected ? 'text-amber-400' : 'text-zinc-500'
                          )} />
                        </div>
                        <div className="flex-1 pr-8">
                          <h3 className="font-semibold text-white mb-1">{addon.name}</h3>
                          <p className="text-sm text-zinc-400 mb-3">{addon.description}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-amber-400">
                              ${addonPrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                            {addon.priceType === 'per_sqft' && (
                              <span className="text-xs text-zinc-500">
                                (${addon.price.toFixed(2)}/sq ft)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-6 bg-zinc-900/50 border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Quote Summary</h2>
              
              {/* Material */}
              {selectedMaterial && (
                <div className="pb-4 mb-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400">Material</span>
                    <span className="text-white font-medium">{selectedMaterial.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{totalSqFt.toLocaleString()} sq ft × ${selectedMaterial.pricePerSqFt.toFixed(2)}</span>
                    <span className="text-zinc-300">${subtotal.materials.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              )}

              {/* Labor */}
              <div className="pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Installation Labor</span>
                  <span className="text-zinc-300">${subtotal.labor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Add-ons */}
              {subtotal.addons > 0 && (
                <div className="pb-4 mb-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400">Add-on Services</span>
                    <span className="text-zinc-300">${subtotal.addons.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="space-y-1">
                    {addOns.filter(a => a.selected).map((addon) => (
                      <div key={addon.id} className="flex items-center justify-between text-xs text-zinc-500">
                        <span>{addon.name}</span>
                        <span>
                          ${(addon.priceType === 'flat' ? addon.price : addon.price * totalSqFt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tax */}
              <div className="pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Tax (8%)</span>
                  <span className="text-zinc-300">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-amber-400">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <Button
                onClick={() => setStep('quote')}
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold"
              >
                Get Your Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-zinc-500 text-center mt-4">
                No commitment required. Valid for 30 days.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

