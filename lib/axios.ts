/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

function AuthRequestInterceptor(config: InternalAxiosRequestConfig) {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

function AuthResponseInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    // Clear token and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    window.location.href = "/";
  }
  return Promise.reject(error);
}

const baseURL = "/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(AuthRequestInterceptor);
axiosInstance.interceptors.response.use(
  (response) => response,
  AuthResponseInterceptor
);

export default axiosInstance;
