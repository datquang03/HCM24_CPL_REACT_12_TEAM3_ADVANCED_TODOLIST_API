import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./defaultLayout/DefaultLayout";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/Searchpage";
import NotificationPage from "./pages/Notificationpage";
import UserProfilePage from "./pages/UserProfilepage";
import BlogDetailPage from "./pages/BlogDetailPage";

function App() {
  return (
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
  );
}

export default App;
