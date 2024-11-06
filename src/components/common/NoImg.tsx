import { FC } from 'react';
import noImg from '@/assets/images/no-img.gif';
import { MediaSize, mediaSizing } from '@/typings/mediaSize';

interface NoImgProps {
  size?: MediaSize;
}

export const NoImg: FC<NoImgProps> = ({ size = 'medium' }) => {
  return (
    <div>
      <img src={noImg} alt={'no image'} className={`ml-2 ${mediaSizing[size].className} rounded-2xl object-cover`} />
    </div>
  );
};
