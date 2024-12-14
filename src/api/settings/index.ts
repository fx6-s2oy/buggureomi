import { AxiosResponse } from "axios";
import { MemberResponse, MemberSettings } from "@/types/member";
import { api } from "@/api";

export const userInfo = {
  getSettings: async (
    userId: number
  ): Promise<AxiosResponse<MemberResponse>> => {
    return api.get(`/member/${userId}`);
  },

  updateSettings: async (
    userId: number,
    settings: MemberSettings
  ): Promise<AxiosResponse<MemberResponse>> => {
    return api.put(`/member/${userId}`, settings);
  },
};
