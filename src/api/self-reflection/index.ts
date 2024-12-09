import { AxiosResponse } from "axios";
import { api } from "..";
import * as T from "./type";

export const selfReflection = {
  getCommonQuestions: async (
    memberId: string
  ): Promise<AxiosResponse<T.QuestionResponse>> => {
    return api.get("/self-reflection/common-question", {
      params: { memberId },
    });
  },

  getSelfReflection: async (
    memberId: string
  ): Promise<AxiosResponse<T.GetReflectionAnswerResponse>> => {
    return api.get(`/self-reflection/${memberId}/list`);
  },

  submitReflections: async (
    memberId: string,
    reflections: T.ReflectionRequest[]
  ) => {
    return api.post(`/self-reflection/${memberId}`, {
      reflections,
    });
  },
};
