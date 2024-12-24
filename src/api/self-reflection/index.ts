import { AxiosResponse } from "axios";
import { apiWithToken } from "..";
import * as T from "./type";

export const selfReflection = {
  getCommonQuestions: async (): Promise<AxiosResponse<T.QuestionResponse>> => {
    return apiWithToken.get("/self-reflection/common-question/list");
  },

  getSelfReflection: async (): Promise<
    AxiosResponse<T.GetReflectionAnswerResponse>
  > => {
    return apiWithToken.get(`/self-reflection/list`);
  },

  submitReflections: async ({ reflections }: T.ReflectionParam) => {
    return apiWithToken.post(`/self-reflection`, { reflections });
  },
};
