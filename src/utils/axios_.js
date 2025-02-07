import axios from 'axios'

const axios_ = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  maxBodyLength: Infinity,
})

export default axios_
