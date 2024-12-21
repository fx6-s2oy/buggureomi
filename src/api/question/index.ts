import { AxiosResponse } from "axios";
import { apiWithToken } from "..";
import * as T from "./type";

export const questionAPI = {
  create: async (
    param: T.QuestionCreateParam
  ): Promise<AxiosResponse<T.QuestionCreateResponse>> => {
    const res = await apiWithToken.post("/question", param);

    return res;
  },

  getQuestion: async (
    userId: number
  ): Promise<AxiosResponse<T.QuestionGetResponse>> => {
    const res = await apiWithToken.get(`/question/${userId}`);
    return res;
  },
};
