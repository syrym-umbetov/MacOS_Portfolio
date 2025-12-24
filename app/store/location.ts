import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { locations } from '@/constants'

// Define location types based on the constants
type LocationType = 'work' | 'about' | 'resume' | 'trash'

interface FileItem {
  id: number
  name: string
  icon: string
  kind: 'file' | 'folder'
  fileType?: string
  position?: string
  windowPosition?: string
  description?: string[]
  subtitle?: string
  image?: string
  imageUrl?: string
  href?: string
  children?: FileItem[]
}

interface Location {
  id: number
  type: LocationType
  name: string
  icon: string
  kind: 'folder'
  children: FileItem[]
}

interface LocationStore {
  activeLocation: Location
  setActiveLocation: (location: Location | null) => void
  resetActiveLocation: () => void
}

const DEFAULT_LOCATION = locations.work

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location: Location | null = null) =>
      set((state) => {
        state.activeLocation = location ?? DEFAULT_LOCATION
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION
      }),
  }))
)

export default useLocationStore
export type { Location, LocationType, FileItem, LocationStore }
