import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import API, { HttpMethods } from "../lib/API";

interface ErrorType {
  status: number;
  message: string;
  error?: object;
}

interface ResponseType<T> {
  status: number;
  data: T;
  message: string;
}

type Methods = HttpMethods;

interface GetDataPropType {
  method: Methods;
  endpoint: string;
  body?: object;
  headers?: object;
  params?: object;
}

const useAPI = <T>({
  onSuccess,
  onError,
}: {
  onSuccess?: (resp: ResponseType<T>) => void;
  onError?: (err: AxiosError<ErrorType>) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseType<T>>();
  const [error, setError] = useState<AxiosError<ErrorType>>();
  const cancelTokenSource = useRef(axios.CancelToken.source());

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const handleResponse = (req: Promise<AxiosResponse<ResponseType<T>>>) =>
    req
      .then((resp: AxiosResponse<ResponseType<T>>) => {
        setResponse(resp.data);
        return resp;
      })
      .catch((err: AxiosError<ErrorType>) => {
        setError(err);
        console.error(`API request failed: ${err}`);
      })
      .finally(() => stopLoading());

  const getData = ({
    method,
    endpoint,
    body = {},
    headers = {},
    params = {},
  }: GetDataPropType) => {
    const requestHeaders = {
      ...headers,
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
    };
    startLoading();
    switch (method) {
      case "GET":
        return handleResponse(
          API.get(
            endpoint,
            body,
            requestHeaders,
            params,
            cancelTokenSource.current
          )
        );
      case "POST":
        return handleResponse(
          API.post(endpoint, body, requestHeaders, cancelTokenSource.current)
        );
      case "PATCH":
        return handleResponse(
          API.patch(endpoint, body, requestHeaders, cancelTokenSource.current)
        );
      case "DELETE":
        return handleResponse(
          API.del(endpoint, body, requestHeaders, cancelTokenSource.current)
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (response && onSuccess) onSuccess(response);
  }, [response, onSuccess]);

  useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  return { isLoading, getData, error };
};

export default useAPI;
