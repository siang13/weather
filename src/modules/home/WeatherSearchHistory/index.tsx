import { Delete, Search } from '@icon-park/react';
import { Typography, Button } from 'antd';

import { SearchHistoryStateProps } from '../types';
import Divider from '~/components/Divider';

const { Text, Title } = Typography;

type WeatherSearchHistoryProps = SearchHistoryStateProps;

const WeatherSearchHistory = ({
  searchHistory,
  setSearchHistory,
  setSearchValue,
}: WeatherSearchHistoryProps) => {
  const isEmpty = searchHistory.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title className="text-xl">Search History</Title>
        <Divider />
      </div>
      <div>
        {isEmpty ? (
          searchHistory.map(({ city, country, createdAt, id }, index) => (
            <div key={id}>
              <div className="flex items-center justify-between py-4">
                <Title className="text-sm font-normal" level={1}>{`${
                  index + 1
                }. ${city}, ${country}`}</Title>
                <div className="flex items-center gap-2 md:gap-4">
                  <Text>{createdAt}</Text>
                  <Button
                    onClick={() => {
                      setSearchValue({ city, country });
                    }}
                    shape="circle"
                    type="primary"
                  >
                    <Search />
                  </Button>
                  <Button
                    onClick={() =>
                      setSearchHistory(
                        searchHistory.filter((history) => history.id !== id),
                      )
                    }
                    shape="circle"
                    type="primary"
                  >
                    <Delete />
                  </Button>
                </div>
              </div>
              <Divider />
            </div>
          ))
        ) : (
          <Text className="block w-full text-center">No Record</Text>
        )}
      </div>
    </div>
  );
};

export default WeatherSearchHistory;
