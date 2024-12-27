import { create } from 'zustand'

export interface User {
  name: string
  email: string
  avatar?: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})) 