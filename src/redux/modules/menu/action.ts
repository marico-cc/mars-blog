import * as types from '@/redux/mutation-types';
import { Menu } from '@/typings/global';

export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
  type: types.SET_MENU_LIST,
  menuList
});

export const setShowUserMenu = (showUserMenus: boolean) => ({
  type: types.SET_SHOW_USER_MENUS,
  showUserMenus
});

export const setUserMenuTree = (userMenuTree: Array<any>) => ({
  type: types.SET_USER_MENU_TREE,
  userMenuTree
});

export const setUserMenuMap = (userMenuMap: Record<string, Record<string, Menu.MenuOptions>>) => ({
  type: types.SET_USER_MENU_MAP,
  userMenuMap
});

export const setAllNodeIds = (nodeIds: string[]) => ({
  type: types.SET_ALL_NODE_IDS,
  nodeIds
});

export const setSelectedUserMenu = (key: string) => ({
  type: types.SET_SELECTED_USER_MENU,
  key
});
