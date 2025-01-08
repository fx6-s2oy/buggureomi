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
  id: number;
  nickname: string;
  email: string;
  isPublicVisible: 0 | 1;
  isCountVisible: 0 | 1;
  isAuthRequired: 0 | 1;
  isTermsAgreed: 0 | 1;
}>;

export type GetTokenParam = { code: string };
export type GetTokenResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type RefreshTokenParam = { refreshToken: string };
export type RefreshTokenResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type TermsAgreeParam = {
  isTermsAgreed: 0 | 1;
};
export type TermsAgreeResponse = BaseResponse<null>;
