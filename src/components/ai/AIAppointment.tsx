'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  Sparkles,
  Truck,
  Star,
  Palette
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
    icon: Truck,
    title: 'Mobile Showroom Visit',
    description: 'Our showroom van comes to you with real samples to see & feel',
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
      colors: ['#f97316', '#3b82f6', '#f59e0b', '#06b6d4'],
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
            {appointmentType === 'in-person' 
              ? "Our mobile showroom will be on its way! We'll contact you within 24 hours to confirm your visit."
              : `We'll contact you within 24 hours to confirm your ${appointmentType}.`
            }
          </p>

          {/* Van Image for in-person */}
          {appointmentType === 'in-person' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 rounded-xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=300&fit=crop"
                alt="Floor Vision Mobile Showroom"
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </motion.div>
          )}

          {/* Summary Card */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 text-left mb-8">
            <h3 className="font-semibold text-white mb-4">Appointment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Type</span>
                <span className="text-white capitalize">{appointmentType === 'in-person' ? 'Mobile Showroom Visit' : appointmentType?.replace('-', ' ')}</span>
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
                <span className="text-orange-400 font-semibold">
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
      <div className="max-w-3xl mx-auto">
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 text-xs font-medium bg-orange-500/20 text-orange-300 rounded-full">
                Final Step
              </span>
              <h1 className="text-3xl font-bold text-white">Get Your Free Measurement</h1>
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
                  appointmentType === option.id && 'border-orange-500 bg-orange-500/5'
                )}
              >
                {option.recommended && (
                  <div className="absolute -top-2 right-4">
                    <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                    appointmentType === option.id ? 'bg-orange-500/20' : 'bg-zinc-800'
                  )}>
                    <option.icon className={cn(
                      'w-6 h-6 transition-colors',
                      appointmentType === option.id ? 'text-orange-400' : 'text-zinc-500'
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
                      ? 'bg-orange-500 border-orange-500'
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

        {/* Mobile Showroom Feature Showcase */}
        <AnimatePresence>
          {appointmentType === 'in-person' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <Card className="bg-gradient-to-br from-orange-500/10 to-blue-500/10 border-orange-500/30 overflow-hidden">
                <div className="md:flex">
                  {/* Van Image */}
                  <div className="md:w-2/5 relative min-h-[200px]">
                    <div className="aspect-[4/3] md:aspect-auto md:absolute md:inset-0">
                      <Image
                        src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=400&fit=crop"
                        alt="Floor Vision Mobile Showroom Van"
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/50 md:bg-gradient-to-l md:from-[#0a0a0a]/60 md:to-transparent" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-bold text-white">Mobile Showroom Experience</h3>
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">
                      Our fully-equipped showroom van brings the store to your doorstep! Touch and compare hundreds of flooring samples in the comfort of your home.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Palette className="w-4 h-4 text-orange-400" />
                        <span className="text-zinc-300">100+ samples</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-orange-400" />
                        <span className="text-zinc-300">Expert advice</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-orange-400" />
                        <span className="text-zinc-300">Precise measurements</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-orange-400" />
                        <span className="text-zinc-300">Free service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-400 hover:to-blue-400 text-white font-semibold disabled:opacity-50"
            >
              {appointmentType === 'in-person' ? (
                <>
                  <Truck className="w-5 h-5 mr-2" />
                  Schedule Mobile Showroom Visit
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5 mr-2" />
                  Request {appointmentType === 'call' ? 'Call' : 'Video Call'}
                </>
              )}
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
