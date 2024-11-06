import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutMenu } from './components/Menu/index';
import { Layout } from 'antd';
import Container from './components/container/Container';
import { useSelector } from 'react-redux';
import { MenuState } from '@/redux/interface';
import { AdminMenus } from '@/layouts/components/Menu/AdminMenus';
import AuthRouter from '@/routers/utils/AuthRouter';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { DevEnv } from '@/components/DevEnv';

const { Content, Sider, Header } = Layout;
const LayoutIndex = (props) => {
  const isLoading: number = useSelector((state: any) => state.global.isLoading);
  const menu: MenuState = useSelector((state: any) => state.menu);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.global.user);

  return (
    <AuthRouter>
      <div className='h-full w-full'>
        <Layout className='h-full'>
          <Sider width={menu.fullMenuWidth} collapsedWidth={menu.minMenuWidth} collapsed={false}>
            <LayoutMenu />
          </Sider>
          <Content
            style={{
              width: `calc(100% - ${menu.fullMenuWidth}px - 20px)`,
              height: '100vh',
              background: '#f8f8f8',
              flexGrow: 1
            }}>
            <Header className={`flex items-end   justify-between px-8 pb-0 text-white`}>
              <AdminMenus />
              <div className='flex items-center'>
                <UserOutlined className='mr-2' />
                <span>{user?.nickName}</span>
                <a onClick={() => navigate('/auth')} className={'text-white'} title={'退出登录'}>
                  <LogoutOutlined className={'text-5 ml-6'} />
                </a>
              </div>
            </Header>
            <div className='h-[calc(100%-88px)] w-full overflow-auto p-6' style={{ margin: '0 auto' }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
        <DevEnv />
      </div>
    </AuthRouter>
  );
};

export { Container, Header, LayoutIndex };
