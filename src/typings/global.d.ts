import type { TabsProps } from 'antd';
import { RoleEnum } from '@/typings/role.enum';
// * Menu
declare namespace Menu {
  interface MenuOptions extends TabsProps['items'] {
    key?: string;
    path?: string;

    label?: string;
    title?: string;
    icon?: string;
    isLink?: string;
    closable?: boolean;
    children?: MenuOptions[];
    roles?: RoleEnum[];
  }
}
