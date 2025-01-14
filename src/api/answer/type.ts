import { BaseResponse } from "../type";
import { Answer } from "@/types/answer";
import { SelfReflection } from "@/types/self-reflection";

export type AnswerCreateParam = {
  questionId: string | number;
  memberId: number | null;
  sender: string;
  content: string;
  colorCode: string;
};

export type AnswerCreateResponse = BaseResponse<{
  nickname: string;
  questionContent: string;
  colorCode: string;
  totalCount: number;
  isPublicVisible: number;
  isCountVisible: number;
  isAuthRequired: number;
}>;

export type SelfReflectionAnswerResponse = BaseResponse<SelfReflection>;

export type GetAnswerListParam = {
  start: number; // page
  limit: number; // count
};
export type GetAnswerListResponse = BaseResponse<{
  currentPage: number;
  list: Answer[] | null;
  nickname: string;
  totalCount: number;
  totalPage: number;
}>;

export type GetAnswerDetailParam = {
  answerId: number;
};
export type GetAnswerDetailResponse = BaseResponse<Answer | null>;

export type DeleteAnswerParam = {
  answerId: number;
};
export type DeleteAnswerResponse = BaseResponse<null>;

export type GetAnswerListForGuestParam = {
  sqidsId: string;
  query: {
    start: number; // page
    limit: number; // count
  };
};
