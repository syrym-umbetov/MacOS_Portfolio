import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '@/constants'

type WindowKey =
  | 'finder'
  | 'contact'
  | 'resume'
  | 'safari'
  | 'photos'
  | 'terminal'
  | 'txtfile'
  | 'imgfile'

interface WindowState {
  isOpen: boolean
  zIndex: number
  data: any
}

interface WindowStore {
  windows: Record<WindowKey, WindowState>
  nextZIndex: number
  openWindow: (windowKey: WindowKey, data?: any) => void
  closeWindow: (windowKey: WindowKey) => void
  focusWindow: (windowKey: WindowKey) => void
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey: WindowKey, data: any = null) =>
      set((state) => {
        const win = state.windows[windowKey]
        win.isOpen = true
        win.zIndex = state.nextZIndex
        win.data = data ?? win.data
        state.nextZIndex++
      }),
    closeWindow: (windowKey: WindowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        win.isOpen = false
        win.data = null
      }),
    focusWindow: (windowKey: WindowKey) =>
      set((state) => {
        const win = state.windows[windowKey]
        win.zIndex = state.nextZIndex++
      }),
  }))
)

export default useWindowStore
export type { WindowKey, WindowState, WindowStore }
