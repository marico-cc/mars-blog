import { ApolloClient, HttpLink, InMemoryCache, from, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getAuthToken } from '@/utils/utils';
function createApolloClient() {
  const { VITE_APP_GRAPHQL_WSS_URL, VITE_APP_GRAPHQL_HTTPS_URL } = import.meta.env;

  const getToken = () => `bearer ${getAuthToken()}`;

  const httpLink = new HttpLink({
    uri: VITE_APP_GRAPHQL_HTTPS_URL
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token
      }
    };
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: VITE_APP_GRAPHQL_WSS_URL,
      lazy: true,
      keepAlive: 10000,
      connectionParams: async () => {
        return {
          headers: {
            authorization: getToken()
          }
        };
      }
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link: from([splitLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      query: {
        fetchPolicy: 'no-cache'
      }
    },
    onError: (error) => {
      // Handle the error globally
      console.error('Global error:', error);
    }
  });
}

const apolloClient = createApolloClient();

export const useApollo = () => apolloClient;
