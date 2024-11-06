export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  title: string;
  key?: string;
  manageSite?: boolean;
}

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: false | undefined;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
}
