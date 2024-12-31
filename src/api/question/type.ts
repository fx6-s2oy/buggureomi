import { BaseResponse } from "../type";

export type QuestionCreateParam = {
  memberId: number;
  content: string;
  isPublicVisible: number;
  isCountVisible: number;
  isAuthRequired: number;
};

export type QuestionCreateResponse = BaseResponse<{
  questionId: number;
  memberId: number;
}>;

export type QuestionGetResponse = BaseResponse<{
  questionId: number;
  nickname: string;
  content: string;
  isPublicVisible: 0 | 1;
  isCountVisible: 0 | 1;
  isAuthRequired: 0 | 1;
}>;
