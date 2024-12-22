import { BaseResponse } from "../type";

export type UpdateNicknameParam = {
  nickname: string;
};

export type UpdateNicknameResponse = BaseResponse<{
  status: string;
  message: string;
}>;
