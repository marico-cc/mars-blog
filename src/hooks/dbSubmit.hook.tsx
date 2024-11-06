import { useState } from 'react';

export const useDbClick = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  return { btnDisabled, setBtnDisabled };
};
