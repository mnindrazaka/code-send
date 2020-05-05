import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getToken } from "utils/auth";

export default class Service {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private handleError(res: AxiosResponse) {
    const { status, message } = res.data;
    return status === "error" ? Promise.reject(message) : res;
  }

  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    };
  }

  public get<T>(endpoint: string) {
    return axios
      .get(this.baseURL + endpoint, this.getConfig())
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public post<T>(endpoint: string, data: any) {
    return axios
      .post(this.baseURL + endpoint, data, this.getConfig())
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public put<T>(endpoint: string, data: any) {
    return axios
      .put(this.baseURL + endpoint, data, this.getConfig())
      .then(this.handleError)
      .then(res => res.data as T);
  }

  public delete<T>(endpoint: string) {
    return axios
      .delete(this.baseURL + endpoint, this.getConfig())
      .then(this.handleError)
      .then(res => res.data as T);
  }
}
