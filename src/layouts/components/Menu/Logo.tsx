import logo from '@/assets/images/logo_admin.png';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
const Logo: FC = () => {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate('/site/sites');
  };

  return (
    <div onClick={() => gotoHome()} className='flex h-16 cursor-pointer items-center justify-between p-4 opacity-70 hover:opacity-100'>
      <img src={logo} className='w-1/4' alt='logo' />
      <div className='text-white'>
        <div className='text-7 tracking-widest'>MARS内容管理系统</div>
        <div className='text-9'>MARS Content Management</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(Logo);
