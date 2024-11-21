import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  darkMode: boolean
  notifications: boolean
  autoPlay: boolean
  toggleDarkMode: () => void
  toggleNotifications: () => void
  toggleAutoPlay: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      darkMode: false,
      notifications: false,
      autoPlay: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleAutoPlay: () => set((state) => ({ autoPlay: !state.autoPlay })),
    }),
    {
      name: 'settings-storage',
    }
  )
)