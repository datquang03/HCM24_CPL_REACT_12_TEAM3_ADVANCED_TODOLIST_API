import { Table } from "antd";
import { PostInterface } from "../model/Post";



interface ManagePostsTableProps {
    posts: PostInterface[];
  }

const ManagePostsTable = ({ posts }: ManagePostsTableProps) => {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Created Date',
        dataIndex: 'createDate',
        key: 'createDate',
        render: (date: string) => {
            const dateObj = new Date (date)
            const datee = dateObj.toLocaleDateString();  
            const time = dateObj.toLocaleTimeString();   
            return `${datee}, ${time}`;
        } 

      },
      {
        title: 'Updated Date',
        dataIndex: 'updateDate',
        key: 'updateDate',
        render: (date: string) => {
            const dateObj = new Date (date)
            const datee = dateObj.toLocaleDateString();  
            const time = dateObj.toLocaleTimeString();   
            return `${datee}, ${time}`;
        }
      }
    ];
  
    return <Table dataSource={posts} columns={columns} rowKey="id" className="dark-table" />;
  };
  
export default ManagePostsTable
  