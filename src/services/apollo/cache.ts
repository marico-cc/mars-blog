import { InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  addTypename: true
});

export default cache;
