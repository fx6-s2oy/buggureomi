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
    sqidsId: string
  ): Promise<AxiosResponse<T.QuestionGetResponse>> => {
    const res = await apiWithToken.get(`/question/${sqidsId}`);
    return res;
  },
};
