import { AxiosResponse } from "axios";
import { MemberResponse, MemberSettings } from "@/types/member";
import { api } from "@/api";

export const userInfo = {
  getSettings: async (
    memberId: string
  ): Promise<AxiosResponse<MemberResponse>> => {
    return api.get(`/member/${memberId}`);
  },

  updateSettings: async (
    memberId: string,
    settings: MemberSettings
  ): Promise<AxiosResponse<MemberResponse>> => {
    return api.put(`/member/${memberId}`, settings);
  },
};
