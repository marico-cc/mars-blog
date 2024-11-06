import { Button, Form, Input, InputNumber, Modal, Radio, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { service } from '@/services/service';
import { useDbClick } from '@/hooks/dbSubmit.hook';

interface UserEditModalProps {
  onClose?: () => void;
  onSaved?: () => void;
  user?: any;
}

export const UserEditModal: FC<UserEditModalProps> = ({ user, onSaved, onClose }) => {
  const [form] = Form.useForm();
  const { btnDisabled, setBtnDisabled } = useDbClick();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user, phone: user?.phone ? Number(user?.phone) : undefined });
    }
  }, [user]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setBtnDisabled(true);
      let res;
      if (!user?.id) res = await service.createUser({ ...values, phone: values.phone?.toString() });
      else res = await service.updateUser({ ...values, phone: values.phone?.toString() });
      message.success('保存成功');
      onSaved?.();
    } catch (e: any) {
      console.log(e);
      if (!e?.errorFields) message.error('保存失败');
    } finally {
      setBtnDisabled(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal title={user?.id ? '编辑用户' : '新增用户'} open okText='保存' cancelText='取消' onCancel={onClose} onOk={onFinish} confirmLoading={btnDisabled}>
      <Form form={form} name='userEdit' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item hidden label='user id' name='id'>
          <Input maxLength={12} />
        </Form.Item>
        <Form.Item label='姓名' name='nickName' rules={[{ required: true, message: '姓名不能为空' }]}>
          <Input maxLength={12} />
        </Form.Item>
        <Form.Item label='登录用户名' name='userName' rules={[{ required: true, message: '用户名不能为空' }]}>
          <Input maxLength={20} placeholder='用户名只能由字母和数字组成' allowClear />
        </Form.Item>

        {!user?.id && (
          <Form.Item label='密码' name='password' rules={[{ required: true, message: '密码不能为空' }]}>
            <Input.Password maxLength={20} />
          </Form.Item>
        )}

        <Form.Item label='邮箱' name='email' rules={[{ type: 'email', message: '请输入正确的邮箱' }]}>
          <Input type='email' />
        </Form.Item>

        <Form.Item label='电话' name='phone' validateTrigger='onBlur' rules={[{ type: 'number', message: '请输入正确的电话号码' }]}>
          <InputNumber className='w-full' decimalSeparator={''} min={0} />
        </Form.Item>

        <Form.Item label='性别' name='gender'>
          <Radio.Group>
            <Radio value={'male'}>男</Radio>
            <Radio value={'female'}>女</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
