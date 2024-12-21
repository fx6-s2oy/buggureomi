import { AxiosResponse } from "axios";
import { apiWithToken } from "..";
import * as T from "./type";

export const selfReflection = {
  getCommonQuestions: async (): Promise<AxiosResponse<T.QuestionResponse>> => {
    return apiWithToken.get("/self-reflection/common-question");
  },

  getSelfReflection: async (
    userId: number
  ): Promise<AxiosResponse<T.GetReflectionAnswerResponse>> => {
    return apiWithToken.get(`/self-reflection/${userId}/list`);
  },

  submitReflections: async (
    userId: number,
    reflections: T.ReflectionRequest[]
  ) => {
    return apiWithToken.post(`/self-reflection/${userId}`, {
      reflections,
    });
  },
};
