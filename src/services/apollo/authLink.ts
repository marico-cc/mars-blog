import { ApolloLink, fromPromise } from '@apollo/client';
// import { getIdToken } from '@/views/login/auth';

type Headers = {
  authorization?: string;
};

// const authLink = new ApolloLink((operation, forward) => {
// return fromPromise(
//   getIdToken().then((token) => {
//     operation.setContext(({ headers }: { headers: Headers }) => ({
//       headers: {
//         ...headers,
//         authorization: 'Bearer ' + token
//       }
//     }));
//   })
// ).flatMap(() => forward(operation));
// });
const authLink = 11;
export default authLink;
