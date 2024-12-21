import { BaseResponse } from "../type";

export type QuestionCreateParam = {
  memberId: number;
  content: string;
  isPublicVisible: number;
  isCountVisible: number;
  isAuthRequired: number;
  isCommonQuestion: number;
};

export type QuestionCreateResponse = BaseResponse<{
  questionId: number;
  memberId: number;
}>;

export type QuestionGetResponse = BaseResponse<{
  questionId: number;
  nickname: string;
  content: string;
  is_public_visible: 0 | 1;
  is_count_visible: 0 | 1;
  is_Auth_Required: 0 | 1;
}>;
