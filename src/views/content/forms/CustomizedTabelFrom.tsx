import { FC, useEffect, useState } from 'react';
import { FormParser } from '@/components/form/FormParser';
import { ContentFormProps } from '@/views/content/ContentEditor';
import { useSettings } from '@/hooks/settings.hook';
import { useSelector } from 'react-redux';
import { service } from '@/services/service';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

interface CustomizedTableFormProps extends ContentFormProps {}

export const CustomizedTableForm: FC<CustomizedTableFormProps> = ({ onSaved }) => {
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const { settings, loading: settingLoading } = useSettings(selectedUserMenu);
  const params = useParams();
  const [formValues, setFormValues] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContent();
  }, [params.contentId]);

  const getContent = async () => {
    if (!params.contentId) return;
    setLoading(true);
    try {
      const res = await service.getCustomizedTableItem(params.contentId);
      res?.values && setFormValues(res || {});
    } catch (e) {
      message.error('获取内容失败');
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (values, onSavedCb) => {
    try {
      if (!params.contentId) {
        const input = {
          siteId: params.siteId,
          nodeId: selectedUserMenu,
          values
        };
        await service.createCustomizedTableItem(input);
      } else {
        const input = {
          id: params.contentId,
          values
        };
        await service.updateCustomizedTableItem(input);
      }

      onSaved?.();
      message.info('保存成功');
    } catch (e) {
      message.error('保存失败');
    } finally {
      onSavedCb?.();
    }
  };

  return (
    <>
      {!params.contentId && <FormParser loading={loading || settingLoading} formItems={settings?.values?.filter((item) => !item.settingOnly)} onSubmit={saveData} showCancel onCancel={onSaved} />}
      {params.contentId && formValues && <FormParser loading={loading || settingLoading} formItems={settings?.values?.filter((item) => !item.settingOnly)} initialValues={formValues.values} onSubmit={saveData} showCancel onCancel={onSaved} />}
    </>
  );
};
