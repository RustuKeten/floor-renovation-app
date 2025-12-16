import { create } from 'zustand'

export type FloorMaterial = {
  id: string
  name: string
  category: 'hardwood' | 'laminate' | 'tile' | 'carpet' | 'vinyl'
  variant?: string
  pricePerSqFt: number
  laborPerSqFt: number
  image: string
  description: string
  durability: 1 | 2 | 3 | 4 | 5
  maintenance: 'low' | 'medium' | 'high'
}

export type Room = {
  id: string
  name: string
  length: number
  width: number
  sqft: number
}

export type AddOn = {
  id: string
  name: string
  description: string
  price: number
  priceType: 'flat' | 'per_sqft'
  selected: boolean
}

export type AIRoomDetails = {
  roomType: string
  estimatedLength: number
  estimatedWidth: number
  estimatedSqFt: number
  currentFloorType: string
  condition: 'good' | 'fair' | 'poor'
  notes: string
}

type Step = 'landing' | 'rooms' | 'materials' | 'addons' | 'quote'

// AI Flow steps
type AIStep = 'ai-upload' | 'ai-material' | 'ai-lead-capture' | 'ai-processing' | 'ai-result' | 'ai-details' | 'ai-quote' | 'ai-appointment'

interface FloorStore {
  // Navigation
  currentStep: Step
  setStep: (step: Step) => void
  
  // AI Flow
  aiStep: AIStep
  setAIStep: (step: AIStep) => void
  isAIFlow: boolean
  setIsAIFlow: (isAI: boolean) => void
  
  // AI Photo
  uploadedPhoto: string | null
  setUploadedPhoto: (photo: string | null) => void
  
  // AI Analysis
  aiRoomDetails: AIRoomDetails | null
  setAIRoomDetails: (details: AIRoomDetails | null) => void
  isAnalyzing: boolean
  setIsAnalyzing: (analyzing: boolean) => void
  
  // AI Generated visualization
  visualizationImage: string | null
  setVisualizationImage: (image: string | null) => void
  
  // Rooms
  rooms: Room[]
  addRoom: (room: Omit<Room, 'id' | 'sqft'>) => void
  updateRoom: (id: string, room: Partial<Room>) => void
  removeRoom: (id: string) => void
  getTotalSqFt: () => number
  
  // Materials
  selectedMaterial: FloorMaterial | null
  setSelectedMaterial: (material: FloorMaterial | null) => void
  
  // Add-ons
  addOns: AddOn[]
  toggleAddOn: (id: string) => void
  
  // Quote
  getSubtotal: () => { materials: number; labor: number; addons: number }
  getTax: () => number
  getTotal: () => number
  
  // AI Quote (uses estimated sq ft from photo)
  getAISubtotal: () => { materials: number; labor: number; addons: number }
  getAITax: () => number
  getAITotal: () => number
  
  // Customer info
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  setCustomerInfo: (info: Partial<FloorStore['customerInfo']>) => void
  
  // Appointment preference
  appointmentType: 'in-person' | 'call' | 'video' | null
  setAppointmentType: (type: FloorStore['appointmentType']) => void
  
  // Reset
  reset: () => void
  resetAIFlow: () => void
}

