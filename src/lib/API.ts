import axios, { AxiosRequestConfig, CancelTokenSource, Method } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosAPI = axios.create({
  baseURL,
});

export enum HttpMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const apiRequest = (
  method: Method,
  url: string,
  request: object = {},
  headers: object = {},
  params: object = {},
  cancelToken: CancelTokenSource | null = null
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data: request,
    params,
    cancelToken: cancelToken ? cancelToken.token : undefined,
  };

  return axiosAPI(config)
    .then((res) => Promise.resolve(res))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        // handle error
        console.error(`API request failed: ${err}`);
      }
      return Promise.reject(err);
    });
};

const get = (
  url: string,
  body: object,
  headers: object,
  params: object,
  cancelToken: CancelTokenSource | null = null
) => apiRequest(HttpMethods.GET, url, body, headers, params, cancelToken);

const post = (
  url: string,
  request: object,
  headers: object,
  cancelToken: CancelTokenSource | null = null
) => apiRequest(HttpMethods.POST, url, request, headers, {}, cancelToken);

const patch = (
  url: string,
  request: object,
  headers: object,
  cancelToken: CancelTokenSource | null = null
) => apiRequest(HttpMethods.PATCH, url, request, headers, {}, cancelToken);

const del = (
  url: string,
  request: object,
  headers: object,
  cancelToken: CancelTokenSource | null = null
) => apiRequest(HttpMethods.DELETE, url, request, headers, {}, cancelToken);

const API = {
  get,
  post,
  patch,
  del,
};

export default API;
