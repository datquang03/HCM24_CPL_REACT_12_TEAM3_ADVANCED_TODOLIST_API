import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import DefaultLayout from "./defaultLayout/DefaultLayout";
import BlogDetailPage from "./pages/BlogDetailPage";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/Searchpage";
import NotificationPage from "./pages/Notificationpage";
import UserProfilePage from "./pages/UserProfilepage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="no-scrollbar">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/userprofile" element={<UserProfilePage />} />
            <Route path="/detail/:id" element={<BlogDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
