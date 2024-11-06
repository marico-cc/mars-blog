import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const Site: FC = () => {
  const params = useParams();
  const [siteId, setSiteId] = useState(params.id || '');
  console.log(siteId);

  useEffect(() => {}, []);

  return <div>Site details</div>;
};
