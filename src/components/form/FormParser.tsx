import React, { FC, useEffect } from 'react';
import { FormItemSetting } from '@/components/form/FormFactory';
import { Button, Flex, Form, Input, Popconfirm, Select, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { FileUploader } from '@/components/form/FileUploader';
import { FormInstance } from 'antd/lib';
import { FormItemType } from '@/typings/FormItemType.enum';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { Loading } from '@/components/loading/Loading';

export interface FormParserProps {
  isPreview?: boolean;
  formItems: FormItemSetting[];
  onSubmit?: (values, onSavedCb?: (disabled: boolean) => void) => void;
  initialValues?: any;
  showCancel?: boolean;
  onCancel?: () => void;
  loading?: boolean;
}

export const FormParser: FC<FormParserProps> = ({ loading, initialValues, formItems, onSubmit, isPreview = false, showCancel = false, onCancel }) => {
  if (loading) return <Loading />;

  const formRef = React.useRef<FormInstance>(null);
  const { btnDisabled, setBtnDisabled } = useDbClick();

  useEffect(() => {
    if (initialValues) {
      formRef?.current?.setFieldsValue(initialValues);
    }
  }, [initialValues, formRef?.current]);

  const onFinish = (values) => {
    setBtnDisabled(true);
    onSubmit?.(values, () => setBtnDisabled(false));
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  const onFileUploaded = (fieldName: string, fileList: Array<string>) => {
    formRef?.current?.setFieldValue(fieldName, fileList);
  };
  const getFormItem = (formItem: FormItemSetting) => {
    switch (formItem?.type) {
      case FormItemType.STRING:
      case FormItemType.TEXTAREA:
        return (
          <Form.Item key={formItem.key} label={formItem.label || ' '} name={formItem.name} rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-6`}>
            <div>
              {formItem?.type === FormItemType.STRING && <Input defaultValue={initialValues?.[formItem.name]} placeholder={formItem.placeholder || 'Please input'} />}
              {formItem?.type === FormItemType.TEXTAREA && <Input.TextArea defaultValue={initialValues?.[formItem.name]} placeholder={formItem.placeholder || 'Please input'} />}
              {getDescription(formItem.description)}
            </div>
          </Form.Item>
        );

      case FormItemType.NUMBER:
        return (
          <Form.Item key={formItem.key} label={formItem.label || ' '} name={formItem.name} rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-6`}>
            <div>
              <Input defaultValue={initialValues?.[formItem.name]} type='number' placeholder={formItem.placeholder || 'Please input'} />
              {getDescription(formItem.description)}
            </div>
          </Form.Item>
        );

      case FormItemType.BOOLEAN:
        return (
          <div key={formItem.key}>
            <Form.Item label={formItem.label || ' '} name={formItem.name} valuePropName='checked' rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-0`}>
              <Switch />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>{getDescription(formItem.description)}</Form.Item>
          </div>
        );

      case FormItemType.SELECT:
        return (
          <Form.Item key={formItem.key} label={formItem.label || ' '} name={formItem.name} rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-6`}>
            <div>
              <Select defaultValue={initialValues?.[formItem.name]} options={formItem.options} placeholder={formItem.placeholder || 'Please select'} />
              {getDescription(formItem.description)}
            </div>
          </Form.Item>
        );

      case FormItemType.IMAGE:
        return (
          <Form.Item key={formItem.key} label={formItem.label || ' '} name={formItem.name} rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-6`}>
            <div>
              <Input defaultValue={initialValues?.[formItem.name]} type={'hidden'} />
              <FileUploader initialFileList={initialValues?.[formItem.name]} disabled={isPreview} onFileUploaded={(fileList) => onFileUploaded(formItem.name, fileList)} type={'image'} showPreview />
              {getDescription(formItem.description)}
            </div>
          </Form.Item>
        );

      case FormItemType.VIDEO:
        return (
          <Form.Item key={formItem.key} label={formItem.label || ' '} name={formItem.name} rules={[{ required: formItem.isRequired, message: `${formItem.label} 不能为空` }]} className={`mb-6`}>
            <div>
              <Input defaultValue={initialValues?.[formItem.name]} type={'hidden'} />
              <FileUploader initialFileList={initialValues?.[formItem.name]} disabled={isPreview} onFileUploaded={(fileList) => onFileUploaded(formItem.name, fileList)} type={'video'} showPreview />
              {getDescription(formItem.description)}
            </div>
          </Form.Item>
        );
    }
  };

  const getDescription = (description = '') => {
    return (
      description && (
        <Flex align={`start`} className={`text-7 mt-1 text-gray-600`}>
          <InfoCircleOutlined className={`mr-2 mt-1.5`} />
          <div className={`mt-0.5`}> {description} </div>
        </Flex>
      )
    );
  };

  return (
    <Form ref={formRef} name='mFormIns' initialValues={initialValues} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      {formItems?.map(getFormItem)}
      {!formItems?.length && <div className={`text-gray-400`}>No settings for this form yet.</div>}
      {formItems?.length > 0 && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {showCancel && (
            <Popconfirm placement='top' title='确定放弃吗?' description={<p className={`text-red-500`}> 放弃后将不会保存输入的数据</p>} okText='确认放弃' cancelText='继续编辑' onConfirm={onCancel}>
              <Button className={`mr-4`}>放弃</Button>
            </Popconfirm>
          )}
          <Button disabled={isPreview} type='primary' htmlType='submit' loading={btnDisabled}>
            保存
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
