import axios from 'axios'

const axios_ = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  maxBodyLength: Infinity,
  withCredentials: true,
})

axios_.interceptors.response.use(
  response => {
    console.log(response.config.url, response)
    return response
  },
  error => {
    console.log('error', error)
    if (error.status == 401 && error.config.url !== '/auth/login') {
      window.location.href = '/welcome'
    }
    return Promise.reject(error)
  },
)

export default axios_
