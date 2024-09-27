import { MenuButton } from "../components/MenuButton";
import ChartIcon from "../assets/chart-simple-solid.svg";
import InstaIcon from "../assets/instagram-brands-solid.svg";
import React from "react";
import { Tabs } from "antd";

const UserProfilePage = () => {
  const tabItems = [
    {
      label: "Threads",
      key: "1",
      // children: <div>Content for kaka</div>,
    },
    {
      label: "Replies",
      key: "2",
      // children: <div>Content for kiki</div>,
    },
    {
      label: "Repost",
      key: "3",
      // children: <div>Content for kkoo</div>,
    },
  ];

  return (
    <div className="container mx-auto pt-4 px-6 pb-2">
      {/* User Info */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">Tran Duc Tri</h2>
          <p className="text-[15px]">_Ducctri</p>
        </div>
        <img
          src="https://html.com/wp-content/uploads/flamingo.jpg"
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
        tabBarGutter={200}
        indicator={{
          size: 230,
          align: "center",
        }}
        tabBarStyle={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "green",
        }}
      />
    </div>
  );
};

export default UserProfilePage;
