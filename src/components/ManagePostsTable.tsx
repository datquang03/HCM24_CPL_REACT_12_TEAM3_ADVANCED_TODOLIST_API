import React from 'react';
import { Table, Dropdown, Button, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PostInterface } from "../model/Post";

interface ManagePostsTableProps {
  posts: PostInterface[];
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

const ManagePostsTable: React.FC<ManagePostsTableProps> = ({ posts, onEdit, onDelete }) => {
  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const { key, domEvent } = info;
    domEvent.stopPropagation(); //prevent triggering row click

    const [action, postId] = key.split('_');
    if (action === 'edit') {
      onEdit(postId);
    } else if (action === 'delete') {
      onDelete(postId);
    }
  };

  const getActionItems = (postId: string): MenuProps['items'] => [
    {
      key: `edit_${postId}`,  
      label: 'Edit',
      icon: <EditOutlined />,
      className: "dark-style",
    },
    {
      key: `delete_${postId}`,  
      label: 'Delete',
      icon: <DeleteOutlined />,
      className: "dark-style",
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
    },
    {
      title: 'Created Date',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 200,
      render: (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.toLocaleDateString()}, ${dateObj.toLocaleTimeString()}`;
      },
    },
    {
      title: 'Updated Date',
      dataIndex: 'updateDate',
      key: 'updateDate',
      width: 200,
      render: (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.toLocaleDateString()}, ${dateObj.toLocaleTimeString()}`;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (record: PostInterface) => (
        <Dropdown
          menu={{
            items: getActionItems(record.id), 
            onClick: handleMenuClick,  
          }}
          trigger={['click']}
        >
          <Button onClick={(e) => e.stopPropagation()} className='dark-style'>
            <Space>
              Actions
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      dataSource={posts}
      columns={columns}
      rowKey="id"
      className="dark-table cursor-pointer"
      scroll={{ y: 550, x: 1400 }}
      pagination={{
        pageSize: 10,
      }}
      onRow={(record) => {
        return {
          onClick: () => onEdit(record.id), 
        };
      }}
    />
  );
};

export default ManagePostsTable;
