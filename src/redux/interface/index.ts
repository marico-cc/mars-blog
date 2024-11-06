import { Menu } from '@/typings/global';

export interface MenuState {
  isCollapsed: boolean;
  fullMenuWidth: number;
  minMenuWidth: number;
  showUserMenus: boolean;
  adminMenus: Menu.MenuOptions[];
  userMenuTree: Menu.MenuOptions[];
  selectedUserMenu: string;
  userMenuMap: Record<string, Menu.MenuOptions>;
  allNodeIds: string[];
}

/* themeConfigProp */
export interface ThemeConfigProp {
  primary: string;
  isDark: boolean;
  weakOrGray: string;
}

export interface UserInfo {
  id: string;
  userName: string;
  email?: string;
  nickName: string;
  isSystemAdmin?: boolean;
  isSuperAdmin?: boolean;
  isAdmin?: boolean;
}

/* GlobalState */
export interface GlobalState {
  token: string;
  user: UserInfo;
  language: string;
  isLoading: number;
  email: string;
  isSiteAdmin: boolean;
  isSiteSuperAdmin: boolean;
  ossSignature?: any;
}
