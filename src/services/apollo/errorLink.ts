import { fromPromise } from '@apollo/client';

import { onError } from '@apollo/client/link/error';
// import { getIdToken } from '@/views/login/auth';

// const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//   if (graphQLErrors) {
//     for (const err of graphQLErrors) {
//       if (err?.extensions?.code === 'invalid-jwt') {
//         return fromPromise(
//           getIdToken().then((token) => {
//             operation.setContext(({ headers }: { headers: Headers }) => ({
//               headers: {
//                 ...headers,
//                 authorization: 'Bearer ' + token
//               }
//             }));
//             // console.log('operation', operation.getContext())
//             return forward(operation);
//           })
//         ).flatMap(() => forward(operation));
//       }
//     }
//   }
// });
const errorLink = 11;
export default errorLink;
