'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Video, 
  Users, 
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useFloorStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

type AppointmentType = 'in-person' | 'call' | 'video'

const APPOINTMENT_OPTIONS = [
  {
    id: 'in-person' as AppointmentType,
    icon: Users,
    title: 'In-Person Visit',
    description: 'A specialist will visit your home for precise measurements',
    duration: '30-45 min',
    recommended: true,
  },
  {
    id: 'call' as AppointmentType,
    icon: Phone,
    title: 'Phone Consultation',
    description: 'Discuss your project over the phone with our expert',
    duration: '15-20 min',
    recommended: false,
  },
  {
    id: 'video' as AppointmentType,
    icon: Video,
    title: 'Video Call',
    description: 'Virtual consultation via video with screen sharing',
    duration: '20-30 min',
    recommended: false,
  },
]

export function AIAppointment() {
  const { 
    appointmentType, 
    setAppointmentType, 
    customerInfo, 
    setCustomerInfo,
    selectedMaterial,
    aiRoomDetails,
    getAITotal,
    setAIStep,
    resetAIFlow 
  } = useFloorStore()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [address, setAddress] = useState(customerInfo.address)
  const [name, setName] = useState(customerInfo.name)

  const total = getAITotal()

  const handleSubmit = () => {
    setCustomerInfo({ address, name })
    setIsSubmitted(true)
    
    // Fire confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#d946ef', '#a855f7', '#c084fc'],
    })
  }

  const handleStartOver = () => {
    resetAIFlow()
  }

  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Request Submitted!
          </h1>
          <p className="text-zinc-400 mb-8">
            We&apos;ll contact you within 24 hours to confirm your {appointmentType === 'in-person' ? 'visit' : 'call'}.
          </p>

          {/* Summary Card */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 text-left mb-8">
            <h3 className="font-semibold text-white mb-4">Appointment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Type</span>
                <span className="text-white capitalize">{appointmentType?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Material</span>
                <span className="text-white">{selectedMaterial?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estimated Area</span>
                <span className="text-white">{aiRoomDetails?.estimatedSqFt} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estimated Cost</span>
                <span className="text-violet-400 font-semibold">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <p className="text-sm text-zinc-500">
              Check your email ({customerInfo.email}) for confirmation details.
            </p>
            <Button
              onClick={handleStartOver}
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Start New Quote
            </Button>
          </div>
        </motion.div>
      </section>
    )
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
            onClick={() => setAIStep('ai-quote')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to quote
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
                Final Step
              </span>
              <h1 className="text-3xl font-bold text-white">Schedule Measurement</h1>
            </div>
          </div>
          <p className="text-zinc-400">
            Choose how you&apos;d like us to provide you with an exact quote.
          </p>
        </motion.div>

        {/* Appointment Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {APPOINTMENT_OPTIONS.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card
                onClick={() => setAppointmentType(option.id)}
                className={cn(
                  'relative p-5 cursor-pointer transition-all duration-300 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700',
                  appointmentType === option.id && 'border-violet-500 bg-violet-500/5'
                )}
              >
                {option.recommended && (
                  <div className="absolute -top-2 right-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    appointmentType === option.id ? 'bg-violet-500/20' : 'bg-zinc-800'
                  )}>
                    <option.icon className={cn(
                      'w-6 h-6 transition-colors',
                      appointmentType === option.id ? 'text-violet-400' : 'text-zinc-500'
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{option.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="w-3 h-3" />
                        {option.duration}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400">{option.description}</p>
                  </div>

                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                    appointmentType === option.id
                      ? 'bg-violet-500 border-violet-500'
                      : 'border-zinc-600 bg-transparent'
                  )}>
                    {appointmentType === option.id && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Form */}
        {appointmentType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h3 className="font-semibold text-white mb-4">Your Details</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                  <div className="relative mt-1.5">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11 h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                {appointmentType === 'in-person' && (
                  <div>
                    <Label htmlFor="address" className="text-zinc-300">Project Address</Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                      <Input
                        id="address"
                        placeholder="123 Main St, City, State, ZIP"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-11 h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Info Summary */}
                <div className="p-4 rounded-xl bg-zinc-800/50">
                  <p className="text-sm text-zinc-400 mb-2">We&apos;ll contact you at:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <span>{customerInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Phone className="w-4 h-4 text-zinc-500" />
                      <span>{customerInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!name || (appointmentType === 'in-person' && !address)}
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold disabled:opacity-50"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Request {appointmentType === 'in-person' ? 'Visit' : appointmentType === 'call' ? 'Call' : 'Video Call'}
            </Button>

            <p className="text-xs text-zinc-500 text-center">
              By submitting, you agree to be contacted about your flooring project. 
              We respect your privacy and will never share your information.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}


