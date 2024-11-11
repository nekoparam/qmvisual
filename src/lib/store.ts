import { create } from 'zustand';
// import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';

export type UserStore = {
    email: string;
}

// Store for user
export const useUserStore = create(persist<UserStore>(set => ({
    // initial state
    email: '',

    setEmail: (email: string) => set({ email }),


}),
 { name: 'user' }));