import { AxiosResponse } from "axios";
import { api } from "..";
import * as T from "./type";

export const memberAPI = {
  join: async (
    param: T.MemberJoinParam
  ): Promise<AxiosResponse<T.MemberJoinResponse>> => {
    const res = await api.post("/member", param);

    return res;
  },
  login: async (
    param: T.MemberLoginParam
  ): Promise<AxiosResponse<T.MemberLoginResponse>> => {
    const res = await api.post("/auth/login", param);

    return res;
  },
};
