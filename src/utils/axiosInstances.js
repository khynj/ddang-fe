import axios from 'axios'

const successHandler = response => {
  console.log(response.config.url, response)
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
      : import.meta.env.VITE_DEV_SERVER_URL
  }/ai`,
  maxBodyLength: Infinity,
  withCredentials: true,
})

axios_ai.interceptors.response.use(successHandler, errorHandler)

export { axios_spring, axios_ai }
