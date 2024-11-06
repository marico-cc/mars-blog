import React, { FC, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Modal, Radio, message } from 'antd';
import { service } from '@/services/service';
import { useDbClick } from '@/hooks/dbSubmit.hook';

interface ResetPwModalProps {
  onClose?: () => void;
  onSaved?: () => void;
  user?: any;
}

export const ResetPwModal: FC<ResetPwModalProps> = ({ user, onSaved, onClose }) => {
  const [form] = Form.useForm();
  const { btnDisabled, setBtnDisabled } = useDbClick();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user]);

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      setBtnDisabled(true);
      const res = await service.updateUser({ id: user.id, password: values.password });
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
    <Modal title={'修改密码'} open okText='保存' cancelText='取消' onCancel={onClose} onOk={onFinish} confirmLoading={btnDisabled}>
      <Form form={form} name='userEdit' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ maxWidth: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item hidden label='user id' name='id'>
          <Input maxLength={12} />
        </Form.Item>
        <Form.Item label='姓名' name='nickName'>
          <Input maxLength={12} disabled />
        </Form.Item>
        <Form.Item label='登录用户名' name='userName'>
          <Input maxLength={20} disabled />
        </Form.Item>

        <Form.Item label='密码' name='password' rules={[{ required: true, message: '密码不能为空' }]}>
          <Input.Password placeholder='密码只能由字母和数字组成' maxLength={20} />
        </Form.Item>
        <Form.Item
          label='确认密码'
          name='re-password'
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不匹配!'));
              }
            })
          ]}>
          <Input.Password placeholder='请再次输入密码' maxLength={20} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