export const MATERIALS: FloorMaterial[] = [
  {
    id: 'oak-hardwood',
    name: 'Classic Oak',
    category: 'hardwood',
    variant: 'Oak',
    pricePerSqFt: 8.50,
    laborPerSqFt: 4.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Timeless American oak with beautiful grain patterns. Adds warmth and value to any home.',
    durability: 4,
    maintenance: 'medium',
  },
  {
    id: 'walnut-hardwood',
    name: 'Rich Walnut',
    category: 'hardwood',
    variant: 'Walnut',
    pricePerSqFt: 12.00,
    laborPerSqFt: 4.50,
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=300&fit=crop',
    description: 'Premium American walnut with deep, rich tones. The ultimate in luxury flooring.',
    durability: 4,
    maintenance: 'medium',
  },
  {
    id: 'maple-hardwood',
    name: 'Light Maple',
    category: 'hardwood',
    variant: 'Maple',
    pricePerSqFt: 9.00,
    laborPerSqFt: 4.00,
    image: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=300&fit=crop',
    description: 'Bright, clean maple that makes spaces feel larger and more inviting.',
    durability: 5,
    maintenance: 'medium',
  },
  {
    id: 'premium-laminate',
    name: 'Premium Laminate',
    category: 'laminate',
    pricePerSqFt: 3.50,
    laborPerSqFt: 2.50,
    image: 'https://images.unsplash.com/photo-1622452739563-5765e66ff4e7?w=400&h=300&fit=crop',
    description: 'High-quality laminate with realistic wood textures. Water-resistant and durable.',
    durability: 4,
    maintenance: 'low',
  },
  {
    id: 'porcelain-tile',
    name: 'Porcelain Tile',
    category: 'tile',
    variant: 'Porcelain',
    pricePerSqFt: 6.00,
    laborPerSqFt: 8.00,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    description: 'Elegant porcelain tiles. Perfect for kitchens, bathrooms, and high-traffic areas.',
    durability: 5,
    maintenance: 'low',
  },
  {
    id: 'ceramic-tile',
    name: 'Ceramic Tile',
    category: 'tile',
    variant: 'Ceramic',
    pricePerSqFt: 4.00,
    laborPerSqFt: 7.00,
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=400&h=300&fit=crop',
    description: 'Classic ceramic tiles available in endless colors and patterns.',
    durability: 4,
    maintenance: 'low',
  },
  {
    id: 'plush-carpet',
    name: 'Plush Carpet',
    category: 'carpet',
    pricePerSqFt: 4.50,
    laborPerSqFt: 1.50,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
    description: 'Soft, luxurious carpet that adds comfort and warmth to bedrooms and living spaces.',
    durability: 3,
    maintenance: 'high',
  },
  {
    id: 'luxury-vinyl',
    name: 'Luxury Vinyl Plank',
    category: 'vinyl',
    pricePerSqFt: 5.00,
    laborPerSqFt: 2.00,
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop',
    description: 'Waterproof LVP with authentic wood looks. Ideal for any room including basements.',
    durability: 4,
    maintenance: 'low',
  },
]

const DEFAULT_ADDONS: AddOn[] = [
  {
    id: 'removal',
    name: 'Old Floor Removal',
    description: 'Professional removal and disposal of existing flooring',
    price: 1.50,
    priceType: 'per_sqft',
    selected: false,
  },
  {
    id: 'underlayment',
    name: 'Premium Underlayment',
    description: 'Sound-dampening and moisture-barrier underlayment',
    price: 0.75,
    priceType: 'per_sqft',
    selected: false,
  },
  {
    id: 'furniture',
    name: 'Furniture Moving',
    description: 'We\'ll move and replace your furniture during installation',
    price: 250,
    priceType: 'flat',
    selected: false,
  },
  {
    id: 'baseboards',
    name: 'Baseboard Installation',
    description: 'New baseboards to complement your new floors',
    price: 3.00,
    priceType: 'per_sqft',
    selected: false,
  },
]

const TAX_RATE = 0.08

