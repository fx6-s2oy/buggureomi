import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MemberSearchResponse } from "@/api/member/type";

interface UserStore {
  userInfo: MemberSearchResponse["data"] | null;
  setUserInfo: (info: MemberSearchResponse["data"]) => void;
  updateUserInfo: (updateInfo: Partial<MemberSearchResponse["data"]>) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info: MemberSearchResponse["data"]) =>
        set({ userInfo: info }),
      updateUserInfo: (updatedInfo: Partial<MemberSearchResponse["data"]>) =>
        set((state) => ({
          userInfo: state.userInfo
            ? { ...state.userInfo, ...updatedInfo }
            : null,
        })),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
