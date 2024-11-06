import React, { FC } from 'react';
import { Button, Divider, Form, Image, Input, Popconfirm, Select, Space, TreeSelect, Upload, message } from 'antd';
import { quillModulesCommerce } from '@/utils/quill.utils';
import RichTextEditor from 'quill-react-commercial';
import 'quill-react-commercial/lib/index.css';
import { useContentEditor } from '@/hooks/contentEditor.hook';
import { service } from '@/services/service';
import { ContentFormProps } from '@/views/content/ContentEditor';
import { FileUploader } from '@/components/form/FileUploader';
import { MediaPreview } from '@/components/form/MediaPreview';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useSelector } from 'react-redux';

export const PageForm: FC<ContentFormProps> = ({ onSaved }) => {
  const { formRef, onFinishFailed, fileList, onUploadChange, getImgPreviewOptions, editor, params, removeFile, getQuill, richTextContent } = useContentEditor();
  const { btnDisabled, setBtnDisabled } = useDbClick();
  const { userMenuMap } = useSelector((state: any) => state.menu);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};

  const onFinish = async (values) => {
    setBtnDisabled(true);
    try {
      await service.savePageContent({ ...values, content: editor.current.getSemanticHTML() });
      message.info('保存成功');
      onSaved?.();
    } catch (e) {
      message.error('保存失败,请稍后再试');
    } finally {
      setBtnDisabled(false);
    }
  };

  const onCancel = () => {
    onSaved?.();
  };

  return (
    <>
      <h3>编辑内容</h3>
      <Divider className={`mb-8`} />
      <Form ref={formRef} name='basic' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 1600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        {params.contentId && (
          <Form.Item hidden label='' name='id'>
            <Input />
          </Form.Item>
        )}
        <Form.Item hidden label='' name='siteId'>
          <Input />
        </Form.Item>
        <Form.Item hidden label='' name='nodeId'>
          <Input />
        </Form.Item>
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='图片' name='images'>
          <div>
            <Input type={'hidden'} />

            <FileUploader initialFileList={fileList} onUploadChange={onUploadChange} type={'media'} maxCount={currentNode?.uploadMax || 10} />

            <span className='ml-4 text-red-500'>上传后点击小图可预览图片</span>
            {fileList?.length > 0 && (
              <div className='mt-2 flex flex-wrap'>
                {fileList?.map((fileUrl) => (
                  <div className='m-1 !h-32 !w-32  shrink-0  overflow-hidden rounded-xl bg-gray-200 p-0' key={fileUrl}>
                    <MediaPreview fileUrl={fileUrl} removeFile={removeFile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item label='内容' name='content' rules={[{ required: true, message: '请输入内容' }]}>
          <RichTextEditor modules={quillModulesCommerce} getQuill={getQuill} content={richTextContent} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Popconfirm placement='top' title='确定放弃吗?' description='放弃后文章将不会被保存' okText='确认放弃' cancelText='继续编辑' onConfirm={onCancel}>
            <Button className={`mr-4`}>放弃</Button>
          </Popconfirm>
          <Button type='primary' htmlType='submit' loading={btnDisabled}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
