import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type AxiosWrapperArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  queryParams?: QueryParams;
  data?: unknown;
  headers?: AxiosRequestConfig['headers'];
};

export const axiosWrapper = async <T>({
  data,
  headers = {},
  method = 'GET',
  queryParams = {},
  url,
}: AxiosWrapperArgs): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    params: {
      ...queryParams,
      appid: process.env.NEXT_PUBLIC_API_KEY,
    },
    data,
    headers,
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? error;
    } else {
      throw error;
    }
  }
};

export default axiosWrapper;
