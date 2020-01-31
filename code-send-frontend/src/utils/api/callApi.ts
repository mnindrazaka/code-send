import axios, { Method } from 'axios'

const baseURL = 'http://localhost:3000'

export function callApi(url: string, method: Method, data?: any) {
  return axios({
    baseURL,
    url,
    method,
    data
  })
}
