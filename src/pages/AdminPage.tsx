import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useEffect, useState } from "react";
import Post, { PostInterface } from "../model/Post";
import User, { UserInterface } from "../model/User";
import ManageUsersTable from "../components/ManageUserTable";
import ManagePostsTable from "../components/ManagePostsTable";
import EditPostModal from "../components/EditPostModal";

const AdminPage = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<PostInterface | null>(null);
  const [creator, setCreator] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await Post.getAll();
      setPosts(allPosts);
    };

    const fetchUsers = async () => {
      const allUsers = await User.getAll();
      setUsers(allUsers);
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const onCreateUser = async (newUser: UserInterface) => {
    await User.create(newUser);
    setUsers([...users, newUser]);
  };

  const onEdit = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      setEditingPost(post);

      const user = await User.getById(post.userId);
      setCreator(user);
      setOpen(true);
    }
  };

  const onDelete = (userId: string, postId: string) => {
    console.log(userId, postId);
    Post.delete(userId, postId);
  };

  const handleOk = async (values: { title: string; content: string }) => {
    if (editingPost) {
      setConfirmLoading(true);
      const updatedPost = { ...editingPost, ...values };
      await Post.update(updatedPost);
      setPosts(
        posts.map((post) => (post.id === editingPost.id ? updatedPost : post))
      );
      setOpen(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Manage Posts",
      children: (
        <ManagePostsTable posts={posts} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
    {
      key: "2",
      label: "Manage Users",
      children: <ManageUsersTable users={users} onCreateUser={onCreateUser} />,
    },
  ];

  return (
    <div className="px-4">
      <Tabs defaultActiveKey="1" items={items} />
      <EditPostModal
        open={open}
        confirmLoading={confirmLoading}
        post={editingPost}
        creator={creator}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </div>
  );
};

export default AdminPage;
