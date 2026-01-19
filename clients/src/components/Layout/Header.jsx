import React, { use } from "react";
import "./Header.css";
import {useNavigate} from "react-router-dom";

function Header(){
    const navigate = useNavigate();
return (
  <>
    <header className="header">
      <div>
        <button onClick={() => navigate("/admin/dashboard")}>Home</button>
      </div>
      <div>
        {" "}
        <button onClick={() => navigate("/admin/dashboard/users")}>Users</button>
      </div>
      <div>
        {" "}
        <button onClick={() => navigate("/admin/dashboard/products")}>Products</button>
      </div>
      <div>
        {" "}
        <button onClick={() => navigate("/admin/dashboard/categories")}>Categories</button>
      </div>
      <div>
        {" "}
        <button onClick={() => navigate("/about")}>About</button>
      </div>
    </header>
  </>
);
}
export default Header;