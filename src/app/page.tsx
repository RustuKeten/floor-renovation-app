"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Sparkles,
  Shield,
  Truck,
  Star,
  ChevronDown,
  CheckCircle2,
  Lock,
  Eye,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFloorStore } from "@/lib/store";

// AI Flow Components
import { AIMaterialSelector } from "@/components/ai/AIMaterialSelector";
import { AILeadCapture } from "@/components/ai/AILeadCapture";
import { AIProcessing } from "@/components/ai/AIProcessing";
import { AIVisualization } from "@/components/ai/AIVisualization";
import { AIRoomDetails } from "@/components/ai/AIRoomDetails";
import { AIQuote } from "@/components/ai/AIQuote";
import { AIAppointment } from "@/components/ai/AIAppointment";

// FAQ Data
const FAQ_ITEMS = [
  {
    question: "Is the mobile showroom visit really free?",
    answer:
      "Yes, completely free with no obligation. We bring samples, provide expert advice, and take measurements — all at no cost to you.",
  },
  {
    question: "Do I have to buy anything?",
    answer:
      "Not at all. Our goal is to help you make the right decision for your home. There's never any pressure to purchase.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most rooms can be completed in 1-2 days. We'll give you an accurate timeline based on your specific project.",
  },
];

export default function Home() {
  const { aiStep, isAIFlow, setIsAIFlow, setAIStep, setUploadedPhoto } =
    useFloorStore();
  const [isDragActive, setIsDragActive] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
        setIsAIFlow(true);
        setAIStep("ai-material");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
        setIsAIFlow(true);
        setAIStep("ai-material");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Render AI flow steps
  if (isAIFlow) {
    switch (aiStep) {
      case "ai-material":
        return <AIMaterialSelector />;
      case "ai-lead-capture":
        return <AILeadCapture />;
      case "ai-processing":
        return <AIProcessing />;
      case "ai-result":
        return <AIVisualization />;
      case "ai-details":
        return <AIRoomDetails />;
      case "ai-quote":
        return <AIQuote />;
      case "ai-appointment":
        return <AIAppointment />;
      default:
        break;
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-blue-900/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          {/* Main Heading - Clear & Simple */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Flooring Made Simple
            </h1>
            <p className="text-2xl md:text-3xl font-medium text-zinc-300 mb-4">
              See It. Feel It.{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Decide With Confidence.
              </span>
            </p>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto">
              Upload a photo. Instantly preview real flooring options.
              <br />
              Then we bring samples to your home.
            </p>
          </motion.div>

          {/* Main Upload Area - ONE Primary Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Large Upload Area */}
              <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer
                  ${
                    isDragActive
                      ? "border-orange-500 bg-orange-500/10 scale-[1.02]"
                      : "border-zinc-600 bg-zinc-900/50 hover:border-orange-500/50 hover:bg-zinc-900"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="p-12 md:p-16 text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Upload className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isDragActive
                      ? "Drop your photo here"
                      : "Upload Your Room Photo"}
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Drag & drop or click to browse
                  </p>

                  {/* Primary CTA Button */}
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold text-lg rounded-xl shadow-lg shadow-orange-500/25"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Choose Photo
                  </Button>
                </div>
              </div>

              {/* Privacy Reassurance */}
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                <Lock className="w-4 h-4" />
                <span>
                  Your photo is private. Used only to generate previews.
                </span>
              </div>

              {/* Secondary CTA */}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    setIsAIFlow(true);
                    setAIStep("ai-appointment");
                  }}
                  variant="outline"
                  size="lg"
                  className="w-full h-14 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-orange-500/50 rounded-xl"
                >
                  <Truck className="w-5 h-5 mr-3" />
                  Book Free Mobile Showroom Visit
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>4.9 Rating</span>
              </div>
              <div className="w-px h-4 bg-zinc-700" />
              <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>2,500+ Homeowners</span>
              </div>
              <div className="w-px h-4 bg-zinc-700" />
              <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Local Experts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-zinc-400 text-lg">
              Three simple steps to your new floor
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Camera,
                title: "Upload a Photo",
                description: "See how different floors look in your own space.",
              },
              {
                step: "2",
                icon: Eye,
                title: "Visualize With AI",
                description: "Compare styles, colors, and materials instantly.",
              },
              {
                step: "3",
                icon: Truck,
                title: "We Come to You",
                description:
                  "Our mobile showroom brings samples, measurements, and expert advice.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Showroom Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800"
          >
            <div className="md:flex items-center">
              {/* Van Image */}
              <div className="md:w-1/2 relative h-64 md:h-auto md:min-h-[400px]">
                <Image
                  src="/logo/mobil_showroom_van.png"
                  alt="Floor Vision Mobile Showroom Van"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-900 via-zinc-900/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Free Service
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  The Flooring Showroom Comes to Your Door
                </h2>

                <p className="text-zinc-400 text-lg mb-6">
                  Skip the store. Our compact mobile showroom brings carefully
                  selected flooring samples directly to your home, so you can
                  see how they look in your lighting, with your furniture.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: Eye, text: "See samples in your actual space" },
                    { icon: Ruler, text: "Get exact measurements" },
                    { icon: Star, text: "Expert advice, no pressure" },
                    { icon: Shield, text: "Honest, transparent pricing" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 text-zinc-300"
                    >
                      <item.icon className="w-5 h-5 text-orange-400" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setIsAIFlow(true);
                    setAIStep("ai-appointment");
                  }}
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold rounded-xl"
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Schedule a Free Visit
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Floor Vision */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Floor Vision?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "See Before You Buy",
                description: "AI visualization shows your actual room",
              },
              {
                icon: Truck,
                title: "No Showroom Visits",
                description: "We bring everything to you",
              },
              {
                icon: Star,
                title: "Curated Quality",
                description: "Only the best flooring options",
              },
              {
                icon: Shield,
                title: "Honest Pricing",
                description: "Transparent quotes, no surprises",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-zinc-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                >
                  <span className="font-medium text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-zinc-400">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-zinc-900/50 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to See Your New Floor?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Upload a photo now or schedule a free mobile showroom visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleClick}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold rounded-xl"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Room Photo
              </Button>
              <Button
                onClick={() => {
                  setIsAIFlow(true);
                  setAIStep("ai-appointment");
                }}
                variant="outline"
                size="lg"
                className="h-14 px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
              >
                <Truck className="w-5 h-5 mr-2" />
                Book Free Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Trust */}
      <footer className="py-8 px-6 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Trusted by homeowners • Local flooring professionals • No obligation
          </p>
        </div>
      </footer>
    </main>
  );
}
