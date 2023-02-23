import { Dispatch, SetStateAction } from 'react';

export interface SearchHistoryData {
  id: string;
  createdAt: string;
  city: string;
  country: string;
}

export interface SearchHistoryStateProps {
  searchHistory: SearchHistoryData[];
  setSearchHistory: (value: SearchHistoryData[]) => void;
  searchValue:
    | {
        city: string;
        country: string;
      }
    | undefined;
  setSearchValue: Dispatch<
    SetStateAction<
      | {
          city: string;
          country: string;
        }
      | undefined
    >
  >;
}
