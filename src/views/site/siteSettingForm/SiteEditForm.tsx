import { FC, useEffect, useRef, useState } from 'react';
import { AutoComplete, Button, Divider, Form, Input, Modal, message } from 'antd';
import { service } from '@/services/service';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { FormFactory } from '@/components/form';
import { useSelector } from 'react-redux';
import { RoleEnum } from '@/typings/role.enum';
import { FormParser } from '@/components/form/FormParser';
import { EditOutlined } from '@ant-design/icons';
import { useSettings } from '@/hooks/settings.hook';
import { useDbClick } from '@/hooks/dbSubmit.hook';

export const SiteEditForm: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const siteRef = useRef<FormInstance>(null);
  const isSystemAdmin = useSelector((state: any) => state.global.user.isSystemAdmin) ?? false;
  const isSiteSuperAdmin = useSelector((state: any) => state.global.user.isSiteSuperAdmin) ?? false;
  const { settings, settingValues, saveSettings, saveSettingValues } = useSettings(params.siteId);

  const [adminOptions, setAdminOptions] = useState<{ value: string; label: string }[]>([]);
  const [superAdminOptions, setSuperAdminOptions] = useState<{ value: string; label: string }[]>([]);
  const [admin, setAdmin] = useState<any>({});
  const [superAdmin, setSuperAdmin] = useState<any>({});
  const [sitePropertyOpen, setSitePropertyOpen] = useState(false);

  const { btnDisabled, setBtnDisabled } = useDbClick();

  useEffect(() => {
    initValues();
  }, []);

  const initValues = () => {
    if (params.siteId) {
      service
        .getSiteInfoById(params.siteId)
        .then((res) => {
          setTimeout(() => siteRef?.current?.setFieldsValue(res.site), 500);
          const adminIds = (res.rolesOfSites || []).filter((role) => role.roleCode === RoleEnum.ADMIN).map((role) => role.userId);
          initUser(adminIds, 'ADMIN');

          const superAdminIds = (res.rolesOfSites || []).filter((role) => role.roleCode === RoleEnum.SUPER_ADMIN).map((role) => role.userId);
          initUser(superAdminIds, 'SUPER_ADMIN');
        })
        .catch((e) => {
          message.error('获取信息失败');
          console.log(e);
        });
    }
  };

  const initUser = (useIds: string[], role: 'ADMIN' | 'SUPER_ADMIN') => {
    service.getUsers(useIds).then((res) => {
      const user = res.users[0];
      if (user) {
        if (role === 'ADMIN') {
          setAdmin(user);
          setAdminOptions([{ ...user, value: `${user.nickName} ( ${user.userName})` }]);
          siteRef?.current?.setFieldValue('admin', `${user.nickName} ( ${user.userName})`);
        } else if (role === 'SUPER_ADMIN') {
          setSuperAdmin(user);
          setSuperAdminOptions([{ ...user, value: `${user.nickName} ( ${user.userName})` }]);
          siteRef?.current?.setFieldValue('superAdmin', `${user.nickName} ( ${user.userName})`);
        }
      }
    });
  };
  const onFinish = async (values) => {
    setBtnDisabled(true);
    const site = { ...values, admin: [admin.id || ''], superAdmin: [superAdmin.id || ''] };
    try {
      if (params.siteId) {
        await service.updateSite(site);
        message.info('添加成功');
      } else {
        delete site.id;
        await service.createSite(site);
        message.info('添加成功');
      }
    } catch (e) {
      message.error('添加失败,请稍后再试');
      navigate('/site/sites');
    } finally {
      setBtnDisabled(false);
    }
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  const getUsers = async (keyword: string, role: 'ADMIN' | 'SUPER_ADMIN') => {
    const res = await service.searchUsers(keyword);
    const users = res.searchUsers || [];
    const list = users.map((user) => {
      return { ...user, value: `${user.nickName} ( ${user.userName})` };
    });
    if (role === 'ADMIN') {
      setAdminOptions(list);
    } else if (role === 'SUPER_ADMIN') {
      setSuperAdminOptions(list);
    }
  };

  const onFormMakerSubmit = async (values) => {
    setSitePropertyOpen(false);
    if (!params.siteId) return;
    if (!values || !values.mFormItems) return;
    await saveSettings(values.mFormItems);
  };

  return (
    <div>
      {(isSystemAdmin || isSiteSuperAdmin) && (
        <>
          <h3>基础设置</h3>
          <Form ref={siteRef} name='siteSettingForm' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <Form.Item hidden name='id'>
              <Input />
            </Form.Item>
            <Form.Item label='站点名称' name='siteName' rules={[{ required: true, message: '请输入站点名称' }]} className={`mb-2`}>
              <Input />
            </Form.Item>
            <Form.Item label='站点域名' name='siteDomain' className={`mb-2`}>
              <Input />
            </Form.Item>
            <Form.Item label='超级管理员' name='superAdmin' className={`mb-2`}>
              <AutoComplete value={superAdmin} onSearch={(keyword) => getUsers(keyword, 'SUPER_ADMIN')} onSelect={(value, option) => setSuperAdmin(option)} placeholder='input here' options={superAdminOptions} />
            </Form.Item>
            <Form.Item label='管理员' name='admin' className={`mb-2`}>
              <AutoComplete value={admin} onSearch={(keyword) => getUsers(keyword, 'ADMIN')} onSelect={(value, option) => setAdmin(option)} placeholder='input here' options={adminOptions} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={`mb-2`}>
              <Button type='primary' htmlType='submit' loading={btnDisabled}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {(isSystemAdmin || isSiteSuperAdmin) && params.siteId && (
        <>
          <Divider className={`my-6 border-gray-400`} dashed />
          <div className={`flex items-center justify-start`}>
            <h3 className={`mr-6`}>站点配置</h3>
            {isSystemAdmin && (
              <>
                <a onClick={() => setSitePropertyOpen(true)}>
                  <EditOutlined className={`mr-2`} />
                  Edit site property settings{' '}
                </a>
                <Modal
                  title='Site property settings'
                  classNames={{ body: 'h-[80vh] w-[80vw] overflow-y-auto' }}
                  width={`82vw`}
                  closable={false}
                  maskClosable={false}
                  open={sitePropertyOpen}
                  onOk={() => setSitePropertyOpen(false)}
                  onCancel={() => setSitePropertyOpen(false)}
                  footer={() => ''}>
                  <FormFactory initValues={settings?.values} onSubmit={onFormMakerSubmit} onDrop={() => setSitePropertyOpen(false)} />
                </Modal>
              </>
            )}
          </div>
          <div className={`w-[600px]`}>
            <FormParser initialValues={settingValues?.values} formItems={settings?.values} onSubmit={saveSettingValues} />
          </div>
        </>
      )}
    </div>
  );
};
