export interface BaseResponse<T extends object | null = null> {
  status: "OK" | "BAD_REQUEST" | "NOT_FOUND";
  message: string;
  data: T;
}
