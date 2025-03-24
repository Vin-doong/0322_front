// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProductList from "./pages/Product/ProductList";
import ProductDetail from "./pages/Product/ProductDetail";
import FavoriteList from "./pages/Home/FavoriteList";
import NoticeBoard from "./pages/Notice/NoticeBoard";
import NoticeBoardDetail from "./pages/Notice/NoticeBoardDetail";
import NoticeBoardEdit from "./pages/Notice/NoticeBoardEdit";
import NoticeBoardInsert from "./pages/Notice/NoticeBoardInsert";
import Schedule from "./pages/Schedule";
import GoogleCallback from "./pages/Auth/GoogleCallback";
import NaverCallback from "./pages/Auth/NaverCallback";
import UpdateProfile from "./pages/Auth/UpdateProfile";
import FindPassword from "./pages/Auth/FindPassword";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // 공지사항 상태 관리
  const [notices, setNotices] = useState([]);

  // 공지사항 추가 함수
  const handleAddNotice = (newNotice) => {
    setNotices((prevNotices) => [newNotice, ...prevNotices]);
  };

  return (
    <Router> 
      <Routes>
        {/* 공개 라우트 - 인증 불필요 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/notices/:id" element={<NoticeBoardDetail />} />
        <Route path="/callback/google" element={<GoogleCallback />} />
        <Route path="/callback/naver" element={<NaverCallback />} />
        
        {/* 보호된 라우트 - 로그인 필요 */}
        <Route path="/schedule" element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <FavoriteList />
          </ProtectedRoute>
        } />
        <Route path="/notices/edit/:id" element={
          <ProtectedRoute>
            <NoticeBoardEdit />
          </ProtectedRoute>
        } />
        <Route path="/newnotice" element={
          <ProtectedRoute>
            <NoticeBoardInsert onSubmit={handleAddNotice} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;