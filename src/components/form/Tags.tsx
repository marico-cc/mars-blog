import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Flex, Input, Tag, Tooltip, theme } from 'antd';
import { nanoid } from 'nanoid';

const tagInputStyle: CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top'
};

export interface Tag {
  id?: string;
  key: string;
  name: string;
}

interface TagsProps {
  tags?: Tag[];
  onChange?: (tags: Array<Tag>) => void;
}

export const Tags: FC<TagsProps> = ({ tags: list = [], onChange }) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<Tag[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [editingOne, setEditingOne] = useState<Tag>();
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    const _list = list.map((item) => ({ ...item, key: item.id || nanoid() }));
    setTags(_list);
  }, [list]);

  useEffect(() => {
    editInputRef.current?.focus();
    inputRef.current?.focus();
  }, [editingOne]);

  const handleClose = (key: string) => {
    const newTags = tags.filter((tag) => tag.key !== key);
    setTags(newTags);
    onChange?.(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
    setEditingOne({ key: nanoid(), name: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingOne({ ...editingOne, name: e.target.value } as Tag);
  };

  const handleInputConfirm = () => {
    if (editingOne && editingOne.name && !tags.find((item) => item.name === editingOne.name && item.key !== editingOne.key)) {
      const newTags = [...tags, editingOne];
      setTags(newTags);
      onChange?.(newTags);
    }
    setEditingOne(undefined);
    setInputVisible(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingOne({ ...editingOne, name: e.target.value } as Tag);
  };

  const handleEditInputConfirm = () => {
    const index = tags.findIndex((item) => item.key === editingOne?.key);
    if (index > -1 && editingOne?.name) {
      const newTags = [...tags];
      newTags[index] = editingOne;
      setTags(newTags);
    }

    setEditingOne(undefined);
    setInputVisible(false);
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
    cursor: 'pointer'
  };

  return (
    <Flex gap='4px 0'>
      {tags.map<React.ReactNode>((tag) => {
        if (editingOne?.key === tag.key) {
          return <Input ref={editInputRef} key={tag.key} size='small' style={tagInputStyle} value={editingOne.name} onChange={handleEditInputChange} onBlur={handleEditInputConfirm} onPressEnter={handleEditInputConfirm} />;
        }
        const isLongTag = tag.name.length > 20;
        const tagElem = (
          <Tag key={tag.key} closable style={{ userSelect: 'none' }} onClose={() => handleClose(tag.key)}>
            <span
              onDoubleClick={(e) => {
                setEditingOne(tag);
                e.preventDefault();
              }}>
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag.name} key={tag.key}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input ref={inputRef} type='text' size='small' style={tagInputStyle} value={editingOne?.name} onChange={handleInputChange} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Tag
        </Tag>
      )}
    </Flex>
  );
};
