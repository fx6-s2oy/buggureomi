import { BaseResponse } from "../type";

export type MemberJoinParam = {
  nickname: string;
  password: string;
  email: `${string}@${string}`;
};

export type MemberJoinResponse = BaseResponse<{ id: number }>;

export type MemberLoginParam = {
  nickname: string;
  password: string | number;
};

export type MemberLoginResponse = BaseResponse<{ id: number }>;

export type MemberSearchResponse = BaseResponse<{
  id: string;
  nickname: string;
  email: string;
  isPublicVisible: 0 | 1;
  isCountVisible: 0 | 1;
  isAuthRequired: 0 | 1;
}>;
