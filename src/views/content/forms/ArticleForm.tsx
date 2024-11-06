import React, { FC, useState } from 'react';
import { Button, Divider, Form, Input, Popconfirm, Select, Switch, message } from 'antd';
import RichTextEditor from 'quill-react-commercial';
import 'quill-react-commercial/lib/index.css';
import { quillModulesCommerce } from '@/utils/quill.utils';
import { service } from '@/services/service';
import { useContentEditor } from '@/hooks/contentEditor.hook';
import { FileUploader } from '@/components/form/FileUploader';
import { MediaPreview } from '@/components/form/MediaPreview';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useSelector } from 'react-redux';
import { NoImg } from '@/components/common/NoImg';
import { fromExtension as getFileTypeFromExt } from 'human-filetypes/ext';
import { getFileExt } from '@/utils/utils';
import { Tag, Tags } from '@/components/form';

const { VITE_APP_FILE_UPLOAD_URL } = import.meta.env;

interface ArticleFormProps {
  onSaved?: () => void;
}

export const ArticleForm: FC<ArticleFormProps> = ({ onSaved }) => {
  const { formRef, onFinishFailed, fileList, onUploadChange, editor, params, removeFile, previewImage, onPreviewImageChange, getQuill, richTextContent, tags, setTags } = useContentEditor();
  const { btnDisabled, setBtnDisabled } = useDbClick();
  const { userMenuMap } = useSelector((state: any) => state.menu);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};
  const [thumbImgUrl, setThumbImgUrl] = useState('');

  const onFinish = async (values) => {
    const _values = {
      ...values,
      content: editor.current?.getSemanticHTML(),
      isPrivate: values.isPrivateBoolean ? 'Y' : 'N',
      isPrivateBoolean: undefined,
      tags: tags.map((tag: Tag) => {
        return { ...tag, key: undefined };
      })
    };

    setBtnDisabled(true);
    try {
      if (params.contentId) {
        await service.updateArticle(_values);
        message.info('保存成功');
      } else {
        await service.createArticle(_values);
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

  return (
    <>
      <h3>编辑文章</h3>
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
        <Form.Item hidden label='' name='userId'>
          <Input />
        </Form.Item>
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='是否私有' valuePropName='checked' name='isPrivateBoolean'>
          <Switch />
        </Form.Item>
        <Form.Item label='图片/视频' name='images'>
          <div>
            <Input type={'hidden'} />

            <FileUploader initialFileList={fileList} onUploadChange={onUploadChange} type={'media'} maxCount={currentNode?.uploadMax || 10} />

            {fileList.length > 0 && (
              <div className='mt-2 flex flex-wrap'>
                {fileList.map((fileUrl) => (
                  <div className='m-1 shrink-0  overflow-hidden rounded-xl bg-gray-200 p-0' key={fileUrl}>
                    <MediaPreview fileUrl={fileUrl} removeFile={removeFile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item label='预览图'>
          {(previewImage || fileList.length > 0) && (
            <div className='mt-[-20px] flex  !h-36 items-center justify-start'>
              <div className={`!w-36`}>
                {previewImage && <MediaPreview size={'small'} fileUrl={previewImage} />}
                {!previewImage && <NoImg size={'small'} />}
              </div>

              <Select className={`!h-16 `} value={previewImage} onChange={onPreviewImageChange}>
                <Select.Option value=''>
                  <div className='leading-10'> -- 无 -- </div>
                </Select.Option>
                {fileList
                  .filter((fileUrl) => getFileTypeFromExt(getFileExt(fileUrl)) === 'image')
                  .map((fileUrl) => (
                    <Select.Option value={fileUrl} key={fileUrl}>
                      <img className='h-14 w-14 object-cover pt-2' src={`${VITE_APP_FILE_UPLOAD_URL}/${fileUrl}`} alt={fileUrl} />
                    </Select.Option>
                  ))}
              </Select>
            </div>
          )}
        </Form.Item>
        <Form.Item label='内容' name='content' rules={[{ required: true, message: '请输入内容' }]}>
          {/*<ReactQuill className={`marico`} ref={editor} theme='snow' modules={quillModules} formats={quillFormats} />*/}
          <RichTextEditor modules={quillModulesCommerce} getQuill={getQuill} content={richTextContent} />
        </Form.Item>
        <Form.Item hidden label='预览图' name='thumbUrl'>
          <Input />
        </Form.Item>
        <Form.Item label='作者' name='author'>
          <Input />
        </Form.Item>
        <Form.Item label='来源' name='origin'>
          <Input />
        </Form.Item>
        <Form.Item label='来源地址' name='originUrl'>
          <Input />
        </Form.Item>
        <Form.Item label='标签'>
          <Tags
            tags={tags}
            onChange={(list) => {
              setTags(list);
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Popconfirm placement='top' title='确定放弃吗?' description={<p className={`text-red-500`}> {params.contentId ? '确定放弃修改吗？' : '确定放弃添加吗？'}</p>} okText='确认放弃' cancelText='继续编辑' onConfirm={onCancel}>
            <Button className={`mr-4`}>放弃</Button>
          </Popconfirm>
          <Button type='primary' htmlType='submit' loading={btnDisabled}>
            发布
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
