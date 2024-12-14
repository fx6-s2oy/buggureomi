import { AxiosResponse } from "axios";
import { api } from "..";
import * as T from "./type";

export const answerAPI = {
  create: async (
    param: T.AnswerCreateParam
  ): Promise<AxiosResponse<T.AnswerCreateResponse>> => {
    const res = await api.post("/answer", param);

    return res;
  },
  list: async (
    param: T.GetAnswerListParam
  ): Promise<AxiosResponse<T.GetAnswerListResponse>> => {
    const res = await api.get(`answer/${param.userId}/list`);

    return res;
  },
  detail: async (
    param: T.GetAnswerDetailParam
  ): Promise<AxiosResponse<T.GetAnswerListResponse>> => {
    const res = await api.get(`answer/${param.answerId}`);

    return res;
  },
  delete: async (param: T.DeleteAnswerParam) => {
    const res = await api.delete(`answer/${param.answerId}`);

    return res;
  },
  getSelfReflectionAnswer: async (
    userId: number
  ): Promise<T.SelfReflectionAnswerResponse> => {
    const res = await api.get(`/self-reflection/${userId}/list`);
    return res.data;
  },
};
