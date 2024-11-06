import React, { FC, useEffect, useRef, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@/typings/global';
import { RoleEnum } from '@/typings/role.enum';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
export const AdminMenus: FC = () => {
  const initialMenus = useSelector((state: any) => state.menu);
  const [activeKey, setActiveKey] = useState(initialMenus?.adminMenus?.[0]?.path || '');
  const [menus, setMenus] = useState<Menu.MenuOptions[]>([]);
  const newTabIndex = useRef(0);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.global?.user ?? {});
  const { isSystemAdmin, isSuperAdmin, isAdmin } = user;

  useEffect(() => {
    const list: Array<any> = [];
    initialMenus?.adminMenus.forEach((menu) => {
      if (isSystemAdmin && menu.roles.includes(RoleEnum.SYSTEM_ADMIN)) {
        list.push(menu);
      } else if (isSuperAdmin && menu.roles.includes(RoleEnum.SUPER_ADMIN)) {
        list.push(menu);
      } else if (isAdmin && menu.roles.includes(RoleEnum.ADMIN)) {
        list.push(menu);
      }
    });
    setMenus(list);
  }, [user]);

  // useEffect(() => {
  //   // console.log(`initialMenus`, initialMenus?.adminMenus);
  //   // setMenus(initialMenus?.adminMenus || []);
  // }, [initialMenus?.adminMenus]);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    const menu = menus.find((m) => m.path === newActiveKey);
    menu?.path && navigate(menu?.path);
  };

  const add = () => {
    // const newActiveKey = `newTab${newTabIndex.current++}`;
    // const newPanes = [...menus];
    // newPanes.push({ label: 'New Tab', key: newActiveKey });
    // setMenus(newPanes);
    // setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    menus.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = menus.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setMenus(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  return <Tabs type='editable-card' onTabClick={onChange} onChange={onChange} activeKey={activeKey} onEdit={onEdit} items={menus as TabsProps['items']} className={`header-tabs`} />;
};
