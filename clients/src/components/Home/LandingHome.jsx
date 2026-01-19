import React from "react";
import { useNavigate } from "react-router-dom";
function LandingHome() {
  const navigate = useNavigate();

  return (
    <>
      <div>Hello, this is our store</div>
      <p>login or register to check our products</p>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}
//navigate
export default LandingHome;