import axios from 'axios'

const axios_ = axios.create({
  baseURL: 'https://0ccd2f2d-2d68-46df-b4e6-ca965e000461.mock.pstmn.io/',
  headers: { 'X-Custom-Header': 'foobar' },
})

export default axios_
