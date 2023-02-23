import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import axiosWrapper from '~/core/axios';

interface GeocodingData {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state: string;
}

interface UseGetGeocodingQueryParams {
  data?: {
    city: string;
    country: string;
  };
  options?: UseQueryOptions<GeocodingData[]>;
}

export const useGetGeocodingQuery = ({
  data,
  options,
}: UseGetGeocodingQueryParams) => {
  const { city, country } = data || {};

  return useQuery<GeocodingData[]>(
    ['useGetGeocodingQuery', data],
    async () => {
      const response = await axiosWrapper<GeocodingData[]>({
        url: process.env.NEXT_PUBLIC_GEOCODING_API || '',
        queryParams: {
          q: `${city},,${country}`,
        },
      });
      return response;
    },
    options,
  );
};
