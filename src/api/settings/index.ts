import { AxiosResponse } from "axios";
import { MemberResponse, MemberSettings } from "@/types/member";
import { apiWithToken } from "..";

export const userAPI = {
  getSettings: async (
    userId: number
  ): Promise<AxiosResponse<MemberResponse>> => {
    return apiWithToken.get(`/member/${userId}`);
  },

  updateSettings: async (
    userId: number,
    settings: MemberSettings
  ): Promise<AxiosResponse<MemberResponse>> => {
    return apiWithToken.put(`/member/${userId}`, settings);
  },
};
