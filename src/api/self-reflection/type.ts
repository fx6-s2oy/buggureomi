import { BaseResponse } from "@/api/type";

export type ReflectionQuestion = {
  id: number;
  content: string;
};

export type ReflectionRequest = {
  questionId: number;
  content: string;
};

export type QuestionResponse = BaseResponse<ReflectionQuestion[]>;

export interface SubmitReflectionResponse {
  status: "OK" | "BAD_REQUEST" | "NOT_FOUND";
  message: string;
  data: {
    reflections: {
      questionId: number;
      content: string;
    }[];
  };
}

export interface ReflectionAnswer {
  commonQuestionsId: number;
  content: string;
}

export interface GetReflectionResponse {
  status: "OK" | "BAD_REQUEST" | "NOT_FOUND";
  message: string;
  data: ReflectionAnswer[];
}

export type GetReflectionAnswerResponse = BaseResponse<ReflectionAnswer[]>;
