import axios from 'axios'

const axios_ = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  maxBodyLength: Infinity,
  withCredentials: true,
})

export default axios_
