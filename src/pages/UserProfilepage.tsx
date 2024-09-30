import { MenuButton } from "../components/MenuButton";
import ChartIcon from "../assets/chart-simple-solid.svg";
import InstaIcon from "../assets/instagram-brands-solid.svg";
import { Tabs, ConfigProvider, Modal, Input, Dropdown, Menu } from "antd";
import { useUserContext } from "../context/UserContext";
import Post, { PostInterface } from "../model/Post";
import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";

const UserProfilePage = () => {
  const { user } = useUserContext(); // Lấy thông tin người dùng từ context
  const [userPosts, setUserPosts] = useState<PostInterface[]>([]); // Định nghĩa kiểu cho userPosts

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [currentPostId, setCurrentPostId] = useState<string | null>(null); // ID của bài viết hiện tại

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?.id) {
        try {
          const posts = await Post.getPostByUserId(user.id);
          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    fetchUserPosts();
  }, [user]);

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle OK button click in modal
  // Function to handle OK button click in modal
  const handleOk = async () => {
    if (!newPostTitle || !newPostContent) {
      // Nếu tiêu đề hoặc nội dung trống, có thể hiện thông báo lỗi hoặc chặn việc tạo bài post
      return;
    }
    try {
      const newPost: PostInterface = {
        id: currentPostId || "", // Nếu là chỉnh sửa, lấy ID bài viết
        userId: user?.id || "",
        title: newPostTitle,
        content: newPostContent,
        status: "published",
        createDate: currentPostId
          ? userPosts.find((post) => post.id === currentPostId)?.createDate ||
            new Date()
          : new Date(), // Cung cấp giá trị mặc định
        updateDate: new Date(),
      };

      if (currentPostId) {
        // Gọi API để cập nhật bài viết
        const updatedPost = await Post.update(newPost);
        setUserPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === currentPostId ? updatedPost : post
          )
        );
      } else {
        // Gọi API để tạo bài viết mới
        const createdPost = await Post.create(newPost);
        setUserPosts((prevPosts) => [createdPost, ...prevPosts]);
      }

      // Đóng modal và reset các input field
      setIsModalVisible(false);
      setNewPostTitle("");
      setNewPostContent("");
      setCurrentPostId(null); // Reset ID bài viết hiện tại
    } catch (error) {
      console.error("Error creating or updating post:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentPostId(null); // Reset ID bài viết hiện tại khi hủy
  };

  const handleEdit = (post: PostInterface) => {
    setNewPostTitle(post.title);
    setNewPostContent(post.content);
    setCurrentPostId(post.id); // Lưu ID bài viết để chỉnh sửa
    showModal();
  };

  const handleDelete = async (userId: string, id: string) => {
    try {
      await Post.delete(userId, id); // Gọi API để xóa bài viết
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Cập nhật lại danh sách bài viết
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "#FFFFFF", // Custom color for the active tab indicator (white)
            itemSelectedColor: "#ffffff",
            itemActiveColor: "#ffffff",
            horizontalItemPaddingLG: "20px 50px",
          },
        },
      }}
    >
      <div className="container ">
        <div className="mx-auto pt-4 pb-2">
          {/* User Info */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-2xl">
                {user?.name || "Unknown User"}
              </h2>
              <p className="text-[15px]">{user?.email}</p>
            </div>
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-[84px] h-[84px] object-cover rounded-full"
            />
          </div>

          {/* Follower Count and Icons */}
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              {/* Follower Avatars */}
              {[600, 500, 700].map((num, index) => (
                <img
                  key={index}
                  src={`https://picsum.photos/${num}/500`}
                  alt="Follower"
                  className="w-4 h-4 -ml-1 object-cover rounded-full"
                />
              ))}
              <span className="ml-3 text-[#777777] hover:underline cursor-pointer">
                9 followers
              </span>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <MenuButton
                svg={ChartIcon}
                title="Chart"
                height={24}
                width={24}
                onClick={() => console.log("Chart icon clicked")}
              />
              <MenuButton
                svg={InstaIcon}
                title="Instagram"
                height={24}
                width={24}
                onClick={() => console.log("Instagram icon clicked")}
              />
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="mt-4 w-full h-8 rounded-md border border-[#424141] px-4 text-lg">
            Edit profile
          </button>

          {/* Post Creation Area (Moved above the posts) */}
          <div className="mt-4 flex items-center">
            <img
              src={user?.avatar}
              alt="Avatar"
              className="w-9 h-9 rounded-full mr-3 "
            />
            <div
              className="border border-[#424141] w-full px-4 py-2 rounded-md cursor-pointer"
              onClick={showModal}
            >
              What's new?
            </div>
          </div>
        </div>
        {/* Modal for creating a new post */}
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                contentBg: "#181818", // Màu nền của modal
                colorText: "#ffffff", // Màu chữ trong modal
              },
              Button: {
                colorPrimary: "#1890ff", // Màu nút xanh (primary)
                colorPrimaryHover: "#40a9ff", // Màu khi hover
              },
            },
          }}
        >
          <Modal
            title="Create New Post"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Post"
            cancelText="Cancel"
            style={{ top: "200px" }}
          >
            <Input
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="mb-4"
            />
            <Input.TextArea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
            />
          </Modal>
        </ConfigProvider>

        {/* Tabs for User Profile */}
        <div className="user-post-content overflow-hidden">
          <Tabs
            defaultActiveKey="1"
            centered
            tabBarGutter={80}
            indicator={{
              size: 250,
              align: "center",
            }}
            size="large"
          >
            {/* Threads Tab */}
            <Tabs.TabPane tab="Threads" key="1">
              <ul className="space-y-4">
                {userPosts.map((post: PostInterface) => (
                  <li
                    key={post.id}
                    className="border-b pb-4 flex items-start justify-between"
                  >
                    <div className="flex">
                      <img
                        src={user?.avatar}
                        alt="Avatar"
                        className="w-9 h-9 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex">
                          <div className="text-gray-500 text-sm">
                            <span>{user?.name}</span>
                          </div>
                          <div className="text-sm ml-2">
                            <span className="text-[#777777]">
                              {new Date(post.createDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <p className="">{post.content}</p>
                      </div>
                    </div>

                    {/* Dropdown menu for edit/delete */}
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="edit"
                            onClick={() => handleEdit(post)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            key="delete"
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <EllipsisOutlined className="text-lg cursor-pointer" />
                    </Dropdown>
                  </li>
                ))}
              </ul>
            </Tabs.TabPane>
            {/* Replies Tab */}
            <Tabs.TabPane tab="Replies" key="2">
              <p>Content for Replies tab</p>
            </Tabs.TabPane>
            {/* Repost Tab */}
            <Tabs.TabPane tab="Repost" key="3">
              <p>Content for Repost tab</p>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default UserProfilePage;
