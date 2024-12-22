import * as T from "./type";
import { apiWithToken } from "..";
import { AxiosResponse } from "axios";

export const mainPageApi = {
  async getInfo(): Promise<AxiosResponse<T.MainPageInfoResponse>> {
    const res = await apiWithToken.get(`/main`);
    return res;
  },
};
