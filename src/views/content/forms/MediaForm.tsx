import { Button, Divider, Form, Input, Popconfirm, message } from 'antd';
import { useContentEditor } from '@/hooks/contentEditor.hook';
import { ContentFormProps } from '@/views/content/ContentEditor';
import React, { FC } from 'react';
import { nanoid } from 'nanoid';
import { FileUploader } from '@/components/form/FileUploader';
import { MediaPreview } from '@/components/form/MediaPreview';
import { service } from '@/services/service';
import { MediaType } from '@/typings/mediaType.enum';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useSelector } from 'react-redux';
import RichTextEditor from 'quill-react-commercial';
import { quillModulesCommerce } from '@/utils/quill.utils';

interface MediaFormProps extends ContentFormProps {
  type?: MediaType;
}

export const MediaForm: FC<MediaFormProps> = ({ onSaved, type }) => {
  const { formRef, onFinishFailed, editor, params, fileList, setFileList, removeFile, getQuill, richTextContent, tags, setTags } = useContentEditor();
  const { btnDisabled, setBtnDisabled } = useDbClick();
  const { userMenuMap } = useSelector((state: any) => state.menu);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};

  const onFinish = async (values) => {
    const _values = {
      ...values,
      content: editor.current?.getSemanticHTML(),
      isPrivateBoolean: undefined
    };
    setBtnDisabled(true);
    try {
      if (params.contentId) {
        await service.updateMedia(_values);
        message.info('保存成功');
      } else {
        await service.createMedia(_values);
        message.info('添加成功');
      }
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

  const onUploadChange = (info) => {
    if (info.file.status === 'done') {
      const _values = formRef?.current?.getFieldsValue();
      const _fileList = [...(_values?.mediaList ?? []), { key: nanoid(), url: info?.file?.response?.fileUrl }];
      setFileList(_fileList);
      formRef?.current?.setFieldValue('mediaList', _fileList);
    }
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
        <Form.Item label='上传文件' name='mediaList' rules={[{ required: true, message: '请上传文件' }]}>
          <Input type='hidden' />
          <FileUploader initialFileList={fileList} onUploadChange={onUploadChange} type={type || 'media'} maxCount={currentNode?.uploadMax || 5} />
        </Form.Item>

        <Form.Item label='已上传文件'>
          {fileList?.length === 0 && <span className={'ml-2 text-gray-400'}>暂未上传</span>}
          <Form.List name='mediaList'>
            {(fromItems, { add, remove }, { errors }) => (
              <>
                {fromItems.map(({ key, name, ...restFiled }, index) => (
                  <div key={key} className={'flex w-full items-center justify-start'}>
                    <div className='m-1 !h-32 !w-32  shrink-0  overflow-hidden rounded-xl bg-gray-200 p-0'>
                      <MediaPreview fileUrl={fileList[name]?.url} removeFile={(fileUrl) => removeFile(fileUrl, 'url')} />
                    </div>

                    <div className='w-full  pl-8'>
                      <Form.Item hidden name={[name, 'url']}>
                        <Input />
                      </Form.Item>
                      <Form.Item hidden name={[name, 'key']}>
                        <Input />
                      </Form.Item>
                      <Form.Item name={[name, 'title']} label={'标题'} className='my-4'>
                        <Input />
                      </Form.Item>
                      <Form.Item name={[name, 'link']} label={'链接'} className='my-4'>
                        <Input />
                      </Form.Item>
                      <Form.Item name={[name, 'desc']} label={'描述'} className='my-4'>
                        <Input />
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item hidden label='封面图' name='thumbUrl'>
          <Input />
        </Form.Item>

        <Form.Item label='简介' name='content'>
          <RichTextEditor modules={quillModulesCommerce} getQuill={getQuill} content={richTextContent} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Popconfirm placement='top' title='确定放弃吗?' description='放弃后内容将不会被保存' okText='确认放弃' cancelText='继续编辑' onConfirm={onCancel}>
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
