import { Typography, Input, Form, Button, Alert } from 'antd';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

import { useSearchWeatherForm } from '../hooks/useSearchWeatherForm';
import { SearchHistoryStateProps } from '../types';
import { useGetCurrentWeatherQuery } from '~/api/useGetCurrentWeatherQuery';
import { useGetGeocodingQuery } from '~/api/useGetGeocodingQuery';

const { Text, Title } = Typography;

type WeatherDisplayProps = SearchHistoryStateProps;

const WeatherDisplay = ({
  searchHistory,
  searchValue,
  setSearchHistory,
  setSearchValue,
}: WeatherDisplayProps) => {
  const { control, onSubmit, reset, watch } = useSearchWeatherForm({
    setSearchValue,
    searchHistory,
    setSearchHistory,
  });
  const [city, country] = watch(['city', 'country']);
  const { data: geocoding = [], isLoading: isGeocodingLoading } =
    useGetGeocodingQuery({
      data: searchValue,
      options: {
        enabled: !!searchValue,
      },
    });
  const [firstGeocoding] = geocoding;
  const { data: currentWeather, isFetching: isCurrentWeatherFetching } =
    useGetCurrentWeatherQuery({
      data: {
        lat: firstGeocoding?.lat,
        lon: firstGeocoding?.lon,
      },
      options: {
        enabled: geocoding.length > 0 && !isGeocodingLoading,
      },
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Form
          autoComplete="off"
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
          onFinish={onSubmit}
        >
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Input onChange={onChange} placeholder="City" value={value} />
              )}
            />
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                <Input
                  onChange={onChange}
                  placeholder="Country"
                  value={value}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4">
            <Button
              className="w-full"
              disabled={!(country && city)}
              htmlType="submit"
              type="primary"
            >
              Search
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                setSearchValue(undefined);
                reset();
              }}
              type="primary"
            >
              Clear
            </Button>
          </div>
        </Form>
      </div>
      {currentWeather && (
        <div className="flex flex-col">
          <Text>{`${firstGeocoding.state}, ${firstGeocoding?.country}`}</Text>
          <Title className="m-0">{currentWeather?.weather[0].main}</Title>
          <div>
            <Text className="inline-block w-40">Description:</Text>
            <Text>{currentWeather?.weather[0].description}</Text>
          </div>
          <div>
            <Text className="inline-block w-40">Temperature:</Text>
            <Text>{`${currentWeather?.main.temp_min}°C ~ ${currentWeather?.main.temp_max}°C`}</Text>
          </div>
          <div>
            <Text className="inline-block w-40">Humidity:</Text>
            <Text>{currentWeather?.main.humidity}%</Text>
          </div>
          <div>
            <Text className="inline-block w-40">Time:</Text>
            <Text>
              {dayjs.unix(currentWeather?.dt).format('YYYY-MM-DD hh:mm a')}
            </Text>
          </div>
        </div>
      )}
      {!!(!currentWeather && searchValue && !isCurrentWeatherFetching) && (
        <Alert message="Not Found" type="error" />
      )}
    </div>
  );
};

export default WeatherDisplay;
