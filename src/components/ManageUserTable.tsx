import { Table } from "antd";
import { UserInterface } from "../model/User";

interface ManageUsersTableProps {
    users: UserInterface[];
}

const ManageUsersTable = ({ users }: ManageUsersTableProps) => {
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Password',
          dataIndex: 'password',
          key: 'password',
        },
        {
          title: 'Avatar',
          dataIndex: 'avatar',
          key: 'avatar',
          render: (text: string) => <img src={text} alt="avatar" style={{ width: '40px' }} />,
        },
        {
          title: 'Created Date',
          dataIndex: 'createDate',
          key: 'createDate',
        },
        {
          title: 'Updated Date',
          dataIndex: 'updateDate',
          key: 'updateDate',
        }
      ];
    
      return  (
        <div className="flex">
            <Table dataSource={users} columns={columns} rowKey="id" className="dark-table"  scroll={{ y: 550, x: 1400 }} /> ;
        </div>
      )
    };

export default ManageUsersTable;