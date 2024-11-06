import { FC } from 'react';
import { Divider } from 'antd';
import logo from '@/assets/images/logo_admin.png';

export const Welcome: FC = () => {
  return (
    <div className={'text-5 p-10 text-center text-gray-700'}>
      <h2 className={'text-1'}>欢迎使用MARS内容管理系统</h2>
      <p>Welcome to MARS Content Management System!</p>
      <Divider />
      <div className={'p-20'}>
        <img src={logo} className={'mx-auto w-1/3 opacity-[0.3]'} />
      </div>
    </div>
  );
};
