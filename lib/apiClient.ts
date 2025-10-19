import { AxiosRequestConfig } from "axios";

import axios from "./axios";
import { BaseResponse } from "./response.interface";

class ApiClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get<T>(url: string, config: AxiosRequestConfig = {}) {
    return axios
      .get<T>(`${this.endpoint}${url}`, { ...config })
      .then((res) => res.data);
  }

  post<T>(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return axios
      .post<any>(`${this.endpoint}${url}`, data, { ...config })
      .then((res) => res.data);
  }

  patch<T>(url: string, data = {}, config: AxiosRequestConfig = {}) {
    return axios
      .patch<T>(`${this.endpoint}${url}`, data, { ...config })
      .then((res) => res.data);
  }

  delete<T>(url: string, config: AxiosRequestConfig = {}) {
    return axios
      .delete<T>(`${this.endpoint}${url}`, { ...config })
      .then((res) => res.data);
  }
}

export default ApiClient;
