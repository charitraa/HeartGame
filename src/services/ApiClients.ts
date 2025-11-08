/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "../constants";
import type { AxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

// ✅ Global error interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again later.";
    const statusCode = error.response?.status || 500;

    return Promise.reject({ message, statusCode });
  }
);

// ✅ Updated: Now supports different types for request and response
class APIClient<TResponse, TRequest = any> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<TResponse[]>(url, config);
    return response.data;
  };

  get = async (params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.get<TResponse>(url, config);
    return response.data;
  };

  post = async (data: TRequest, params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.post<TResponse>(url, data, config);
    return response.data;
  };

  delete = async (params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.delete<TResponse>(url, config);
    return response.data;
  };

  put = async (data: TRequest, params?: any, config?: AxiosRequestConfig) => {
    const url = params ? `${this.endpoint}/${params}` : this.endpoint;
    const response = await axiosInstance.put<TResponse>(url, data, config);
    return response.data;
  };
}

export default APIClient;