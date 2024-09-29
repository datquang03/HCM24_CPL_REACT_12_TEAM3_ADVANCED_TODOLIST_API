import { Table, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { UserInterface } from "../model/User";

interface ManageUsersTableProps {
  users: UserInterface[];
  onCreateUser: (user: UserInterface) => void; 
}

const ManageUsersTable = ({ users, onCreateUser }: ManageUsersTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("User created successfully:", values);

      const newUser: UserInterface = {
        id: (users.length + 1).toString(),  
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: "",  
        createDate: new Date(), 
        updateDate: new Date(), 
    };
    

      
      onCreateUser(newUser);

      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("User creation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
        Create User
      </Button>
      <div style={{ marginTop: '16px' }}> {/* Thêm div này */}
        <Table dataSource={users} columns={columns} rowKey="id" className="dark-table" scroll={{ y: 550, x: 1400 }} />
      </div>
      <Modal
        title="Create User"
        open={isModalVisible} 
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
  
};

export default ManageUsersTable;
