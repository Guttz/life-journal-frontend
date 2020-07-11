import axios, { AxiosInstance } from 'axios';
import fetch from 'isomorphic-unfetch';

import { getToken, setToken } from '../../utils/localStorage';

export default class HTTPClient {
  private readonly domain: string;
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.domain = process.env.REACT_APP_BACK_HOST ? process.env.REACT_APP_BACK_HOST : 'http://localhost:4000';

    // [Dev] Temporarily setting the JWT token
    setToken(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5OSwidXNlcm5hbWUiOiJndXN0YXZvIiwiaWF0IjoxNTk0NDE1ODgzLCJleHAiOjE1OTQ1MDIyODN9.sgJHFvo_xaLIS9JvJ7KIbzz31Ilkujm2dPLrnDv-brw',
    );

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