export const useFloorStore = create<FloorStore>((set, get) => ({
  currentStep: 'landing',
  setStep: (step) => set({ currentStep: step }),
  
  // AI Flow
  aiStep: 'ai-upload',
  setAIStep: (step) => set({ aiStep: step }),
  isAIFlow: false,
  setIsAIFlow: (isAI) => set({ isAIFlow: isAI }),
  
  // AI Photo
  uploadedPhoto: null,
  setUploadedPhoto: (photo) => set({ uploadedPhoto: photo }),
  
  // AI Analysis
  aiRoomDetails: null,
  setAIRoomDetails: (details) => set({ aiRoomDetails: details }),
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  
  // AI Visualization
  visualizationImage: null,
  setVisualizationImage: (image) => set({ visualizationImage: image }),
  
  rooms: [],
  addRoom: (room) => set((state) => ({
    rooms: [...state.rooms, {
      ...room,
      id: crypto.randomUUID(),
      sqft: room.length * room.width,
    }]
  })),
  updateRoom: (id, updates) => set((state) => ({
    rooms: state.rooms.map((room) =>
      room.id === id
        ? { ...room, ...updates, sqft: (updates.length ?? room.length) * (updates.width ?? room.width) }
        : room
    )
  })),
  removeRoom: (id) => set((state) => ({
    rooms: state.rooms.filter((room) => room.id !== id)
  })),
  getTotalSqFt: () => get().rooms.reduce((acc, room) => acc + room.sqft, 0),
  
  selectedMaterial: null,
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
  
  addOns: DEFAULT_ADDONS,
  toggleAddOn: (id) => set((state) => ({
    addOns: state.addOns.map((addon) =>
      addon.id === id ? { ...addon, selected: !addon.selected } : addon
    )
  })),
  
  getSubtotal: () => {
    const state = get()
    const totalSqFt = state.getTotalSqFt()
    const material = state.selectedMaterial
    
    const materials = material ? totalSqFt * material.pricePerSqFt : 0
    const labor = material ? totalSqFt * material.laborPerSqFt : 0
    
    const addons = state.addOns
      .filter((addon) => addon.selected)
      .reduce((acc, addon) => {
        if (addon.priceType === 'flat') return acc + addon.price
        return acc + addon.price * totalSqFt
      }, 0)
    
    return { materials, labor, addons }
  },
  
  getTax: () => {
    const { materials } = get().getSubtotal()
    return materials * TAX_RATE
  },
  
  getTotal: () => {
    const subtotal = get().getSubtotal()
    const tax = get().getTax()
    return subtotal.materials + subtotal.labor + subtotal.addons + tax
  },
  
  // AI Quote calculations (using AI estimated sq ft)
  getAISubtotal: () => {
    const state = get()
    const totalSqFt = state.aiRoomDetails?.estimatedSqFt || 0
    const material = state.selectedMaterial
    
    const materials = material ? totalSqFt * material.pricePerSqFt : 0
    const labor = material ? totalSqFt * material.laborPerSqFt : 0
    
    const addons = state.addOns
      .filter((addon) => addon.selected)
      .reduce((acc, addon) => {
        if (addon.priceType === 'flat') return acc + addon.price
        return acc + addon.price * totalSqFt
      }, 0)
    
    return { materials, labor, addons }
  },
  
  getAITax: () => {
    const { materials } = get().getAISubtotal()
    return materials * TAX_RATE
  },
  
  getAITotal: () => {
    const subtotal = get().getAISubtotal()
    const tax = get().getAITax()
    return subtotal.materials + subtotal.labor + subtotal.addons + tax
  },
  
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  setCustomerInfo: (info) => set((state) => ({
    customerInfo: { ...state.customerInfo, ...info }
  })),
  
  appointmentType: null,
  setAppointmentType: (type) => set({ appointmentType: type }),
  
  reset: () => set({
    currentStep: 'landing',
    rooms: [],
    selectedMaterial: null,
    addOns: DEFAULT_ADDONS,
    customerInfo: { name: '', email: '', phone: '', address: '' },
    isAIFlow: false,
    aiStep: 'ai-upload',
    uploadedPhoto: null,
    aiRoomDetails: null,
    visualizationImage: null,
    appointmentType: null,
  }),
  
  resetAIFlow: () => set({
    isAIFlow: false,
    aiStep: 'ai-upload',
    uploadedPhoto: null,
    aiRoomDetails: null,
    visualizationImage: null,
    selectedMaterial: null,
    appointmentType: null,
    addOns: DEFAULT_ADDONS,
  }),
}))
