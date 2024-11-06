import { Button, Upload, UploadFile, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fromExtension as getFileTypeFromExt } from 'human-filetypes';
import { getDateString, getFileExt } from '@/utils/utils';
import { MediaPreview } from '@/components/form/MediaPreview';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

interface FileUploaderProps {
  onFileUploaded?: (fileList: Array<string>) => void;
  onUploadChange?: (file: UploadFile) => void;
  type?: 'image' | 'video' | 'file' | 'media';

  showPreview?: boolean;
  disabled?: boolean;
  initialFileList?: Array<string>;
  maxCount?: number;
}

export const FileUploader: FC<FileUploaderProps> = ({ onUploadChange, onFileUploaded, type, showPreview, disabled, initialFileList, maxCount = 1 }) => {
  const [fileList, setFileList] = useState<Array<string>>([]);
  const [file2upload, setFile2upload] = useState<Array<any>>([]);
  useParams();
  const ossSignature = useSelector((state: any) => state.global.ossSignature);
  const fileMap = useRef({});

  useEffect(() => {
    setFileList(Array.isArray(initialFileList) ? initialFileList : []);
    onFileUploaded?.(initialFileList || []);
    // initialFileList && initialFileList?.length > 0 && setPreviewImage();
  }, [initialFileList]);

  const fileChecking = async (file, showMsg = true) => {
    const fileType = getFileTypeFromExt(getFileExt(file.name));
    if (type === 'image' && fileType !== 'image') {
      if (showMsg) message.error('只能上传图片文件');
      return false;
    }
    if (type === 'video' && fileType !== 'video') {
      if (showMsg) message.error('只能上传视频文件');
      return false;
    }

    if (type === 'media' && fileType !== 'image' && fileType !== 'video') {
      if (showMsg) await message.error('只能上传图片或视频文件');
      return false;
    }
    return true;
  };

  const beforeUpload = async (file) => {
    const fileType = getFileTypeFromExt(getFileExt(file.name));
    if (!(await fileChecking(file))) return;
    if (fileType === 'image') {
      const _file: any = await compressImage(file);
      if (_file) {
        _file.name = file.name;
        _file.lastModifiedDate = new Date();
        return _file;
      } else {
        console.log(`compress image failed`);
      }
    }
    return false;
  };

  const compressImage = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = function (event) {
        const img = new Image(); // 创建Image对象
        img.src = event.target?.result as string;

        img.onload = async function () {
          // 创建Canvas元素
          const canvas = document.createElement('canvas');
          const _width = img.width;
          const _height = img.height;
          const ratio = _width / _height;

          const width = _width > 1980 ? 1980 : _width;
          const height = width / ratio;

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // 将Canvas转换回Blob文件对象
          canvas.toBlob(
            function (blob) {
              // 这里的blob就是压缩后的图片文件
              resolve(blob);
            },
            'image/webp',
            0.8 // 0.9是压缩质量，可以根据需要调整
          );
        };
      };
    });
  };

  const handleUploadChange = async (info) => {
    const fileIssue = fileChecking(info.file, false);
    if (!fileIssue) return;

    onUploadChange?.(info);
    if (info.file.status === 'done') {
      const _fileList = [...fileList, info?.file?.response?.fileUrl];
      setFileList(_fileList);
      onFileUploaded?.(_fileList);
      delete fileMap.current[info.file.uid];
    } else if (info.file.status === 'error') {
      delete fileMap.current[info.file.uid];
      await message.error(`"${info.file.name}" 上传失败`);
    } else if (info.file.status === 'removed') {
      delete fileMap.current[info.file.uid];
    } else {
      if (fileList?.length + file2upload.length + Object.keys(fileMap.current).length < maxCount) {
        fileMap.current[info.file.uid] = info.file;
      }
    }
    setFile2upload(Object.values(fileMap.current));
  };

  const getAcceptation = () => {
    if (type === 'image') {
      return 'image/*';
    } else if (type === 'video') {
      return 'video/*';
    } else if (type === 'media') {
      return 'image/*,video/*';
    } else if (type === 'file') {
      return '*/*';
    }
  };

  const removeFile = (file) => {
    const _fileList = fileList.filter((f) => f !== file);
    setFileList(_fileList);
    onFileUploaded?.(_fileList);
  };

  const getFileName = (fileName = '') => {
    const ext = getFileExt(fileName);
    const dateStr = getDateString(new Date()).replace(/-/g, '');
    const randomStr = nanoid(16);
    return `${dateStr}${randomStr}.webp`.toLowerCase();
  };

  const uploadParams: (file: UploadFile<any>) => Record<string, unknown> = (file: UploadFile) => ({
    key: ossSignature?.dir + getFileName(file.name),
    policy: ossSignature?.policy,
    OSSAccessKeyId: ossSignature?.accessId,
    success_action_status: 200,
    signature: ossSignature?.signature,
    callback: ossSignature?.callback
  });

  return (
    <>
      <div className='mb-2 mt-1 text-gray-500'>
        {disabled ? (
          <span>预览模式下无法上传</span>
        ) : (
          <span>
            最多可以上传 <span className={`font-bold text-red-500`}>{maxCount}</span> 个文件
          </span>
        )}
      </div>

      <Upload action={ossSignature?.host} fileList={file2upload} showUploadList maxCount={maxCount} multiple={maxCount > 1} accept={getAcceptation()} onChange={handleUploadChange} beforeUpload={beforeUpload} data={uploadParams}>
        <Button disabled={disabled || fileList?.length + file2upload?.length >= maxCount} size={`middle`} icon={<UploadOutlined />} className={`disabled:cursor-not-allowed`}>
          点击上传
        </Button>
      </Upload>

      {showPreview && fileList?.length > 0 && (
        <div className='mt-2 flex flex-wrap'>
          {fileList?.map((fileUrl: string) => (
            <MediaPreview fileUrl={fileUrl} removeFile={removeFile} key={fileUrl} />
          ))}
        </div>
      )}
    </>
  );
};
