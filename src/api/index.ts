import axios, {
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import * as T from "@/api/member/type";

import { tokenCookie } from "@/lib/authToken";

const BASE_URL: string = import.meta.env.VITE_API_HOST;
const VERSION = import.meta.env.VITE_API_VERSION;

const HEADERS: Record<string, string | boolean> = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=utf-8",
  withCredentials: true,
};

const createAxios = (): AxiosInstance => {
  return axios.create({ baseURL: BASE_URL + VERSION, headers: HEADERS });
};

const renewToken = async (
  param: T.RefreshTokenParam
): Promise<AxiosResponse<T.RefreshTokenResponse>> => {
  const res = await api.post("auth/reissue", param);

  return res;
};
const refreshAccessToken = async () => {
  const refreshToken = tokenCookie.getCookie("refreshToken");

  if (!refreshToken) {
    localStorage.removeItem("user-storage");

    throw new Error("There is no refresh token");
  }

  await renewToken({ refreshToken }).then((res) => {
    const data = res.data;

    if (data.status === "OK") {
      tokenCookie.setCookie("accessToken", data.data.accessToken, 0.25);
      tokenCookie.setCookie("refreshToken", data.data.refreshToken, 1);
    } else {
      throw new Error(data.status);
    }
  });
};

const interceptors = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL + VERSION,
    headers: HEADERS,
  });
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      const accessToken = tokenCookie.getCookie("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        await refreshAccessToken();
        config.headers.Authorization = `Bearer ${tokenCookie.getCookie(
          "accessToken"
        )}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

// No token
export const api = createAxios();

// With token
export const apiWithToken = interceptors();
