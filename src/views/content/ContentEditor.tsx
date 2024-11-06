import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticleForm } from '@/views/content/forms/ArticleForm';
import { PageForm } from '@/views/content/forms/PageForm';
import { MediaForm } from '@/views/content/forms/MediaForm';
import { CustomizedTableForm } from '@/views/content/forms/CustomizedTabelFrom';

export interface ContentFormProps {
  onSaved?: () => void;
}

export const ContentEditor: FC = () => {
  const navigate = useNavigate();
  const { userMenuMap } = useSelector((state: any) => state.menu);
  const selectedUserMenu = useSelector((state: any) => state.menu.selectedUserMenu);

  const onSaved = () => {
    navigate('../list');
  };

  const currentNode = userMenuMap?.[selectedUserMenu] ?? {};

  return (
    <div>
      {currentNode?.type === 'article' && <ArticleForm onSaved={onSaved} />}
      {currentNode?.type === 'page' && <PageForm onSaved={onSaved} />}
      {['media', 'video', 'image'].includes(currentNode?.type) && <MediaForm onSaved={onSaved} type={currentNode?.type} />}
      {currentNode?.type === 'form' && <CustomizedTableForm onSaved={onSaved} />}
    </div>
  );
};
