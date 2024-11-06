import { fromExtension as getFileTypeFromExt } from 'human-filetypes/ext';
import { getFileExt } from '@/utils/utils';
import { Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { mediaSizing } from '@/typings/mediaSize';

const { VITE_APP_FILE_UPLOAD_URL } = import.meta.env;

interface MediaPreviewProps {
  fileUrl: string;
  getImgPreviewOptions?: (fileUrl: string) => any;
  removeFile?: (fileUrl: string) => void;
  size?: 'small' | 'medium' | 'large';
}
export const MediaPreview: FC<MediaPreviewProps> = ({ fileUrl, getImgPreviewOptions, removeFile, size = 'medium' }) => {
  const fileType = getFileTypeFromExt(getFileExt(fileUrl));

  if (fileType === 'image') {
    return (
      <div className={`relative`} key={fileUrl}>
        <div className={`${mediaSizing[size].className} m-1 shrink-0  overflow-hidden rounded-xl bg-gray-200 p-0`}>
          <Image width={mediaSizing[size].size} height={mediaSizing[size].size} className='rounded-1xl' src={`${VITE_APP_FILE_UPLOAD_URL}/${fileUrl}`} />
        </div>
        {removeFile && <DeleteOutlined onClick={() => removeFile(fileUrl)} className={`text-2 absolute bottom-3 left-[40%] right-[40%] z-10 cursor-pointer text-orange-500 opacity-60 hover:text-red-600 hover:opacity-100`} title={`删除`} />}
      </div>
    );
  } else if (fileType === 'video') {
    return (
      <div className={`relative`} key={fileUrl}>
        <div className={`${mediaSizing[size].className} m-1 shrink-0  overflow-hidden rounded-xl bg-gray-200 p-0`} key={fileUrl}>
          <video width={mediaSizing[size].size} height={mediaSizing[size].size} className='rounded-1xl' src={`${VITE_APP_FILE_UPLOAD_URL}/${fileUrl}`} controls />
        </div>
        {removeFile && <DeleteOutlined onClick={() => removeFile(fileUrl)} className={`text-2 absolute bottom-3 left-[40%] right-[40%] z-10 cursor-pointer text-orange-500 opacity-60 hover:text-red-600 hover:opacity-100`} title={`删除`} />}
      </div>
    );
  }
};
