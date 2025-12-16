'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Home, ArrowRight, ArrowLeft, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useFloorStore, Room } from '@/lib/store'

const ROOM_PRESETS = [
  { name: 'Living Room', length: 20, width: 15 },
  { name: 'Bedroom', length: 14, width: 12 },
  { name: 'Kitchen', length: 12, width: 10 },
  { name: 'Bathroom', length: 8, width: 6 },
  { name: 'Dining Room', length: 14, width: 12 },
  { name: 'Hallway', length: 15, width: 4 },
]

export function RoomCalculator() {
  const { rooms, addRoom, updateRoom, removeRoom, getTotalSqFt, setStep } = useFloorStore()
  const [newRoom, setNewRoom] = useState({ name: '', length: '', width: '' })
  const [showPresets, setShowPresets] = useState(false)

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.length && newRoom.width) {
      addRoom({
        name: newRoom.name,
        length: parseFloat(newRoom.length),
        width: parseFloat(newRoom.width),
      })
      setNewRoom({ name: '', length: '', width: '' })
    }
  }

  const handlePresetClick = (preset: typeof ROOM_PRESETS[0]) => {
    addRoom(preset)
    setShowPresets(false)
  }

  const totalSqFt = getTotalSqFt()

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => setStep('landing')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-sm font-medium">Step 1 of 3</p>
              <h1 className="text-3xl font-bold text-white">Add Your Rooms</h1>
            </div>
          </div>
          <p className="text-zinc-400 max-w-xl">
            Enter the dimensions of each room you want to renovate. You can add multiple rooms and we&apos;ll calculate the total area.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Add Room Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Add a Room</h2>
              
              {/* Quick Presets */}
              <div className="mb-6">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 mb-3 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                  Quick add from presets
                </button>
                
                <AnimatePresence>
                  {showPresets && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-2 overflow-hidden"
                    >
                      {ROOM_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => handlePresetClick(preset)}
                          className="p-3 text-left rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800 transition-all"
                        >
                          <p className="text-sm font-medium text-white">{preset.name}</p>
                          <p className="text-xs text-zinc-400">
                            {preset.length}&apos; × {preset.width}&apos; ({preset.length * preset.width} sq ft)
                          </p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Room Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="roomName" className="text-zinc-300">Room Name</Label>
                  <Input
                    id="roomName"
                    placeholder="e.g., Master Bedroom"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="mt-1.5 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500/20"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="length" className="text-zinc-300">Length (ft)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="20"
                      value={newRoom.length}
                      onChange={(e) => setNewRoom({ ...newRoom, length: e.target.value })}
                      className="mt-1.5 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-zinc-300">Width (ft)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="15"
                      value={newRoom.width}
                      onChange={(e) => setNewRoom({ ...newRoom, width: e.target.value })}
                      className="mt-1.5 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                {newRoom.length && newRoom.width && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                  >
                    <p className="text-sm text-amber-400">
                      Area: <span className="font-semibold">{(parseFloat(newRoom.length) * parseFloat(newRoom.width)).toFixed(0)} sq ft</span>
                    </p>
                  </motion.div>
                )}

                <Button
                  onClick={handleAddRoom}
                  disabled={!newRoom.name || !newRoom.length || !newRoom.width}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Room
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Room List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Your Rooms</h2>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-400">{totalSqFt.toLocaleString()} sq ft</p>
                  <p className="text-xs text-zinc-500">Total Area</p>
                </div>
              </div>

              {rooms.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                    <Home className="w-8 h-8 text-zinc-600" />
                  </div>
                  <p className="text-zinc-400 mb-2">No rooms added yet</p>
                  <p className="text-zinc-500 text-sm">Add your first room to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  <AnimatePresence mode="popLayout">
                    {rooms.map((room, index) => (
                      <RoomCard
                        key={room.id}
                        room={room}
                        index={index}
                        onUpdate={updateRoom}
                        onRemove={removeRoom}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-end"
        >
          <Button
            onClick={() => setStep('materials')}
            disabled={rooms.length === 0}
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold px-8 disabled:opacity-50"
          >
            Continue to Materials
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function RoomCard({
  room,
  index,
  onUpdate,
  onRemove,
}: {
  room: Room
  index: number
  onUpdate: (id: string, room: Partial<Room>) => void
  onRemove: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    length: room.length.toString(),
    width: room.width.toString(),
  })

  const handleSave = () => {
    onUpdate(room.id, {
      length: parseFloat(editValues.length),
      width: parseFloat(editValues.width),
    })
    setIsEditing(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -20 }}
      className="group relative p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-semibold text-sm">
            {index + 1}
          </div>
          <div>
            <p className="font-medium text-white">{room.name}</p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={editValues.length}
                  onChange={(e) => setEditValues({ ...editValues, length: e.target.value })}
                  className="w-16 h-7 text-xs bg-zinc-700 border-zinc-600"
                />
                <span className="text-zinc-500">×</span>
                <Input
                  type="number"
                  value={editValues.width}
                  onChange={(e) => setEditValues({ ...editValues, width: e.target.value })}
                  className="w-16 h-7 text-xs bg-zinc-700 border-zinc-600"
                />
                <Button size="sm" onClick={handleSave} className="h-7 px-2 bg-amber-500 text-black text-xs">
                  Save
                </Button>
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                {room.length}&apos; × {room.width}&apos;
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 text-amber-400 hover:text-amber-300 text-xs"
                >
                  Edit
                </button>
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-lg font-semibold text-white">{room.sqft}</p>
            <p className="text-xs text-zinc-500">sq ft</p>
          </div>
          <button
            onClick={() => onRemove(room.id)}
            className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual room representation */}
      <div className="mt-3 relative h-16 rounded-lg bg-zinc-900/50 overflow-hidden">
        <motion.div
          className="absolute inset-y-1 left-1 bg-gradient-to-r from-amber-500/30 to-orange-500/20 rounded"
          style={{
            width: `${Math.min((room.sqft / 500) * 100, 95)}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((room.sqft / 500) * 100, 95)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-zinc-400 font-mono">
            {room.length}ft × {room.width}ft
          </span>
        </div>
      </div>
    </motion.div>
  )
}


