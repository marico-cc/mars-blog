import Bg from '@/assets/images/bg2.jpg';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { service } from '@/services/service';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useEffect } from 'react';
import { setAuthToken, setExpireTime, setRefreshToken } from '@/utils/utils';

export default function Login() {
  const navigate = useNavigate();
  const { btnDisabled, setBtnDisabled } = useDbClick();

  useEffect(() => {
    localStorage.removeItem(import.meta.env.VITE_AUTH_KEY);
  }, []);

  const onFinish = async (values) => {
    setBtnDisabled(true);
    try {
      const { user, token, expireAt, freshToken } = await service.login(values);
      if (!user && !token) return;
      setAuthToken(token);
      setExpireTime(expireAt);
      setRefreshToken(freshToken);
      message.success('登录成功, 即将跳转');
      setTimeout(() => {
        setBtnDisabled(false);
        navigate('/site/sites');
        // window.location.reload();
      }, 1500);
    } catch (e) {
      message.error('登录失败');
      setBtnDisabled(false);
    }
  };
  return (
    <div className='h-full w-full' style={{ backgroundImage: `url(${Bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className=' grid h-full grid-cols-12'>
        <div className='text-1 col-span-4 col-start-5 flex h-full items-center'>
          <Form name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item name='userName' rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' className='border-gray-300 px-4 hover:!border-white hover:!text-gray-700' loading={btnDisabled}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
