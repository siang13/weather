import axios, { AxiosRequestConfig } from 'axios';

import { REQUEST_TIMEOUT, API_URI } from '~/core/config';

export const fetchData =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers'],
  ): (() => Promise<TData>) =>
  async () => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options as AxiosRequestConfig['headers']),
      },
      baseURL: API_URI,
      data: {
        query,
        variables,
      },
      withCredentials: true,
      timeout: REQUEST_TIMEOUT,
    };
    try {
      const { data } = await axios(config);

      if (data.errors) {
        const [{ extensions = {}, message = '' }] = data.errors;
        const error = new Error(message);
        error.code = extensions?.code;
        error.response = extensions?.response;
        const { statusCode } = extensions?.response || {};
        error.response.status = statusCode;
        error.response.statusText = message;

        if (statusCode === 500) {
          // toast 500
        }

        throw error;
      }

      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // toast Unknown error occurred
      }
      throw error;
    }
  };
