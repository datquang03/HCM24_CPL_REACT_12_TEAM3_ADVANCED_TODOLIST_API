import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import SideBarMenu from "../components/SideBarMenu";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../App.css";
import { useUserContext } from "../context/UserContext";

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
  const { user, setUser } = useUserContext(); // Access user state

  const handleLogout = () => {
    setUser(null); // Clear user data on logout
  };

  const isLoggedIn = !!user; // Check if the user is logged in

  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin");

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
              {!isLoggedIn ? (
                <Link to="/login" style={{ position: 'absolute', right: '20px' }}>
                  <button
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      padding: '4px 16px',
                      borderRadius: '8px',
                    }}
                  >
                    Login
                  </button>
                </Link>
              ) : (
                <Link to="/" style={{ position: 'absolute', right: '20px' }}>
                <button
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '4px 16px',
                    borderRadius: '8px',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
                </Link>
              )}
            </div>
            <div className="content" style={{ width: isAdminPath ? '80%' : '60%' }}>
              <Outlet />
            </div>
          </Layout>
        </Layout>
      </Flex>
    </div>
  );
};

export default DefaultLayout;
