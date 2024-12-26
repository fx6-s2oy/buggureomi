import { AxiosResponse } from "axios";
import { api, apiWithToken } from "..";
import * as T from "./type";

export const memberAPI = {
  emailJoin: async (
    param: T.MemberJoinParam
  ): Promise<AxiosResponse<T.MemberJoinResponse>> => {
    const res = await api.post("/member", param);

    return res;
  },
  ssoLogin: async (type: "kakao") => {
    // COMMENT & TODO: google, naver 등 추가 가능성 있음
    if (type === "kakao") {
      window.location.href = import.meta.env.VITE_API_KAKAO_LOGIN;
    }
  },
  emailLogin: async (
    param: T.MemberLoginParam
  ): Promise<AxiosResponse<T.MemberLoginResponse>> => {
    // COMMENT: 구버전 로그인 방법으로 리뉴얼 필요
    const res = await api.post("/auth/login", param);

    return res;
  },
  search: async (): Promise<AxiosResponse<T.MemberSearchResponse>> => {
    const res = await apiWithToken.get(`/member`);

    return res;
  },
  getToken: async (
    param: T.GetTokenParam
  ): Promise<AxiosResponse<T.GetTokenResponse>> => {
    const res = await api.get("auth/issue", {
      params: param,
    });

    return res;
  },
};
