import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import { PostInterface } from '../model/Post';
import { UserInterface } from '../model/User';

interface EditPostModalProps {
  open: boolean;
  confirmLoading: boolean;
  post: PostInterface | null;
  creator: UserInterface | null;
  onCancel: () => void;
  onOk: (values: { title: string; content: string }) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ open, confirmLoading, post, creator, onCancel, onOk }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (post) {
      form.setFieldsValue({
        title: post.title,
        content: post.content,
      });
    } else {
      form.resetFields();
    }
  }, [post, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Modal
      className="dark-style"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        className: '',
      }}
      cancelButtonProps={{
        className: 'dark-style',
      }}
    >
      <p><strong>Author:</strong> {creator ? creator.name : 'Unknown'}</p>
      <Form
        form={form}
        layout="vertical"
        name="edit_post"
        className="dark-form mt-4"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the post title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input the post content!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
