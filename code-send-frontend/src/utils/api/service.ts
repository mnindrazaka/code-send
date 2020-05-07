import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getToken } from "utils/auth";

export default class Service {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        authorization: getToken() ? `Bearer ${getToken()}` : undefined
      }
    };
  }

  public get<T>(endpoint: string) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.get(
          this.baseURL + endpoint,
          this.getConfig()
        );
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  public post<T>(endpoint: string, data: any) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.post(
          this.baseURL + endpoint,
          data,
          this.getConfig()
        );
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  public put<T>(endpoint: string, data: any) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.put(
          this.baseURL + endpoint,
          data,
          this.getConfig()
        );
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  public delete<T>(endpoint: string) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await axios.delete(
          this.baseURL + endpoint,
          this.getConfig()
        );
        resolve(response.data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }
}
