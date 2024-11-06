import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Radio, Row, Select, Space, Switch } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { FormParser } from '@/components/form/FormParser';
import { FormItemType } from '@/typings/FormItemType.enum';
import { FormInstance } from 'antd/lib';
import { nanoid } from 'nanoid';

const formItemTypeEnabled = [FormItemType.STRING, FormItemType.TEXTAREA, FormItemType.NUMBER, FormItemType.BOOLEAN, FormItemType.IMAGE, FormItemType.VIDEO, FormItemType.MEDIA];

export interface FormItemSetting {
  key: string;
  name: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  type: FormItemType;
  options?: any;
  description?: string;
  settingOnly?: boolean;
}

interface FormFactoryProps {
  initValues?: Array<FormItemSetting>;
  onSubmit: (values: Array<FormItemSetting>) => void;
  onDrop?: () => void;
  useSettingOnly?: boolean;
}

export const FormFactory: FC<FormFactoryProps> = ({ initValues, onSubmit, onDrop, useSettingOnly }) => {
  const formRef = React.useRef<FormInstance>(null);
  const [formItems, setFormItems] = useState<Array<FormItemSetting>>([]);

  useEffect(() => {
    if (initValues && initValues.length > 0) {
      setFormItems(initValues);
      formRef?.current?.setFieldsValue({ mFormItems: initValues });
    } else {
      setFormItems([]);
      formRef?.current?.setFieldsValue({ mFormItems: [] });
    }
  }, [initValues]);

  const onFinish = (values) => {
    onSubmit(values);
  };
  const onFinishFailed = (values) => {
    console.log(values);
  };

  const onChange = (changedValues, allValues) => {
    setFormItems(allValues.mFormItems);
  };

  const sortFormItems = (index, type: 'UP' | 'DOWN') => {
    const newItems = [...formItems];
    const temp = newItems[index];
    if (type === 'UP') {
      newItems[index] = newItems[index - 1];
      newItems[index - 1] = temp;
    } else {
      newItems[index] = newItems[index + 1];
      newItems[index + 1] = temp;
    }
    setFormItems(newItems);
    formRef?.current?.setFieldsValue({ mFormItems: newItems });
  };

  const getAvailableOptions = () => {
    return Object.keys(FormItemType)
      .filter((item) => formItemTypeEnabled.includes(item as FormItemType))
      .map((item) => ({ key: item, label: item, value: item }));
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <Form ref={formRef} name='mForm' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 500 }} onFinish={onFinish} onFinishFailed={onFinishFailed} onValuesChange={onChange} autoComplete='off'>
            <Form.List name='mFormItems'>
              {(fromItems, { add, remove }, { errors }) => (
                <>
                  {fromItems.map(({ key, name, ...restFiled }, index) => (
                    <Space key={key} direction='vertical' className={`relative m-2 w-full rounded border border-dashed border-gray-400 p-4 pt-8 hover:border-green-700`}>
                      <Button type={`link`} icon={<ArrowUpOutlined />} className={`absolute right-16 top-2`} onClick={() => sortFormItems(index, 'UP')} disabled={index === 0} title={`上移`} />
                      <Button type={`link`} icon={<ArrowDownOutlined />} className={`absolute right-10 top-2`} onClick={() => sortFormItems(index, 'DOWN')} disabled={index === formItems.length - 1} title={`下移`} />
                      <Button type={`link`} icon={<CloseOutlined />} className={`absolute right-2 top-2`} onClick={() => remove(index)} />
                      <Form.Item hidden label='Key' name={[name, 'key']} {...restFiled} initialValue={nanoid()} className={`mb-0`}>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Label' name={[name, 'label']} {...restFiled} rules={[{ required: true, message: 'Label is required' }]} className={`mb-0`}>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Name' name={[name, 'name']} {...restFiled} rules={[{ required: true, message: 'Name is required' }]} className={`mb-0`}>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Type' name={[name, 'type']} rules={[{ required: true, message: 'Type is required' }]} className={`mb-0`}>
                        <Select options={getAvailableOptions()} />
                      </Form.Item>
                      <Form.Item label='Required' name={[name, 'isRequired']} className={`mb-0`}>
                        <Radio.Group>
                          <Radio value={true}>Yes</Radio>
                          <Radio value={false}>No</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label='Placeholder' name={[name, 'placeholder']} className={`mb-0`}>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Description' name={[name, 'description']} className={`mb-0`}>
                        <Input />
                      </Form.Item>
                      {useSettingOnly && (
                        <Form.Item label='Setting Only' valuePropName='checked' name={[name, 'settingOnly']} className={`mb-0`}>
                          <Switch />
                        </Form.Item>
                      )}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} style={{ width: '60%' }} icon={<PlusOutlined />}>
                      Add item
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item wrapperCol={{ span: 12 }}>
              <Button type='default' onClick={() => onDrop?.()} className={`mr-6`}>
                Drop
              </Button>
              <Button type='primary' htmlType='submit'>
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <FormParser isPreview formItems={formItems}></FormParser>
        </Col>
      </Row>
    </div>
  );
};
