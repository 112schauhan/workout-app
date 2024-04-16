// pages/_app.tsx
import { ApolloProvider } from '@apollo/client';
// import client from '@/lib/apolloClient'; // Path to your Apollo Client file
import type { AppProps } from 'next/app';
import client from '../lib/graphql';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
