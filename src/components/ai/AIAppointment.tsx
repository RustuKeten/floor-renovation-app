"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Star,
  Ruler,
  Shield,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFloorStore } from "@/lib/store";
import confetti from "canvas-confetti";

export function AIAppointment() {
  const {
    customerInfo,
    setCustomerInfo,
    selectedMaterial,
    aiRoomDetails,
    getAITotal,
    setAIStep,
    resetAIFlow,
  } = useFloorStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: customerInfo.name || "",
    phone: customerInfo.phone || "",
    email: customerInfo.email || "",
    zipCode: "",
    preferredTime: "",
  });

  const total = getAITotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerInfo({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    });
    setIsSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#22c55e", "#fbbf24", "#3b82f6"],
    });
  };

  const handleStartOver = () => {
    resetAIFlow();
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3">
            You&apos;re All Set!
          </h1>
          <p className="text-zinc-400 mb-8">
            We&apos;ll contact you within 24 hours to confirm your mobile showroom visit.
          </p>

          {/* Mobile Showroom Banner */}
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <div className="aspect-[16/9] relative">
              <Image
                src="/logo/mobil_showroom_van.png"
                alt="Floor Vision Mobile Showroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-white font-semibold">Mobile Showroom Coming to You</p>
                <p className="text-zinc-300 text-sm">100+ samples, expert advice, exact measurements</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-left mb-6">
            <h3 className="font-semibold text-white mb-4">Visit Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Name</span>
                <span className="text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Selected Floor</span>
                <span className="text-white">{selectedMaterial?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Room Size</span>
                <span className="text-white">{aiRoomDetails?.estimatedSqFt} sq ft</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-zinc-800">
                <span className="text-zinc-400">Estimated Cost</span>
                <span className="text-orange-400 font-semibold">
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left mb-8">
            <h4 className="font-medium text-orange-300 mb-2">What happens next?</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>We&apos;ll call to confirm a convenient time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Our van arrives with flooring samples</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Get exact measurements and final pricing</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleStartOver}
            variant="outline"
            size="lg"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Start New Project
          </Button>
        </motion.div>
      </section>
    );
  }

  // Booking Form
  return (
    <section className="min-h-screen bg-[#0a0a0a] py-8 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => setAIStep("ai-quote")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to quote
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Schedule Your Free Visit</h1>
            </div>
          </div>
          <p className="text-zinc-400">
            We bring flooring samples, expert advice, and exact measurements — free of charge.
          </p>
        </motion.div>

        {/* Mobile Showroom Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800">
            <div className="md:flex">
              {/* Van Image */}
              <div className="md:w-2/5 relative h-48 md:h-auto">
                <Image
                  src="/logo/mobil_showroom_van.png"
                  alt="Floor Vision Mobile Showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-transparent" />
              </div>

              {/* Benefits */}
              <div className="md:w-3/5 p-6">
                <h3 className="font-semibold text-white mb-4">What&apos;s Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Star, text: "100+ Samples" },
                    { icon: Ruler, text: "Exact Measurements" },
                    { icon: User, text: "Expert Advice" },
                    { icon: Shield, text: "No Obligation" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      <item.icon className="w-4 h-4 text-orange-400" />
                      <span className="text-zinc-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Simple Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <h3 className="font-semibold text-white mb-4">Your Details</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-zinc-300 text-sm">
                  Full Name
                </Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white h-12"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-zinc-300 text-sm">
                  Phone Number
                </Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white h-12"
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <Label htmlFor="zip" className="text-zinc-300 text-sm">
                  ZIP Code
                </Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="zip"
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="12345"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white h-12"
                  />
                </div>
              </div>

              {/* Email (optional) */}
              <div>
                <Label htmlFor="email" className="text-zinc-300 text-sm">
                  Email <span className="text-zinc-500">(optional)</span>
                </Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="pl-10 bg-zinc-800 border-zinc-700 text-white h-12"
                  />
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <Label htmlFor="time" className="text-zinc-300 text-sm">
                  Preferred Time
                </Label>
                <div className="relative mt-1.5">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <select
                    id="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full pl-10 pr-4 h-12 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a time...</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    <option value="evening">Evening (5pm - 8pm)</option>
                    <option value="weekend">Weekend</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={!formData.name || !formData.phone || !formData.zipCode}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-semibold rounded-xl disabled:opacity-50"
          >
            <Truck className="w-5 h-5 mr-2" />
            Schedule Free Visit
          </Button>

          {/* Trust Text */}
          <p className="text-xs text-zinc-500 text-center">
            By submitting, you agree to be contacted about your flooring project.
            No obligation. We respect your privacy.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
