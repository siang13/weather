import { IconProvider, DEFAULT_ICON_CONFIGS } from '@icon-park/react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { AppProps } from 'next/app';
import React, { useState, PropsWithChildren } from 'react';
import { ICON_DEFAULT_SIZE } from './core/constants/theme';

type ConfigureAppProps = Pick<
  AppProps<{ dehydratedState?: DehydratedState }>,
  'pageProps'
> &
  PropsWithChildren;

const ConfigureApp = ({ children, pageProps }: ConfigureAppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps?.dehydratedState}>
        <IconProvider
          value={{ ...DEFAULT_ICON_CONFIGS, size: ICON_DEFAULT_SIZE }}
        >
          <ConfigProvider>{children}</ConfigProvider>
        </IconProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default ConfigureApp;
