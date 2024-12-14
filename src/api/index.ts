import axios, {
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

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

// TODO: token 세팅 후 코드 수정 필요
const token = "";
const interceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.Authorization = `Bearer ${token}`;
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
export const apiWithToken = interceptors(api);
