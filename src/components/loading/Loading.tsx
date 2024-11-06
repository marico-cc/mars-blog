import { Spin } from 'antd';

export const Loading = () => {
  return (
    <div className='flex h-full w-full items-center justify-center p-20'>
      <div className='flex flex-col items-center'>
        <Spin />
        <div className='mt-8 text-gray-500'>加载中... ... </div>
      </div>
    </div>
  );
};
