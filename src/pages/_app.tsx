import '~/styles/global.css';

import { DehydratedState } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import ConfigureApp from '~/ConfigureApp';

const App = ({
  Component,
  pageProps,
}: AppProps<{ dehydratedState?: DehydratedState }>) => (
  <ConfigureApp pageProps={pageProps}>
    <Component {...pageProps} />
  </ConfigureApp>
);

export default App;
