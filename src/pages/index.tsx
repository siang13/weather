import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';

import Layout from '~/components/Layout';
import { useLocalStorage } from '~/core/hooks/useLocalStorage';
import WeatherDisplay from '~/modules/home/WeatherDisplay';
import { SearchHistoryData } from '~/modules/home/types';

const WeatherSearchHistory = dynamic(
  () => import('~/modules/home/WeatherSearchHistory'),
  {
    ssr: false,
  },
);

const Home: NextPage = () => {
  const [searchHistory, setSearchHistory] = useLocalStorage<
    SearchHistoryData[]
  >('searchHistory', []);
  const [searchValue, setSearchValue] = useState<
    { city: string; country: string } | undefined
  >(undefined);

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta content="Weather" name="keywords" />
        <meta content="Weather" name="description" />
      </Head>
      <Layout title="Today's Weather">
        <div className="flex flex-col gap-4">
          <WeatherDisplay
            searchHistory={searchHistory}
            searchValue={searchValue}
            setSearchHistory={setSearchHistory}
            setSearchValue={setSearchValue}
          />
          <WeatherSearchHistory
            searchHistory={searchHistory}
            searchValue={searchValue}
            setSearchHistory={setSearchHistory}
            setSearchValue={setSearchValue}
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;
