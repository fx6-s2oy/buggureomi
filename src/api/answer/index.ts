import { AxiosResponse } from "axios";
import { apiWithToken } from "..";
import * as T from "./type";

export const answerAPI = {
  create: async (
    param: T.AnswerCreateParam
  ): Promise<AxiosResponse<T.AnswerCreateResponse>> => {
    const res = await apiWithToken.post("/answer", param);

    return res;
  },
  list: async (
    param: T.GetAnswerListParam
  ): Promise<AxiosResponse<T.GetAnswerListResponse>> => {
    const res = await apiWithToken.get("answer/list", {
      params: param,
    });

    return res;
  },
  detail: async (
    param: T.GetAnswerDetailParam
  ): Promise<AxiosResponse<T.GetAnswerDetailResponse>> => {
    const res = await apiWithToken.get(`answer/${param.answerId}`);

    return res;
  },
  delete: async (param: T.DeleteAnswerParam) => {
    const res = await apiWithToken.delete(`answer/${param.answerId}`);

    return res;
  },
  getSelfReflectionAnswer: async (
    userId: number
  ): Promise<T.SelfReflectionAnswerResponse> => {
    const res = await apiWithToken.get(`/self-reflection/${userId}/list`);
    return res.data;
  },
  listForGuest: async (
    param: T.GetAnswerListForGuestParam
  ): Promise<AxiosResponse<T.GetAnswerListResponse>> => {
    const res = await apiWithToken.get(`guest/answer/list/${param.sqidsId}`, {
      params: param.query,
    });

    return res;
  },
};
