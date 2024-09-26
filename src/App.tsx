import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import DefaultLayout from "./defaultLayout/DefaultLayout";
import Homepage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NotificationPage from "./pages/NotificationPage";
import UserProfilePage from "./pages/UserProfilePage";
import BlogDetailPage from "./pages/BlogDetailPage";

function App() {
  return (
    <div className="no-scrollbar">
      <BrowserRouter>
        <Routes>
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
