import { FC } from 'react';

interface footerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export const Footer: FC<footerProps> = ({ children, ...rest }) => {
  return (
    <footer className='page-footer flex items-center justify-between bg-white pl-[56px] pr-[56px]' {...rest}>
      {children}
    </footer>
  );
};
