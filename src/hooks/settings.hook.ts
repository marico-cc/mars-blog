import { useEffect, useState } from 'react';
import { service } from '@/services/service';
import { message } from 'antd';
import { useSelector } from 'react-redux';

export const useSettings = (belongId?: string) => {
  const isSystemAdmin = useSelector((state: any) => state.global.user.isSystemAdmin) ?? false;
  const isSiteSuperAdmin = useSelector((state: any) => state.global.user.isSiteSuperAdmin) ?? false;
  const isSiteAdmin = useSelector((state: any) => state.global.user.isSiteAdmin) ?? false;

  const [settings, setSettings] = useState<any>({});
  const [settingValues, setSettingValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initSettingData();
  }, [belongId, isSystemAdmin, isSiteSuperAdmin]);

  const initSettingData = () => {
    if (!isSystemAdmin && !isSiteSuperAdmin && isSiteAdmin) {
      setSettings({});
      setSettingValues({});
      return;
    }
    if (!belongId) {
      setSettings({});
      setSettingValues({});
      return;
    }

    setLoading(true);
    service
      .getSettingDataByBelongId(belongId)
      .then((res) => {
        console.log(`res`, res);
        setSettings(res.setting || {});
        setSettingValues(res.settingValues || {});
      })
      .catch((e) => {
        message.error('获取信息失败');
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveSettings = async (values, onSavedCb = () => {}) => {
    if (!isSystemAdmin && !isSiteSuperAdmin) return;

    if (!belongId) return;
    if (!values || !values) return;
    try {
      await service.saveSettings(belongId, values);
      message.info('保存成功');
      initSettingData();
    } catch (e) {
      message.error('保存失败,请稍后再试');
      console.log(e);
    } finally {
      onSavedCb?.();
    }
  };

  const saveSettingValues = async (values, onSavedCb) => {
    if (!isSystemAdmin && !isSiteSuperAdmin) return;

    if (!belongId) return;
    if (!values) return;

    try {
      await service.saveSettingValues(settings.id, belongId, values);
      message.info('保存成功');
    } catch (e) {
      message.error('保存失败,请稍后再试');
      console.log(e);
    } finally {
      onSavedCb?.();
    }
  };

  return { settings, settingValues, initSettingData, saveSettings, saveSettingValues, loading };
};
