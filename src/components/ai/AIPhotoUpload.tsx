'use client'

import { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, Image as ImageIcon, X, ArrowLeft, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFloorStore } from '@/lib/store'

export function AIPhotoUpload() {
  const { uploadedPhoto, setUploadedPhoto, setAIStep, setIsAIFlow, setStep } = useFloorStore()
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [setUploadedPhoto])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
  })

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
      }
    } catch (err) {
      console.error('Camera error:', err)
      alert('Could not access camera. Please upload a photo instead.')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(video, 0, 0)
      const dataUrl = canvas.toDataURL('image/jpeg')
      setUploadedPhoto(dataUrl)
      stopCamera()
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }

  const handleBack = () => {
    setIsAIFlow(false)
    setStep('landing')
  }

  const handleContinue = () => {
    if (uploadedPhoto) {
      setAIStep('ai-material')
    }
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-medium bg-violet-500/20 text-violet-300 rounded-full">
                  AI Powered
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">Upload Your Floor Photo</h1>
            </div>
          </div>
          <p className="text-zinc-400 max-w-xl">
            Take a photo or upload an image of your room. Our AI will analyze it and show you 
            how it would look with your chosen flooring material.
          </p>
        </motion.div>

        {/* Upload Area */}
        <AnimatePresence mode="wait">
          {!uploadedPhoto && !isCameraActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`
                  relative overflow-hidden rounded-2xl border-2 border-dashed transition-all cursor-pointer
                  ${isDragActive 
                    ? 'border-violet-500 bg-violet-500/10' 
                    : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900'}
                `}
              >
                <input {...getInputProps()} />
                <div className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {isDragActive ? 'Drop your photo here' : 'Drag & drop your photo'}
                  </h3>
                  <p className="text-zinc-400 mb-4">or click to browse files</p>
                  <p className="text-sm text-zinc-500">Supports JPG, PNG, WebP</p>
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
                className="w-full h-16 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
              >
                <Camera className="w-6 h-6 mr-3" />
                Take a Photo with Camera
              </Button>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h4 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Tips for best results
                </h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    Capture the entire floor area you want to renovate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    Ensure good lighting for accurate analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400">•</span>
                    Take the photo from eye level, not too high or low
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Camera View */}
          {isCameraActive && (
            <motion.div
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
                  className="flex-1 border-zinc-700 text-zinc-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={capturePhoto}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </motion.div>
          )}

          {/* Photo Preview */}
          {uploadedPhoto && !isCameraActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="relative rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedPhoto}
                  alt="Uploaded floor"
                  className="w-full aspect-[4/3] object-cover"
                />
                
                {/* Remove button */}
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Success indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-green-500/20 border border-green-500/30">
                  <ImageIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-300">Photo uploaded</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setUploadedPhoto(null)}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  Choose Different Photo
                </Button>
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white"
                >
                  Continue
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}


