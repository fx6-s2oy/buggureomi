import { AxiosResponse } from "axios";
import { api } from "..";
import * as T from "./type";

export const questionAPI = {
  create: async (
    param: T.QuestionCreateParam
  ): Promise<AxiosResponse<T.QuestionCreateResponse>> => {
    const res = await api.post("/question", param);

    return res;
  },

  getQuestion: async (
    userId: number
  ): Promise<AxiosResponse<T.QuestionGetResponse>> => {
    const res = await api.get(`/question/${userId}`);
    return res;
  },
};
