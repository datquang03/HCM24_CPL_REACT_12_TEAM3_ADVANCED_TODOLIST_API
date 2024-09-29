import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, ConfigProvider, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import User, { UserInterface } from '../model/User';
import Post, { PostInterface } from '../model/Post';
import ChartIcon from "../assets/chart-simple-solid.svg";
import InstaIcon from "../assets/instagram-brands-solid.svg";
import { MenuButton } from "../components/MenuButton";

const OtherUserProfilePage = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState<UserInterface | null>(null);
  const [userPosts, setUserPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const fetchedUser = await User.getById(userId);
          setUser(fetchedUser);

          const posts = await Post.getPostByUserId(userId);
          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: "#FFFFFF",
            itemSelectedColor: "#ffffff",
            itemActiveColor: "#ffffff",
            horizontalItemPaddingLG: "20px 50px",
          },
        },
      }}
    >
      <div className="container mx-auto pt-4 pb-2">
        {/* User Info */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-2xl">{user.name}</h2>
            <p className="text-[15px]">{user.email}</p>
          </div>
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-[84px] h-[84px] object-cover rounded-full"
          />
        </div>

        {/* Follower Count and Icons */}
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            {[600, 500, 700].map((num, index) => (
              <img
                key={index}
                src={`https://picsum.photos/${num}/500`}
                alt="Follower"
                className="w-4 h-4 -ml-1 object-cover rounded-full"
              />
            ))}
            <span className="ml-3 text-[#777777]">9 followers</span>
          </div>

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

        {/* Tabs for User Profile */}
        <div className="user-post-content overflow-hidden mt-6">
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
                        src={user.avatar}
                        alt="Avatar"
                        className="w-9 h-9 rounded-full mr-3"
                      />
                      <div>
                        <div className="flex">
                          <div className="text-gray-500 text-sm">
                            <span>{user.name}</span>
                          </div>
                          <div className="text-sm ml-2">
                            <span className="text-[#777777]">
                              {new Date(post.createDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg">{post.title}</h3>
                        <p>{post.content}</p>
                      </div>
                    </div>

                    {/* Dropdown menu for posts */}
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="report">
                            Report
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

export default OtherUserProfilePage;
