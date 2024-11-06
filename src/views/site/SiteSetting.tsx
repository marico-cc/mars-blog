import { FC, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { SiteEditForm } from '@/views/site/siteSettingForm/SiteEditForm';
import { NodeSetting } from '@/views/site/siteSettingForm/NodeSetting';
import { AddNode } from '@/views/site/Node/AddNode';
import { useSelector } from 'react-redux';

export const SiteSetting: FC<{ isAdding?: boolean }> = ({ isAdding = false }) => {
  const isSystemAdmin = useSelector((state: any) => state.global.user.isSystemAdmin) ?? false;
  const [tabs, setTabs] = useState([{ key: '2', label: '节点设置', children: <NodeSetting /> }]);

  useEffect(() => {
    if (!isSystemAdmin) return;
    if (isAdding) {
      setTabs([{ key: '1', label: '新增站点', children: <SiteEditForm /> }]);
    } else {
      setTabs([
        { key: '1', label: '站点设置', children: <SiteEditForm /> },
        { key: '2', label: '节点设置', children: <NodeSetting /> },
        { key: '3', label: '新增节点', children: <AddNode /> }
      ]);
    }
  }, [isSystemAdmin]);

  return (
    <div>
      <Tabs defaultActiveKey='1' items={tabs} />
    </div>
  );
};
