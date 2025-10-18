/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

function AuthRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = Cookies.get('token')
  const appId = Cookies.get('app-id')
  const userId = Cookies.get('user-id') || Cookies.get('id')
  // Do something before request is sent
  config.headers['X-APIKEY'] = token
  config.headers['APP-ID'] = appId
  config.headers['USER-ID'] = userId
  return config
}

const baseURL = '/api'

const axiosInstance = axios.create({
  baseURL,
})

axiosInstance.interceptors.request.use(AuthRequestInterceptor)

export default axiosInstance
