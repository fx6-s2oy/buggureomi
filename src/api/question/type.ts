import { BaseResponse } from "../type";

export type QuestionCreateParam = {
  memberId: number;
  content: string;
  isPublicVisible: number;
  isCountVisible: number;
  isAuthRequired: number;
  isCommonQuestion: number;
};

export type QuestionCreateResponse = BaseResponse;
