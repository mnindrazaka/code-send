import axios, { AxiosResponse } from "axios";

export default class Service {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private handleError(res: AxiosResponse) {
    const { status, message } = res.data;
    return status === "error" ? Promise.reject(message) : res;
  }

  public get<T>(endpoint: string) {
    return axios
      .get(this.baseURL + endpoint)
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public post<T>(endpoint: string, data: any) {
    return axios
      .post(this.baseURL + endpoint, data)
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public put<T>(endpoint: string, data: any) {
    return axios
      .put(this.baseURL + endpoint, data)
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public delete<T>(endpoint: string) {
    return axios
      .delete(this.baseURL + endpoint)
      .then(this.handleError)
      .then(res => res.data as T);
  }
}
