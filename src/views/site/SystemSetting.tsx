import { FC } from 'react';
import { FormFactory } from '@/components/form';

export const SystemSetting: FC = () => {
  return (
    <div>
      <FormFactory onSubmit={console.log} />
    </div>
  );
};
