import { PropsWithChildren, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import Router from '@/routers/index';
import { ConfigProvider, theme } from 'antd';
import AuthRouter from '@/routers/utils/AuthRouter';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/services/apollo';

export interface AppProps {
  darkMode?: boolean;
}
export const App = (props: AppProps) => {
  const apolloClient = useApollo();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#516e72'
          // colorBorder: '#04716d',
          // colorBorderBg: '#333334'
        }
      }}>
      <ApolloProvider client={apolloClient}>
        <HashRouter>
          <Router />
        </HashRouter>
      </ApolloProvider>
    </ConfigProvider>
  );
};
