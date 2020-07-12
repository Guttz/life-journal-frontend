import axios, { AxiosInstance } from 'axios';
import fetch from 'isomorphic-unfetch';

import { getToken } from '../../utils/localStorage';

export default class HTTPClient {
  private readonly domain: string;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.domain = process.env.REACT_APP_BACK_HOST ? process.env.REACT_APP_BACK_HOST : 'http://localhost:4000';

    this.axiosInstance = axios.create({
      baseURL: this.domain,
      timeout: 1000,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  async get<T>(url: string): Promise<T> {
    const res = await fetch(this.domain + url);
    return await res.json();
  }

  async delete<T>(url: string): Promise<T> {
    const token = getToken();
    return await this.axiosInstance.delete(url, {
      headers: {
        Authorization: token,
      },
    });
  }

  async post<T>(url: string, data: {}): Promise<T> {
    const token = getToken();
    return await this.axiosInstance.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
  }
}
