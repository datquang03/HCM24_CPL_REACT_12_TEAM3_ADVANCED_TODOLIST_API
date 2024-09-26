import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import SideBarMenu from "../components/SideBarMenu";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import { useState } from "react";

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
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock function to handle login, replace with your actual login logic
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Sider width="5%" style={siderStyle}>
            <SideBarMenu />
          </Sider>
          <Layout className="outlet">
            <div
              className="header"
              style={{
                position: 'fixed',
                top: 0,
                left: '5%',
                width: '95%',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                zIndex: 1,
                color: 'white',
                fontSize: '24px',
              }}
            >
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                Threads
              </div>
              {!isLoggedIn && ( // Conditional rendering
                <Link to="/login" style={{ position: 'absolute', right: '20px' }}>
                  <button
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '4px 16px',
                      borderRadius: '8px',
                    }}
                    onClick={handleLogin} // Call the mock login function
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
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
