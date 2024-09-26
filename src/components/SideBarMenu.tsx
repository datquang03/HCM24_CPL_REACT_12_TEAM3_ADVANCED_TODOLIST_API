import { useCustomNavigate } from "../hooks/useCustomNavigate";

import MainLogo from "../assets/MainLogo.svg";
import HomeIcon from "../assets/HomeIcon.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import NotificationIcon from "../assets/NotificationIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import PinToHome from "../assets/PinToHomeIcon.svg";
import MoreIcon from "../assets/MoreIcon.svg";

import { MenuButton } from "./MenuButton";

const SideBarMenu = () => {
  const navigateTo = useCustomNavigate();

  const handleNavigation = (path: string) => {
    navigateTo(path);
  };
  return (
    <div className="flex h-[100vh] flex-col justify-between">
      <div className="p-2">
        <div className="h-10 mt-4 flex justify-center">
          <img className="h-10 w-10 " src={MainLogo} alt="Home" />
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4 items-center">
        <MenuButton
          svg={HomeIcon}
          title="Home"
          height={30}
          width={30}
          onClick={() => handleNavigation("/homepage")}
        />
        <MenuButton
          svg={SearchIcon}
          title="Search"
          height={30}
          width={30}
          onClick={() => handleNavigation("/search")}
        />
        <MenuButton
          svg={NotificationIcon}
          title="Notification"
          height={30}
          width={30}
          onClick={() => handleNavigation("/notification")}
        />
        <MenuButton
          svg={ProfileIcon}
          title="Profile"
          height={30}
          width={30}
          onClick={() => handleNavigation("/userprofile")}
        />
      </div>
      <div className="p-2 flex flex-col gap-4 items-center">
        <MenuButton
          svg={PinToHome}
          title="Pin to Home"
          height={30}
          width={30}
          onClick={() => {}}
        />
        <MenuButton
          svg={MoreIcon}
          title="More"
          height={30}
          width={30}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default SideBarMenu;
