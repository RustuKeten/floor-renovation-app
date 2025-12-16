/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Info,
  CheckCircle2,
  Check,
  Truck,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFloorStore } from "@/lib/store";
import { cn } from "@/lib/utils";

// Material overlays (CSS filters/gradients to simulate floor change)
const MATERIAL_OVERLAYS: Record<string, { gradient: string; blend: string }> = {
  // Vinyl
  "luxury-vinyl-oak": {
    gradient:
      "linear-gradient(135deg, rgba(212,165,116,0.5) 0%, rgba(196,154,108,0.4) 50%, rgba(166,124,82,0.5) 100%)",
    blend: "multiply",
  },
  "luxury-vinyl-grey": {
    gradient:
      "linear-gradient(135deg, rgba(128,128,128,0.5) 0%, rgba(96,96,96,0.4) 50%, rgba(128,128,128,0.5) 100%)",
    blend: "multiply",
  },
  "luxury-vinyl-walnut": {
    gradient:
      "linear-gradient(135deg, rgba(93,64,55,0.6) 0%, rgba(62,39,35,0.5) 50%, rgba(93,64,55,0.6) 100%)",
    blend: "multiply",
  },
  "vinyl-tile-stone": {
    gradient:
      "linear-gradient(135deg, rgba(200,200,200,0.4) 0%, rgba(170,170,170,0.4) 50%, rgba(200,200,200,0.4) 100%)",
    blend: "overlay",
  },
  // Laminate
  "laminate-oak": {
    gradient:
      "linear-gradient(135deg, rgba(212,165,116,0.5) 0%, rgba(196,154,108,0.4) 50%, rgba(166,124,82,0.5) 100%)",
    blend: "multiply",
  },
  "laminate-hickory": {
    gradient:
      "linear-gradient(135deg, rgba(161,136,127,0.5) 0%, rgba(121,85,72,0.5) 50%, rgba(161,136,127,0.5) 100%)",
    blend: "multiply",
  },
  "laminate-grey-oak": {
    gradient:
      "linear-gradient(135deg, rgba(140,140,140,0.5) 0%, rgba(110,110,110,0.4) 50%, rgba(140,140,140,0.5) 100%)",
    blend: "multiply",
  },
  "laminate-waterproof": {
    gradient:
      "linear-gradient(135deg, rgba(188,170,164,0.5) 0%, rgba(158,140,134,0.4) 50%, rgba(188,170,164,0.5) 100%)",
    blend: "multiply",
  },
  // Hardwood
  "hardwood-oak": {
    gradient:
      "linear-gradient(135deg, rgba(212,165,116,0.6) 0%, rgba(196,154,108,0.5) 50%, rgba(166,124,82,0.6) 100%)",
    blend: "multiply",
  },
  "hardwood-walnut": {
    gradient:
      "linear-gradient(135deg, rgba(93,64,55,0.7) 0%, rgba(62,39,35,0.6) 50%, rgba(93,64,55,0.7) 100%)",
    blend: "multiply",
  },
  "hardwood-maple": {
    gradient:
      "linear-gradient(135deg, rgba(245,222,179,0.5) 0%, rgba(210,180,140,0.4) 50%, rgba(245,222,179,0.5) 100%)",
    blend: "multiply",
  },
  "engineered-oak": {
    gradient:
      "linear-gradient(135deg, rgba(200,170,130,0.5) 0%, rgba(170,140,100,0.4) 50%, rgba(200,170,130,0.5) 100%)",
    blend: "multiply",
  },
  // Tile
  "porcelain-marble": {
    gradient:
      "linear-gradient(135deg, rgba(245,245,245,0.4) 0%, rgba(220,220,220,0.5) 50%, rgba(245,245,245,0.4) 100%)",
    blend: "overlay",
  },
  "porcelain-wood": {
    gradient:
      "linear-gradient(135deg, rgba(200,170,140,0.5) 0%, rgba(170,140,110,0.4) 50%, rgba(200,170,140,0.5) 100%)",
    blend: "multiply",
  },
  "ceramic-classic": {
    gradient:
      "linear-gradient(135deg, rgba(255,248,225,0.4) 0%, rgba(255,224,130,0.5) 50%, rgba(255,248,225,0.4) 100%)",
    blend: "overlay",
  },
  "slate-look": {
    gradient:
      "linear-gradient(135deg, rgba(100,100,100,0.5) 0%, rgba(70,70,70,0.4) 50%, rgba(100,100,100,0.5) 100%)",
    blend: "multiply",
  },
  // Carpet
  "carpet-plush": {
    gradient:
      "linear-gradient(135deg, rgba(121,134,203,0.5) 0%, rgba(63,81,181,0.5) 50%, rgba(121,134,203,0.5) 100%)",
    blend: "multiply",
  },
  "carpet-berber": {
    gradient:
      "linear-gradient(135deg, rgba(188,170,164,0.5) 0%, rgba(158,140,134,0.4) 50%, rgba(188,170,164,0.5) 100%)",
    blend: "multiply",
  },
  "carpet-frieze": {
    gradient:
      "linear-gradient(135deg, rgba(160,150,140,0.5) 0%, rgba(130,120,110,0.4) 50%, rgba(160,150,140,0.5) 100%)",
    blend: "multiply",
  },
  "carpet-stainmaster": {
    gradient:
      "linear-gradient(135deg, rgba(150,160,170,0.5) 0%, rgba(120,130,140,0.4) 50%, rgba(150,160,170,0.5) 100%)",
    blend: "multiply",
  },
};

