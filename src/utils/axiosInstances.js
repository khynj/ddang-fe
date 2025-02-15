import axios from 'axios'
import { UTCToDate } from './date'

const changeToLocalTime = obj => {
  for (const key in obj) {
    if (obj[key] instanceof Object) {
      changeToLocalTime(obj[key])
    } else {
      const lowerKey = key.toLocaleLowerCase()
      if (lowerKey.includes('time') || lowerKey.includes('date')) {
        if (!obj[key]) continue
        obj[key] = UTCToDate(obj[key]).toString()
      }
    }
  }
}

const successHandler = response => {
  console.log(response.config.url, response)
  // change times to local time(recursive)
  changeToLocalTime(response)

  return response
}

const errorHandler = error => {
  console.log('error', error)
  if (error.status == 401 && error.config.url !== '/auth/login') {
    window.location.href = '/welcome'
  }
  return Promise.reject(error)
}

const axios_spring = axios.create({
  baseURL: `${
    import.meta.env.PROD
      ? import.meta.env.VITE_SERVER_URL
      : import.meta.env.VITE_DEV_SERVER_URL
  }/api`,
  maxBodyLength: Infinity,
  withCredentials: true,
})

axios_spring.interceptors.response.use(successHandler, errorHandler)

const axios_ai = axios.create({
  baseURL: `${
    import.meta.env.PROD
      ? import.meta.env.VITE_SERVER_URL
      : import.meta.env.VITE_DEV_AI_URL
  }/ai`,
  // baseURL: 'http://70.12.115.57:0000',
  // baseURL: 'http://70.12.115.57:8001/ai',
  // baseURL: 'http://localhost:5173/ai',
  // baseURL: import.meta.env.VITE_SERVER_URL + '/ai',
  maxBodyLength: Infinity,
  withCredentials: true,
})

axios_ai.interceptors.response.use(successHandler, errorHandler)

export { axios_spring, axios_ai }
