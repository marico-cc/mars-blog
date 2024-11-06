import { AnyAction } from 'redux';
import { MenuState } from '@/redux/interface';
import produce from 'immer';
import * as types from '@/redux/mutation-types';
import { RoleEnum } from '@/typings/role.enum';

const menuState: MenuState = {
  isCollapsed: false,
  fullMenuWidth: 240,
  minMenuWidth: 60,
  showUserMenus: false,
  adminMenus: [
    // {
    //   label: '系统设置',
    //   key: '/site/system',
    //   path: '/site/system',
    //   closable: false,
    //   roles: [RoleEnum.SYSTEM_ADMIN]
    // },
    {
      label: '站点管理',
      key: '/site/sites',
      path: '/site/sites',
      closable: false,
      roles: [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN, RoleEnum.SYSTEM_ADMIN]
    },
    {
      label: '用户管理',
      key: '/site/users',
      path: '/site/users',
      closable: false,
      roles: [RoleEnum.SYSTEM_ADMIN]
    }
  ],
  userMenuTree: [],
  userMenuMap: {},
  selectedUserMenu: '',
  allNodeIds: []
};

// menu reducer
const menu = (state: MenuState = menuState, action: AnyAction) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case types.SET_ADMIN_MENU_LIST:
        draftState.adminMenus = action.adminMenus;
        break;
      case types.SET_USER_MENU_TREE:
        draftState.userMenuTree = action.userMenuTree;
        break;
      case types.SET_USER_MENU_MAP:
        draftState.userMenuMap = action.userMenuMap;
        break;

      case types.SET_ALL_NODE_IDS:
        draftState.allNodeIds = action.nodeIds;
        break;

      case types.SET_SHOW_USER_MENUS:
        draftState.showUserMenus = action.showUserMenus;
        break;

      case types.SET_SELECTED_USER_MENU:
        draftState.selectedUserMenu = action.key;
        break;

      default:
        return draftState;
    }
  });

export default menu;
