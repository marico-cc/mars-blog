import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRoute } from '@/utils/utils';
import { Divider, Menu, message } from 'antd';
import type { MenuProps } from 'antd';
import Logo from './Logo';
import { connect } from 'react-redux';
import { Menu as MyMenu } from '@/typings/global';
import { SvgIcon } from '@/components/Icon/SvgIcon';
import { BankOutlined } from '@ant-design/icons';
import { setSelectedUserMenu } from '@/redux/modules/menu/action';
type MenuItem = Required<MenuProps>['items'][number];

interface LayoutProps {}

export const LayoutMenu: FC<LayoutProps> = () => {
  const allMenus = useSelector((state: any) => state.menu);
  const showUserMenus = useSelector((state: any) => state.menu.showUserMenus);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const defaultOpenKeys = useSelector((state: any) => state.menu.allNodeIds);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState('');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const params = useParams();

  useEffect(() => {
    getMenuData();
  }, [allMenus.userMenuTree]);

  useEffect(() => {
    if (defaultOpenKeys.length) {
      setOpenKeys(defaultOpenKeys);
    }
  }, [defaultOpenKeys]);

  const deepLoopFloat = (menuList: MyMenu.MenuOptions[]) => {
    return menuList.map((item: any) => {
      const isSelected = item.key && selectedUserMenu === item.path;
      const _icon = <BankOutlined />;

      return { children: item.children, type: item.type, key: item.id, icon: _icon, label: item.label } as MenuItem;
    });
  };

  const getMenuData = async () => {
    try {
      const list = deepLoopFloat(allMenus.userMenuTree) || [];
      setMenuList(list);
    } catch (error) {
      console.log(error);
    }
  };

  // 点击当前菜单跳转页面
  const clickMenu: MenuProps['onClick'] = (item: any) => {
    if (params.contentId || pathname.endsWith('/add')) {
      if (selectedUserMenu) return message.warning(' 请先保存您编辑的内容 ');
    }

    // const { key } = item;
    // const route = searchRoute(allMenus.userMenuTree, key);
    // if (route.isLink) window.open(route.isLink, '_blank');
    // navigate(key);
    dispatch(setSelectedUserMenu(item.key));
  };

  return (
    <div className={`h-full`}>
      <Logo />
      <Divider className='mt-0 h-[1px] border-white' />
      {showUserMenus && <Menu className={`h-[calc(100vh-64px-28px)] overflow-auto`} theme='dark' mode='inline' triggerSubMenuAction='click' onOpenChange={setOpenKeys} openKeys={openKeys} selectedKeys={[selectedUserMenu]} onClick={clickMenu} items={menuList} />}

      {!showUserMenus && <div className={`p-7 text-gray-400`}>无可用操作</div>}

      {/*<Menus collapsed={collapsed} toggleCollapsed={toggleCollapsed} />*/}
    </div>
  );
};
