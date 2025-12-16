"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  X,
  Sparkles,
  Shield,
  Clock,
  Zap,
  Image as ImageIcon,
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

export default function Home() {
  const { aiStep, isAIFlow, setIsAIFlow, setAIStep, setUploadedPhoto } =
    useFloorStore();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedPhoto(e.target?.result as string);
          setIsAIFlow(true);
          setAIStep("ai-material");
        };
        reader.readAsDataURL(file);
      }
    },
    [setUploadedPhoto, setIsAIFlow, setAIStep]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
  });

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Could not access camera. Please upload a photo instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setUploadedPhoto(dataUrl);
      stopCamera();
      setIsAIFlow(true);
      setAIStep("ai-material");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
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
      <section className="relative min-h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-fuchsia-900/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Floor Visualization</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
          >
            See Your New Floor
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Before You Buy
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Upload a photo of your room and our AI will show you exactly how it
            looks with your chosen flooring. Get an instant quote in minutes.
          </motion.p>

          {/* Main Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {!isCameraActive ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    className={`
                      relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer
                      ${
                        isDragActive
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-zinc-700 bg-zinc-900/50 hover:border-violet-500/50 hover:bg-zinc-900"
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="p-10 md:p-14 text-center">
                      <motion.div
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center"
                        animate={{
                          scale: isDragActive ? 1.1 : 1,
                          rotate: isDragActive ? 5 : 0,
                        }}
                      >
                        <Upload className="w-10 h-10 text-violet-400" />
                      </motion.div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                        {isDragActive
                          ? "Drop your photo here"
                          : "Upload Your Room Photo"}
                      </h3>
                      <p className="text-zinc-400 mb-4">
                        Drag & drop or click to browse
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                        <ImageIcon className="w-4 h-4" />
                        <span>JPG, PNG, WebP supported</span>
                      </div>
                    </div>

                    {/* Decorative gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <span className="text-zinc-500 text-sm">or</span>
                    <div className="flex-1 h-px bg-zinc-800" />
                  </div>

                  {/* Camera Button */}
                  <Button
                    onClick={startCamera}
                    size="lg"
                    variant="outline"
                    className="w-full h-14 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-violet-500/50 rounded-xl"
                  >
                    <Camera className="w-5 h-5 mr-3" />
                    Take a Photo with Camera
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="camera"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Camera overlay */}
                    <div className="absolute inset-0 border-4 border-violet-500/30 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-4 border border-white/20 rounded-xl pointer-events-none" />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      size="lg"
                      className="flex-1 h-12 border-zinc-700 text-zinc-300"
                    >
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={capturePhoto}
                      size="lg"
                      className="flex-1 h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Capture
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-6"
          >
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Zap className="w-4 h-4 text-violet-400" />
                <span>
                  <strong className="text-zinc-300">Pro tip:</strong> Take a
                  photo that shows the entire floor area for best results
                </span>
              </div>
            </div>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16"
          >
            {[
              {
                icon: Sparkles,
                title: "AI Visualization",
                description: "See your room transformed instantly",
              },
              {
                icon: Clock,
                title: "Instant Quote",
                description: "Get accurate pricing in minutes",
              },
              {
                icon: Shield,
                title: "Free Consultation",
                description: "Expert advice, no commitment",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group relative p-5 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-violet-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-600 text-sm mb-4">
              Trusted by homeowners nationwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              {["2,500+ Projects", "4.9★ Rating", "15+ Years Experience"].map(
                (stat) => (
                  <div key={stat} className="text-zinc-500">
                    {stat}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
