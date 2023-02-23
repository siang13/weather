import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import axiosWrapper from '~/core/axios';

export interface CurrentWeatherData {
  main: {
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  dt: number;
  weather: {
    description: string;
    main: string;
  }[];
}

interface UseGetCurrentWeatherQueryParams {
  data: {
    lat: number;
    lon: number;
  };
  options?: UseQueryOptions<CurrentWeatherData>;
}

export const useGetCurrentWeatherQuery = ({
  data,
  options,
}: UseGetCurrentWeatherQueryParams) => {
  const { lat, lon } = data;

  return useQuery<CurrentWeatherData>(
    ['useGetCurrentWeatherQuery', data],
    async () => {
      const response = await axiosWrapper<CurrentWeatherData>({
        url: process.env.NEXT_PUBLIC_WEATHER_API || '',
        queryParams: {
          lat,
          lon,
        },
      });
      return response;
    },
    options,
  );
};
