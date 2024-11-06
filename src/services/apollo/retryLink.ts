import { RetryLink } from '@apollo/client/link/retry';

let baseDelayTime = 500;

const retryLink = new RetryLink({
  attempts: {
    max: 10,
    retryIf: (error, _operation) => !!error
  },
  delay: (count, operation, error) => {
    // console.log('retry', count, baseDelayTime)
    if (count === 1) {
      return baseDelayTime;
    } else {
      baseDelayTime = baseDelayTime * 1.25;
      return baseDelayTime;
    }
  }
});

export default retryLink;
