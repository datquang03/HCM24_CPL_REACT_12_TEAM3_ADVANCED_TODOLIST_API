import { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";
import { useUserContext } from "../context/UserContext";
import User, { UserInterface } from "../model/User"; // Giả định rằng có model User với phương thức update

interface UpdateUserFormProps {
  visible: boolean;
  onClose: () => void;
}

interface UpdateUserFormValues {
  name: string;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  visible,
  onClose,
}) => {
  const { user, setUser } = useUserContext(); // Giả định context có setUser để cập nhật thông tin người dùng
  const [form] = Form.useForm<UpdateUserFormValues>(); // Khởi tạo form với kiểu giá trị UpdateUserFormValues

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
      });
    }
  }, [user, form]);

  const handleUpdateUser = async (values: UpdateUserFormValues) => {
    if (!user) {
      console.error("User is not defined");
      return; // Ngăn không cho thực hiện cập nhật nếu user không có
    }

    try {
      const updatedUser = await User.update(user.id, {
        name: values.name,
        email: user.email,
        password: user.password,
      });

      setUser({
        ...user,
        name: updatedUser.name,
      } as UserInterface);

      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal
      title={
        <div
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            background: "#181818",
          }}
        >
          Update Profile
        </div>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdateUser}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserForm;
