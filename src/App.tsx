import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import DefaultLayout from "./defaultLayout/DefaultLayout";
import BlogDetailPage from "./pages/BlogDetailPage";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import NotificationPage from "./pages/NotificationPage";
import UserProfilePage from "./pages/UserProfilePage";
import OtherUserProfilePage from "./pages/OtherUserProfilePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { UserProvider } from "./context/UserContext"; // UserContext để Lưu Thông Tin Người Dùng

function App() {
  return (
    <div className="no-scrollbar">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/userprofile" element={<UserProfilePage />} />
              <Route path="/detail/:id" element={<BlogDetailPage />} />
              <Route path="/user/:userId" element={<OtherUserProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
