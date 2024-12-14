import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  userId: number | null;
  setUserId: (user: number | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (user) => set({ userId: user }),
      clearUser: () => set({ userId: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
