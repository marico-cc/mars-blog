import { useEffect, useState } from 'react';
import { service } from '@/services/service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import { getDateTimeString } from '@/utils/utils';
import { DesktopOutlined, EditOutlined } from '@ant-design/icons';

export const SinglePage = () => {
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);
  const [pageContent, setPageContent] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedUserMenu) return;
    getPageContent();
  }, [selectedUserMenu]);

  const getPageContent = async () => {
    try {
      const page = await service.getPageContent(selectedUserMenu);
      setPageContent(page);
    } catch (e) {
      setPageContent(null);
      console.log(e);
    }
  };

  const gotoAdd = () => {
    navigate('../edit/' + pageContent?.id);
  };

  if (pageContent === null)
    return (
      <div className={`w-full p-20 text-center text-gray-300 `}>
        <div>
          <DesktopOutlined className={`text-[80px] `} />
        </div>
        <h3 className={`text-3 mt-15`}>暂无数据</h3>

        <a className={`text-5 mt-20`} onClick={gotoAdd}>
          <EditOutlined />
          <span className={`ml-2`}>编辑</span>
        </a>
      </div>
    );

  return (
    <div className={`cms-article w-full rounded-xl bg-white p-10`}>
      <a className={`text-5 mt-20`} onClick={gotoAdd}>
        <EditOutlined />
        <span className={`ml-2`}>编辑</span>
      </a>
      <h2 className={`text-center`}>{pageContent?.title}</h2>
      <Divider />
      <div className={`text-7 text-center text-gray-500`}>{pageContent?.updatedAt && getDateTimeString(pageContent?.updatedAt)}</div>
      <div className={`cms-article-content mt-20 p-4`}>
        <div className='ql-editor' dangerouslySetInnerHTML={{ __html: pageContent?.content }} />
      </div>
    </div>
  );
};
