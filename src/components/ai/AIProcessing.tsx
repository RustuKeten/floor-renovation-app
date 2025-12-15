'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Cpu, Wand2, CheckCircle2 } from 'lucide-react'
import { useFloorStore } from '@/lib/store'

const steps = [
  { icon: Cpu, text: 'Analyzing room dimensions...' },
  { icon: Wand2, text: 'Applying floor material...' },
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

  useEffect(() => {
    setIsAnalyzing(true)
    
    // Simulate AI processing with progressive steps
    const timer = setTimeout(() => {
      // Generate mock AI analysis results
      const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Dining Room', 'Office']
      const floorTypes = ['Hardwood', 'Carpet', 'Tile', 'Laminate', 'Concrete']
      const conditions = ['good', 'fair', 'poor'] as const
      
      // Random but realistic room dimensions
      const length = Math.floor(Math.random() * 10) + 12 // 12-22 ft
      const width = Math.floor(Math.random() * 8) + 10 // 10-18 ft
      
      const aiAnalysis = {
        roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
        estimatedLength: length,
        estimatedWidth: width,
        estimatedSqFt: length * width,
        currentFloorType: floorTypes[Math.floor(Math.random() * floorTypes.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        notes: 'AI detected standard room layout with good lighting. Measurements are estimates based on image analysis.',
      }
      
      setAIRoomDetails(aiAnalysis)
      setIsAnalyzing(false)
      setAIStep('ai-result')
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [setAIStep, setAIRoomDetails, setIsAnalyzing])

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
            className="absolute inset-0 rounded-full border-2 border-violet-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-violet-500/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Inner content */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-violet-400" />
            </motion.div>
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-violet-400"
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
          AI is Transforming Your Room
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 mb-8"
        >
          Applying {selectedMaterial?.name} to your space...
        </motion.p>

        {/* Progress steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <ProcessingStep 
              key={index} 
              icon={step.icon} 
              text={step.text} 
              delay={index * 1}
            />
          ))}
        </div>

        {/* Photo preview */}
        {uploadedPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={uploadedPhoto}
                alt="Processing"
                className="w-full h-40 object-cover"
              />
              {/* Scanning effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent"
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
  delay 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  text: string
  delay: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 justify-center"
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay }}
      >
        <Icon className="w-5 h-5 text-violet-400" />
      </motion.div>
      <span className="text-zinc-300">{text}</span>
    </motion.div>
  )
}

