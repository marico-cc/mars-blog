import React, { FC, useEffect, useState } from 'react';
import { useSettings } from '@/hooks/settings.hook';
import { useSelector } from 'react-redux';
import { Image, Popconfirm, Table, message } from 'antd';
import { service } from '@/services/service';
import { data } from 'autoprefixer';
import { usePagination } from '@/hooks/pagination.hook';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MediaPreview } from '@/components/form/MediaPreview';
import { FormItemType } from '@/typings/FormItemType.enum';

const { VITE_APP_FILE_UPLOAD_URL } = import.meta.env;

export const CustomizedTable: FC = () => {
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const { settings } = useSettings(selectedUserMenu);
  const [list, setList] = useState<any>([]);
  const { pagination, setPagination, loading, setLoading } = usePagination();
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, [selectedUserMenu, pagination.currentPage, pagination.pageSize]);

  const getList = async () => {
    if (!selectedUserMenu) return;

    try {
      setLoading(true);
      const data = await service.getCustomizedTableData(selectedUserMenu, pagination.currentPage, pagination.pageSize);
      setList((data?.customizedForms || []).map((item) => ({ ...item, key: item.id })));
      setPagination({ ...pagination, total: data.customizedCount });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const editArticle = (id) => {
    navigate('../edit/' + id);
  };

  const removeItem = async (id) => {
    try {
      await service.removeCustomizedTableItem(id);
      await getList();
      message.info('删除成功');
    } catch (e) {
      message.error('删除失败');
    }
  };

  const columns = settings?.values
    ?.filter((item) => !item.settingOnly)
    .map((item) => ({
      title: item.label || item.name || '',
      render(text, record) {
        if ([FormItemType.IMAGE, FormItemType.VIDEO, FormItemType.MEDIA].includes(item.type)) {
          const data = record.values?.[item.name];
          return (typeof data === 'string' ? [data] : data || []).map((url: string) => <MediaPreview size='small' fileUrl={url} key={url} />);
        } else if (item.type === FormItemType.BOOLEAN) {
          return record.values?.[item.name] ? '是' : <span className='text-gray-40 0'>否</span>;
        }
        return record?.values?.[item.name] || '';
      }
    }));

  columns?.push({
    title: '操作',
    width: 80,
    render(text, record) {
      return (
        <>
          <a onClick={() => editArticle(record.id)} title={'编辑'}>
            <EditOutlined />
          </a>
          <Popconfirm placement='top' title='确定删除吗?' description={<p>删除后不可恢复</p>} okText='删除' cancelText='取消' onConfirm={() => removeItem(record.id)}>
            <a title={'删除'} className='ml-4'>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </>
      );
    }
  });

  return (
    <Table
      dataSource={list}
      columns={columns}
      loading={loading}
      pagination={{
        current: pagination.currentPage,
        pageSize: pagination.pageSize,
        total: pagination.total,
        disabled: loading,
        showTotal: (total, range) => `第 ${range[0] === range[1] ? `${range[1]}` : `${range[0]}-${range[1]}`} 条, 共 ${total} 条`,
        onChange: (page, pageSize) => {
          setPagination({
            ...pagination,
            currentPage: page,
            pageSize: pageSize
          });
        }
      }}
    />
  );
};
