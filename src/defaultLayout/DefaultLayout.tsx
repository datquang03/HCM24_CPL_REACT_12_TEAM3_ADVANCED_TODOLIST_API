import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import SideBarMenu from "../components/SideBarMenu";
import { Outlet } from "react-router-dom";
import "../App.css";

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "black",
};

const layoutStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
};

const DefaultLayout = () => {
  return (
    <div>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="5%" style={siderStyle}>
            <SideBarMenu />
          </Sider>
          <Layout className="outlet">
            <div className="header">Threads</div>
            <div className="content">
              <Outlet />
            </div>
          </Layout>
        </Layout>
      </Flex>
    </div>
  );
};

export default DefaultLayout;
