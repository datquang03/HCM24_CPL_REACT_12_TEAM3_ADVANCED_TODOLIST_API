import { MenuButton } from "../components/MenuButton";
import ChartIcon from "../assets/chart-simple-solid.svg";
import InstaIcon from "../assets/instagram-brands-solid.svg";
import { Tabs, ConfigProvider } from "antd";
import { useUserContext } from "../context/UserContext";

const UserProfilePage = () => {
  const { user } = useUserContext(); // Lấy thông tin người dùng từ context

  const tabItems = [
    {
      label: "Threads",
      key: "1",
    },
    {
      label: "Replies",
      key: "2",
    },
    {
      label: "Repost",
      key: "3",
    },
  ];

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
      <div className="container mx-auto pt-4 px-6 pb-2">
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

        {/* Tabs for User Profile */}
        <Tabs
          defaultActiveKey="1"
          centered
          items={tabItems}
          tabBarGutter={100}
          indicator={{
            size: 220,
            align: "center",
          }}
          tabBarStyle={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
          size="large"
        />
      </div>
    </ConfigProvider>
  );
};

export default UserProfilePage;