// Material benefits
const MATERIAL_BENEFITS: Record<string, string[]> = {
  vinyl: ["100% Waterproof", "Easy to clean", "Great for families"],
  laminate: ["Scratch resistant", "Affordable", "Easy installation"],
  hardwood: ["Adds home value", "Classic beauty", "Can be refinished"],
  tile: ["Extremely durable", "Water resistant", "Low maintenance"],
  carpet: ["Soft underfoot", "Sound dampening", "Cozy warmth"],
};

export function AIVisualization() {
  const { uploadedPhoto, selectedMaterial, aiRoomDetails, setAIStep } =
    useFloorStore();

  const [showAfter, setShowAfter] = useState(true);
  const [zoom, setZoom] = useState(1);
  const hasConfettiFired = useRef(false);

  useEffect(() => {
    if (!hasConfettiFired.current) {
      hasConfettiFired.current = true;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f97316", "#fbbf24", "#22c55e", "#3b82f6"],
      });
    }
  }, []);

  const overlay = selectedMaterial
    ? MATERIAL_OVERLAYS[selectedMaterial.id]
    : null;
  const benefits = selectedMaterial
    ? MATERIAL_BENEFITS[selectedMaterial.category]
    : [];
  const pricePerSqFt = selectedMaterial
    ? selectedMaterial.pricePerSqFt + selectedMaterial.laborPerSqFt
    : 0;
  const estimatedTotal = aiRoomDetails?.estimatedSqFt
    ? pricePerSqFt * aiRoomDetails.estimatedSqFt
    : 0;

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-7 h-7 text-white" />
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Your Room, Transformed!
          </h1>
          <p className="text-zinc-400">
            See how {selectedMaterial?.name} looks in your space
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Visualization Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Toggle Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex rounded-xl bg-zinc-900 p-1">
                <button
                  onClick={() => setShowAfter(false)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    !showAfter
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  Before
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                    showAfter
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  After
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  disabled={zoom <= 1}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-zinc-500 min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                  disabled={zoom >= 2}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <div className="overflow-auto" style={{ maxHeight: "500px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showAfter ? "after" : "before"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                    }}
                  >
                    {uploadedPhoto && (
                      <img
                        src={uploadedPhoto}
                        alt={showAfter ? "After" : "Before"}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    )}

                    {/* Floor overlay effect - only on After */}
                    {showAfter && overlay && (
                      <>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: overlay.gradient,
                            mixBlendMode: overlay.blend as
                              | "multiply"
                              | "overlay",
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-15"
                          style={{
                            backgroundImage: `repeating-linear-gradient(
                              90deg,
                              transparent,
                              transparent 30px,
                              rgba(0,0,0,0.1) 30px,
                              rgba(0,0,0,0.1) 32px
                            )`,
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Overlay Label */}
              <div className="absolute top-4 left-4">
                <span
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium",
                    showAfter
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "bg-black/50 text-white backdrop-blur-sm"
                  )}
                >
                  {showAfter ? (
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      With {selectedMaterial?.name}
                    </span>
                  ) : (
                    "Your Current Floor"
                  )}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Benefits Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Material Info Card */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h2 className="text-lg font-semibold text-white mb-1">
                {selectedMaterial?.name}
              </h2>
              <p className="text-sm text-zinc-400 capitalize mb-4">
                {selectedMaterial?.category} Flooring
              </p>

              {/* Benefits List */}
              <div className="space-y-2.5 mb-5">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span className="text-sm text-zinc-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Price Estimate */}
              <div className="pt-4 border-t border-zinc-800">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-sm text-zinc-400">Estimated Total</span>
                  <span className="text-2xl font-bold text-white">
                    $
                    {estimatedTotal.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  Based on {aiRoomDetails?.estimatedSqFt} sq ft @ $
                  {pricePerSqFt.toFixed(2)}/sq ft
                </p>
              </div>
            </div>

            {/* Room Details Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">
                Room Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-zinc-500">Room Type</p>
                  <p className="text-white font-medium">
                    {aiRoomDetails?.roomType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Size</p>
                  <p className="text-white font-medium">
                    {aiRoomDetails?.estimatedSqFt} sq ft
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Dimensions</p>
                  <p className="text-white font-medium">
                    {aiRoomDetails?.estimatedLength}&apos; ×{" "}
                    {aiRoomDetails?.estimatedWidth}&apos;
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Current Floor</p>
                  <p className="text-white font-medium">
                    {aiRoomDetails?.currentFloorType}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setAIStep("ai-details")}
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold rounded-xl"
            >
              See This Floor In Your Home
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* Trust Points */}
            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> No obligation
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Free visit
              </span>
            </div>
          </motion.div>
        </div>

        {/* Note about estimates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-200">
                <strong>AI-Generated Preview:</strong> This visualization is an
                estimate. For accurate pricing and to see real samples, schedule
                a free mobile showroom visit.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
