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
