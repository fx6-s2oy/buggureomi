import { AxiosResponse } from "axios";
import { api } from "..";
import * as T from "./type";

export const selfReflection = {
  getCommonQuestions: async (): Promise<AxiosResponse<T.QuestionResponse>> => {
    return api.get("/self-reflection/common-question");
  },

  getSelfReflection: async (
    userId: number
  ): Promise<AxiosResponse<T.GetReflectionAnswerResponse>> => {
    return api.get(`/self-reflection/${userId}/list`);
  },

  submitReflections: async (
    userId: number,
    reflections: T.ReflectionRequest[]
  ) => {
    return api.post(`/self-reflection/${userId}`, {
      reflections,
    });
  },
};
