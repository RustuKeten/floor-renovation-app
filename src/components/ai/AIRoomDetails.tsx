'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Home, Ruler, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useFloorStore } from '@/lib/store'

const ROOM_TYPES = [
  'Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 
  'Dining Room', 'Office', 'Hallway', 'Basement', 'Other'
]

export function AIRoomDetails() {
  const { aiRoomDetails, setAIRoomDetails, setAIStep } = useFloorStore()
  
  const [details, setDetails] = useState({
    roomType: aiRoomDetails?.roomType || '',
    length: aiRoomDetails?.estimatedLength?.toString() || '',
    width: aiRoomDetails?.estimatedWidth?.toString() || '',
    notes: '',
  })

  const sqft = details.length && details.width 
    ? parseFloat(details.length) * parseFloat(details.width) 
    : 0

  const handleContinue = () => {
    // Update AI room details with user-confirmed/edited values
    setAIRoomDetails({
      ...aiRoomDetails!,
      roomType: details.roomType,
      estimatedLength: parseFloat(details.length) || 0,
      estimatedWidth: parseFloat(details.width) || 0,
      estimatedSqFt: sqft,
      notes: details.notes || aiRoomDetails?.notes || '',
    })
    setAIStep('ai-quote')
  }

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
            onClick={() => setAIStep('ai-result')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <Ruler className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
                Confirm Details
              </span>
              <h1 className="text-3xl font-bold text-white">Room Details</h1>
            </div>
          </div>
          <p className="text-zinc-400">
            Confirm or adjust the AI-detected room details for an accurate quote.
          </p>
        </motion.div>

        {/* AI Detection Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200">
              These measurements were estimated by AI. Please verify and adjust if needed for a more accurate quote.
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-zinc-900/50 border-zinc-800 p-6">
            <div className="space-y-6">
              {/* Room Type */}
              <div>
                <Label className="text-zinc-300 mb-3 block">Room Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {ROOM_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setDetails({ ...details, roomType: type })}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        details.roomType === type
                          ? 'bg-violet-500 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="length" className="text-zinc-300">
                    Length (ft)
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    value={details.length}
                    onChange={(e) => setDetails({ ...details, length: e.target.value })}
                    className="mt-1.5 h-12 bg-zinc-800 border-zinc-700 text-white text-lg font-semibold"
                  />
                </div>
                <div>
                  <Label htmlFor="width" className="text-zinc-300">
                    Width (ft)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={details.width}
                    onChange={(e) => setDetails({ ...details, width: e.target.value })}
                    className="mt-1.5 h-12 bg-zinc-800 border-zinc-700 text-white text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Calculated Area */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-violet-400" />
                    <span className="text-zinc-300">Total Area</span>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{sqft.toLocaleString()}</p>
                    <p className="text-sm text-zinc-400">square feet</p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="text-zinc-300">
                  Additional Notes (optional)
                </Label>
                <textarea
                  id="notes"
                  placeholder="Any special requirements or notes about the room..."
                  value={details.notes}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  className="mt-1.5 w-full h-24 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 resize-none"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={handleContinue}
            disabled={!details.roomType || !details.length || !details.width}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold disabled:opacity-50"
          >
            See My Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}


