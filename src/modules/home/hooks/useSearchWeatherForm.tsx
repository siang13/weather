import dayjs from 'dayjs';
import uniqueId from 'lodash/uniqueId';
import { useForm } from 'react-hook-form';

import { SearchHistoryStateProps } from '../types';
import { FormReturn } from '~/core/types';

interface SearchWeatherFormData {
  city: string;
  country: string;
}

type UseSearchWeatherFormParams = Omit<SearchHistoryStateProps, 'searchValue'>;

export const useSearchWeatherForm = ({
  searchHistory,
  setSearchHistory,
  setSearchValue,
}: UseSearchWeatherFormParams): FormReturn<SearchWeatherFormData> => {
  const formHandler = useForm<SearchWeatherFormData>({
    defaultValues: {
      city: '',
      country: '',
    },
  });
  const onSubmit = (data: SearchWeatherFormData) => {
    setSearchValue(data);
    setSearchHistory([
      {
        id: uniqueId(),
        ...data,
        createdAt: dayjs().format('h:mm:ss a'),
      },
      ...searchHistory,
    ]);
  };

  return {
    ...formHandler,
    isSubmitting: false,
    onSubmit: formHandler.handleSubmit(onSubmit),
  };
};
