import React, { FC, useEffect, useState } from 'react';
import { Button, Image, Popconfirm, Table, message } from 'antd';
import { getDateTimeString } from '@/utils/utils';
import { DeleteOutlined, EditOutlined, KeyOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
import { service } from '@/services/service';
import { UserEditModal } from '@/views/users/UserEditModal';
import { ResetPwModal } from '@/views/users/ResetPwModal';

export const Users: FC = () => {
  const [selected, setSelected] = useState<any>([]);
  const [list, setList] = useState([]);
  const [showUserEditor, setShowUserEditor] = useState(false);
  const [showPwResetModal, setShowPwResetModal] = useState(false);
  const [user2Edit, setUser2Edit] = useState<any>();

  useEffect(() => {
    getUsers().then();
  }, []);

  const getUsers = async () => {
    const data = await service.searchUsers('');
    console.log(data);
    const users = data.searchUsers || [];
    setList(users.map((user) => ({ ...user, key: user.id })));
  };

  const deleteUser = async (id: string) => {
    try {
      await service.removeUser(id);
      message.success('删除成功');
      await getUsers();
    } catch (e) {
      console.log(e);
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'nickName'
    },
    {
      title: '登录用户名',
      dataIndex: 'userName'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render(text, record) {
        return getDateTimeString(text);
      }
    },
    {
      title: '操作',
      render(text, record) {
        return (
          <>
            <a
              onClick={() => {
                setUser2Edit(record);
                setShowUserEditor(true);
              }}
              title={'编辑'}>
              <EditOutlined />
            </a>

            <a
              title={'重置密码'}
              className='ml-4'
              onClick={() => {
                setShowPwResetModal(true);
                setUser2Edit(record);
              }}>
              <KeyOutlined />
            </a>

            <Popconfirm placement='top' title='确定删除吗?' description={<p className='px-4 py-2 text-red-500'>删除后不可恢复</p>} okText='删除' cancelText='取消' onConfirm={() => deleteUser(record.id)}>
              <a title={'删除'} className='ml-4'>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const rowSelection: TableRowSelection<any> = {
    type: 'checkbox',
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      setSelected(selectedRows);
    }
  };

  return (
    <div>
      <Button type='primary' onClick={() => setShowUserEditor(true)}>
        新增
      </Button>
      <Table
        rowSelection={rowSelection}
        dataSource={list}
        columns={columns}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => `第 ${range[0] === range[1] ? `${range[1]}` : `${range[0]}-${range[1]}`} 条, 共 ${total} 条`
        }}
      />
      {showUserEditor && (
        <UserEditModal
          user={user2Edit}
          onClose={() => {
            setShowUserEditor(false);
            setUser2Edit(undefined);
          }}
          onSaved={() => {
            setShowUserEditor(false);
            setUser2Edit(undefined);
            getUsers().then();
          }}
        />
      )}
      {showPwResetModal && (
        <ResetPwModal
          user={user2Edit}
          onClose={() => {
            setShowPwResetModal(false);
            setUser2Edit(undefined);
          }}
          onSaved={() => {
            setShowPwResetModal(false);
            setUser2Edit(undefined);
          }}
        />
      )}
    </div>
  );
};
