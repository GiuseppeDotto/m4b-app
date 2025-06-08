import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [userName, _setUserName] = useState("Login");

  return (
    <div className="main-header-container">
      <nav className="main-header">
        <Link to="/">home</Link>
        <Link to="/blog">blog</Link>
        <Link to="/pyM4B">pyM4B</Link>
      </nav>
      <button className="btn-login btn-primary">{userName}</button>
    </div>
  );
}
