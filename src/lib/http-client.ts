import axios, { AxiosResponse } from 'axios';

interface ResponseBody<T> {
  status: number;
  status_text: string;
  data: T;
}

export class APIResponseMessage<T> {
  private response: AxiosResponse<ResponseBody<T>>;
  private body: ResponseBody<T> | null = null;

  constructor(response: AxiosResponse<ResponseBody<T>>) {
    this.response = response;

    if (this.response && this.response.data) {
      this.body = response.data;
    }
  }

  ok(): boolean {
    return this.response.status === 200;
  }

  data(): T {
    return this.body?.data as T;
  }

  json(): ResponseBody<T> {
    return this.response.data;
  }

  error(): string {
    if (!this.body?.data) {
      return "网络请求错误";
    }

    const errorData = this.body.data as unknown as Record<string, string[]>;
    const errorKeys = Object.keys(errorData);
    if (!errorKeys.length) {
      return "未知错误";
    }

    return errorData[errorKeys[0]][0];
  }
}

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  validateStatus: (status) => {
    return true; // 允许所有状态码，这样可以在 APIResponseMessage 中处理错误
  },
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('@qmauth/token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { httpClient }; 