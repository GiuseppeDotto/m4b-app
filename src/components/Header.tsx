import { Link } from "react-router-dom";
import "./Header.css";
import { useContext, useEffect, useState } from "react";
import UserDialog from "./UserDialog";
import { UserContext } from "../App";

export default function Header() {
  const user = useContext(UserContext);
  const [userName, setUserName] = useState(user?.displayName);
  const [dialogOpened, setDialogOpened] = useState(false);

  useEffect(() => {
    setUserName(user?.displayName);
  }, [user]);

  return (
    <div className="main-header-container">
      <nav className="main-header">
        <Link to="/">home</Link>
        <Link to="/blog">blog</Link>
        <Link to="/pyM4B">pyM4B</Link>
      </nav>
      <button className="btn-login btn-secondary" onClick={() => setDialogOpened(true)}>
        {userName || "Login"}
      </button>
      <UserDialog opened={dialogOpened} onCLose={() => setDialogOpened(false)} />
    </div>
  );
}
