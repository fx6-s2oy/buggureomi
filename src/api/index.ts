import axios, { AxiosInstance } from "axios";

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

// No token
export const api: AxiosInstance = createAxios();
