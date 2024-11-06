import React, { FC, useEffect, useState } from 'react';
import { Button, Image, Popconfirm, Space, Table, message } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDateTimeString, usePath } from '@/utils/utils';
import { service } from '@/services/service';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
import { SinglePage } from '@/views/content/SinglePage';
import { CustomizedTable } from '@/views/content/CustomizedTable';
import { usePagination } from '@/hooks/pagination.hook';
import { Welcome } from '@/components/Welcome';
import { MediaPreview } from '@/components/form/MediaPreview';
const { VITE_APP_FILE_UPLOAD_URL } = import.meta.env;

export const ContentList: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const path = usePath();
  const [selected, setSelected] = useState<any>([]);
  const [list, setList] = useState([]);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const { userMenuTree: nodeList, userMenuMap } = useSelector((state: any) => state.menu);
  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};

  const { pagination, setPagination, loading, setLoading } = usePagination();

  useEffect(() => {
    setList([]);
    getContents();
  }, [location.pathname, selectedUserMenu, pagination.currentPage, pagination.pageSize]);

  const getContents = async () => {
    try {
      if (!params?.siteId || !selectedUserMenu) return;
      setLoading(true);
      switch (currentNode?.type) {
        case 'page':
          break;
        case 'article': {
          const data = await service.getArticles(params?.siteId || '', selectedUserMenu, '', pagination.currentPage, pagination.pageSize);
          setList((data.articles || []).map((article) => ({ ...article, key: article.id })));
          setPagination({ ...pagination, total: data.articleCount });
          break;
        }

        case 'media':
        case 'image':
        case 'video': {
          const data = await service.getMedias(selectedUserMenu, pagination.currentPage, pagination.pageSize);
          setList((data?.mediaList || []).map((media) => ({ ...media, key: media.id })));
          setPagination({ ...pagination, total: data.mediaCount });
          break;
        }
      }
    } catch (e) {
      message.error('获取内容失败');
    } finally {
      setLoading(false);
    }
  };

  const gotoAdd = () => {
    console.log(path);
    navigate('../add');
  };

  const editArticle = (id) => {
    navigate('../edit/' + id);
  };

  const removeContent = async (id) => {
    try {
      switch (currentNode?.type) {
        case 'page':
          break;
        case 'article': {
          await service.removeArticle(id);
          break;
        }

        case 'media':
        case 'image':
        case 'video': {
          await service.removeMedia(id);
          break;
        }
      }
      message.success('删除成功');
      await getContents();
    } catch (e) {
      message.error('删除失败');
    }
  };

  const rowSelection: TableRowSelection<any> = {
    type: 'checkbox',
    onChange: (selectedRowKeys: React.Key[], selectedRows) => {
      setSelected(selectedRows);
    }
  };

  const columns = [
    {
      title: '缩略图',
      dataIndex: 'thumbUrl',
      render(text, record) {
        if (currentNode?.type === 'article' && text) return <Image key={record.id} width={64} height={64} className='rounded-1xl' src={`${VITE_APP_FILE_UPLOAD_URL}/${text}`} />;
        if (record.mediaList?.[0]?.url) return <MediaPreview size={'small'} fileUrl={`${record.mediaList?.[0]?.url}`} />;

        return '';
      }
    },
    {
      title: '私有',
      dataIndex: 'isPrivate',
      width: '10%',
      render: (text) => (text === 'Y' ? '是' : '')
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '35%'
    },
    {
      title: '来源',
      dataIndex: 'origin'
    },
    {
      title: '阅读量',
      dataIndex: 'viewCount'
    },
    {
      title: '发布时间',
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
            <a onClick={() => editArticle(record.id)} title={'编辑'}>
              <EditOutlined />
            </a>

            <Popconfirm placement='top' title='确定删除吗?' description={<p>删除后不可恢复</p>} okText='删除' cancelText='取消' onConfirm={() => removeContent(record.id)}>
              <a title={'删除'} className='ml-4'>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </>
        );
      }
    }
  ];

  const getContent = () => {
    if (!currentNode?.type) return <Welcome />;
    if (currentNode?.type === 'page') return <SinglePage />;
    if (currentNode?.type === 'form') return <CustomizedTable />;

    return (
      <Table
        rowSelection={rowSelection}
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
  return (
    <div>
      <Space>
        {!!currentNode?.type && currentNode?.type !== 'node' && currentNode?.type !== 'page' && (
          <Button type='primary' htmlType='submit' onClick={gotoAdd}>
            新增
          </Button>
        )}
      </Space>
      {getContent()}
    </div>
  );
};
