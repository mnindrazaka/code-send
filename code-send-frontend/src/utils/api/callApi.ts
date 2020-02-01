import axios, { Method } from 'axios'

const baseURL = 'https://code-send.herokuapp.com'

export function callApi(url: string, method: Method, data?: any) {
  return axios({
    baseURL,
    url,
    method,
    data
  })
}
