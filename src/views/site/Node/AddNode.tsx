import { FC, useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Form, FormInstance, Input, InputNumber, Select, TreeSelect, message } from 'antd';
import { service } from '@/services/service';
import { useParams } from 'react-router-dom';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useNodes } from '@/hooks/nodes.hook';
import { useSelector } from 'react-redux';

interface AddNodeProps {
  onAdded?: () => void;
}

export const AddNode: FC<AddNodeProps> = ({ onAdded }) => {
  const params = useParams();
  const [nodeTypes, setNodeTypes] = useState<Array<{ label: string; value: string }>>([]);
  const [parentNodes, setParentNodes] = useState<Array<any>>();
  const { btnDisabled, setBtnDisabled } = useDbClick();
  const { setNodes } = useNodes();
  const formRef = useRef<FormInstance>(null);
  const nodeList = useSelector((state: any) => state.menu.userMenuTree);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setParentNodes([{ label: '-- 无 --', value: 'null' }, ...(nodeList || [])]);
  }, [nodeList]);

  const getData = async () => {
    const data = await service.getAddNodeData(params.siteId || '');
    const types: Array<Array<string>> = data.nodeTypes || [];
    setNodeTypes(types.map((type) => ({ label: type[0], value: type[1] })));
  };

  const onFinish = async (values) => {
    setBtnDisabled(true);
    const createInput = { ...values };
    if (createInput.parentId === 'null') delete createInput.parentId;
    try {
      const data = await service.createNode(createInput);
      message.success('保存成功');
      setNodes().then();
      formRef?.current?.resetFields();
      onAdded?.();
    } catch (e) {
      message.error('保存失败');
      console.log(e);
    } finally {
      setBtnDisabled(false);
    }
  };
  const onFinishFailed = (errors) => {
    console.log(errors);
  };

  const onTypeChange = (v) => {
    console.log(v);
  };

  return (
    <div>
      <Form ref={formRef} name='nodeForm' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Form.Item label='父模块' name='parentId' rules={[{ required: true, message: '请选择父模块' }]}>
          <TreeSelect treeDefaultExpandAll treeData={parentNodes} />
        </Form.Item>
        <Form.Item label='模块类型' name='type' rules={[{ required: true, message: '请选择模块类型' }]}>
          <Select onChange={onTypeChange} options={nodeTypes} />
        </Form.Item>
        <Form.Item hidden label='Site ID' initialValue={params.siteId} name='siteId'>
          <Input />
        </Form.Item>
        <Form.Item label='模块名称' name='nodeName' rules={[{ required: true, message: '请输入模块名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='最大图片/视频上传数量' name='uploadMax'>
          <InputNumber placeholder='最大图片/视频上传数量' min={0} max={20} precision={0} className='w-full' />
        </Form.Item>
        <Form.Item label='唯一标识符' name='uniKey'>
          <Input placeholder='一旦设置不可更改' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' loading={btnDisabled}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
