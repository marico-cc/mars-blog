import { FC, Key, useEffect, useState } from 'react';
import { service } from '@/services/service';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export const Sites: FC = () => {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState({});
  const [siteRoles, setSiteRoles] = useState({});
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state?.global?.user);
  const isSystemAdmin = useSelector((state: any) => state.global.user.isSystemAdmin) ?? false;
  useEffect(() => {
    getSites();
  }, []);

  useEffect(() => {
    if (sites.length === 1 && currentUser?.id && !currentUser?.isSystemAdmin && isSiteAdmin(sites?.[0])) {
      gotoSite(sites[0]);
    }
  }, [sites, currentUser, siteRoles]);

  const getSites = async () => {
    const { sites: siteList } = await service.getSites();

    const siteIds: Array<string> = siteList.map((it) => it.id);
    const roles = await service.getRolesOfSites(siteIds);

    const roleMap = {};
    roles.forEach((role) => {
      if (!roleMap[role.siteId])
        roleMap[role.siteId] = {
          admin: undefined,
          superAdmin: undefined
        };
      if (role.roleCode === 'ADMIN') roleMap[role.siteId].admin = role;
      if (role.roleCode === 'SUPER_ADMIN') roleMap[role.siteId].superAdmin = role;
    });

    setSites(siteList?.map((it: any) => ({ ...it, key: it.id })) ?? []);
    setSiteRoles(roleMap);

    const userIds: Array<string> = [];
    roles.forEach((role) => {
      if (!userIds.includes(role.userId)) userIds.push(role.userId);
    });
    const { users } = await service.getUsers(userIds);

    const userMap = {};
    (users || []).forEach((user) => {
      user.key = user.id;
      userMap[user.id] = user;
    });
    setUsers(userMap);
  };

  const isSiteAdmin = (site) => {
    if (!site) return false;
    const roles = siteRoles[site.id];
    if (!roles) return false;
    if (!roles.admin) return false;
    return roles.admin.userId === currentUser.id;
  };

  const isSiteSuperAdmin = (site) => {
    const roles = siteRoles[site.id];
    if (!roles) return false;
    if (!roles.superAdmin) return false;
    return roles.superAdmin.userId === currentUser.id;
  };

  const getSiteAdmin = (site) => {
    const roles = siteRoles[site.id];
    if (!roles) return '';
    const userId = roles.admin?.userId || '';
    if (!userId) return '';
    return users[userId];
  };

  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelected(selectedRows);
    }
  };

  const gotoSite = (site) => {
    navigate(`/site/${site.id}/article/list`);
  };

  const gotoSiteSetting = (site) => {
    navigate(`/site/setting/${site.id}`);
  };

  const gotoAdd = () => {
    navigate(`/site/add`);
  };

  const columns = [
    {
      title: '站点名称',
      dataIndex: 'siteName',
      render(text, record) {
        return (
          <a className={`text-blue-600`} onClick={() => gotoSite(record)}>
            {text}
          </a>
        );
      }
    },
    // {
    //   title: '域名',
    //   dataIndex: 'siteDomain',
    //   key: 'siteDomain'
    // },
    {
      title: '管理员',
      render(text, record) {
        return getSiteAdmin(record)?.nickName;
      }
    },
    {
      title: '操作',
      render(text, record) {
        if (!isSystemAdmin && !isSiteSuperAdmin(record)) return '';

        return (
          <a className={`text-blue-600`} onClick={() => gotoSiteSetting(record)}>
            <SettingOutlined />
          </a>
        );
      }
    }
  ];

  return (
    <>
      {isSystemAdmin && (
        <Button type='primary' onClick={gotoAdd}>
          新增站点
        </Button>
      )}
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        dataSource={sites}
        columns={columns}
      />
    </>
  );
};
