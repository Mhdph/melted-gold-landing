/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

function AuthRequestInterceptor(config: InternalAxiosRequestConfig) {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

const baseURL = "/api";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(AuthRequestInterceptor);

export default axiosInstance;
