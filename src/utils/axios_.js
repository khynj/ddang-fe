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
  },
  error => {
    console.error('error : ', error)
    console.error('error status : ', error.status)
    console.error('error status ==401', error.status == 401)
    if (error.status == 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default axios_
