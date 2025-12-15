'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { 
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Printer,
  Share2,
  ArrowLeft,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFloorStore } from '@/lib/store'

export function QuoteSummary() {
  const { 
    rooms, 
    selectedMaterial, 
    addOns, 
    getTotalSqFt, 
    getSubtotal, 
    getTax, 
    getTotal,
    customerInfo,
    setCustomerInfo,
    setStep,
    reset
  } = useFloorStore()

  const hasConfettiFired = useRef(false)

  useEffect(() => {
    if (!hasConfettiFired.current) {
      hasConfettiFired.current = true
      
      // Fire confetti
      const duration = 3000
      const end = Date.now() + duration

      const colors = ['#f59e0b', '#ea580c', '#fbbf24', '#fb923c']

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors,
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [])

  const totalSqFt = getTotalSqFt()
  const subtotal = getSubtotal()
  const tax = getTax()
  const total = getTotal()
  const selectedAddOns = addOns.filter((a) => a.selected)
  
  const quoteNumber = `FRQ-${Date.now().toString(36).toUpperCase()}`
  const quoteDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleNewQuote = () => {
    hasConfettiFired.current = false
    reset()
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-black" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-3">Your Quote is Ready!</h1>
          <p className="text-zinc-400 text-lg">
            Quote #{quoteNumber} • Generated on {quoteDate}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
              {/* Quote Header */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Floor Renovation Quote</h2>
                      <p className="text-sm text-zinc-400">{quoteNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">Valid 30 days</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Project Summary */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                    Project Summary
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-800/50">
                      <p className="text-sm text-zinc-400 mb-1">Total Area</p>
                      <p className="text-2xl font-bold text-white">{totalSqFt.toLocaleString()} sq ft</p>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-800/50">
                      <p className="text-sm text-zinc-400 mb-1">Number of Rooms</p>
                      <p className="text-2xl font-bold text-white">{rooms.length}</p>
                    </div>
                  </div>
                </div>

                {/* Rooms */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                    Rooms
                  </h3>
                  <div className="space-y-2">
                    {rooms.map((room, index) => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-white">{room.name}</span>
                          <span className="text-zinc-500 text-sm">
                            {room.length}&apos; × {room.width}&apos;
                          </span>
                        </div>
                        <span className="text-zinc-300 font-medium">{room.sqft} sq ft</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-zinc-800" />

                {/* Material */}
                {selectedMaterial && (
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                      Selected Material
                    </h3>
                    <div className="p-4 rounded-xl bg-zinc-800/50 flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{selectedMaterial.name}</p>
                        <p className="text-sm text-zinc-400">{selectedMaterial.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-amber-400">
                          ${subtotal.materials.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-zinc-500">
                          ${selectedMaterial.pricePerSqFt}/sq ft
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                      Additional Services
                    </h3>
                    <div className="space-y-2">
                      {selectedAddOns.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30"
                        >
                          <span className="text-white">{addon.name}</span>
                          <span className="text-zinc-300 font-medium">
                            ${(addon.priceType === 'flat' ? addon.price : addon.price * totalSqFt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator className="bg-zinc-800" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Materials</span>
                    <span className="text-white">${subtotal.materials.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Installation Labor</span>
                    <span className="text-white">${subtotal.labor.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  {subtotal.addons > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Add-on Services</span>
                      <span className="text-white">${subtotal.addons.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Tax (8%)</span>
                    <span className="text-white">${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <Separator className="bg-zinc-800" />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-semibold text-white">Total</span>
                    <span className="text-3xl font-bold text-amber-400">
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-zinc-800/30 border-t border-zinc-800 flex flex-wrap gap-3">
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="sticky top-6 bg-zinc-900/50 border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Schedule Your Installation</h2>
              <p className="text-sm text-zinc-400 mb-6">
                Fill out your details and we&apos;ll contact you within 24 hours.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ name: e.target.value })}
                    className="mt-1.5 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-zinc-300">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ email: e.target.value })}
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-zinc-300">Phone</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-zinc-300">Project Address</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                    <Input
                      id="address"
                      placeholder="123 Main St, City, State"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ address: e.target.value })}
                      className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold mt-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Request Consultation
                </Button>

                <p className="text-xs text-zinc-500 text-center">
                  By submitting, you agree to our terms and privacy policy.
                </p>
              </div>

              <Separator className="my-6 bg-zinc-800" />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('addons')}
                  className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modify Quote
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleNewQuote}
                  className="w-full text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  Start New Quote
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

