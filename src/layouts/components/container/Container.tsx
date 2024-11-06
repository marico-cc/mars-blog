import { FC } from 'react';
import { Header } from '@/layouts/';

export interface ContainerProps {
  title?: string | null;
  titleTip?: string | null;
  header?: JSX.Element;
  footer?: JSX.Element;
  children?: JSX.Element;
  sectionClassName?: string;
}

const Container: FC<ContainerProps> = ({ header, footer, title, children, titleTip, sectionClassName = '' }) => {
  const _header =
    header ||
    (title ? (
      <div>
        <Header title={title} />
      </div>
    ) : (
      ''
    ));
  return (
    <div className='flex h-[100vh] flex-col justify-between overflow-y-hidden'>
      {_header}
      <section className={`grid h-full w-full flex-1 grid-cols-12 gap-[16px] overflow-y-auto px-[56px] pb-[56px] pt-[24px] ${sectionClassName}`}>{children}</section>
      {footer}
    </div>
  );
};

export default Container;
export { Container };
