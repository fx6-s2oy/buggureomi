export interface Member {
  nickname: string;
}

export interface MemberSettings {
  isPublicVisible: number;
  isCountVisible: number;
  isAuthRequired: number;
}

export interface MemberResponse {
  status: string;
  message: string;
  data: {
    id: string;
    nickname: string;
    email: string;
    isPublicVisible: number;
    isCountVisible: number;
    isAuthRequired: number;
  };
 }
 