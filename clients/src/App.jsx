import "./App.css";
import LandingHome from "./components/Home/LandingHome.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/Users/UserDashboard.jsx";
import Register from "./components/Auth/Register.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import DisplayUsers from "./components/Admin/Users/DsiplayUsers.jsx";
import DisplayCategories from "./components/Admin/Categories/DisplayCategories.jsx";
import DisplayProducts from "./components/Admin/Products/DisplayProducts.jsx";
import About from "./components/Shared/About.jsx";
function App() {

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/dashboard/products"
            element={<DisplayProducts />}
          />
          <Route
            path="/admin/dashboard/categories"
            element={<DisplayCategories />}
          />
          <Route path="/admin/dashboard/users" element={<DisplayUsers />} />
          {/* define routes */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
