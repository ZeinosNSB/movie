import axios from 'axios'

import { DOMAIN_API, TOKEN } from '@/utils/config'

const axiosInstance = axios.create({
  baseURL: DOMAIN_API,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => ({ data: response.data }),
  error => Promise.reject(error)
)

export default axiosInstance
