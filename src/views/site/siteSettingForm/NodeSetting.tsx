import React, { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { service } from '@/services/service';
import { useParams } from 'react-router-dom';
import { Button, Col, Divider, Form, Input, InputNumber, Modal, Popconfirm, Row, TreeSelect, message } from 'antd';
import { FormInstance } from 'antd/lib';
import { useSettings } from '@/hooks/settings.hook';
import { EditOutlined } from '@ant-design/icons';
import { FormFactory } from '@/components/form';
import { FormParser } from '@/components/form/FormParser';
import { useDbClick } from '@/hooks/dbSubmit.hook';
import { useNodes } from '@/hooks/nodes.hook';
import { handleNodeArray } from '@/utils/utils';

export const NodeSetting: FC = () => {
  const params = useParams();
  const nodeList = useSelector((state: any) => state.menu.userMenuTree);
  const [currentNode, setCurrentNode] = useState<any>();
  const nodeRef = useRef<FormInstance>(null);
  const isSystemAdmin = useSelector((state: any) => state.global.user.isSystemAdmin) ?? false;
  const { settings, settingValues, saveSettings, saveSettingValues } = useSettings(currentNode?.id);
  const { btnDisabled, setBtnDisabled } = useDbClick();
  const { setNodes } = useNodes();
  const [parentNodes, setParentNodes] = useState<Array<unknown>>([]);

  useEffect(() => {
    initParentNodeTree();
  }, []);

  const initParentNodeTree = async () => {
    const data = await service.getSiteModules(params.siteId || '');
    const { nodeTree } = handleNodeArray([...(data?.nodes || [])], { labelIndex: 'nodeName', valueIndex: 'id', parentIndex: 'parentId', disable: (item) => item.type !== 'node' });
    nodeTree.unshift({ label: '-- 无 --', value: 'null' });
    setParentNodes(nodeTree);
  };
  const [propertyModalOpen, setPropertyModalOpen] = useState(false);

  const onFinish = async (values) => {
    if (!currentNode?.id) return;
    setBtnDisabled(true);
    try {
      await service.updateNode({ ...values, parentId: currentNode.parentId === 'null' ? null : currentNode.parentId });
      message.success('保存成功');
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

  const onNodeChange = (v, item) => {
    setCurrentNode(item);
    nodeRef?.current?.setFieldsValue(item);
  };

  const onParentNodeChange = (v, item) => {
    setCurrentNode({ ...currentNode, parentId: v });
  };

  const removeNode = async () => {
    if (!currentNode?.id) return;
    setBtnDisabled(true);
    try {
      await service.removeNode(currentNode?.id);
      message.success('删除成功');
      await setNodes(); // set global node tree for menu
      setCurrentNode(null);
      nodeRef?.current?.setFieldsValue({});
    } catch (e) {
      message.error('删除失败');
      console.log(e);
    } finally {
      setBtnDisabled(false);
    }
  };

  const onFormMakerSubmit = async (values) => {
    setPropertyModalOpen(false);
    if (!params.siteId) return;
    if (!values || !values.mFormItems) return;
    await saveSettings(values.mFormItems);
  };

  return (
    <>
      <Row className={`w-[600px]`}>
        <Col span={8} className={`mb-6 pr-3 text-right`}>
          模块:
        </Col>
        <Col span={16} className={``}>
          <TreeSelect value={currentNode?.id} treeDefaultExpandAll treeData={nodeList} onSelect={onNodeChange} className='w-full' />
        </Col>
      </Row>
      {isSystemAdmin && (
        <>
          <Row className={`w-[600px]`}>
            <Col span={8} className={`mb-6 pr-3 text-right`}>
              父节点:
            </Col>
            <Col span={16} className={``}>
              <TreeSelect value={currentNode?.parentId} treeDefaultExpandAll treeData={parentNodes} onSelect={onParentNodeChange} className='w-full' />
            </Col>
          </Row>

          <Row className={`w-[600px]`}>
            <Col span={8} className={`mb-4 pr-3 text-right`}>
              类型:
            </Col>
            <Col span={16} className={``}>
              {currentNode?.type?.toUpperCase()}
            </Col>
          </Row>
        </>
      )}
      <>
        {isSystemAdmin && <h3>基础设置</h3>}
        <Form ref={nodeRef} name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item hidden label='Node ID' initialValue={currentNode?.id} name='id'>
            <Input />
          </Form.Item>
          <Form.Item label='模块名称' name='nodeName' rules={[{ required: true, message: '请输入模块名称' }]}>
            <Input disabled={!currentNode?.id} />
          </Form.Item>
          <Form.Item label='最大图片/视频上传数量' name='uploadMax'>
            <InputNumber placeholder='请输入 0-20' min={0} max={20} precision={0} className='w-full' disabled={!currentNode?.id} />
          </Form.Item>
          <Form.Item label='序号' name='order'>
            <InputNumber placeholder='请输入 0-100' min={0} max={100} precision={0} className='w-full' />
          </Form.Item>
          {isSystemAdmin && (
            <Form.Item label='唯一标识符' name='uniKey'>
              <Input disabled={!!currentNode?.uniKey} placeholder='一旦保存不可更改' />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={`mb-2`}>
            <Popconfirm placement='top' title={<div className={'w-[300px]'}>确定眼删除节点吗?</div>} description={<p className={`py-5 text-red-500`}>删除后将无法恢复</p>} okText='确认删除' cancelText='不删' onConfirm={removeNode}>
              <Button className={`mr-4`} disabled={!currentNode?.id || btnDisabled}>
                删除节点
              </Button>
            </Popconfirm>

            <Button type='primary' htmlType='submit' loading={btnDisabled} disabled={!currentNode?.id}>
              保存
            </Button>
          </Form.Item>
        </Form>

        <Divider className={`my-6 border-gray-400`} dashed />
        <div className={`flex items-center justify-start`}>
          <h3 className={`mr-6`}>模块配置</h3>
          {isSystemAdmin && (
            <>
              <a onClick={() => setPropertyModalOpen(true)}>
                <EditOutlined className={`mr-2`} />
                Edit Node property settings
              </a>
              <Modal
                title='Site property settings'
                classNames={{ body: 'h-[80vh] w-[80vw] overflow-y-auto' }}
                width={`82vw`}
                closable={false}
                maskClosable={false}
                open={propertyModalOpen}
                onOk={() => setPropertyModalOpen(false)}
                onCancel={() => setPropertyModalOpen(false)}
                footer={() => ''}>
                <FormFactory useSettingOnly={currentNode?.type === 'form'} initValues={settings?.values} onSubmit={onFormMakerSubmit} onDrop={() => setPropertyModalOpen(false)} />
              </Modal>
            </>
          )}
        </div>
        {currentNode?.type !== 'form' && settings?.values?.length > 0 && (
          <div className={`mt-6 w-[600px]`}>
            <FormParser initialValues={settingValues?.values} formItems={settings?.values} onSubmit={saveSettingValues} />
          </div>
        )}

        {currentNode?.type === 'form' && settings?.values?.filter((item) => !!item.settingOnly).length > 0 && (
          <div className={`mt-6 w-[600px]`}>
            <FormParser initialValues={settingValues?.values} formItems={settings?.values?.filter((item) => !!item.settingOnly)} onSubmit={saveSettingValues} />
          </div>
        )}
      </>
    </>
  );
};
