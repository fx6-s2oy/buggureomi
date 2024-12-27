import { create } from "zustand";
import { MainPageInfo } from "@/types/main-page";

interface SnowStore {
  colorCodeList: MainPageInfo["colorCodeList"];
  setColorCodeList: (codeList: MainPageInfo["colorCodeList"]) => void;
  clearColorCodeList: () => void;
}

export const useSnowStore = create<SnowStore>()((set) => ({
  colorCodeList: null,
  setColorCodeList: (codeList) => set({ colorCodeList: codeList }),
  clearColorCodeList: () => set({ colorCodeList: [] }),
}));