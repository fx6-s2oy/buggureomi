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

const renewToken = async (
  param: T.RefreshTokenParam
): Promise<AxiosResponse<T.RefreshTokenResponse>> => {
  const res = await api.post("auth/reissue", param);

  return res;
};
let refreshTokenPromise: Promise<void> | null = null;
const refreshAccessToken = async () => {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  refreshTokenPromise = (async () => {
    try {
      const refreshToken = tokenCookie.getCookie("refreshToken");

      if (!refreshToken) {
        throw new Error("There is no refresh token");
      }

      const { data } = await renewToken({ refreshToken });

      if (data.status === "OK") {
        tokenCookie.setCookie("accessToken", data.data.accessToken, 0.25);
        tokenCookie.setCookie("refreshToken", data.data.refreshToken, 1);
      } else if (data.status === "NOT_FOUND") {
        // 해당하는 유저 정보가 없습니다.
        throw new Error(data.message);
      } else {
        // 통신 에러
        throw new Error(data.message);
      }
    } finally {
      refreshTokenPromise = null;
    }
  })();

  return refreshTokenPromise;
};

const createAxiosInstance = (withToken: boolean = false): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL + VERSION,
    headers: HEADERS,
  });

  if (withToken) {
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
          config.headers = new AxiosHeaders();
        }

        const accessToken = tokenCookie.getCookie("accessToken");
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          try {
            await refreshAccessToken();
            config.headers.Authorization = `Bearer ${tokenCookie.getCookie(
              "accessToken"
            )}`;
          } catch {
            tokenCookie.deleteCookie("refreshToken");
            localStorage.removeItem("user-storage");
            localStorage.removeItem("snow-storage");
            window.location.href = "/member-login";
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return instance;
};

// No token
export const api = createAxiosInstance();

// With token
export const apiWithToken = createAxiosInstance(true);
