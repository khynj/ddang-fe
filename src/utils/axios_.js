import { useAuth } from '@/contexts/AuthContext'
import axios from 'axios'

const axios_ = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  maxBodyLength: Infinity,
  withCredentials: true,
})

axios_.interceptors.response.use(
  response => {
    console.log('response', response)
    return response
  },
  error => {
    if (error.status == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axios_
