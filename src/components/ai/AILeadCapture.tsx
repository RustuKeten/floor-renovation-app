'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, Lock, Sparkles, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFloorStore } from '@/lib/store'

export function AILeadCapture() {
  const { 
    customerInfo, 
    setCustomerInfo, 
    setAIStep, 
    selectedMaterial,
    uploadedPhoto 
  } = useFloorStore()
  
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    return cleaned.length >= 10
  }

  const handleSubmit = () => {
    const newErrors: { email?: string; phone?: string } = {}
    
    if (!customerInfo.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!customerInfo.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    setAIStep('ai-processing')
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setAIStep('ai-material')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to materials
          </button>
          
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
            <Eye className="w-8 h-8 text-violet-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3">
            Almost There!
          </h1>
          <p className="text-zinc-400">
            Enter your contact details to see your room transformed with {selectedMaterial?.name}.
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
        >
          <div className="flex items-center gap-4">
            {uploadedPhoto && (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedPhoto}
                  alt="Your room"
                  className="w-full h-full object-cover blur-sm"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm text-zinc-400 mb-1">Your AI visualization is ready!</p>
              <p className="text-white font-medium">{selectedMaterial?.name} Floor</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-violet-400">
                <Lock className="w-3 h-3" />
                <span>Unlock by entering your details</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-zinc-300">
                  Email Address <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={customerInfo.email}
                    onChange={(e) => {
                      setCustomerInfo({ email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: undefined })
                    }}
                    className={`pl-11 h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-zinc-300">
                  Phone Number <span className="text-red-400">*</span>
                </Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={customerInfo.phone}
                    onChange={(e) => {
                      setCustomerInfo({ phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: undefined })
                    }}
                    className={`pl-11 h-12 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20 ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-semibold text-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            See My Transformed Room
          </Button>

          <p className="text-xs text-zinc-500 text-center">
            We&apos;ll use this to send your quote and schedule your consultation. 
            Your information is secure and will never be shared.
          </p>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-500"
        >
          <div className="flex items-center gap-1">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔒</span>
            <span>No spam, ever</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


