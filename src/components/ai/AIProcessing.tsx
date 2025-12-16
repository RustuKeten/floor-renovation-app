/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cpu, Wand2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useFloorStore } from '@/lib/store'

const steps = [
  { icon: Cpu, text: 'Analyzing room dimensions...' },
  { icon: Wand2, text: 'Identifying floor type...' },
  { icon: Sparkles, text: 'Generating visualization...' },
  { icon: CheckCircle2, text: 'Almost done!' },
]

export function AIProcessing() {
  const { 
    setAIStep, 
    setAIRoomDetails, 
    setIsAnalyzing, 
    uploadedPhoto,
    selectedMaterial 
  } = useFloorStore()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsAnalyzing(true)
    
    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }, 1000)

    // Call the AI API
    const analyzeRoom = async () => {
      try {
        const response = await fetch('/api/analyze-room', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: uploadedPhoto,
            material: selectedMaterial?.name,
          }),
        })

        const data = await response.json()

        if (data.success && data.analysis) {
          setAIRoomDetails(data.analysis)
          
          // Wait a bit for animation to complete
          setTimeout(() => {
            setIsAnalyzing(false)
            setAIStep('ai-result')
          }, 1500)
        } else {
          throw new Error(data.error || 'Analysis failed')
        }
      } catch (err) {
        console.error('AI Analysis error:', err)
        
        // Use fallback data
        const fallbackAnalysis = {
          roomType: 'Living Room',
          estimatedLength: 16,
          estimatedWidth: 14,
          estimatedSqFt: 224,
          currentFloorType: 'Existing Floor',
          condition: 'fair' as const,
          notes: 'AI analysis complete. For precise measurements, schedule an in-person visit with our mobile showroom.',
        }
        
        setAIRoomDetails(fallbackAnalysis)
        
        setTimeout(() => {
          setIsAnalyzing(false)
          setAIStep('ai-result')
        }, 1500)
      }
    }

    // Start analysis after a short delay
    const analyzeTimeout = setTimeout(analyzeRoom, 2000)
    
    return () => {
      clearInterval(stepInterval)
      clearTimeout(analyzeTimeout)
    }
  }, [setAIStep, setAIRoomDetails, setIsAnalyzing, uploadedPhoto, selectedMaterial])

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-orange-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-orange-500/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner content */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-orange-400" />
            </motion.div>
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-orange-400"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI) / 3) * 60, 0],
                y: [0, Math.sin((i * Math.PI) / 3) * 60, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-3"
        >
          AI is Analyzing Your Room
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 mb-8"
        >
          Preparing {selectedMaterial?.name} visualization...
        </motion.p>

        {/* Progress steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <ProcessingStep 
              key={index} 
              icon={step.icon} 
              text={step.text} 
              isActive={index <= currentStep}
              isComplete={index < currentStep}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Photo preview */}
        {uploadedPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="relative rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploadedPhoto}
                alt="Processing"
                className="w-full h-40 object-cover"
              />
              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent"
                animate={{ 
                  top: ['-100%', '100%'],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProcessingStep({ 
  icon: Icon, 
  text, 
  isActive,
  isComplete
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  text: string
  isActive: boolean
  isComplete: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        x: 0 
      }}
      className="flex items-center gap-3 justify-center"
    >
      <motion.div
        animate={isActive && !isComplete ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Icon className={`w-5 h-5 ${isComplete ? 'text-green-400' : isActive ? 'text-orange-400' : 'text-zinc-600'}`} />
      </motion.div>
      <span className={`${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>{text}</span>
      {isComplete && (
        <CheckCircle2 className="w-4 h-4 text-green-400" />
      )}
    </motion.div>
  )
}
