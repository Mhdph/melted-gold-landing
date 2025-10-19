/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

function AuthRequestInterceptor(config: InternalAxiosRequestConfig) {
  // Get token from localStorage
  // const token = localStorage.getItem("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtZ3h6eWlndDAwMDBxczB1amc3ZTl2d3AiLCJyb2xlIjpbInVzZXIiXSwiaWF0IjoxNzYwODk1OTc5LCJleHAiOjE3NjA5ODIzNzl9.Xd8mVqOD4RT1OlFPQsZc4PVjY9Ghyk3vqfsNoNriW8E";
  // Add Authorization header if token exists
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
