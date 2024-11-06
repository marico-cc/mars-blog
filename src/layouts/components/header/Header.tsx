import { FC, ReactElement } from 'react';

export interface HeaderProps {
  title?: string | null;
  titleTip?: string | null;
  children?: ReactElement;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ title = '', titleTip = '', children, className = '' }) => {
  return (
    <header className={'page-header flex h-[80px] items-center justify-between bg-white px-[56px] ' + className}>
      {title && (
        <div>
          <h1 className='text4-cursor '>{title}</h1>
          <span className='text7-cursor '>{titleTip}</span>
        </div>
      )}
      {children && <div>{children}</div>}
    </header>
  );
};

export default Header;
