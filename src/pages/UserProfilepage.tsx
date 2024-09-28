import { MenuButton } from "../components/MenuButton";
import ChartIcon from "../assets/chart-simple-solid.svg";
import InstaIcon from "../assets/instagram-brands-solid.svg";
import { Tabs, ConfigProvider } from "antd";
import { useUserContext } from "../context/UserContext";
import Post, { PostInterface } from "../model/Post";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const { user } = useUserContext(); // Lấy thông tin người dùng từ context
  const [userPosts, setUserPosts] = useState<PostInterface[]>([]); // Định nghĩa kiểu cho userPosts

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
        <div className="mx-auto pt-4 px-6 pb-2">
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
        </div>
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
            tabBarStyle={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "20px",
            }}
            size="large"
          >
            {/* Threads Tab */}
            <Tabs.TabPane tab="Threads" key="1">
              <ul className="space-y-4">
                {userPosts.map((post: PostInterface) => (
                  <li key={post.id} className="border-b pb-4 flex items-start">
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
                        <div className="text-sm ml-2  ">
                          <span className="text-[#777777]">
                            {new Date(post.createDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="">{post.content}</p>
                    </div>
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
