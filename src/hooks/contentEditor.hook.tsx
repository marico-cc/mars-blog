import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { Space, message } from 'antd';
import { StarFilled, StarOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { mediaHandler } from '@/utils/quill.utils';
import { service } from '@/services/service';
import { Tag } from '@/components/form';

export const useContentEditor = () => {
  const params = useParams();
  const { userMenuTree: nodeList, userMenuMap, selectedUserMenu } = useSelector((state: any) => state.menu);
  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};

  const formRef = useRef<FormInstance>(null);
  const editor = useRef<any>(null);

  const [fileList, setFileList] = useState<Array<any>>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [richTextContent, setRichTextContent] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (!formRef?.current) return;
    formRef?.current?.setFieldValue('siteId', params.siteId || '');
    if (!selectedUserMenu) return;
    formRef?.current?.setFieldValue('nodeId', selectedUserMenu || '');

    if (params.contentId) initializeContent();
  }, [selectedUserMenu, formRef?.current]);

  const initializeContent = async () => {
    if (!params.contentId) return;
    let content: any = {};

    try {
      switch (currentNode?.type) {
        case 'page':
          content = await service.getPageContent(selectedUserMenu);
          setFileList(content?.images || []);
          break;
        case 'article': {
          const data = await service.getArticle(params.contentId);
          content = data.article || {};
          content.isPrivateBoolean = content.isPrivate === 'Y';
          setFileList(content?.images || []);
          setTags((content?.tags || []).map((tag: Tag) => ({ ...tag, key: tag.id })));
          break;
        }

        case 'media':
        case 'image':
        case 'video': {
          content = await service.getMedia(params.contentId);
          setFileList(content?.mediaList || []);
        }
      }
      formRef.current?.setFieldsValue(content);
      content.thumbUrl && setPreviewImage(content.thumbUrl);
      setRichTextContent(content?.content || '');
      setTags(content.tags || []);
    } catch (e) {
      message.error('获取内容失败');
      setFileList([]);
    }
  };

  const removeFile = (fileUrl: string, urlKey?: string) => {
    const index = !urlKey ? fileList.indexOf(fileUrl) : fileList.findIndex((item: any) => item[urlKey] === fileUrl);
    if (index > -1) {
      const _fileList = [...fileList];
      _fileList.splice(index, 1);
      setFileList(_fileList);
      if (currentNode?.type && ['media', 'image', 'video'].includes(currentNode?.type)) {
        formRef?.current?.setFieldValue('mediaList', _fileList);
      } else {
        formRef?.current?.setFieldValue('images', _fileList);
      }
    }
  };

  const onPreviewImageChange = (img) => {
    formRef?.current?.setFieldValue('thumbUrl', img);
    setPreviewImage(img);
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  const getImgPreviewOptions = (img: string) => ({
    toolbarRender: (_, { transform: { scale }, actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn } }) => (
      <Space size={12} className='toolbar-wrapper'>
        {previewImage === img && <StarFilled className={'text-1 m-4 !text-[#edca13]'} onClick={() => onPreviewImageChange('')} />}
        {previewImage !== img && <StarOutlined className={'text-1 m-4'} onClick={() => onPreviewImageChange(img)} />}

        <ZoomOutOutlined className={'text-1 m-4'} disabled={scale === 1} onClick={onZoomOut} />
        <ZoomInOutlined className={'text-1 m-4'} disabled={scale === 50} onClick={onZoomIn} />
      </Space>
    )
  });

  const onUploadChange = (info) => {
    if (info.file.status === 'done') {
      mediaHandler(editor?.current, info?.file?.response?.fileUrl);
      const images = [...fileList, info?.file?.response?.fileUrl];
      setFileList(images);
      formRef?.current?.setFieldValue('images', images);
    }
  };

  const getQuill = (quillIns) => {
    editor.current = quillIns;
  };

  return {
    tags,
    setTags,
    editor,
    params,
    nodeList,
    fileList,
    formRef,
    previewImage,
    richTextContent,
    onFinishFailed,
    onPreviewImageChange,
    setFileList,
    setPreviewImage,
    getImgPreviewOptions,
    onUploadChange,
    removeFile,
    getQuill
  };
};
