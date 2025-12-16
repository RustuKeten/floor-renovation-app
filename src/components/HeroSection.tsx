'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFloorStore } from '@/lib/store'

export function HeroSection() {
  const setStep = useFloorStore((state) => state.setStep)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating wood grain elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-2 bg-gradient-to-r from-amber-700/20 to-amber-500/10 rounded-full"
            style={{
              top: `${15 + i * 15}%`,
              left: `${-10 + i * 5}%`,
              rotate: `${-5 + i * 2}deg`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Transform Your Space Today</span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
        >
          Beautiful Floors,
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Effortlessly Quoted
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
        >
          Get an instant, accurate estimate for your floor renovation. 
          Choose from premium materials and see your costs in real-time.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <Button
            onClick={() => setStep('rooms')}
            size="lg"
            className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-105"
          >
            Start Your Free Quote
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-6 text-lg rounded-xl"
          >
            View Our Work
          </Button>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Clock,
              title: 'Instant Quotes',
              description: 'Get accurate pricing in under 2 minutes',
            },
            {
              icon: Shield,
              title: '5-Year Warranty',
              description: 'Full coverage on materials and labor',
            },
            {
              icon: Star,
              title: 'Premium Materials',
              description: 'Handpicked from trusted suppliers',
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-zinc-500 text-sm mb-6">Trusted by homeowners across the nation</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['2,500+ Projects', '4.9★ Rating', '15+ Years', '$50M+ Installed'].map((stat) => (
              <div key={stat} className="text-zinc-400 font-medium">
                {stat}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


